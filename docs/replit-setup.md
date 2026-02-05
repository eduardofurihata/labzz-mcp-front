# Labzz MCP Front - Setup no Replit

## Instalação

### 1. Clonar o repositório no Replit

No shell do Replit:

```bash
git clone https://github.com/eduardofurihata/labzz-mcp-front.git
cd labzz-mcp-front
npm install
npm run build
```

### 2. Iniciar o servidor HTTP

```bash
node dist/index.js --http
```

Ou com variáveis de ambiente:

```bash
MCP_HTTP=true node dist/index.js
```

### 3. Porta customizada

Por padrão, o servidor roda na porta `3000`. Para mudar:

```bash
MCP_PORT=8080 node dist/index.js --http
```

## Endpoints Disponíveis

### Health Check

```
GET /health
```

Resposta:
```json
{ "status": "ok", "server": "labzz-mcp-front", "version": "1.0.4" }
```

### Listar Tools

```
GET /tools
```

Retorna todas as tools disponíveis com seus schemas.

### Chamar Qualquer Tool (POST)

```
POST /tools/:toolName
Content-Type: application/json

{ ...argumentos }
```

Exemplo:
```bash
curl -X POST http://localhost:3000/tools/get_landing_component_spec \
  -H "Content-Type: application/json" \
  -d '{"component_name": "PlanCard"}'
```

### Endpoints GET (Leitura Direta)

| Endpoint | Descrição | Exemplo |
|----------|-----------|---------|
| `GET /tokens` | Todos os design tokens | `/tokens` |
| `GET /tokens?category=colors` | Tokens filtrados | `/tokens?category=typography` |
| `GET /components` | Lista componentes base | `/components` |
| `GET /components/:name` | Spec de um componente | `/components/Button` |
| `GET /dashboard-components` | Lista componentes dashboard | `/dashboard-components` |
| `GET /dashboard-components/:name` | Spec dashboard | `/dashboard-components/Sidebar` |
| `GET /landing-components` | Lista componentes landing | `/landing-components` |
| `GET /landing-components/:name` | Spec landing | `/landing-components/PlanCard` |
| `GET /effects` | Lista efeitos visuais | `/effects` |
| `GET /effects/:name` | Spec de efeito | `/effects/ParticlesBackground` |
| `GET /charts` | Lista componentes de gráfico | `/charts` |
| `GET /charts/:name` | Spec de gráfico | `/charts/BarChart` |
| `GET /layout` | Layout patterns | `/layout` |
| `GET /layout?pattern=grid` | Pattern específico | `/layout?pattern=navigation` |
| `GET /ux` | UX guidelines | `/ux` |
| `GET /ux?topic=forms` | Guideline específica | `/ux?topic=animations` |
| `GET /full` | Design system completo | `/full` |

## Exemplos de Uso

### Buscar spec de um PlanCard

```bash
curl http://localhost:3000/landing-components/PlanCard
```

### Buscar tokens de animação

```bash
curl http://localhost:3000/tokens?category=animations
```

### Buscar spec do Sidebar (dashboard)

```bash
curl http://localhost:3000/dashboard-components/Sidebar
```

### Validar cores via POST

```bash
curl -X POST http://localhost:3000/tools/validate_colors \
  -H "Content-Type: application/json" \
  -d '{"colors": ["#0D2872", "#FF0000", "#355EC4"]}'
```

### Gerar CSS de um componente

```bash
curl -X POST http://localhost:3000/tools/generate_css \
  -H "Content-Type: application/json" \
  -d '{"component": "Button", "variant": "primary"}'
```

### Obter design system completo

```bash
curl http://localhost:3000/full
```

## Configuração no Replit (.replit)

Adicione ao arquivo `.replit` para iniciar automaticamente:

```toml
run = "cd labzz-mcp-front && node dist/index.js --http"

[env]
MCP_HTTP = "true"
MCP_PORT = "3000"
```

## Uso com JavaScript/TypeScript no Replit

```javascript
// Buscar spec de componente
const res = await fetch('http://localhost:3000/landing-components/HeroSection');
const spec = await res.json();
console.log(spec.HeroSection.content.elements.title.sizes);
// { mobile: "text-5xl", tablet: "md:text-7xl", desktop: "lg:text-8xl" }

// Buscar tokens de cor
const tokens = await fetch('http://localhost:3000/tokens?category=colors');
const colors = await tokens.json();
console.log(colors.colors.light.primary.value);
// "#0D2872"
```

## Diferença entre Stdio e HTTP

| | Stdio (Claude/Cursor) | HTTP (Replit) |
|---|---|---|
| Comando | `node dist/index.js` | `node dist/index.js --http` |
| Protocolo | MCP via stdin/stdout | REST API via HTTP |
| Dados | Mesmos | Mesmos |
| Tools | Mesmas | Mesmas |
| Uso | Integração direta com AI | API consumível por qualquer client |
