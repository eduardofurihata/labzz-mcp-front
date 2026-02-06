# Prompt: Criar MCP Design System

## Contexto

Este projeto (`labzz-mcp-front`) e um MCP server (Model Context Protocol) que serve como
Design System para AI construir frontends identicos a um projeto de referencia.

O projeto de referencia e a pasta irma `labzz-lp-vendas/frontend/`.

O MCP serve CODIGO REAL (.tsx/.css) extraido e sanitizado do projeto de referencia.
NAO serve JSON abstrato, specs ou tokens - serve o codigo que funciona.

## PASSO ZERO: Limpar arquivos antigos

ANTES de criar qualquer coisa, apague todos os arquivos que NAO estao na lista abaixo.
Este projeto pode conter arquivos de uma versao anterior (JSONs abstratos, server antigo, dist/).

Apagar especificamente (se existirem):
```
data/tokens.json
data/components.json
data/dashboard-components.json
data/page-templates.json
data/layout.json
data/ux.json
data/accessibility.json
data/effects.json
data/charts.json
data/landing-components.json
src/server.ts
src/utils/data-loader.ts
dist/                          (pasta inteira)
docs/                          (pasta inteira)
.playwright-mcp/               (pasta inteira)
```

NAO apagar:
```
data/screenshots.json
data/screenshots/*.png
src/index.ts
package.json
tsconfig.json
.claude/
.gitignore
README.md
PROMPT-CRIAR-MCP-DESIGN-SYSTEM.md
```

## O que deve existir neste projeto apos a limpeza

```
labzz-mcp-front/
  data/
    screenshots.json          <- manifesto de screenshots (MANTER)
    screenshots/*.png         <- 11 capturas de tela reais (MANTER)
  src/
    index.ts                  <- entry point (ATUALIZAR)
  package.json                <- dependencias (ATUALIZAR)
  tsconfig.json               <- config TS (MANTER)
```

## O que voce precisa criar

### 1. Estrutura de patterns (extrair do projeto de referencia)

Extrair codigo .tsx/.css REAL do projeto de referencia (`../labzz-lp-vendas/frontend/`)
e salvar em `data/patterns/`. Para cada arquivo:

- COPIAR a estrutura visual completa (classes Tailwind, layout, conteudo)
- REMOVER API calls (`fetch`, `api.get`, `api.post`, etc)
- REMOVER logica de autenticacao (`localStorage`, `redirect`, `useAuth`)
- REMOVER hooks que chamam API (`useProdutos`, `useLeads`, etc)
- REMOVER variaveis de ambiente (`process.env`)
- SUBSTITUIR dados de API por dados de exemplo hardcoded
- MANTER todos os imports de componentes UI e icones
- MANTER todas as classes Tailwind EXATAS (nao simplificar)
- MANTER a estrutura JSX completa
- MANTER dados visuais (menus, textos, labels, icones)

Criar esta estrutura:

