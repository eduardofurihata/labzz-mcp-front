# Análise Detalhada: MCP Specs vs LP-Vendas (Referência Visual)

Este documento detalha todas as diferenças encontradas entre os JSONs do MCP server e a implementação real do projeto `labzz-lp-vendas`.

---

## Resumo Executivo

| Área | MCP Atual | Referência (lp-vendas) | Gap |
|------|-----------|------------------------|-----|
| Espaçamentos | Genéricos | Específicos em px | Alto |
| Animações | Básicas | Detalhadas com delays | Médio |
| Componentes Landing | Ausentes | Completos | Alto |
| Efeitos Visuais | Parciais | Partículas, glows | Alto |
| Hover States | Simples | Complexos com glow | Médio |
| Estrutura de Cards | Classes genéricas | Estrutura completa | Alto |

---

## 1. ANIMAÇÕES

### MCP Atual (tokens.json)
```json
"fadeInUp": {
  "from": { "opacity": 0, "transform": "translateY(10px)" },
  "duration": "0.6s"
}
```

### Referência Real (lp-vendas globals.css)
```css
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(40px);  /* 40px, não 10px! */
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);  /* 30px */
  }
}
```

### DIFERENÇAS:
| Aspecto | MCP | Referência | Correção |
|---------|-----|------------|----------|
| translateY fadeInUp | 10px | 40px | Aumentar para 40px |
| translateY slideUp | 20px | 30px | Aumentar para 30px |
| Animation delays | Não documentado | 0.05s, 0.1s, 0.2s, 0.3s | Adicionar padrões de stagger |
| Animation fill-mode | Não especificado | forwards | Adicionar |
| Cubic bezier | ease-out | cubic-bezier(0.4, 0, 0.2, 1) | Adicionar alternativa |

---

## 2. HERO SECTION (Componente Landing)

### MCP Atual
**NÃO EXISTE** - O MCP não tem specs para Hero de landing page.

### Referência Real (Hero.tsx)
```tsx
// Estrutura completa:
<section className="relative min-h-screen flex items-start justify-center overflow-hidden pt-20 md:pt-24">
  {/* Logo - posição absoluta top-8 left-8 */}
  {/* Background pattern - radial-gradient dots 40px */}
  {/* Accent glow - 600px, bg-cyan-500/10 blur-[150px] */}
  {/* Container com z-10 */}
  {/* Badge - border-cyan-500/30 rounded-full */}
  {/* Logo grande - h-24 md:h-32 lg:h-40 */}
  {/* H1 - text-5xl md:text-7xl lg:text-8xl */}
  {/* Subtítulos com animation-delay */}
  {/* CTA button - px-8 py-4 shadow-lg shadow-cyan-500/20 */}
  {/* Scroll indicator - animate-bounce */}
</section>
```

### ADICIONAR AO MCP:
```json
{
  "HeroSection": {
    "description": "Full-screen hero section for landing pages",
    "structure": {
      "container": "relative min-h-screen flex items-start justify-center overflow-hidden",
      "paddingTop": "pt-20 md:pt-24",
      "backgroundPattern": {
        "type": "radial-gradient dots",
        "size": "40px 40px",
        "opacity": 0.05
      },
      "accentGlow": {
        "size": "600px",
        "position": "top-1/4 left-1/2 -translate-x-1/2",
        "color": "primary/10",
        "blur": "150px"
      }
    },
    "elements": {
      "badge": {
        "classes": "px-4 py-2 text-sm font-medium tracking-wider uppercase border rounded-full",
        "borderColor": "primary/30"
      },
      "title": {
        "sizes": {
          "mobile": "text-5xl",
          "tablet": "text-7xl",
          "desktop": "text-8xl"
        },
        "gradient": "Primeira palavra com text-gradient-primary"
      },
      "cta": {
        "padding": "px-8 py-4",
        "fontSize": "text-lg",
        "shadow": "shadow-lg shadow-primary/20"
      }
    },
    "animations": {
      "badge": { "animation": "fade-in", "delay": "0s" },
      "logo": { "animation": "fade-in", "delay": "0.05s" },
      "title": { "animation": "slide-up", "delay": "0s" },
      "subtitle": { "animation": "slide-up", "delay": "0.1s" },
      "description": { "animation": "slide-up", "delay": "0.2s" },
      "cta": { "animation": "scale-in", "delay": "0.3s" }
    }
  }
}
```

