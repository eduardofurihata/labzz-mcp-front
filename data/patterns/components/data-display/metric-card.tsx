/**
 * MetricCard Component
 *
 * Reusable card for displaying key metrics with icons, values, and trends.
 *
 * @example
 * ```tsx
 * <MetricCard
 *   icon={Users}
 *   label="Total Users"
 *   value="1,234"
 *   trend={{ value: 12.5, direction: 'up', label: 'vs last month' }}
 * />
 * ```
 */

'use client';

import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import { SkeletonCard } from '../feedback/SkeletonCard';
import { iconSizes, commonTransitions } from '../design-tokens';
import type { MetricCardProps } from '../types';

export function MetricCard({
  icon: Icon,
  label,
  value,
  trend,
  loading = false,
  onClick,
  className,
}: MetricCardProps) {
  if (loading) {
    return <SkeletonCard count={1} className={className} />;
  }

  const TrendIcon = trend?.direction === 'up' ? TrendingUp : TrendingDown;
  const trendColor = trend?.direction === 'up' ? 'text-green-600' : 'text-red-600';

  return (
    <Card
      className={cn(
        'p-6',
        onClick && 'cursor-pointer hover:shadow-md',
        commonTransitions.shadow,
        className
      )}
      onClick={onClick}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          {/* Icon */}
          <div className="mb-4">
            <div className="inline-flex items-center justify-center rounded-lg bg-primary/10 p-3">
              <Icon className={cn(iconSizes.md, 'text-primary')} />
            </div>
          </div>

          {/* Value */}
          <div className="mb-2">
            <p className="text-3xl font-semibold tracking-tight text-foreground">
              {value}
            </p>
          </div>

          {/* Label */}
          <p className="text-sm text-muted-foreground">{label}</p>

          {/* Trend */}
          {trend && (
            <div className={cn('mt-3 flex items-center gap-1 text-sm', trendColor)}>
              <TrendIcon className="h-4 w-4" />
              <span className="font-medium">{trend.value}%</span>
              {trend.label && (
                <span className="text-muted-foreground">{trend.label}</span>
              )}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}

MetricCard.displayName = 'MetricCard';
