---
name: ui-implementation
description: Use this skill when implementing UI components, landing pages, or dashboard interfaces. Ensures the implementation follows the Labzz design system visual identity while adapting content to the user's project.
user_invocable: true
---

# UI Implementation Skill

This skill ensures UI implementations follow the Labzz design system VISUAL IDENTITY (structure, classes, layout, effects) while ADAPTING CONTENT to the project being built.

## Conceito Fundamental

O MCP Labzz serve **templates de referência visual** — não apps prontos para copiar.
- **IDENTIDADE VISUAL** (estrutura, classes, layout, efeitos) → copie fielmente
- **CONTEÚDO** (dados, textos, métricas, menus) → adapte ao projeto do usuário

## When to Use

Use this skill when:
- Creating new UI components
- Building landing pages
- Implementing dashboard interfaces
- Modifying existing UI elements
- The user asks for UI to "match the design" or "follow the design system"

## Mandatory Process

### Phase 1: Gather Visual Specifications

Before writing ANY code, you MUST:

1. **Fetch the visual template** via MCP tools:
   - Page template → `get_page("page-name")`
   - Component template → `get_component("component-name")`
   - Layout template → `get_layout("layout-name")`
   - Styles/tokens → `get_styles()`

2. **Separate VISUAL from CONTENT** in the returned code:
   - **VISUAL (copiar)**: classes Tailwind, hierarquia de divs, wrappers, animações, responsive breakpoints
   - **CONTENT (adaptar)**: textos, números, labels, itens de menu, dados, props de negócio

3. **Document Exact Visual Values**
   Create a checklist of EXACT values from the template:
   - [ ] Border radius: `rounded-xl sm:rounded-2xl`
   - [ ] Padding: `p-4 sm:p-6`
   - [ ] Animation: `fadeInUp` with `translateY(40px)`
   - [ ] Hover effect: `scale-[1.02] -translate-y-1`
   - [ ] Glow: `radial-gradient(circle at 50% 0%, ${color}15, transparent 70%)`

### Phase 2: Implementation

When implementing:

1. **Use Exact Classes** - Copy classes directly from templates, don't paraphrase
2. **Adapt Content** - Replace example data with real project data (metrics, labels, menu items, etc.)
3. **Include All States** - Default, hover, active, focus, disabled
4. **Add Responsive Variants** - Mobile-first with breakpoint modifiers
5. **Include Animations** - With correct delays and fill-mode

### Phase 3: Verification Checklist

After implementation, verify:

#### Visual Identity Checklist (must match template)
- [ ] Border radius matches template exactly
- [ ] Padding/spacing matches template exactly
- [ ] Colors use design tokens (primary, secondary, accent)
- [ ] Typography uses correct font family and size scale
- [ ] Shadow/glow effects match template
- [ ] Hover state matches template (transform, shadow, glow)
- [ ] Animations use correct duration and easing
- [ ] Responsive breakpoints applied correctly

#### Content Adaptation Checklist (must NOT copy template data)
- [ ] Metrics/KPIs reflect the real project, not template examples
- [ ] Menu items match the project's actual navigation
- [ ] Texts and labels are relevant to the project
- [ ] Product/entity names are from the project, not template placeholders

## Critical Specifications

### Sidebar Active State
**IMPORTANT**: The active state uses `bg-primary` (blue), NOT `bg-accent` (yellow).

```tsx
// CORRECT
<div className="bg-primary text-primary-foreground">

// WRONG
<div className="bg-accent text-accent-foreground">
```

### Animation Values
- `fadeInUp`: translateY(40px), NOT 10px or 20px
- `slideUp`: translateY(30px), NOT 20px
- Always use `animation-fill-mode: forwards`
- Stagger: 100ms between cards, hero elements use specific delays

### Glow Effects
- Card hover glow is `radial-gradient`, not `box-shadow`
- Button glow uses `shadow-lg shadow-primary/20`
- Hover increases to `shadow-xl shadow-primary/30`

### Responsive Typography
```
Hero title: text-5xl md:text-7xl lg:text-8xl
Section title: text-2xl md:text-4xl lg:text-5xl
Card title: text-lg sm:text-xl md:text-2xl
Price: text-2xl sm:text-3xl md:text-4xl
```

## Example: Correct vs Incorrect Usage

When user asks: "Create a dashboard overview for my e-commerce app"

### CORRECT
1. Fetch `get_page("dashboard-overview")` → get the visual template
2. Copy the **structure**: MetricCard grid, chart layout, table structure, classes
3. **Replace content**: swap "R$ 2.450" with real revenue data, swap menu items with e-commerce navigation, swap example products with real products

### INCORRECT
1. Fetch `get_page("dashboard-overview")` → get the visual template
2. Copy **everything** including "R$ 2.450", "127 leads", example menu items
3. Deliver a page that looks like the template demo instead of the user's app

## Never Do

- Never guess spacing values - always check the 4px grid
- Never use generic colors like "blue" - use design tokens
- Never skip hover/active states
- Never forget animation delays on lists/grids
- Never copy example data/metrics as if they were real project data
- Never copy menu items or navigation from the template without adapting to the project