---

## 3. PLAN CARDS (Componente Landing)

### MCP Atual (components.json - Card)
```json
"Card": {
  "components": {
    "Card": {
      "classes": "rounded-lg border border-border bg-card text-card-foreground shadow-sm"
    }
  }
}
```

### Referência Real (PlanCardsV2.tsx)
```tsx
// Estrutura MUITO mais complexa:
<div className={`
  relative flex flex-col h-full
  rounded-xl sm:rounded-2xl overflow-hidden
  transition-all duration-300
  opacity-0 animate-fadeInUp
  group cursor-pointer
  hover:scale-[1.02] hover:-translate-y-1
  bg-neutral-900 border border-neutral-800
`}
style={{
  animationDelay: `${cardIndex * 100}ms`,
  animationFillMode: 'forwards',
  borderColor: `${corPrimaria}40`,
}}>
  {/* Glow effect */}
  <div style={{
    background: `radial-gradient(circle at 50% 0%, ${corPrimaria}15, transparent 70%)`,
  }} />

  {/* Badge "POPULAR" */}
  <span className="px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs font-bold rounded-full">
    POPULAR
  </span>

  {/* Header com border-b */}
  <div className="p-4 sm:p-6 border-b border-neutral-800">
    <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-1 sm:mb-2">
    <p className="text-xs sm:text-sm line-clamp-2">
  </div>

  {/* Preço */}
  <div className="p-4 sm:p-6">
    <span className="text-2xl sm:text-3xl md:text-4xl font-bold">
    <p className="text-xs sm:text-sm mt-1 sm:mt-2"> {/* parcelas */}
  </div>

  {/* Features */}
  <ul className="space-y-2 sm:space-y-3">
    <Check className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-500" />
  </ul>

  {/* CTA */}
  <button className="
    w-full py-2.5 sm:py-3 px-4 sm:px-6
    rounded-lg font-semibold
    active:scale-95
    shadow-lg shadow-cyan-500/20
    hover:shadow-xl hover:shadow-cyan-500/30
  ">
</div>
```

### DIFERENÇAS CRÍTICAS:

| Aspecto | MCP | Referência | Gap |
|---------|-----|------------|-----|
| Border radius | rounded-lg (8px) | rounded-xl/2xl (12px/16px) | Precisa variantes maiores |
| Glow hover | Não existe | radial-gradient overlay | ADICIONAR |
| Animation stagger | Não documentado | 100ms entre cards | ADICIONAR |
| Hover transform | Não existe | scale-[1.02] -translate-y-1 | ADICIONAR |
| Badge positioning | Não existe | absolute top-3 right-3 | ADICIONAR |
| Border color dinâmica | Não existe | ${cor}40 (40% opacity) | ADICIONAR |
| Shadow on hover | shadow-md | shadow-xl shadow-primary/30 | Mais intenso |
| Responsive padding | Único | p-4 sm:p-6 | ADICIONAR |
| Line clamp | Não existe | line-clamp-2 | ADICIONAR |
| CTA shadow | Não existe | shadow-lg shadow-primary/20 | ADICIONAR |

---

## 4. SIDEBAR (Dashboard Component)

### MCP Atual (dashboard-components.json)
```json
"SidebarNavItem": {
  "classes": "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
  "activeClasses": "bg-accent text-accent-foreground"
}
```

### Análise do Problema Reportado

