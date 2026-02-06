'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export interface SkeletonTextProps {
  lines?: number;
  className?: string;
}

export function SkeletonText({ lines = 1, className }: SkeletonTextProps) {
  return (
    <div className={cn('space-y-2', className)}>
      {Array.from({ length: lines }).map((_, index) => {
        const isLast = index === lines - 1;
        return (
          <div
            key={index}
            className={cn(
              'h-4 rounded bg-muted animate-pulse',
              isLast ? 'w-4/5' : 'w-full'
            )}
          />
        );
      })}
    </div>
  );
}

SkeletonText.displayName = 'SkeletonText';
