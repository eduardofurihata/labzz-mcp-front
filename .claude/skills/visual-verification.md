---
name: visual-verification
description: Use this skill to verify that implemented UI matches the design system specifications. Run after any UI implementation to catch visual discrepancies.
user_invocable: true
---

# Visual Verification Skill

This skill provides a systematic approach to verify UI implementations match the Labzz design system.

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

### Step 2: Fetch Reference Specifications

For each component, fetch the relevant specs:

```
# Landing components
get_landing_component_spec("ComponentName")

# Dashboard components
get_dashboard_component_spec("ComponentName")

# Basic UI components
get_component_spec("ComponentName")

# Visual effects
get_effect_spec("EffectName")

# Design tokens
get_design_tokens("category")
```

### Step 3: Visual Checklist

#### 3.1 Typography Verification
- [ ] Font family matches spec
- [ ] Font size uses correct responsive scale
  - Hero title: `text-5xl md:text-7xl lg:text-8xl`
  - Section title: `text-2xl md:text-4xl lg:text-5xl`
  - Card title: `text-lg sm:text-xl md:text-2xl`
  - Price: `text-2xl sm:text-3xl md:text-4xl`
- [ ] Font weight matches spec
- [ ] Line height matches spec
- [ ] Letter spacing matches spec (if specified)

#### 3.2 Spacing Verification
- [ ] Padding uses 4px grid system
- [ ] Card padding: `p-4 sm:p-6`
- [ ] Section padding: `py-12 sm:py-16 md:py-20 lg:py-24`
- [ ] Container padding: `px-4 sm:px-6 lg:px-8`
- [ ] Gap values match spec
- [ ] Margin values match spec

#### 3.3 Color Verification
- [ ] Uses design tokens, not raw colors
- [ ] Primary color: `bg-primary`, `text-primary`
- [ ] Accent color: `bg-accent`, `text-accent`
- [ ] Muted colors for secondary elements
- [ ] **CRITICAL**: Sidebar active state uses `bg-primary` NOT `bg-accent`

#### 3.4 Border & Radius Verification
- [ ] Border radius: `rounded-xl sm:rounded-2xl` for cards
- [ ] Border colors use design tokens
- [ ] Border widths match spec

#### 3.5 Shadow & Glow Verification
- [ ] Shadow classes match spec
- [ ] Card hover glow uses `radial-gradient` NOT `box-shadow`
- [ ] Glow gradient: `radial-gradient(circle at 50% 0%, ${color}15, transparent 70%)`
- [ ] Button glow: `shadow-lg shadow-primary/20`
- [ ] Hover glow: `shadow-xl shadow-primary/30`

#### 3.6 Animation Verification
- [ ] `fadeInUp` uses `translateY(40px)` NOT 10px or 20px
- [ ] `slideUp` uses `translateY(30px)` NOT 20px
- [ ] Animation fill-mode is `forwards`
- [ ] Stagger delay: 100ms between cards
- [ ] Easing: `cubic-bezier(0.4, 0, 0.2, 1)`

#### 3.7 Hover State Verification
- [ ] Card hover: `hover:scale-[1.02] hover:-translate-y-1`
- [ ] Transition duration matches spec
- [ ] All interactive elements have hover states
- [ ] Focus states exist for accessibility

#### 3.8 Responsive Verification
Test at each breakpoint:
- [ ] Mobile (default): Correct styles applied
- [ ] sm (640px): Breakpoint styles applied
- [ ] md (768px): Breakpoint styles applied
- [ ] lg (1024px): Breakpoint styles applied
- [ ] xl (1280px): Breakpoint styles applied (if needed)

### Step 4: Common Mistakes Checklist

Check for these frequent errors:

#### Sidebar Issues
- [ ] Active item uses `bg-primary` (blue), NOT `bg-accent` (yellow)
- [ ] Item height is 56px
- [ ] Icon container is present
- [ ] Subtitle styling is correct

#### Animation Issues
- [ ] translateY values are correct (40px for fadeInUp, 30px for slideUp)
- [ ] fill-mode: forwards is set
- [ ] Stagger delays are applied to lists/grids

#### Glow Issues
- [ ] Card glow uses radial-gradient, not box-shadow
- [ ] Gradient position is `circle at 50% 0%`
- [ ] Color opacity is 15% (`${color}15`)

#### Responsive Issues
- [ ] Mobile-first approach (base styles are mobile)
- [ ] Breakpoint prefixes are correct
- [ ] Touch targets are minimum 44px

### Step 5: Side-by-Side Comparison

If possible, compare implementation with reference:

1. Open reference at `labzz-lp-vendas`
2. Open implementation
3. Check each element visually:
   - Size proportions
   - Spacing relationships
   - Color consistency
   - Animation timing
   - Hover effects

### Step 6: Documentation

Record any discrepancies found:

```markdown
## Verification Report

**Component**: [Name]
**Date**: [Date]
**Status**: [Pass/Fail]

### Discrepancies Found
| Element | Expected | Actual | Fixed |
|---------|----------|--------|-------|
| | | | [ ] |

### Notes
[Additional observations]
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

### Responsive Spacing
| Element | Mobile | sm | md | lg |
|---------|--------|----|----|----|
| Card padding | p-4 | p-6 | - | - |
| Section padding | py-12 | py-16 | py-20 | py-24 |
| Container padding | px-4 | px-6 | - | px-8 |
| Card border-radius | xl | 2xl | - | - |

### Color Usage
| Context | Correct | Wrong |
|---------|---------|-------|
| Sidebar active | bg-primary | bg-accent |
| Accent highlights | bg-accent | bg-primary |
| Muted text | text-muted-foreground | text-gray-500 |