O problema mencionado pelo usuário:
- **Item ativo**: MCP diz `bg-accent text-accent-foreground` (amarelo?)
- **Referência visual**: Deveria ser `bg-primary text-primary-foreground` (azul)

### DIFERENÇAS:

| Aspecto | MCP | Deveria Ser | Gap |
|---------|-----|-------------|-----|
| Item height | py-2 (40px aprox) | py-3.5 (~56px) | Mais generoso |
| Active state color | bg-accent | bg-primary | Cor errada! |
| Icon container | Não existe | Ícones em containers arredondados | ADICIONAR |
| Estrutura item | Só título | Título + subtítulo | ADICIONAR |
| Gap | gap-3 | gap-4 | Maior |
| Border radius | rounded-md | rounded-lg | Mais arredondado |
| Text alignment | Centralizado | Alinhado à esquerda | Especificar |
| Hover glow | Não existe | Glow sutil | ADICIONAR |

### CORRIGIR PARA:
```json
"SidebarNavItem": {
  "description": "Navigation item with icon container and optional subtitle",
  "height": "56px",
  "classes": "flex items-center gap-4 rounded-lg px-4 py-3.5 text-sm font-medium transition-all duration-200",
  "states": {
    "default": {
      "classes": "text-muted-foreground hover:bg-muted hover:text-foreground"
    },
    "active": {
      "classes": "bg-primary text-primary-foreground",
      "iconContainer": "bg-primary-foreground/10"
    }
  },
  "iconContainer": {
    "classes": "flex items-center justify-center w-9 h-9 rounded-lg bg-muted",
    "activeClasses": "bg-primary-foreground/20"
  },
  "structure": {
    "icon": "Inside container",
    "content": {
      "title": "text-sm font-medium",
      "subtitle": "text-xs text-muted-foreground"
    }
  }
}
```

---

## 5. PARTICLES BACKGROUND (Efeito Visual)

### MCP Atual
**NÃO EXISTE**

### Referência Real (ParticlesBackground.tsx)
```typescript
interface ParticlesBackgroundProps {
  theme?: 'dark' | 'light';
  primaryColor?: string;
  particleCount?: number;        // default: 120
  connectionDistance?: number;   // default: 150
  mouseRepelDistance?: number;   // default: 200
}

// Partículas:
// - 70% pequenas: radius 0.5-1.5px, sem blur
// - 20% médias: radius 1.2-2.7px, sem blur
// - 10% grandes: radius 2-4px, com blur 0.5-2px
// - Opacity: 0.2-0.6
// - Velocity: ±0.25

// Mouse interaction:
// - Repel distance: 200px
// - Force: 3 + (radius * 0.5)

// Canvas opacity:
// - Dark theme: 0.6
// - Light theme: 0.4
```

### ADICIONAR AO MCP:
```json
"ParticlesBackground": {
  "description": "Animated canvas-based particle system with mouse interaction",
  "type": "effect",
  "props": {
    "theme": { "type": "dark | light", "default": "dark" },
    "primaryColor": { "type": "string", "default": "#3b82f6" },
    "particleCount": { "type": "number", "default": 120 },
    "connectionDistance": { "type": "number", "default": 150 },
    "mouseRepelDistance": { "type": "number", "default": 200 }
  },
  "particles": {
    "distribution": {
      "small": { "percentage": 70, "radius": "0.5-1.5px", "blur": 0 },
      "medium": { "percentage": 20, "radius": "1.2-2.7px", "blur": 0 },
      "large": { "percentage": 10, "radius": "2-4px", "blur": "0.5-2px" }
    },
    "opacity": { "min": 0.2, "max": 0.6 },
    "velocity": { "min": -0.25, "max": 0.25 }
  },
  "interaction": {
    "mouseRepel": {
      "distance": 200,
      "forceFormula": "3 + (radius * 0.5)"
    },
    "edgeBounce": true
  },
  "canvasOpacity": {
    "dark": 0.6,
    "light": 0.4
  }
}
```

