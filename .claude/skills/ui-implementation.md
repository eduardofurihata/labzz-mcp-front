---
name: ui-implementation
description: Use this skill when implementing UI components, landing pages, or dashboard interfaces. Ensures the implementation follows the Labzz design system specifications exactly.
user_invocable: true
---

# UI Implementation Skill

This skill ensures UI implementations match the Labzz design system specifications from the `labzz-lp-vendas` reference project.

## When to Use

Use this skill when:
- Creating new UI components
- Building landing pages
- Implementing dashboard interfaces
- Modifying existing UI elements
- The user asks for UI to "match the design" or "follow the design system"

## Mandatory Process

### Phase 1: Gather Specifications

Before writing ANY code, you MUST:

1. **Identify Component Type**
   - Is this a landing page component? → Use `get_landing_component_spec`
   - Is this a dashboard component? → Use `get_dashboard_component_spec`
   - Is this a basic UI component? → Use `get_component_spec`
   - Does it need visual effects? → Use `get_effect_spec`

2. **Fetch All Relevant Specs**
   ```
   For a PlanCard, fetch:
   - get_landing_component_spec("PlanCard")
   - get_landing_component_spec("PlanCardsGrid")
   - get_effect_spec("GlowEffects")
   - get_design_tokens("animations")
   ```

3. **Document Exact Values**
   Create a checklist of EXACT values from the specs:
   - [ ] Border radius: `rounded-xl sm:rounded-2xl`
   - [ ] Padding: `p-4 sm:p-6`
   - [ ] Animation: `fadeInUp` with `translateY(40px)`
   - [ ] Hover effect: `scale-[1.02] -translate-y-1`
   - [ ] Glow: `radial-gradient(circle at 50% 0%, ${color}15, transparent 70%)`

### Phase 2: Implementation

When implementing:

1. **Use Exact Classes** - Copy classes directly from specs, don't paraphrase
2. **Include All States** - Default, hover, active, focus, disabled
3. **Add Responsive Variants** - Mobile-first with breakpoint modifiers
4. **Include Animations** - With correct delays and fill-mode

### Phase 3: Verification Checklist

After implementation, verify against spec:

#### Visual Checklist
- [ ] Border radius matches spec exactly
- [ ] Padding/spacing matches spec exactly
- [ ] Colors use design tokens (primary, secondary, accent)
- [ ] Typography uses correct font family and size scale
- [ ] Shadow/glow effects match spec

#### Interaction Checklist
- [ ] Hover state matches spec (transform, shadow, glow)
- [ ] Active/pressed state exists
- [ ] Focus ring uses ring color from tokens
- [ ] Animations use correct duration and easing

#### Responsive Checklist
- [ ] Mobile styles are default
- [ ] Tablet breakpoint (md:) applied
- [ ] Desktop breakpoint (lg:) applied
- [ ] Touch targets are 44px minimum

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

## Example Implementation

When user asks: "Create a pricing card"

1. **Fetch specs**:
   - `get_landing_component_spec("PlanCard")`
   - `get_effect_spec("GlowEffects")`
   - `get_design_tokens("animations")`

2. **Extract exact values**:
   ```
   Container: relative flex flex-col h-full rounded-xl sm:rounded-2xl overflow-hidden
   Animation: opacity-0 animate-fadeInUp with stagger
   Hover: hover:scale-[1.02] hover:-translate-y-1
   Glow: radial-gradient(circle at 50% 0%, ${color}15, transparent 70%)
   ```

3. **Implement with exact classes**

4. **Verify against checklist**

## Never Do

- Never guess spacing values - always check the 4px grid
- Never use generic colors like "blue" - use design tokens
- Never skip hover/active states
- Never forget animation delays on lists/grids
- Never assume "close enough" is acceptable