```
data/patterns/
  styles/
    globals.css                         <- de ../labzz-lp-vendas/frontend/src/app/globals.css
    tailwind.config.ts                  <- de ../labzz-lp-vendas/frontend/tailwind.config.ts
    utils.ts                            <- de ../labzz-lp-vendas/frontend/src/lib/utils.ts

  layouts/
    dashboard-layout.tsx                <- de src/app/dashboard/layout.tsx + components/layout/DashboardLayoutExample.tsx
    auth-layout.tsx                     <- de src/app/(auth)/layout.tsx

  components/
    layout/
      sidebar.tsx                       <- de src/components/layout/sidebar.tsx
      topbar.tsx                        <- de src/components/layout/TopBar.tsx
      page-header.tsx                   <- de src/components/dashboard/layout/PageHeader.tsx
      page-container.tsx                <- de src/components/dashboard/layout/PageContainer.tsx
      breadcrumb.tsx                    <- de src/components/dashboard/layout/Breadcrumb.tsx

    data-display/
      metric-card.tsx                   <- de src/components/dashboard/data-display/MetricCard.tsx
      data-table.tsx                    <- de src/components/dashboard/data-display/DataTable.tsx
      pagination.tsx                    <- de src/components/dashboard/data-display/Pagination.tsx

    feedback/
      skeleton-card.tsx                 <- de src/components/dashboard/feedback/SkeletonCard.tsx
      skeleton-table.tsx                <- de src/components/dashboard/feedback/SkeletonTable.tsx
      spinner.tsx                       <- de src/components/dashboard/feedback/Spinner.tsx

    charts/
      area-chart.tsx                    <- de src/components/charts/AreaChart.tsx
      bar-chart.tsx                     <- de src/components/charts/BarChart.tsx
      line-chart.tsx                    <- de src/components/charts/LineChart.tsx
      pie-chart.tsx                     <- de src/components/charts/PieChart.tsx

    ui/
      button.tsx                        <- de src/components/ui/button.tsx
      card.tsx                          <- de src/components/ui/card.tsx
      input.tsx                         <- de src/components/ui/input.tsx
      label.tsx                         <- de src/components/ui/label.tsx
      dialog.tsx                        <- de src/components/ui/dialog.tsx
      dropdown-menu.tsx                 <- de src/components/ui/dropdown-menu.tsx
      select.tsx                        <- de src/components/ui/select.tsx
      table.tsx                         <- de src/components/ui/table.tsx
      badge.tsx                         <- de src/components/ui/badge.tsx
      tabs.tsx                          <- de src/components/ui/tabs.tsx
      alert.tsx                         <- de src/components/ui/alert.tsx
      separator.tsx                     <- de src/components/ui/separator.tsx
      checkbox.tsx                      <- de src/components/ui/checkbox.tsx
      textarea.tsx                      <- de src/components/ui/textarea.tsx
      switch.tsx                        <- de src/components/ui/switch.tsx
      skeleton.tsx                      <- de src/components/ui/skeleton.tsx
      sheet.tsx                         <- de src/components/ui/sheet.tsx
      scroll-area.tsx                   <- de src/components/ui/scroll-area.tsx
      accordion.tsx                     <- de src/components/ui/accordion.tsx

    landing/
      hero.tsx                          <- de src/components/vendas/Hero.tsx
      plan-cards.tsx                    <- de src/components/vendas/PlanCardsV2.tsx
      stats-section.tsx                 <- de src/components/vendas/StatsSection.tsx
      testimonials-section.tsx          <- de src/components/vendas/TestimonialsSection.tsx

    effects/
      particles-background.tsx          <- de src/components/effects/ParticlesBackground.tsx

  pages/
    dashboard-overview.tsx              <- de src/app/dashboard/page.tsx
    dashboard-leads.tsx                 <- de src/app/dashboard/leads/page.tsx
    dashboard-produtos.tsx              <- de src/app/dashboard/produtos/page.tsx
    dashboard-landing-pages.tsx         <- de src/app/dashboard/landing-pages/page.tsx
    dashboard-configuracoes.tsx         <- de src/app/dashboard/configuracoes/page.tsx
    dashboard-perfil.tsx                <- de src/app/dashboard/perfil/page.tsx
    dashboard-vendas.tsx                <- de src/app/dashboard/vendas/page.tsx
    dashboard-usuarios.tsx              <- de src/app/dashboard/usuarios/page.tsx
    login.tsx                           <- de src/app/(auth)/login/page.tsx
    register.tsx                        <- de src/app/(auth)/register/page.tsx
    landing-home.tsx                    <- de src/app/vendas/[slug]/page.tsx
    obrigado.tsx                        <- de src/app/obrigado/page.tsx
    error-404.tsx                       <- de src/app/not-found.tsx (se existir)
```

### 2. catalog.json (indice de tudo)

Criar `data/catalog.json` mapeando cada pattern:

```json
{
  "_metadata": {
    "description": "Catalogo do Labzz Design System. Cada pattern contem codigo .tsx real extraido e sanitizado do projeto de referencia.",
    "source": "labzz-lp-vendas",
    "version": "2.0.0"
  },
  "styles": {
    "globals": {
      "file": "patterns/styles/globals.css",
      "description": "CSS global com variaveis de tema, fontes e estilos base"
    },
    "tailwind": {
      "file": "patterns/styles/tailwind.config.ts",
      "description": "Configuracao Tailwind com cores, fontes, sombras e animacoes customizadas"
    },
    "utils": {
      "file": "patterns/styles/utils.ts",
      "description": "Utilitario cn() para merge de classes Tailwind (clsx + tailwind-merge)"
    }
  },
  "layouts": {
    "dashboard-layout": {
      "file": "patterns/layouts/dashboard-layout.tsx",
      "description": "Layout completo do dashboard: Sidebar (w-64) + TopBar (h-20) + area de conteudo com scroll",
      "components": ["sidebar", "topbar"],
      "screenshot": "screenshots/06-dashboard-overview.png"
    },
    "auth-layout": {
      "file": "patterns/layouts/auth-layout.tsx",
      "description": "Layout de autenticacao: pagina centralizada com fundo claro",
      "screenshot": "screenshots/02-login.png"
    }
  },
  "components": {
    "sidebar": {
      "file": "patterns/components/layout/sidebar.tsx",
      "category": "layout",
      "description": "Sidebar com logo BUILDER, gradiente from-slate-50, menus com icon containers 36x36, active state com gradient indicator, logout com hover vermelho",
      "tags": ["light", "gradient", "icon-containers", "active-indicator"],
      "screenshot": "screenshots/06-dashboard-overview.png"
    },
    "topbar": {
      "file": "patterns/components/layout/topbar.tsx",
      "category": "layout",
      "description": "Barra superior h-20 com busca centralizada, notificacoes com badge, menu do usuario com avatar e dropdown",
      "tags": ["search", "notifications", "user-menu", "backdrop-blur"]
    },
    "page-header": {
      "file": "patterns/components/layout/page-header.tsx",
      "category": "layout",
      "description": "Header de pagina sticky com icone, titulo, subtitulo e area de acoes"
    },
    "page-container": {
      "file": "patterns/components/layout/page-container.tsx",
      "category": "layout",
      "description": "Container de conteudo max-w-[1600px] mx-auto px-8 py-12"
    },
    "breadcrumb": {
      "file": "patterns/components/layout/breadcrumb.tsx",
      "category": "layout",
      "description": "Navegacao breadcrumb com separador chevron"
    },
    "metric-card": {
      "file": "patterns/components/data-display/metric-card.tsx",
      "category": "data-display",
      "description": "Card de KPI com icone em container bg-primary/10, valor text-3xl, label e trend indicator",
      "tags": ["kpi", "trend", "icon-container"]
    },
    "data-table": {
      "file": "patterns/components/data-display/data-table.tsx",
      "category": "data-display",
      "description": "Tabela com busca, filtros, selecao e paginacao"
    },
    "pagination": {
      "file": "patterns/components/data-display/pagination.tsx",
      "category": "data-display",
      "description": "Controles de paginacao com info e botoes de navegacao"
    },
    "skeleton-card": {
      "file": "patterns/components/feedback/skeleton-card.tsx",
      "category": "feedback",
      "description": "Skeleton loading para cards"
    },
    "skeleton-table": {
      "file": "patterns/components/feedback/skeleton-table.tsx",
      "category": "feedback",
      "description": "Skeleton loading para tabelas"
    },
    "spinner": {
      "file": "patterns/components/feedback/spinner.tsx",
      "category": "feedback",
      "description": "Spinner de loading animado"
    },
    "area-chart": {
      "file": "patterns/components/charts/area-chart.tsx",
      "category": "charts",
      "description": "Grafico de area com Recharts"
    },
    "bar-chart": {
      "file": "patterns/components/charts/bar-chart.tsx",
      "category": "charts",
      "description": "Grafico de barras com Recharts"
    },
    "line-chart": {
      "file": "patterns/components/charts/line-chart.tsx",
      "category": "charts",
      "description": "Grafico de linhas com Recharts"
    },
    "pie-chart": {
      "file": "patterns/components/charts/pie-chart.tsx",
      "category": "charts",
      "description": "Grafico de pizza com Recharts"
    },
    "button": { "file": "patterns/components/ui/button.tsx", "category": "ui", "description": "Botao com variants: default, secondary, outline, ghost, destructive, link" },
    "card": { "file": "patterns/components/ui/card.tsx", "category": "ui", "description": "Card container com header, content e footer" },
    "input": { "file": "patterns/components/ui/input.tsx", "category": "ui", "description": "Input de texto com suporte a icone" },
    "label": { "file": "patterns/components/ui/label.tsx", "category": "ui", "description": "Label para campos de formulario" },
    "dialog": { "file": "patterns/components/ui/dialog.tsx", "category": "ui", "description": "Modal dialog com overlay e animacao" },
    "dropdown-menu": { "file": "patterns/components/ui/dropdown-menu.tsx", "category": "ui", "description": "Menu dropdown com items e separadores" },
    "select": { "file": "patterns/components/ui/select.tsx", "category": "ui", "description": "Select dropdown com trigger e opcoes" },
    "table": { "file": "patterns/components/ui/table.tsx", "category": "ui", "description": "Tabela base com header, body, row e cell" },
    "badge": { "file": "patterns/components/ui/badge.tsx", "category": "ui", "description": "Badge com variants: default, secondary, success, destructive, outline" },
    "tabs": { "file": "patterns/components/ui/tabs.tsx", "category": "ui", "description": "Tabs com trigger e content" },
    "alert": { "file": "patterns/components/ui/alert.tsx", "category": "ui", "description": "Alerta com variants: default, destructive" },
    "separator": { "file": "patterns/components/ui/separator.tsx", "category": "ui", "description": "Linha separadora horizontal ou vertical" },
    "checkbox": { "file": "patterns/components/ui/checkbox.tsx", "category": "ui", "description": "Checkbox com label" },
    "textarea": { "file": "patterns/components/ui/textarea.tsx", "category": "ui", "description": "Area de texto multilinhas" },
    "switch": { "file": "patterns/components/ui/switch.tsx", "category": "ui", "description": "Toggle switch on/off" },
    "skeleton": { "file": "patterns/components/ui/skeleton.tsx", "category": "ui", "description": "Skeleton base com animate-pulse" },
    "sheet": { "file": "patterns/components/ui/sheet.tsx", "category": "ui", "description": "Painel lateral deslizante" },
    "scroll-area": { "file": "patterns/components/ui/scroll-area.tsx", "category": "ui", "description": "Area com scroll customizado" },
    "accordion": { "file": "patterns/components/ui/accordion.tsx", "category": "ui", "description": "Accordion expansivel" },
    "hero": { "file": "patterns/components/landing/hero.tsx", "category": "landing", "description": "Secao hero da landing page com titulo, subtitulo e CTA" },
    "plan-cards": { "file": "patterns/components/landing/plan-cards.tsx", "category": "landing", "description": "Grid de cards de planos/precos" },
    "stats-section": { "file": "patterns/components/landing/stats-section.tsx", "category": "landing", "description": "Secao de estatisticas com numeros grandes" },
    "testimonials-section": { "file": "patterns/components/landing/testimonials-section.tsx", "category": "landing", "description": "Secao de depoimentos com avatares e quotes" },
    "particles-background": { "file": "patterns/components/effects/particles-background.tsx", "category": "effects", "description": "Background animado com particulas" }
  },
  "pages": {
    "dashboard-overview": {
      "file": "patterns/pages/dashboard-overview.tsx",
      "description": "Dashboard principal com 4 MetricCards, grafico de vendas semanais, acoes rapidas",
      "layout": "dashboard-layout",
      "components": ["metric-card", "bar-chart", "page-header"],
      "screenshot": "screenshots/06-dashboard-overview.png"
    },
    "dashboard-leads": {
      "file": "patterns/pages/dashboard-leads.tsx",
      "description": "Lista de leads com stat cards, busca, filtros e tabela",
      "layout": "dashboard-layout",
      "components": ["data-table", "page-header", "metric-card"],
      "screenshot": "screenshots/07-dashboard-leads.png"
    },
    "dashboard-produtos": {
      "file": "patterns/pages/dashboard-produtos.tsx",
      "description": "Gestao de produtos com busca e tabela/cards",
      "layout": "dashboard-layout",
      "components": ["page-header", "data-table"],
      "screenshot": "screenshots/09-dashboard-produtos.png"
    },
    "dashboard-landing-pages": {
      "file": "patterns/pages/dashboard-landing-pages.tsx",
      "description": "Gestao de landing pages",
      "layout": "dashboard-layout",
      "components": ["page-header"],
      "screenshot": "screenshots/08-dashboard-landing-pages.png"
    },
    "dashboard-configuracoes": {
      "file": "patterns/pages/dashboard-configuracoes.tsx",
      "description": "Configuracoes com tabs de integracao e parcelamento",
      "layout": "dashboard-layout",
      "components": ["page-header", "tabs"],
      "screenshot": "screenshots/11-dashboard-configuracoes.png"
    },
    "dashboard-perfil": {
      "file": "patterns/pages/dashboard-perfil.tsx",
      "description": "Perfil do usuario com card de info, form de edicao e form de senha",
      "layout": "dashboard-layout",
      "components": ["page-header", "card", "input"],
      "screenshot": "screenshots/10-dashboard-perfil.png"
    },
    "dashboard-vendas": {
      "file": "patterns/pages/dashboard-vendas.tsx",
      "description": "Historico de vendas com tabela e filtros",
      "layout": "dashboard-layout",
      "components": ["page-header", "data-table"]
    },
    "dashboard-usuarios": {
      "file": "patterns/pages/dashboard-usuarios.tsx",
      "description": "Gestao de usuarios",
      "layout": "dashboard-layout",
      "components": ["page-header", "data-table"]
    },
    "login": {
      "file": "patterns/pages/login.tsx",
      "description": "Pagina de login com formulario centralizado, icone, inputs com icones",
      "layout": "auth-layout",
      "components": ["input", "button", "card"],
      "screenshot": "screenshots/02-login.png"
    },
    "register": {
      "file": "patterns/pages/register.tsx",
      "description": "Pagina de registro com formulario em secoes",
      "layout": "auth-layout",
      "components": ["input", "button", "card"],
      "screenshot": "screenshots/03-register.png"
    },
    "landing-home": {
      "file": "patterns/pages/landing-home.tsx",
      "description": "Landing page de vendas com hero, planos, beneficios, depoimentos",
      "components": ["hero", "plan-cards", "stats-section", "testimonials-section"],
      "screenshot": "screenshots/01-landing-home.png"
    },
    "obrigado": {
      "file": "patterns/pages/obrigado.tsx",
      "description": "Pagina de obrigado/sucesso apos compra",
      "screenshot": "screenshots/04-obrigado.png"
    }
  }
}
```