---

## 6. METRIC CARD (Dashboard)

### MCP Atual (dashboard-components.json)
```json
"MetricCard": {
  "classes": "rounded-lg border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
},
"MetricCardIcon": {
  "classes": "p-2 rounded-lg bg-primary/10 text-primary"
}
```

### Referência Real (MetricCard.tsx)
```tsx
<Card className={cn(
  'p-6',
  onClick && 'cursor-pointer hover:shadow-md',
  commonTransitions.shadow,
  className
)}>
  <div className="flex items-start justify-between">
    <div className="flex-1">
      {/* Icon container maior */}
      <div className="mb-4">
        <div className="inline-flex items-center justify-center rounded-lg bg-primary/10 p-3">
          <Icon className={cn(iconSizes.md, 'text-primary')} />
        </div>
      </div>

      {/* Value */}
      <p className="text-3xl font-semibold tracking-tight text-foreground">

      {/* Label */}
      <p className="text-sm text-muted-foreground">

      {/* Trend */}
      <div className="mt-3 flex items-center gap-1 text-sm">
```

### DIFERENÇAS:

| Aspecto | MCP | Referência | Gap |
|---------|-----|------------|-----|
| Icon padding | p-2 | p-3 | Maior |
| Icon margin bottom | Não especificado | mb-4 | ADICIONAR |
| Value font size | text-3xl | text-3xl font-semibold tracking-tight | Mais específico |
| Trend margin | Não especificado | mt-3 | ADICIONAR |
| Layout | Não especificado | flex items-start justify-between | ADICIONAR |
| Clickable state | Não existe | cursor-pointer hover:shadow-md | ADICIONAR |

---

## 7. PAGE HEADER (Dashboard)

### MCP Atual (dashboard-components.json)
```json
"PageHeaderContent": {
  "classes": "container max-w-[1600px] mx-auto px-8 py-6"
}
```

### Referência Real (PageHeader.tsx)
```tsx
<header className={cn(
  'w-full bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800',
  sticky && 'sticky top-0 z-40',
  'transition-all duration-300',
  isScrolled && 'shadow-sm',
)}>
  <div className="container max-w-[1600px] mx-auto px-8 py-6">
```

### DIFERENÇAS:

| Aspecto | MCP | Referência | Gap |
|---------|-----|------------|-----|
| Background color | bg-background/95 | bg-slate-50 dark:bg-slate-950 | Cores específicas |
| Border color | border | border-slate-200 dark:border-slate-800 | Específico |
| Scroll shadow | Não existe | isScrolled && 'shadow-sm' | ADICIONAR |
| Transition | Não especificado | transition-all duration-300 | ADICIONAR |
| Z-index | z-sticky | z-40 | Valor específico |

---

## 8. GLOW EFFECTS

### MCP Atual (tokens.json)
```json
"glow": {
  "primary": {
    "value": "0 0 40px hsl(222 79% 25% / 0.15)"
  },
  "primaryStrong": {
    "value": "0 0 60px hsl(222 79% 25% / 0.25)"
  }
}
```

### Referência Real
```css
/* Cyan glow para elementos interativos */
--glow-primary: 0 0 40px hsl(172 79% 41% / 0.3);  /* Cyan, não primary! */

/* Card hover glow */
background: radial-gradient(circle at 50% 0%, ${corPrimaria}15, transparent 70%);

/* Button shadow */
shadow-lg shadow-cyan-500/20
hover:shadow-xl hover:shadow-cyan-500/30

/* Pulse glow animation */
@keyframes pulseGlow {
  0%, 100% { box-shadow: 0 0 20px hsl(172 79% 41% / 0.3); }
  50% { box-shadow: 0 0 40px hsl(172 79% 41% / 0.5); }
}
```

### DIFERENÇAS:

