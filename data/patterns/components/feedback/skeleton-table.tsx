/**
 * SkeletonTable Component
 *
 * Loading placeholder that matches table structure with configurable rows/columns.
 *
 * @example
 * ```tsx
 * <SkeletonTable rows={5} columns={4} />
 * ```
 */

'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export interface SkeletonTableProps {
  rows?: number;
  columns?: number;
  className?: string;
}

export function SkeletonTable({
  rows = 5,
  columns = 4,
  className,
}: SkeletonTableProps) {
  return (
    <div className={cn('w-full overflow-hidden rounded-lg border', className)}>
      <div className="w-full">
        {/* Table Header */}
        <div className="border-b bg-muted/50">
          <div className="flex items-center gap-4 p-4">
            {Array.from({ length: columns }).map((_, index) => (
              <div
                key={`header-${index}`}
                className={cn(
                  'h-4 rounded bg-muted animate-pulse',
                  index === 0 ? 'w-32' : 'flex-1'
                )}
              />
            ))}
          </div>
        </div>

        {/* Table Rows */}
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div
            key={`row-${rowIndex}`}
            className="border-b last:border-b-0"
          >
            <div className="flex items-center gap-4 p-4">
              {Array.from({ length: columns }).map((_, colIndex) => (
                <div
                  key={`cell-${rowIndex}-${colIndex}`}
                  className={cn(
                    'h-4 rounded bg-muted animate-pulse',
                    colIndex === 0 ? 'w-32' : 'flex-1'
                  )}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

SkeletonTable.displayName = 'SkeletonTable';