### 3. server.ts (NOVO - simples)

Criar `src/server.ts` com:

- Campo `instructions` no ServerOptions (CRITICO):

```
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

7. Todo texto deve ser em portugues (pt-BR).`
```

- Apenas 8 tools:
  - `get_page` - retorna codigo da pagina + screenshot como imagem
  - `get_layout` - retorna codigo do layout
  - `get_component` - retorna codigo do componente
  - `get_styles` - retorna globals.css + tailwind.config + utils.ts
  - `get_screenshot` - retorna screenshot PNG como imagem
  - `list_pages` - lista paginas disponiveis
  - `list_components` - lista componentes disponiveis
  - `search_patterns` - busca por tags/categoria/descricao

- Descriptions PRESCRITIVAS para cada tool:
  - get_page: "PRIMEIRO PASSO OBRIGATORIO: Retorna o codigo .tsx REAL de uma pagina completa + screenshot de referencia. Voce DEVE reproduzir este codigo exatamente."
  - get_component: "Retorna o codigo .tsx REAL de um componente. Use as classes Tailwind exatas retornadas, NAO improvise."
  - get_styles: "OBRIGATORIO no inicio do projeto: Retorna globals.css, tailwind.config.ts e utils.ts que DEVEM ser usados como base."
  - get_screenshot: "Retorna screenshot PNG da pagina de referencia. O resultado DEVE ser visualmente identico."
  - list_pages: "Lista todas as paginas disponiveis com descricao e componentes usados."
  - list_components: "Lista todos os componentes disponiveis com categoria, tags e descricao."
  - search_patterns: "Busca patterns por texto livre em tags, categoria e descricao."

- O handler de `get_page` DEVE retornar content com texto + imagem:
  ```typescript
  return {
    content: [
      { type: 'text', text: JSON.stringify({ name, description, components, code }) },
      { type: 'image', data: screenshotBase64, mimeType: 'image/png' }
    ]
  };
  ```

- O handler de `get_styles` retorna os 3 arquivos de uma vez:
  ```typescript
  return {
    globals: readFile('patterns/styles/globals.css'),
    tailwindConfig: readFile('patterns/styles/tailwind.config.ts'),
    utils: readFile('patterns/styles/utils.ts'),
  };
  ```

- O handler de `search_patterns` busca em catalog.json por texto nas tags, category e description.

### 4. data-loader.ts (NOVO - simples)

Criar `src/utils/data-loader.ts` com:
- `loadCatalog()` - le e cacheia catalog.json
- `readPattern(filePath)` - le arquivo de data/patterns/
- `getScreenshotBase64(name)` - le screenshot como base64
- `searchCatalog(query)` - busca textual no catalogo

### 5. index.ts (ATUALIZAR)

Manter o entry point existente, so ajustar o import do server.

### 6. package.json (ATUALIZAR)

- Atualizar version para 2.0.0
- Atualizar description para "MCP Design System - serves real component code for AI-assisted frontend development"
- Garantir que "files" inclui "data/" (patterns + screenshots)

### 7. screenshots.json (ATUALIZAR)

Atualizar o manifesto existente para referenciar os patterns:
- Adicionar campo `pattern` em cada entrada apontando para o arquivo .tsx correspondente

## Regras de sanitizacao (CRITICAS)

Ao copiar cada .tsx do projeto de referencia:

### REMOVER:
```tsx
// Chamadas de API
const response = await api.get('/endpoint');
const { data } = await fetch('/api/...');
await api.post('/endpoint', body);