| Aspecto | MCP | Referência | Gap |
|---------|-----|------------|-----|
| Cor base | primary (azul) | cyan (teal) | Cor diferente! |
| Opacity glow | 0.15-0.25 | 0.3-0.5 | Mais intenso |
| Card glow | box-shadow | radial-gradient | Técnica diferente |
| Button glow | Não existe | shadow-cyan-500/20 | ADICIONAR |
| Pulse intensity | 20-40px | 20-40px | Similar |

---

## 9. RESPONSIVE PATTERNS

### MCP Atual
Breakpoints genéricos documentados, mas SEM padrões específicos de componentes.

### Referência Real
```tsx
// Tipografia responsiva específica
text-5xl md:text-7xl lg:text-8xl  // Hero title
text-lg sm:text-xl md:text-2xl    // Card title
text-xs sm:text-sm                // Card description
text-2xl sm:text-3xl md:text-4xl  // Price

// Padding responsivo
p-4 sm:p-6                        // Cards
px-2 sm:px-4                      // Grid containers
py-2.5 sm:py-3                    // Buttons
px-4 sm:px-6                      // Buttons

// Border radius responsivo
rounded-xl sm:rounded-2xl         // Cards

// Grid responsivo
grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4
```

### ADICIONAR AO MCP:
```json
"responsivePatterns": {
  "typography": {
    "heroTitle": "text-5xl md:text-7xl lg:text-8xl",
    "cardTitle": "text-lg sm:text-xl md:text-2xl",
    "cardDescription": "text-xs sm:text-sm",
    "price": "text-2xl sm:text-3xl md:text-4xl"
  },
  "padding": {
    "card": "p-4 sm:p-6",
    "container": "px-2 sm:px-4",
    "button": "py-2.5 sm:py-3 px-4 sm:px-6"
  },
  "borderRadius": {
    "card": "rounded-xl sm:rounded-2xl"
  },
  "grid": {
    "cards4": "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
    "cards3": "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
  }
}
```

---

## 10. CSS CLASSES ESPECÍFICAS

### Classes que existem na referência mas NÃO no MCP:

```css
/* Utilities */
.scrollbar-hide              /* Esconder scrollbar */
.line-clamp-2               /* Truncar em 2 linhas */
.animate-fadeInUp           /* Com fill-mode: forwards */

/* Text gradient */
.text-gradient-primary {
  background-image: linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(172 79% 55%) 100%);
  /* Nota: vai até CYAN, não secondary! */
}

/* Glow classes */
.border-glow                /* box-shadow com glow */
.border-glow-strong

/* Surface classes */
.surface-elevated           /* Fundo elevado */
.surface-overlay            /* Overlay semi-transparente */
```

---

## PRIORIDADE DE CORREÇÕES

### Alta Prioridade (Causam divergência visual significativa)
1. **Sidebar active state** - Cor errada (accent vs primary)
2. **Card glow effect** - Não existe no MCP
3. **Hero section** - Componente inteiro ausente
4. **Animation values** - translateY errado (10px vs 40px)
5. **Responsive typography** - Padrões não documentados

### Média Prioridade (Afetam polish visual)
6. **Particles background** - Efeito ausente
7. **Button shadows** - Glow on hover não documentado
8. **Stagger animations** - Delays não documentados
9. **Border radius** - Variantes xl/2xl não usadas

### Baixa Prioridade (Refinamentos)
10. **Scroll shadow** - PageHeader
11. **Line clamp** - Utility class
12. **Icon container sizes** - Diferenças menores

---

## PRÓXIMOS PASSOS

1. **Atualizar tokens.json** com valores corretos de animação
2. **Adicionar landing-components.json** com Hero, PlanCards, Benefits
3. **Corrigir dashboard-components.json** com Sidebar specs
4. **Adicionar effects.json** com ParticlesBackground
5. **Criar responsive-patterns.json** com padrões documentados
6. **Criar plugin** com skill de implementação UI
