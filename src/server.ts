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
  title: 'Labzz Design System',
  version: '2.0.0',
  description: 'Servidor MCP que fornece código real (.tsx/.css) de componentes e páginas de referência do design system Labzz.',
}, {
  instructions: `Você está usando o Labzz Design System MCP.
Este MCP serve CÓDIGO REAL (.tsx/.css) de componentes e páginas de referência.

## REGRAS OBRIGATÓRIAS

1. ANTES de construir qualquer página, chame get_page com o nome da página.
   Você receberá o código .tsx real da página + screenshot de referência.
   REPRODUZA o layout, classes e conteúdo EXATAMENTE como no código.

2. Para componentes individuais, chame get_component com o nome.
   Use as classes Tailwind EXATAS do código retornado.

3. SEMPRE chame get_styles no início do projeto para configurar:
   - globals.css (variáveis CSS, fontes, tema)
   - tailwind.config.ts (cores, sombras, animações)
   - utils.ts (função cn para merge de classes)

4. NUNCA invente:
   - Nomes de marca (use os que estão no código)
   - Itens de menu (use os que estão no sidebar.tsx)
   - Métricas ou dados (use os exemplos do código)
   - Classes Tailwind (use as exatas do código)
   - Cores (use as do globals.css e tailwind.config)

5. Se precisar adaptar, altere apenas DADOS e PROPS.
   NUNCA altere a estrutura visual ou classes CSS.

6. Use get_screenshot para verificar visualmente o resultado esperado.

7. Todo texto deve ser em português (pt-BR).`,
});

// --- Tools ---

server.registerTool(
  'list_pages',
  {
    title: 'List Pages',
    description: 'Lista todas as páginas disponíveis com descrição e componentes usados.',
    annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false },
  },
  async () => {
    const catalog = loadCatalog();
    const pages = Object.entries(catalog.pages).map(([name, entry]) => ({
      name,
      description: entry.description,
      components: entry.components,
      layout: entry.layout,
      screenshot: entry.screenshot,
    }));
    return { content: [{ type: 'text' as const, text: JSON.stringify(pages, null, 2) }] };
  }
);

server.registerTool(
  'list_components',
  {
    title: 'List Components',
    description: 'Lista todos os componentes disponíveis com categoria, tags e descrição.',
    annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false },
  },
  async () => {
    const catalog = loadCatalog();
    const components = Object.entries(catalog.components).map(([name, entry]) => ({
      name,
      category: entry.category,
      tags: entry.tags,
      description: entry.description,
    }));
    return { content: [{ type: 'text' as const, text: JSON.stringify(components, null, 2) }] };
  }
);

server.registerTool(
  'get_page',
  {
    title: 'Get Page',
    description: 'PRIMEIRO PASSO OBRIGATÓRIO: Retorna o código .tsx REAL de uma página completa + screenshot de referência. Você DEVE reproduzir este código exatamente.',
    inputSchema: z.object({ name: z.string().describe('Nome da página (ex: dashboard-overview, login, landing-home)') }),
    annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false },
  },
  async ({ name }) => {
    const result = readPatternFromCatalog('pages', name);
    if (!result) {
      return { content: [{ type: 'text' as const, text: `Página "${name}" não encontrada. Use list_pages para ver as disponíveis.` }], isError: true };
    }
    const { code, screenshot, ...meta } = result;
    const content: Array<{ type: 'text'; text: string } | { type: 'image'; data: string; mimeType: string }> = [
      { type: 'text', text: JSON.stringify({ name, ...meta, code }, null, 2) },
    ];
    if (screenshot) {
      try {
        const base64 = getScreenshotBase64(screenshot);
        content.push({ type: 'image', data: base64, mimeType: 'image/png' });
      } catch {
        content.push({ type: 'text', text: `Aviso: screenshot "${screenshot}" existe no catálogo mas não pôde ser carregado.` });
      }
    }
    return { content };
  }
);