// Hooks que chamam API
const { data, loading, error } = useProdutos();
const { mutate } = useCreateLead();

// Auth e sessao
localStorage.getItem('accessToken');
localStorage.removeItem('user');
const session = await getSession();
if (!user) redirect('/login');

// Env vars
process.env.NEXT_PUBLIC_API_URL
process.env.STRIPE_KEY

// Server-side logic
export async function generateMetadata() { ... }
export async function getServerSideProps() { ... }
```

### SUBSTITUIR por dados de exemplo:
```tsx
// ANTES (API):
const { data: produtos } = useProdutos();

// DEPOIS (exemplo hardcoded):
const produtos = [
  { id: 1, name: "Curso de Marketing Digital", price: 297, status: "active" },
  { id: 2, name: "Mentoria Premium", price: 1497, status: "active" },
  { id: 3, name: "E-book Vendas Online", price: 47, status: "draft" },
];
```

### MANTER:
```tsx
// Imports de UI e icones
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Package, Users, DollarSign } from 'lucide-react';

// Estrutura visual completa
<div className="flex h-full w-64 flex-col bg-gradient-to-b from-slate-50 to-white">

// Dados de navegacao
const navigation = [
  { name: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  { name: "Produtos", icon: Package, href: "/dashboard/produtos" },
  ...
];

// Classes Tailwind exatas
className="bg-gradient-to-r from-[#0D2872]/10 to-[#355EC4]/10 text-[#0D2872] shadow-sm"

// Textos e labels
<span className="text-lg font-bold">BUILDER</span>
<span className="text-[9px] text-slate-500 tracking-wider">LANDING PAGE SYSTEM</span>
```

## Verificacao final

Apos criar tudo:

1. `npm run build` deve compilar sem erros
2. Cada pattern em `data/patterns/` deve ser codigo .tsx valido e sanitizado
3. `catalog.json` deve mapear corretamente todos os patterns existentes
4. As 8 tools devem funcionar:
   - `list_pages` retorna todas as paginas
   - `list_components` retorna todos os componentes
   - `get_page("dashboard-overview")` retorna codigo + screenshot
   - `get_component("sidebar")` retorna codigo do sidebar
   - `get_styles()` retorna os 3 arquivos de estilo
   - `get_screenshot("dashboard-overview")` retorna imagem PNG
   - `search_patterns("sidebar light")` encontra o sidebar
5. O `instructions` do server deve estar presente no handshake MCP
6. Nenhum arquivo em patterns/ deve conter chamadas de API ou env vars

## Cleanup final (KISS / YAGNI)

Apos tudo funcionando, verificar e aplicar:

### KISS (Keep It Simple)
- `server.ts` deve ter no MAXIMO ~200 linhas. Se passou disso, simplificar.
- Cada handler deve fazer UMA coisa: ler catalog, ler arquivo, retornar. Sem logica extra.
- Sem generacao de CSS, validacao, audit ou qualquer tool que nao seja leitura de patterns.
- Sem HTTP server/Express. Apenas stdio transport (MCP padrao).

### YAGNI (You Ain't Gonna Need It)
- Apagar qualquer tool que nao seja uma das 8 listadas acima.
- Apagar qualquer arquivo em `data/` que nao seja `catalog.json`, `screenshots.json`, `screenshots/` ou `patterns/`.
- Apagar qualquer arquivo em `src/` que nao seja `index.ts`, `server.ts` ou `utils/data-loader.ts`.
- NAO criar: tools de validacao, tools de geracao, tools de audit, endpoints HTTP, dark mode toggle, ou qualquer funcionalidade "nice to have".
- Se um pattern .tsx nao existe no projeto de referencia, NAO invente. So extraia o que existe.

### DRY (Don't Repeat Yourself)
- Os handlers de `get_page`, `get_component`, `get_layout` sao semelhantes (ler catalog + ler arquivo). Extrair um helper:
  ```typescript
  function readPatternFromCatalog(type: string, name: string) {
    const catalog = loadCatalog();
    const entry = catalog[type]?.[name];
    if (!entry) return null;
    const code = readPattern(entry.file);
    return { ...entry, code };
  }
  ```
- `catalog.json` e a UNICA fonte de verdade. Nao duplicar informacao em screenshots.json ou em outros lugares.

### Checklist final de limpeza
- [ ] `server.ts` tem <= 200 linhas
- [ ] `data-loader.ts` tem <= 80 linhas
- [ ] Total de arquivos em `src/`: exatamente 3 (index.ts, server.ts, utils/data-loader.ts)
- [ ] Nenhum codigo morto, nenhum import nao usado
- [ ] Nenhum `console.log` exceto o `console.error` de inicializacao
- [ ] `package.json` nao tem dependencia de `express` ou `cors` (removidas - sem HTTP server)
- [ ] Nenhum arquivo fora de `data/patterns/`, `data/screenshots/`, `data/catalog.json`, `data/screenshots.json` e `src/`
