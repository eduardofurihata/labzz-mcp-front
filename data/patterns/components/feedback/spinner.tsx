/**
 * Modern Spinner Component
 *
 * A modern, animated loading spinner with primary color support.
 * Provides multiple size variants and can be used inline or centered.
 *
 * @example
 * ```tsx
 * // Default spinner
 * <Spinner />
 *
 * // Large centered spinner
 * <Spinner size="lg" centered />
 *
 * // Small inline spinner
 * <Spinner size="sm" />
 * ```
 */

import React from 'react';
import { cn } from '@/lib/utils';

export interface SpinnerProps {
  /** Size variant of the spinner */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /** Whether to center the spinner in its container */
  centered?: boolean;
  /** Optional label for accessibility */
  label?: string;
  /** Additional CSS classes */
  className?: string;
  /** Custom color (defaults to primary) */
  color?: string;
}

const sizeClasses = {
  xs: 'w-3 h-3 border-2',
  sm: 'w-4 h-4 border-2',
  md: 'w-6 h-6 border-2',
  lg: 'w-8 h-8 border-3',
  xl: 'w-12 h-12 border-4',
} as const;

/**
 * Modern animated spinner component
 */
export const Spinner: React.FC<SpinnerProps> = ({
  size = 'md',
  centered = false,
  label = 'Carregando...',
  className,
  color,
}) => {
  const spinner = (
    <div
      role="status"
      aria-label={label}
      className={cn(
        'inline-block rounded-full border-solid border-current border-r-transparent animate-spin',
        sizeClasses[size],
        color ? '' : 'text-primary',
        className
      )}
      style={color ? { color, borderRightColor: 'transparent' } : undefined}
    >
      <span className="sr-only">{label}</span>
    </div>
  );

  if (centered) {
    return (
      <div className="flex items-center justify-center w-full h-full min-h-[100px]">
        {spinner}
      </div>
    );
  }

  return spinner;
};

/**
 * Loading State Component
 *
 * A complete loading state with spinner and optional message.
 * Useful for full-page or section loading states.
 *
 * @example
 * ```tsx
 * <LoadingState message="Carregando dados..." />
 * ```
 */
export interface LoadingStateProps {
  /** Loading message to display */
  message?: string;
  /** Size of the spinner */
  size?: SpinnerProps['size'];
  /** Additional CSS classes for the container */
  className?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  message = 'Carregando...',
  size = 'lg',
  className,
}) => {
  return (
    <div className={cn('flex flex-col items-center justify-center gap-4 py-12', className)}>
      <Spinner size={size} />
      {message && (
        <p className="text-sm text-muted-foreground animate-pulse">
          {message}
        </p>
      )}
    </div>
  );
};

/**
 * Inline Spinner Component
 *
 * A small spinner for inline use (e.g., inside buttons).
 *
 * @example
 * ```tsx
 * <Button disabled={loading}>
 *   {loading && <InlineSpinner />}
 *   Salvar
 * </Button>
 * ```
 */
export interface InlineSpinnerProps {
  /** Additional CSS classes */
  className?: string;
}

export const InlineSpinner: React.FC<InlineSpinnerProps> = ({ className }) => {
  return (
    <Spinner
      size="sm"
      className={cn('mr-2', className)}
      label="Processando..."
    />
  );
};

/**
 * Full Page Spinner Component
 *
 * A spinner that covers the entire viewport.
 * Useful for initial page loads or major transitions.
 *
 * @example
 * ```tsx
 * {isLoading && <FullPageSpinner />}
 * ```
 */
export interface FullPageSpinnerProps {
  /** Loading message to display */
  message?: string;
  /** Whether to show a backdrop */
  backdrop?: boolean;
}

export const FullPageSpinner: React.FC<FullPageSpinnerProps> = ({
  message = 'Carregando...',
  backdrop = true,
}) => {
  return (
    <div
      className={cn(
        'fixed inset-0 z-50 flex items-center justify-center',
        backdrop && 'bg-background/80 backdrop-blur-sm'
      )}
    >
      <div className="flex flex-col items-center gap-4">
        <Spinner size="xl" />
        {message && (
          <p className="text-base text-foreground font-medium animate-pulse">
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default Spinner;
