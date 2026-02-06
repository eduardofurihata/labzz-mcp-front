// PageContainer - Sanitized from src/components/dashboard/layout/PageContainer.tsx
// Container de conteúdo max-w-[1600px] mx-auto px-8 py-12

'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function PageContainer({
  children,
  className,
}: PageContainerProps) {
  return (
    <div
      className={cn(
        'container max-w-[1600px] mx-auto px-8 py-12',
        className
      )}
    >
      {children}
    </div>
  );
}
