import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';
import { loadCatalog, readPattern, getScreenshotBase64, searchCatalog } from './utils/data-loader.js';
function readPatternFromCatalog(type, name) {
    const catalog = loadCatalog();
    const section = catalog[type];
    const entry = section?.[name];
    if (!entry)
        return null;
    const code = readPattern(entry.file);
    return { ...entry, code };
}
const server = new McpServer({
    name: 'labzz-design-system',
    title: 'Labzz Design System',
    version: '2.0.0',
    description: 'Servidor MCP que fornece código real (.tsx/.css) de componentes e páginas de referência do design system Labzz.',
}, {
    instructions: `Você está usando o Labzz Design System MCP.
Este MCP serve templates de referência visual (.tsx/.css) que definem a IDENTIDADE VISUAL obrigatória.

## CONCEITO FUNDAMENTAL

Os arquivos retornados são TEMPLATES DE DESIGN SYSTEM — não são apps prontos para copiar.
- A IDENTIDADE VISUAL (estrutura, classes, layout, efeitos) é OBRIGATÓRIA e deve ser seguida fielmente.
- O CONTEÚDO (dados, textos, métricas, menus) são EXEMPLOS ILUSTRATIVOS que devem ser substituídos pelos dados reais do projeto que você está construindo.

## COPIE OBRIGATORIAMENTE (identidade visual)

- Estrutura HTML/JSX dos componentes (hierarquia de divs, wrappers, containers)
- Classes Tailwind exatas (cores, espaçamento, tipografia, responsive breakpoints)
- Layout patterns (sidebar + topbar + content area, grids, flex layouts)
- Design tokens (cores do tema, sombras, border-radius, fontes)
- Animações, transições e efeitos visuais (glow, hover states, fadeInUp, etc.)
- Padrão dos componentes UI (Card, Button, Badge, Table, MetricCard, etc.)
- Configurações de estilo (globals.css, tailwind.config.ts, design-tokens.ts)

## NUNCA COPIE — ADAPTE AO PROJETO

- Dados e métricas (ex: "R$ 2.450", "127 leads" são apenas exemplos de formato)
- Textos, labels e títulos de página
- Itens de menu e navegação (adapte às rotas do seu projeto)
- Nomes de produtos, marcas e entidades
- Rotas, URLs e links
- Props com dados de negócio

## COMO USAR

1. Chame get_styles no início para configurar o tema (globals.css, tailwind.config, utils, tokens).
2. Chame get_page ou get_component para obter o template visual de referência.
3. COPIE a estrutura e classes CSS do template.
4. SUBSTITUA todo conteúdo de exemplo pelos dados reais do projeto.
5. Use get_screenshot para conferir que o ESTILO VISUAL está correto (ignore o conteúdo do screenshot, é ilustrativo).

## REGRAS

- NUNCA invente classes Tailwind — use as exatas do template.
- NUNCA copie dados de exemplo como se fossem reais.
- NUNCA altere a estrutura visual ou hierarquia de componentes.
- Todo texto deve ser em português (pt-BR).`,
});
// --- Tools ---
server.registerTool('list_pages', {
    title: 'List Pages',
    description: 'Lista todas as páginas disponíveis com descrição e componentes usados.',
    annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false },
}, async () => {
    const catalog = loadCatalog();
    const pages = Object.entries(catalog.pages).map(([name, entry]) => ({
        name,
        description: entry.description,
        components: entry.components,
        layout: entry.layout,
        screenshot: entry.screenshot,
    }));
    return { content: [{ type: 'text', text: JSON.stringify(pages, null, 2) }] };
});
server.registerTool('list_components', {
    title: 'List Components',
    description: 'Lista todos os componentes disponíveis com categoria, tags e descrição.',
    annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false },
}, async () => {
    const catalog = loadCatalog();
    const components = Object.entries(catalog.components).map(([name, entry]) => ({
        name,
        category: entry.category,
        tags: entry.tags,
        description: entry.description,
    }));
    return { content: [{ type: 'text', text: JSON.stringify(components, null, 2) }] };
});
server.registerTool('get_page', {
    title: 'Get Page',
    description: 'Retorna o template .tsx de referência visual de uma página + screenshot. COPIE a estrutura e classes CSS exatamente. SUBSTITUA os dados de exemplo pelos dados reais do seu projeto.',
    inputSchema: z.object({ name: z.string().describe('Nome da página (ex: dashboard-overview, login, landing-home)') }),
    annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false },
}, async ({ name }) => {
    const result = readPatternFromCatalog('pages', name);
    if (!result) {
        return { content: [{ type: 'text', text: `Página "${name}" não encontrada. Use list_pages para ver as disponíveis.` }], isError: true };
    }
    const { code, screenshot, ...meta } = result;
    const content = [
        { type: 'text', text: JSON.stringify({ name, ...meta, code }, null, 2) },
    ];
    if (screenshot) {
        try {
            const base64 = getScreenshotBase64(screenshot);
            content.push({ type: 'image', data: base64, mimeType: 'image/png' });
        }
        catch {
            content.push({ type: 'text', text: `Aviso: screenshot "${screenshot}" existe no catálogo mas não pôde ser carregado.` });
        }
    }
    return { content };
});
server.registerTool('get_layout', {
    title: 'Get Layout',
    description: 'Retorna o código .tsx REAL de um layout. Use as classes Tailwind exatas retornadas.',
    inputSchema: z.object({ name: z.string().describe('Nome do layout (ex: dashboard-layout, auth-layout)') }),
    annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false },
}, async ({ name }) => {
    const result = readPatternFromCatalog('layouts', name);
    if (!result) {
        return { content: [{ type: 'text', text: `Layout "${name}" não encontrado. Use list_pages para ver os layouts disponíveis.` }], isError: true };
    }
    return { content: [{ type: 'text', text: JSON.stringify({ name, ...result }, null, 2) }] };
});
server.registerTool('get_component', {
    title: 'Get Component',
    description: 'Retorna o template .tsx de referência visual de um componente. Use as classes Tailwind exatas, mas adapte os dados/props ao seu projeto.',
    inputSchema: z.object({ name: z.string().describe('Nome do componente (ex: sidebar, metric-card, button)') }),
    annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false },
}, async ({ name }) => {
    const result = readPatternFromCatalog('components', name);
    if (!result) {
        return { content: [{ type: 'text', text: `Componente "${name}" não encontrado. Use list_components para ver os disponíveis.` }], isError: true };
    }
    return { content: [{ type: 'text', text: JSON.stringify({ name, ...result }, null, 2) }] };
});
server.registerTool('get_styles', {
    title: 'Get Styles',
    description: 'OBRIGATÓRIO no início do projeto: Retorna globals.css, tailwind.config.ts, utils.ts, design-tokens.ts e package.json de referência.',
    annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false },
}, async () => {
    const catalog = loadCatalog();
    const globals = readPattern(catalog.styles.globals.file);
    const tailwindConfig = readPattern(catalog.styles.tailwind.file);
    const utils = readPattern(catalog.styles.utils.file);
    const designTokens = readPattern(catalog.styles['design-tokens'].file);
    const referencePackage = readPattern(catalog.styles['reference-package'].file);
    return {
        content: [{
                type: 'text',
                text: JSON.stringify({ globals, tailwindConfig, utils, designTokens, referencePackage }, null, 2),
            }],
    };
});
server.registerTool('get_screenshot', {
    title: 'Get Screenshot',
    description: 'Retorna screenshot PNG da página de referência. O ESTILO VISUAL (layout, cores, espaçamento) deve ser igual. O conteúdo exibido no screenshot é ilustrativo.',
    inputSchema: z.object({ name: z.string().describe('Nome da página (ex: dashboard-overview, login)') }),
    annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false },
}, async ({ name }) => {
    const catalog = loadCatalog();
    const page = catalog.pages[name];
    const layout = catalog.layouts[name];
    const entry = page || layout;
    if (!entry?.screenshot) {
        return { content: [{ type: 'text', text: `Screenshot para "${name}" não encontrado.` }], isError: true };
    }
    try {
        const base64 = getScreenshotBase64(entry.screenshot);
        return {
            content: [
                { type: 'text', text: `Screenshot de referência para "${name}":` },
                { type: 'image', data: base64, mimeType: 'image/png' },
            ],
        };
    }
    catch {
        return { content: [{ type: 'text', text: `Erro ao ler o screenshot para "${name}".` }], isError: true };
    }
});
server.registerTool('search_patterns', {
    title: 'Search Patterns',
    description: 'Busca patterns por texto livre em tags, categoria e descrição.',
    inputSchema: z.object({ query: z.string().describe('Texto para buscar (ex: "sidebar light", "chart", "form")') }),
    annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false },
}, async ({ query }) => {
    const results = searchCatalog(query);
    if (results.length === 0) {
        return { content: [{ type: 'text', text: `Nenhum resultado encontrado para "${query}".` }], isError: true };
    }
    const formatted = results.map(r => ({
        type: r.type,
        name: r.name,
        description: r.entry.description,
        file: r.entry.file,
    }));
    return { content: [{ type: 'text', text: JSON.stringify(formatted, null, 2) }] };
});
export async function runServer() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error('Labzz Design System MCP running on stdio');
    const shutdown = async () => {
        console.error('Shutting down...');
        await server.close();
        process.exit(0);
    };
    process.on('SIGINT', shutdown);
    process.on('SIGTERM', shutdown);
}
//# sourceMappingURL=server.js.map