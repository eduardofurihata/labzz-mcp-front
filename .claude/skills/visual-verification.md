---
name: visual-verification
description: Use this skill to verify that implemented UI follows the design system visual identity correctly AND that content was properly adapted (not copied from templates). Run after any UI implementation.
user_invocable: true
---

# Visual Verification Skill

This skill verifies two things:
1. **Visual identity** matches the Labzz design system (structure, classes, effects)
2. **Content was adapted** to the project (not copied from template examples)

## When to Use

- After implementing any UI component
- When reviewing existing UI for design compliance
- When debugging visual discrepancies
- Before marking a UI task as complete

## Verification Process

### Step 1: Identify What to Verify

List all components that need verification:
- [ ] Component name: _______________
- [ ] Component type: Landing / Dashboard / Basic
- [ ] Location: _______________

### Step 2: Fetch Reference Templates

For each component, fetch the visual template via MCP:

```
# Pages
get_page("page-name")

# Components
get_component("component-name")

# Layouts
get_layout("layout-name")

# Styles/tokens
get_styles()

# Screenshot for visual comparison
get_screenshot("page-name")
```

### Step 3: Visual Identity Checklist (deve ser IGUAL ao template)

#### 3.1 Typography
- [ ] Font family matches template
- [ ] Font size uses correct responsive scale
  - Hero title: `text-5xl md:text-7xl lg:text-8xl`
  - Section title: `text-2xl md:text-4xl lg:text-5xl`
  - Card title: `text-lg sm:text-xl md:text-2xl`
  - Price: `text-2xl sm:text-3xl md:text-4xl`
- [ ] Font weight matches template
- [ ] Line height matches template

#### 3.2 Spacing
- [ ] Padding uses 4px grid system
- [ ] Card padding: `p-4 sm:p-6`
- [ ] Section padding: `py-12 sm:py-16 md:py-20 lg:py-24`
- [ ] Container padding: `px-4 sm:px-6 lg:px-8`
- [ ] Gap values match template

#### 3.3 Colors
- [ ] Uses design tokens, not raw colors
- [ ] Primary color: `bg-primary`, `text-primary`
- [ ] Accent color: `bg-accent`, `text-accent`
- [ ] **CRITICAL**: Sidebar active state uses `bg-primary` NOT `bg-accent`

#### 3.4 Border & Radius
- [ ] Border radius: `rounded-xl sm:rounded-2xl` for cards
- [ ] Border colors use design tokens

#### 3.5 Shadow & Glow
- [ ] Card hover glow uses `radial-gradient` NOT `box-shadow`
- [ ] Glow gradient: `radial-gradient(circle at 50% 0%, ${color}15, transparent 70%)`
- [ ] Button glow: `shadow-lg shadow-primary/20`
- [ ] Hover glow: `shadow-xl shadow-primary/30`

#### 3.6 Animations
- [ ] `fadeInUp` uses `translateY(40px)` NOT 10px or 20px
- [ ] `slideUp` uses `translateY(30px)` NOT 20px
- [ ] Animation fill-mode is `forwards`
- [ ] Stagger delay: 100ms between cards
- [ ] Easing: `cubic-bezier(0.4, 0, 0.2, 1)`

#### 3.7 Hover States
- [ ] Card hover: `hover:scale-[1.02] hover:-translate-y-1`
- [ ] All interactive elements have hover states
- [ ] Focus states exist for accessibility

#### 3.8 Responsive
- [ ] Mobile (default): Correct styles applied
- [ ] sm (640px), md (768px), lg (1024px): Breakpoint styles applied

### Step 4: Content Adaptation Checklist (deve ser DIFERENTE do template)

**CRITICAL**: This step catches the most common error — copying template example data as real content.

- [ ] Metrics/KPIs are from the project, NOT template examples (e.g., "R$ 2.450", "127 leads")
- [ ] Menu items match the project's actual navigation, NOT the template sidebar
- [ ] Page titles and labels are relevant to the project
- [ ] Product/entity names are real, NOT template placeholders
- [ ] Chart data reflects the project's domain
- [ ] Table data is appropriate for the project's context

**If any content matches the template examples exactly, flag it as an error.**

### Step 5: Common Mistakes Checklist

#### Visual Identity Errors
- [ ] Sidebar active item uses `bg-primary` (blue), NOT `bg-accent` (yellow)
- [ ] translateY values are correct (40px for fadeInUp, 30px for slideUp)
- [ ] Card glow uses radial-gradient, not box-shadow
- [ ] Mobile-first approach (base styles are mobile)
- [ ] Touch targets are minimum 44px

#### Content Copying Errors
- [ ] No template example metrics were kept as real data
- [ ] No template menu items were kept without adaptation
- [ ] No template brand names appear unless they're actually the project's brand

### Step 6: Documentation

Record any discrepancies found:

```markdown
## Verification Report

**Component**: [Name]
**Date**: [Date]
**Visual Identity**: [Pass/Fail]
**Content Adaptation**: [Pass/Fail]

### Visual Discrepancies
| Element | Template Value | Implementation | Fixed |
|---------|---------------|----------------|-------|
| | | | [ ] |

### Content Copying Issues
| Element | Template Example | Should Be | Fixed |
|---------|-----------------|-----------|-------|
| | | | [ ] |
```

## Quick Reference: Critical Values

### Animation Values
| Animation | translateY | Duration | Easing |
|-----------|------------|----------|--------|
| fadeInUp | 40px | 0.6s | cubic-bezier(0.4, 0, 0.2, 1) |
| slideUp | 30px | 0.5s | ease-out |
| slideDown | 20px | 0.3s | ease-out |

### Responsive Typography
| Element | Mobile | sm | md | lg |
|---------|--------|----|----|----|
| Hero title | 5xl | - | 7xl | 8xl |
| Section title | 2xl | - | 4xl | 5xl |
| Card title | lg | xl | 2xl | - |
| Price | 2xl | 3xl | 4xl | - |

### Color Usage
| Context | Correct | Wrong |
|---------|---------|-------|
| Sidebar active | bg-primary | bg-accent |
| Accent highlights | bg-accent | bg-primary |
| Muted text | text-muted-foreground | text-gray-500 |
