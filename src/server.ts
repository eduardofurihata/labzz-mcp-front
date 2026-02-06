import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';
import { loadCatalog, readPattern, getScreenshotBase64, searchCatalog } from './utils/data-loader.js';

function readPatternFromCatalog(type: string, name: string) {
  const catalog = loadCatalog();
  const section = catalog[type as keyof typeof catalog] as Record<string, any> | undefined;
  const entry = section?.[name];
  if (!entry) return null;
  const code = readPattern(entry.file);
  return { ...entry, code };
}

const server = new McpServer({
  name: 'labzz-design-system',
  version: '2.0.0',
}, {
  instructions: `Voce esta usando o Labzz Design System MCP.
Este MCP serve CODIGO REAL (.tsx/.css) de componentes e paginas de referencia.

## REGRAS OBRIGATORIAS

1. ANTES de construir qualquer pagina, chame get_page com o nome da pagina.
   Voce recebera o codigo .tsx real da pagina + screenshot de referencia.
   REPRODUZA o layout, classes e conteudo EXATAMENTE como no codigo.

2. Para componentes individuais, chame get_component com o nome.
   Use as classes Tailwind EXATAS do codigo retornado.

3. SEMPRE chame get_styles no inicio do projeto para configurar:
   - globals.css (variaveis CSS, fontes, tema)
   - tailwind.config.ts (cores, sombras, animacoes)
   - utils.ts (funcao cn para merge de classes)

4. NUNCA invente:
   - Nomes de marca (use os que estao no codigo)
   - Itens de menu (use os que estao no sidebar.tsx)
   - Metricas ou dados (use os exemplos do codigo)
   - Classes Tailwind (use as exatas do codigo)
   - Cores (use as do globals.css e tailwind.config)

5. Se precisar adaptar, altere apenas DADOS e PROPS.
   NUNCA altere a estrutura visual ou classes CSS.

6. Use get_screenshot para verificar visualmente o resultado esperado.

7. Todo texto deve ser em portugues (pt-BR).`,
});

server.tool(
  'list_pages',
  'Lista todas as paginas disponiveis com descricao e componentes usados.',
  {},
  async () => {
    const catalog = loadCatalog();
    const pages = Object.entries(catalog.pages).map(([name, entry]) => ({
      name,
      description: entry.description,
      components: entry.components,
      layout: entry.layout,
      screenshot: entry.screenshot,
    }));
    return { content: [{ type: 'text', text: JSON.stringify(pages, null, 2) }] };
  }
);

server.tool(
  'list_components',
  'Lista todos os componentes disponiveis com categoria, tags e descricao.',
  {},
  async () => {
    const catalog = loadCatalog();
    const components = Object.entries(catalog.components).map(([name, entry]) => ({
      name,
      category: entry.category,
      tags: entry.tags,
      description: entry.description,
    }));
    return { content: [{ type: 'text', text: JSON.stringify(components, null, 2) }] };
  }
);

server.tool(
  'get_page',
  'PRIMEIRO PASSO OBRIGATORIO: Retorna o codigo .tsx REAL de uma pagina completa + screenshot de referencia. Voce DEVE reproduzir este codigo exatamente.',
  { name: z.string().describe('Nome da pagina (ex: dashboard-overview, login, landing-home)') },
  async ({ name }) => {
    const result = readPatternFromCatalog('pages', name);
    if (!result) {
      return { content: [{ type: 'text', text: `Pagina "${name}" nao encontrada. Use list_pages para ver as disponiveis.` }] };
    }
    const { code, screenshot, ...meta } = result;
    const content: Array<{ type: 'text'; text: string } | { type: 'image'; data: string; mimeType: string }> = [
      { type: 'text', text: JSON.stringify({ name, ...meta, code }, null, 2) },
    ];
    if (screenshot) {
      try {
        const base64 = getScreenshotBase64(screenshot);
        content.push({ type: 'image', data: base64, mimeType: 'image/png' });
      } catch { /* screenshot not available */ }
    }
    return { content };
  }
);

server.tool(
  'get_layout',
  'Retorna o codigo .tsx REAL de um layout. Use as classes Tailwind exatas retornadas.',
  { name: z.string().describe('Nome do layout (ex: dashboard-layout, auth-layout)') },
  async ({ name }) => {
    const result = readPatternFromCatalog('layouts', name);
    if (!result) {
      return { content: [{ type: 'text', text: `Layout "${name}" nao encontrado.` }] };
    }
    return { content: [{ type: 'text', text: JSON.stringify({ name, ...result }, null, 2) }] };
  }
);

server.tool(
  'get_component',
  'Retorna o codigo .tsx REAL de um componente. Use as classes Tailwind exatas retornadas, NAO improvise.',
  { name: z.string().describe('Nome do componente (ex: sidebar, metric-card, button)') },
  async ({ name }) => {
    const result = readPatternFromCatalog('components', name);
    if (!result) {
      return { content: [{ type: 'text', text: `Componente "${name}" nao encontrado. Use list_components para ver os disponiveis.` }] };
    }
    return { content: [{ type: 'text', text: JSON.stringify({ name, ...result }, null, 2) }] };
  }
);

server.tool(
  'get_styles',
  'OBRIGATÓRIO no início do projeto: Retorna globals.css, tailwind.config.ts, utils.ts, design-tokens.ts e package.json de referência.',
  {},
  async () => {
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
  }
);

server.tool(
  'get_screenshot',
  'Retorna screenshot PNG da pagina de referencia. O resultado DEVE ser visualmente identico.',
  { name: z.string().describe('Nome da pagina (ex: dashboard-overview, login)') },
  async ({ name }) => {
    const catalog = loadCatalog();
    const page = catalog.pages[name as keyof typeof catalog.pages];
    const layout = catalog.layouts[name as keyof typeof catalog.layouts];
    const entry = page || layout;
    if (!entry?.screenshot) {
      return { content: [{ type: 'text', text: `Screenshot para "${name}" nao encontrado.` }] };
    }
    try {
      const base64 = getScreenshotBase64(entry.screenshot);
      return {
        content: [
          { type: 'text', text: `Screenshot de referencia para "${name}":` },
          { type: 'image', data: base64, mimeType: 'image/png' },
        ],
      };
    } catch {
      return { content: [{ type: 'text', text: `Erro ao ler screenshot para "${name}".` }] };
    }
  }
);

server.tool(
  'search_patterns',
  'Busca patterns por texto livre em tags, categoria e descricao.',
  { query: z.string().describe('Texto para buscar (ex: "sidebar light", "chart", "form")') },
  async ({ query }) => {
    const results = searchCatalog(query);
    if (results.length === 0) {
      return { content: [{ type: 'text', text: `Nenhum resultado para "${query}".` }] };
    }
    const formatted = results.map(r => ({
      type: r.type,
      name: r.name,
      description: r.entry.description,
      file: r.entry.file,
    }));
    return { content: [{ type: 'text', text: JSON.stringify(formatted, null, 2) }] };
  }
);

export async function runServer() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('Labzz Design System MCP running on stdio');
}
