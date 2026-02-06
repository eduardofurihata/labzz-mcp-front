/**
 * SkeletonCard Component
 *
 * Loading placeholder that matches card dimensions with shimmer animation.
 *
 * @example
 * ```tsx
 * <SkeletonCard count={3} />
 * ```
 */

'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export interface SkeletonCardProps {
  count?: number;
  className?: string;
}

export function SkeletonCard({ count = 1, className }: SkeletonCardProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className={cn(
            'rounded-lg border bg-card p-6',
            'animate-pulse',
            className
          )}
        >
          <div className="space-y-3">
            {/* Icon placeholder */}
            <div className="h-10 w-10 rounded-md bg-muted" />

            {/* Value placeholder */}
            <div className="h-8 w-24 rounded bg-muted" />

            {/* Label placeholder */}
            <div className="h-4 w-32 rounded bg-muted" />

            {/* Trend placeholder */}
            <div className="h-3 w-20 rounded bg-muted" />
          </div>
        </div>
      ))}
    </>
  );
}

SkeletonCard.displayName = 'SkeletonCard';
