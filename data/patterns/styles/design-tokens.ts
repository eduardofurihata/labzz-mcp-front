/**
 * Design System Tokens for Dashboard UI Modernization
 *
 * This file contains all design system constants including spacing, typography,
 * colors, shadows, and transitions. These tokens ensure consistency across all
 * dashboard components.
 *
 * @module design-tokens
 */

/**
 * Spacing scale based on 4px base unit
 * Maps to Tailwind CSS spacing utilities
 */
export const spacing = {
  /** 4px - 0.25rem */
  space1: '0.25rem',
  /** 8px - 0.5rem */
  space2: '0.5rem',
  /** 16px - 1rem */
  space4: '1rem',
  /** 24px - 1.5rem */
  space6: '1.5rem',
  /** 32px - 2rem */
  space8: '2rem',
  /** 48px - 3rem */
  space12: '3rem',
} as const;

/**
 * Spacing scale as Tailwind class names
 */
export const spacingClasses = {
  space1: 'space-1',
  space2: 'space-2',
  space4: 'space-4',
  space6: 'space-6',
  space8: 'space-8',
  space12: 'space-12',
} as const;

/**
 * Typography scale
 * Maps to Tailwind CSS text size utilities
 */
export const typography = {
  /** 12px */
  xs: '0.75rem',
  /** 14px */
  sm: '0.875rem',
  /** 16px */
  base: '1rem',
  /** 18px */
  lg: '1.125rem',
  /** 20px */
  xl: '1.25rem',
  /** 24px */
  '2xl': '1.5rem',
  /** 30px */
  '3xl': '1.875rem',
} as const;

/**
 * Typography scale as Tailwind class names
 */
export const typographyClasses = {
  xs: 'text-xs',
  sm: 'text-sm',
  base: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
  '2xl': 'text-2xl',
  '3xl': 'text-3xl',
} as const;

/**
 * Border radius values
 * Maps to Tailwind CSS rounded utilities
 */
export const borderRadius = {
  /** 2px */
  sm: '0.125rem',
  /** 6px */
  md: '0.375rem',
  /** 8px */
  lg: '0.5rem',
  /** 12px */
  xl: '0.75rem',
} as const;

/**
 * Border radius as Tailwind class names
 */
export const borderRadiusClasses = {
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
} as const;

/**
 * Shadow depths
 * Maps to Tailwind CSS shadow utilities
 */
export const shadows = {
  /** Subtle shadow for cards */
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  /** Medium shadow for elevated elements */
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  /** Large shadow for modals */
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
} as const;

/**
 * Shadow depths as Tailwind class names
 */
export const shadowClasses = {
  sm: 'shadow-sm',
  md: 'shadow-md',
  lg: 'shadow-lg',
} as const;

/**
 * Transition durations in milliseconds
 */
export const transitions = {
  /** 150ms - Fast transitions for immediate feedback */
  fast: 150,
  /** 300ms - Normal transitions for most interactions */
  normal: 300,
  /** 500ms - Slow transitions for complex animations */
  slow: 500,
} as const;

/**
 * Transition durations as Tailwind class names
 */
export const transitionClasses = {
  fast: 'duration-150',
  normal: 'duration-300',
  slow: 'duration-500',
} as const;

/**
 * Easing functions
 */
export const easing = {
  /** Standard easing for most transitions */
  inOut: 'ease-in-out',
  /** Easing for entrance animations */
  out: 'ease-out',
  /** Easing for exit animations */
  in: 'ease-in',
} as const;

/**
 * Easing functions as Tailwind class names
 */
export const easingClasses = {
  inOut: 'ease-in-out',
  out: 'ease-out',
  in: 'ease-in',
} as const;

/**
 * Responsive breakpoints
 */
export const breakpoints = {
  /** Mobile: < 768px */
  mobile: 768,
  /** Tablet: 768px - 1024px */
  tablet: 1024,
  /** Desktop: > 1024px */
  desktop: 1024,
} as const;

/**
 * Icon sizes
 */
export const iconSizes = {
  /** Small icons - 16px */
  sm: 'h-4 w-4',
  /** Medium icons - 20px (default) */
  md: 'h-5 w-5',
  /** Large icons - 24px */
  lg: 'h-6 w-6',
  /** Extra large icons - 32px */
  xl: 'h-8 w-8',
} as const;

/**
 * Z-index layers for consistent stacking
 */
export const zIndex = {
  /** Base content layer */
  base: 0,
  /** Dropdown menus */
  dropdown: 10,
  /** Sticky headers */
  sticky: 20,
  /** Fixed elements */
  fixed: 30,
  /** Modals and overlays */
  modal: 40,
  /** Tooltips */
  tooltip: 50,
} as const;

/**
 * Animation presets
 */
export const animations = {
  /** Fade in animation */
  fadeIn: 'animate-in fade-in',
  /** Fade out animation */
  fadeOut: 'animate-out fade-out',
  /** Slide in from top */
  slideInTop: 'animate-in slide-in-from-top',
  /** Slide in from bottom */
  slideInBottom: 'animate-in slide-in-from-bottom',
  /** Slide in from left */
  slideInLeft: 'animate-in slide-in-from-left',
  /** Slide in from right */
  slideInRight: 'animate-in slide-in-from-right',
  /** Scale in animation */
  scaleIn: 'animate-in zoom-in',
  /** Pulse animation for loading states */
  pulse: 'animate-pulse',
} as const;

/**
 * Common transition combinations
 */
export const commonTransitions = {
  /** Standard hover transition */
  hover: `${transitionClasses.normal} ${easingClasses.inOut}`,
  /** Shadow transition for cards */
  shadow: `transition-shadow ${transitionClasses.normal} ${easingClasses.inOut}`,
  /** Color transition */
  colors: `transition-colors ${transitionClasses.fast} ${easingClasses.inOut}`,
  /** All properties transition */
  all: `transition-all ${transitionClasses.normal} ${easingClasses.inOut}`,
} as const;

/**
 * Type exports for TypeScript support
 */
export type SpacingKey = keyof typeof spacing;
export type TypographyKey = keyof typeof typography;
export type BorderRadiusKey = keyof typeof borderRadius;
export type ShadowKey = keyof typeof shadows;
export type TransitionKey = keyof typeof transitions;
export type EasingKey = keyof typeof easing;
export type IconSizeKey = keyof typeof iconSizes;
export type AnimationKey = keyof typeof animations;
