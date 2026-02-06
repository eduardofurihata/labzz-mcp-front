# Especificacao - Labzz MCP Design System

## O que e este MCP

O `labzz-mcp-front` e um servidor MCP (Model Context Protocol) que funciona como um **Design System vivo**. Ele serve **templates de referencia visual** (.tsx/.css) extraidos e sanitizados da dashboard do projeto de referencia [labzz-lp-vendas](https://github.com/eduardofurihata/labzz-lp-vendas).

Diferente de design systems tradicionais que servem tokens abstratos ou documentacao, este MCP entrega **templates visuais com codigo real**. Quando a AI chama `get_page("dashboard-overview")`, ela recebe o `.tsx` completo da pagina + um screenshot PNG de referencia. A AI deve **copiar a identidade visual** (estrutura, classes, layout, efeitos) e **adaptar o conteudo** (dados, metricas, menus) ao projeto que esta sendo construido.

### Problema que resolve

Um desenvolvedor terceiro precisa criar novos projetos (dashboards, paineis, apps SaaS, etc.) usando AI/vibecoding. Esses projetos sao variados em funcionalidade, mas **todos devem ter 100% de consistencia visual** com a dashboard Labzz original.

Sem este MCP, a AI inventaria cores, espacamentos, componentes e layouts - cada projeto sairia diferente. Com o MCP, a AI recebe templates visuais de referencia e replica a **identidade visual** fielmente, enquanto adapta o **conteudo** para o projeto real.

### Para quem e

- **Desenvolvedores terceiros** usando AI (Claude Code, Cursor, Windsurf, Cline, etc.) para criar projetos
- O projeto do dev pode ser **qualquer coisa**: dashboard de vendas, painel de RH, sistema de gestao, CRM, etc.
- O que deve ser **identico**: identidade visual, componentes, layout, cores, tipografia, espacamentos
- O que pode ser **diferente**: dados, rotas, logica de negocio, integracao com APIs

### Stack do MCP

- TypeScript + `@modelcontextprotocol/sdk` + Zod
- Transport: stdio (padrao MCP)
- Build: `npm run build` (tsc)
- Runtime: Node >= 18

---

## Arquitetura

```
labzz-mcp-front/
  src/
    index.ts                  <- Entry point (inicia o server)
    server.ts                 <- MCP server com 8 tools
    utils/
      data-loader.ts          <- Carrega catalog.json, le patterns, base64 screenshots

  data/
    catalog.json              <- Indice mestre de todos os patterns (v2.1.0)
    patterns/
      styles/                 <- 5 arquivos de configuracao visual
      layouts/                <- 2 layouts (dashboard, auth)
      components/             <- 43 componentes em 7 categorias
      pages/                  <- 14 paginas completas
    screenshots/              <- 11 PNGs de referencia visual
```

### Fluxo de dados

```
Dev pede "crie dashboard de clientes"
  -> AI chama MCP tools
    -> server.ts recebe a chamada
      -> data-loader.ts le catalog.json
      -> data-loader.ts le arquivo .tsx de data/patterns/
      -> data-loader.ts le screenshot PNG de data/screenshots/
    -> server.ts retorna codigo + imagem
  -> AI usa o codigo como base para o projeto do dev
```

---

## Projeto de referencia

O projeto de referencia e o `labzz-lp-vendas` - uma aplicacao Next.js 14 com:

- **Framework**: Next.js 14 (App Router) + React 18
- **Estilizacao**: Tailwind CSS
- **Componentes**: Radix UI (headless) + componentes custom
- **Charts**: Recharts
- **Icons**: Lucide React
- **Forms**: React Hook Form + Zod
- **Notifications**: Sonner (toast)

### O que foi extraido

Todo o codigo visual foi copiado do projeto de referencia e **sanitizado**:

| Removido | Motivo |
|----------|--------|
| Chamadas de API (`fetch`, `api.get`, `api.post`) | Nao relevante para visual |
| Hooks de API (`useProdutos`, `useLeads`, etc.) | Substituidos por dados hardcoded |
| Autenticacao (`localStorage`, `redirect`, `useAuth`) | Nao relevante |
| Variaveis de ambiente (`process.env`) | Nao relevante |
| Server-side logic (`generateMetadata`, `getServerSideProps`) | Nao relevante |

| Mantido | Motivo |
|---------|--------|
| Todas as classes Tailwind | Definem a identidade visual (COPIAR obrigatoriamente) |
| Estrutura JSX completa | Layout e composicao (COPIAR obrigatoriamente) |
| Imports de componentes UI e icones | Dependencias visuais (COPIAR obrigatoriamente) |
| Dados de navegacao (menus, links) | Exemplos ilustrativos de formato (ADAPTAR ao projeto) |
| Textos e labels em portugues | Exemplos ilustrativos de formato (ADAPTAR ao projeto) |
| Metricas e valores numericos | Exemplos ilustrativos de formato (ADAPTAR ao projeto) |

---

## Tools do MCP

O servidor expoe **8 tools** via protocolo MCP. Cada tool tem uma descricao prescritiva que instrui a AI sobre como usar o resultado.

### Consulta

#### `list_pages`
Lista todas as paginas disponiveis com descricao, componentes usados e layout.
- **Parametros**: nenhum
- **Retorno**: Array JSON com `name`, `description`, `components`, `layout`, `screenshot`

#### `list_components`
Lista todos os componentes disponiveis com categoria, tags e descricao.
- **Parametros**: nenhum
- **Retorno**: Array JSON com `name`, `category`, `tags`, `description`

#### `search_patterns`
Busca patterns por texto livre em tags, categoria e descricao.
- **Parametros**: `query` (string) - ex: "sidebar light", "chart", "form"
- **Retorno**: Array JSON com `type`, `name`, `description`, `file`

### Codigo

#### `get_styles`
Retorna os 5 arquivos de configuracao visual de uma vez. **Obrigatorio no inicio de qualquer projeto.**
- **Parametros**: nenhum
- **Retorno**: JSON com 5 chaves:

| Chave | Arquivo | Conteudo |
|-------|---------|----------|
| `globals` | globals.css | Variaveis CSS de tema, fonte Inter, estilos base |
| `tailwindConfig` | tailwind.config.ts | Cores customizadas (#0D2872, #355EC4, #FFBE00), sombras, animacoes, fontes |
| `utils` | utils.ts | Funcao `cn()` para merge de classes (clsx + tailwind-merge) |
| `designTokens` | design-tokens.ts | Spacing, typography, borderRadius, shadows, transitions, easing, breakpoints, iconSizes, zIndex |
| `referencePackage` | reference-package.json | package.json completo com todas as dependencias |

#### `get_page`
Retorna o template .tsx de referencia visual de uma pagina + screenshot.
- **Parametros**: `name` (string) - ex: "dashboard-overview", "login", "landing-home"
- **Retorno**: JSON com metadados e `code` (tsx) + imagem PNG em base64
- **Descricao prescritiva**: "COPIE a estrutura e classes CSS exatamente. SUBSTITUA os dados de exemplo pelos dados reais do seu projeto."

#### `get_layout`
Retorna o codigo .tsx de um layout.
- **Parametros**: `name` (string) - "dashboard-layout" ou "auth-layout"
- **Retorno**: JSON com metadados e `code` (tsx)

#### `get_component`
Retorna o template .tsx de referencia visual de um componente.
- **Parametros**: `name` (string) - ex: "sidebar", "metric-card", "button"
- **Retorno**: JSON com metadados e `code` (tsx)
- **Descricao prescritiva**: "Use as classes Tailwind exatas, mas adapte os dados/props ao seu projeto."

### Visual

#### `get_screenshot`
Retorna screenshot PNG de referencia visual de uma pagina.
- **Parametros**: `name` (string) - ex: "dashboard-overview", "login"
- **Retorno**: Imagem PNG em base64
- **Descricao prescritiva**: "O ESTILO VISUAL (layout, cores, espacamento) deve ser igual. O conteudo exibido no screenshot e ilustrativo."

---

## Instrucoes automaticas (MCP Instructions)

O servidor envia instrucoes automaticas para a AI no handshake MCP. Isso garante que **qualquer AI** que se conecte ao MCP receba as regras de consistencia visual e adaptacao de conteudo:

```
Voce esta usando o Labzz Design System MCP.
Este MCP serve templates de referencia visual (.tsx/.css) que definem a IDENTIDADE VISUAL obrigatoria.

## CONCEITO FUNDAMENTAL

Os arquivos retornados sao TEMPLATES DE DESIGN SYSTEM — nao sao apps prontos para copiar.
- A IDENTIDADE VISUAL (estrutura, classes, layout, efeitos) e OBRIGATORIA e deve ser seguida fielmente.
- O CONTEUDO (dados, textos, metricas, menus) sao EXEMPLOS ILUSTRATIVOS que devem ser substituidos
  pelos dados reais do projeto que voce esta construindo.

## COPIE OBRIGATORIAMENTE (identidade visual)

- Estrutura HTML/JSX dos componentes (hierarquia de divs, wrappers, containers)
- Classes Tailwind exatas (cores, espacamento, tipografia, responsive breakpoints)
- Layout patterns (sidebar + topbar + content area, grids, flex layouts)
- Design tokens (cores do tema, sombras, border-radius, fontes)
- Animacoes, transicoes e efeitos visuais (glow, hover states, fadeInUp, etc.)
- Padrao dos componentes UI (Card, Button, Badge, Table, MetricCard, etc.)
- Configuracoes de estilo (globals.css, tailwind.config.ts, design-tokens.ts)

## NUNCA COPIE — ADAPTE AO PROJETO

- Dados e metricas (ex: "R$ 2.450", "127 leads" sao apenas exemplos de formato)
- Textos, labels e titulos de pagina
- Itens de menu e navegacao (adapte as rotas do seu projeto)
- Nomes de produtos, marcas e entidades
- Rotas, URLs e links
- Props com dados de negocio

## COMO USAR

1. Chame get_styles no inicio para configurar o tema.
2. Chame get_page ou get_component para obter o template visual de referencia.
3. COPIE a estrutura e classes CSS do template.
4. SUBSTITUA todo conteudo de exemplo pelos dados reais do projeto.
5. Use get_screenshot para conferir que o ESTILO VISUAL esta correto.

## REGRAS

- NUNCA invente classes Tailwind — use as exatas do template.
- NUNCA copie dados de exemplo como se fossem reais.
- NUNCA altere a estrutura visual ou hierarquia de componentes.
- Todo texto deve ser em portugues (pt-BR).
```

---

## Catalogo completo (v2.1.0)

### Styles (5)

| ID | Arquivo | Descricao |
|----|---------|-----------|
| `globals` | patterns/styles/globals.css | CSS global com variaveis de tema, fontes e estilos base |
| `tailwind` | patterns/styles/tailwind.config.ts | Configuracao Tailwind com cores, fontes, sombras e animacoes customizadas |
| `utils` | patterns/styles/utils.ts | Utilitario cn() para merge de classes Tailwind (clsx + tailwind-merge) |
| `design-tokens` | patterns/styles/design-tokens.ts | Tokens: spacing, typography, borderRadius, shadows, transitions, easing, breakpoints, iconSizes, zIndex e animations |
| `reference-package` | patterns/styles/reference-package.json | package.json com todas as dependencias (Radix UI, Recharts, Sonner, Lucide, date-fns, etc.) |

### Layouts (2)

| ID | Arquivo | Descricao | Screenshot |
|----|---------|-----------|------------|
| `dashboard-layout` | patterns/layouts/dashboard-layout.tsx | Sidebar fixa (w-64) + TopBar (h-20) + area de conteudo com scroll. Componentes: sidebar, topbar | dashboard-overview.png |
| `auth-layout` | patterns/layouts/auth-layout.tsx | Pagina centralizada com fundo claro | login.png |

### Componentes (43)

#### Layout (5)

| ID | Descricao |
|----|-----------|
| `sidebar` | Sidebar com logo BUILDER, gradiente from-slate-50, menus com icon containers 36x36, active state com gradient indicator, logout com hover vermelho |
| `topbar` | Barra superior h-20 com busca centralizada, notificacoes com badge, menu do usuario com avatar e dropdown |
| `page-header` | Header de pagina sticky com icone, titulo, subtitulo e area de acoes |
| `page-container` | Container de conteudo max-w-[1600px] mx-auto px-8 py-12 |
| `breadcrumb` | Navegacao breadcrumb com separador chevron |

#### Data Display (3)

| ID | Descricao |
|----|-----------|
| `metric-card` | Card de KPI com icone em container bg-primary/10, valor text-3xl, label e trend indicator |
| `data-table` | Tabela com busca, filtros, selecao e paginacao |
| `pagination` | Controles de paginacao com info e botoes de navegacao |

#### Feedback (7)

| ID | Descricao |
|----|-----------|
| `skeleton-card` | Skeleton loading para cards |
| `skeleton-table` | Skeleton loading para tabelas |
| `skeleton-metric` | Skeleton loading para metric cards |
| `spinner` | Spinner de loading animado |
| `empty-state` | Estado vazio com icone, titulo e descricao |
| `delete-confirm-modal` | Modal de confirmacao de exclusao |
| `form-modal` | Modal generico para formularios |

#### Charts (4)

| ID | Descricao |
|----|-----------|
| `area-chart` | Grafico de area com Recharts |
| `bar-chart` | Grafico de barras com Recharts |
| `line-chart` | Grafico de linhas com Recharts |
| `pie-chart` | Grafico de pizza com Recharts |

#### UI (20)

| ID | Descricao |
|----|-----------|
| `button` | Botao com variants: default, secondary, outline, ghost, destructive, link |
| `card` | Card container com header, content e footer |
| `input` | Input de texto com suporte a icone |
| `label` | Label para campos de formulario |
| `dialog` | Modal dialog com overlay e animacao |
| `dropdown-menu` | Menu dropdown com items e separadores |
| `select` | Select dropdown com trigger e opcoes |
| `table` | Tabela base com header, body, row e cell |
| `badge` | Badge com variants: default, secondary, success, destructive, outline |
| `tabs` | Tabs com trigger e content |
| `modern-tabs` | Tabs com estilo moderno (underline animada) |
| `toast` | Notificacoes toast com Sonner |
| `alert` | Alerta com variants: default, destructive |
| `separator` | Linha separadora horizontal ou vertical |
| `checkbox` | Checkbox com label |
| `textarea` | Area de texto multilinhas |
| `switch` | Toggle switch on/off |
| `skeleton` | Skeleton base com animate-pulse |
| `sheet` | Painel lateral deslizante |
| `scroll-area` | Area com scroll customizado |

#### Landing (4)

| ID | Descricao |
|----|-----------|
| `hero` | Secao hero da landing page com titulo, subtitulo e CTA |
| `plan-cards` | Grid de cards de planos/precos |
| `stats-section` | Secao de estatisticas com numeros grandes |
| `testimonials-section` | Secao de depoimentos com avatares e quotes |

#### Effects (1)

| ID | Descricao |
|----|-----------|
| `particles-background` | Background animado com particulas |

### Paginas (14)

#### Dashboard (10)

| ID | Descricao | Layout | Componentes | Screenshot |
|----|-----------|--------|-------------|------------|
| `dashboard-overview` | Dashboard principal com 4 MetricCards, grafico de vendas semanais, acoes rapidas | dashboard-layout | metric-card, bar-chart, page-header | 06-dashboard-overview.png |
| `dashboard-leads` | Lista de leads com stat cards, busca, filtros e tabela | dashboard-layout | data-table, page-header, metric-card | 07-dashboard-leads.png |
| `dashboard-produtos` | Gestao de produtos com busca e tabela/cards | dashboard-layout | page-header, data-table | 09-dashboard-produtos.png |
| `dashboard-landing-pages` | Gestao de landing pages | dashboard-layout | page-header | 08-dashboard-landing-pages.png |
| `dashboard-configuracoes` | Configuracoes com tabs de integracao e parcelamento | dashboard-layout | page-header, tabs | 11-dashboard-configuracoes.png |
| `dashboard-perfil` | Perfil do usuario com card de info, form de edicao e form de senha | dashboard-layout | page-header, card, input | 10-dashboard-perfil.png |
| `dashboard-vendas` | Historico de vendas com tabela e filtros | dashboard-layout | page-header, data-table | - |
| `dashboard-usuarios` | Gestao de usuarios | dashboard-layout | page-header, data-table | - |
| `dashboard-create-example` | Exemplo de formulario de criacao com campos, selects e validacao | dashboard-layout | page-header, input, button, select | - |
| `dashboard-detail-example` | Exemplo de pagina de detalhe com cards de info e acoes | dashboard-layout | page-header, card, badge | - |

#### Auth (2)

| ID | Descricao | Layout | Screenshot |
|----|-----------|--------|------------|
| `login` | Pagina de login com formulario centralizado, icone, inputs com icones | auth-layout | 02-login.png |
| `register` | Pagina de registro com formulario em secoes | auth-layout | 03-register.png |

#### Outras (2)

| ID | Descricao | Screenshot |
|----|-----------|------------|
| `landing-home` | Landing page de vendas com hero, planos, beneficios, depoimentos | 01-landing-home.png |
| `obrigado` | Pagina de obrigado/sucesso apos compra | 04-obrigado.png |

---

## Design System - especificacao visual

### Paleta de cores

**Primarias:**
- Primary: `#0D2872` - Cor principal, botoes primarios, CTAs
- Secondary: `#355EC4` - Acoes secundarias, links, hovers
- Accent: `#FFBE00` - Destaques, badges, alertas importantes

**Semanticas:**
- Success: `#10b981` - Confirmacoes, status ativo
- Warning: `#f59e0b` - Alertas, atencao
- Error/Destructive: `#ef4444` - Erros, acoes destrutivas
- Info: `#3b82f6` - Informacoes, dicas

**Neutras:**
- Background: `white` / `slate-50` (sidebar gradient)
- Text: `slate-900` (headings) / `slate-600` (body) / `slate-400` (muted)
- Borders: `slate-200`

### Tipografia

| Uso | Fonte | Peso | Escala |
|-----|-------|------|--------|
| Headings | Inter | 700 (bold) | text-xl a text-4xl |
| Body | Inter | 400 (regular), 500 (medium), 600 (semibold) | text-sm a text-base |
| Labels | Inter | 500 (medium) | text-sm |
| Captions | Inter | 400 (regular) | text-xs |

### Espacamento (grid de 4px)

| Token | Valor | Uso comum |
|-------|-------|-----------|
| `space-1` | 4px (0.25rem) | Gap minimo |
| `space-2` | 8px (0.5rem) | Padding interno de items |
| `space-3` | 12px (0.75rem) | Gap entre items |
| `space-4` | 16px (1rem) | Padding de cards, gap de secoes |
| `space-6` | 24px (1.5rem) | Padding de containers |
| `space-8` | 32px (2rem) | Espacamento entre secoes |
| `space-12` | 48px (3rem) | Padding vertical de paginas (py-12) |

### Border Radius

| Token | Valor | Uso |
|-------|-------|-----|
| `sm` | 2px | Badges pequenos |
| `md` | 6px | Inputs, selects |
| `lg` | 8px | Cards, botoes |
| `xl` | 12px | Modals, sheets |
| `2xl` | 16px | Cards grandes |
| `full` | 9999px | Avatares, pills |

### Shadows

| Token | Uso |
|-------|-----|
| `sm` | Elevacao sutil (cards) |
| `md` | Dropdowns, popovers |
| `lg` | Modals, dialogs |
| `xl` | Elementos flutuantes |

### Layout principal (Dashboard)

```
+---------------------------------------------------+
| TopBar (h-20, backdrop-blur, border-b)            |
|   [Busca centralizada] [Notificacoes] [Avatar]    |
+--------+------------------------------------------+
| Sidebar|  Conteudo                                |
| (w-64) |  (max-w-[1600px] mx-auto px-8 py-12)    |
|        |                                          |
| Logo   |  [PageHeader: icone + titulo + acoes]    |
| Nav    |                                          |
| items  |  [Conteudo da pagina]                    |
|        |                                          |
| Logout |                                          |
+--------+------------------------------------------+
```

---

## Workflow recomendado

### Para criar um novo projeto do zero

```
Passo 1: get_styles()
  -> Copiar globals.css, tailwind.config.ts, utils.ts para o projeto
  -> Instalar dependencias do reference-package.json

Passo 2: get_layout("dashboard-layout")
  -> Montar a estrutura base com sidebar + topbar
  -> COPIAR: estrutura JSX, classes Tailwind, layout

Passo 3: get_component("sidebar") + get_component("topbar")
  -> COPIAR: visual (classes, estrutura, efeitos, hover states)
  -> ADAPTAR: itens de menu, links, nome da marca para o projeto

Passo 4: get_page("dashboard-overview")
  -> COPIAR: estrutura da pagina, grid de cards, layout de graficos
  -> ADAPTAR: metricas, titulos, dados para o contexto do projeto

Passo 5: Para cada nova pagina, buscar a mais similar:
  - Tabela com filtros? -> get_page("dashboard-leads")
  - Formulario? -> get_page("dashboard-create-example")
  - Detalhe? -> get_page("dashboard-detail-example")
  - Perfil/Config? -> get_page("dashboard-perfil")
  - Config com tabs? -> get_page("dashboard-configuracoes")
  -> Sempre: COPIAR visual, ADAPTAR conteudo

Passo 6: get_screenshot() para cada pagina
  -> Comparar ESTILO VISUAL (layout, cores, espacamento)
  -> O conteudo sera diferente (dados do projeto vs exemplos do template)
```

### Para adicionar uma pagina a um projeto existente

```
1. list_pages()                    -> Ver paginas disponiveis
2. get_page("mais-similar")        -> Pegar template visual
3. COPIAR estrutura e classes      -> Identidade visual identica
4. ADAPTAR dados, metricas, menus  -> Conteudo do projeto real
5. get_screenshot("mais-similar")  -> Conferir estilo visual
```

### Para usar um componente especifico

```
1. search_patterns("tabela filtro") -> Buscar por funcionalidade
2. get_component("data-table")      -> Pegar template visual
3. Copiar classes Tailwind exatas    -> NAO alterar visual
4. Adaptar dados e props             -> Conteudo do projeto real
```

---

## Exemplo pratico

### Cenario: "Crie um dashboard de gestao de clientes"

A AI com o MCP conectado faria:

```
1. get_styles()
   -> Configura globals.css, tailwind.config.ts, utils.ts, design-tokens.ts
   -> Instala dependencias do reference-package.json

2. get_layout("dashboard-layout")
   -> COPIA: estrutura sidebar (w-64) + topbar (h-20) + area de conteudo

3. get_component("sidebar")
   -> COPIA: visual da sidebar (classes, gradiente, hover states, icon containers)
   -> ADAPTA: itens de menu para o projeto de clientes:
      Dashboard, Clientes, Vendas, Relatorios, Configuracoes
      (NAO copia os menus do template como "Leads", "Landing Pages", etc.)

4. get_page("dashboard-overview")
   -> COPIA: estrutura da pagina (grid de MetricCards, area de grafico, layout)
   -> ADAPTA: metricas para o contexto de clientes:
      - MetricCards: Total Clientes, Novos este Mes, Receita, Churn Rate
      - Grafico: Novos clientes por semana
      (NAO copia "R$ 2.450" ou "127 leads" do template)

5. get_page("dashboard-leads")
   -> COPIA: estrutura da tabela (stat cards, busca, filtros, paginacao)
   -> ADAPTA: colunas e filtros para clientes:
      - Colunas: Nome, Email, Telefone, Status, Data Cadastro
      - Filtros: Status (Ativo/Inativo), Plano

6. get_page("dashboard-create-example")
   -> COPIA: estrutura do formulario (layout, inputs, validacao visual)
   -> ADAPTA: campos para dados de cliente

7. get_page("dashboard-detail-example")
   -> COPIA: estrutura de detalhe (cards de info, area de acoes)
   -> ADAPTA: informacoes para perfil de cliente

8. get_screenshot("dashboard-overview")
   -> Compara ESTILO VISUAL: cores, espacamentos, tipografia devem ser identicos
   -> O conteudo sera diferente (metricas de clientes vs exemplos do template)
```

**Resultado**: Um dashboard de gestao de clientes com a **mesma identidade visual** da dashboard Labzz, mas com **conteudo totalmente adaptado** ao contexto de gestao de clientes.

---

## Instalacao e configuracao

### Claude Code (recomendado)

```bash
claude mcp add labzz-mcp-front -- npx --yes github:eduardofurihata/labzz-mcp-front
```

### .mcp.json (projeto)

```json
{
  "mcpServers": {
    "labzz-mcp-front": {
      "command": "node",
      "args": ["/caminho/para/labzz-mcp-front/dist/index.js"]
    }
  }
}
```

### Cursor / Windsurf / Cline

- **Command**: `node`
- **Args**: `["/caminho/para/labzz-mcp-front/dist/index.js"]`
- **Transport**: `stdio`

### Verificar

```bash
claude mcp list
# Deve mostrar: labzz-mcp-front (8 tools)
```