server.registerTool(
  'get_layout',
  {
    title: 'Get Layout',
    description: 'Retorna o código .tsx REAL de um layout. Use as classes Tailwind exatas retornadas.',
    inputSchema: z.object({ name: z.string().describe('Nome do layout (ex: dashboard-layout, auth-layout)') }),
    annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false },
  },
  async ({ name }) => {
    const result = readPatternFromCatalog('layouts', name);
    if (!result) {
      return { content: [{ type: 'text' as const, text: `Layout "${name}" não encontrado. Use list_pages para ver os layouts disponíveis.` }], isError: true };
    }
    return { content: [{ type: 'text' as const, text: JSON.stringify({ name, ...result }, null, 2) }] };
  }
);

server.registerTool(
  'get_component',
  {
    title: 'Get Component',
    description: 'Retorna o código .tsx REAL de um componente. Use as classes Tailwind exatas retornadas, NÃO improvise.',
    inputSchema: z.object({ name: z.string().describe('Nome do componente (ex: sidebar, metric-card, button)') }),
    annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false },
  },
  async ({ name }) => {
    const result = readPatternFromCatalog('components', name);
    if (!result) {
      return { content: [{ type: 'text' as const, text: `Componente "${name}" não encontrado. Use list_components para ver os disponíveis.` }], isError: true };
    }
    return { content: [{ type: 'text' as const, text: JSON.stringify({ name, ...result }, null, 2) }] };
  }
);

server.registerTool(
  'get_styles',
  {
    title: 'Get Styles',
    description: 'OBRIGATÓRIO no início do projeto: Retorna globals.css, tailwind.config.ts, utils.ts, design-tokens.ts e package.json de referência.',
    annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false },
  },
  async () => {
    const catalog = loadCatalog();
    const globals = readPattern(catalog.styles.globals.file);
    const tailwindConfig = readPattern(catalog.styles.tailwind.file);
    const utils = readPattern(catalog.styles.utils.file);
    const designTokens = readPattern(catalog.styles['design-tokens'].file);
    const referencePackage = readPattern(catalog.styles['reference-package'].file);
    return {
      content: [{
        type: 'text' as const,
        text: JSON.stringify({ globals, tailwindConfig, utils, designTokens, referencePackage }, null, 2),
      }],
    };
  }
);

server.registerTool(
  'get_screenshot',
  {
    title: 'Get Screenshot',
    description: 'Retorna screenshot PNG da página de referência. O resultado DEVE ser visualmente idêntico.',
    inputSchema: z.object({ name: z.string().describe('Nome da página (ex: dashboard-overview, login)') }),
    annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false },
  },
  async ({ name }) => {
    const catalog = loadCatalog();
    const page = catalog.pages[name as keyof typeof catalog.pages];
    const layout = catalog.layouts[name as keyof typeof catalog.layouts];
    const entry = page || layout;
    if (!entry?.screenshot) {
      return { content: [{ type: 'text' as const, text: `Screenshot para "${name}" não encontrado.` }], isError: true };
    }
    try {
      const base64 = getScreenshotBase64(entry.screenshot);
      return {
        content: [
          { type: 'text' as const, text: `Screenshot de referência para "${name}":` },
          { type: 'image' as const, data: base64, mimeType: 'image/png' },
        ],
      };
    } catch {
      return { content: [{ type: 'text' as const, text: `Erro ao ler o screenshot para "${name}".` }], isError: true };
    }
  }
);

server.registerTool(
  'search_patterns',
  {
    title: 'Search Patterns',
    description: 'Busca patterns por texto livre em tags, categoria e descrição.',
    inputSchema: z.object({ query: z.string().describe('Texto para buscar (ex: "sidebar light", "chart", "form")') }),
    annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false },
  },
  async ({ query }) => {
    const results = searchCatalog(query);
    if (results.length === 0) {
      return { content: [{ type: 'text' as const, text: `Nenhum resultado encontrado para "${query}".` }], isError: true };
    }
    const formatted = results.map(r => ({
      type: r.type,
      name: r.name,
      description: r.entry.description,
      file: r.entry.file,
    }));
    return { content: [{ type: 'text' as const, text: JSON.stringify(formatted, null, 2) }] };
  }
);

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
