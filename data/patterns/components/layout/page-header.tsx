// PageHeader - Sanitized from src/components/dashboard/layout/PageHeader.tsx
// Header de página sticky com ícone, título, subtítulo e área de ações

'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  breadcrumbs?: BreadcrumbItem[];
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  backButton?: { href: string; label: string };
  icon?: LucideIcon;
  sticky?: boolean;
  className?: string;
}

export function PageHeader({
  breadcrumbs,
  title,
  subtitle,
  actions,
  backButton,
  icon: Icon,
  sticky = true,
  className,
}: PageHeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'w-full bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800',
        sticky && 'sticky top-0 z-40',
        'transition-all duration-300',
        isScrolled && 'shadow-sm',
        className
      )}
    >
      <div className="container max-w-[1600px] mx-auto px-8 py-6">
        {/* Back Button */}
        {backButton && (
          <Link
            href={backButton.href}
            className="inline-flex items-center mb-4 text-sm text-muted-foreground hover:text-foreground transition-colors duration-150"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            {backButton.label}
          </Link>
        )}

        {/* Title and Actions Container */}
        <div className="flex flex-col sm:flex-row md:items-center md:justify-between gap-4">
          {/* Title and Subtitle */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3">
              {Icon && (
                <div className="flex-shrink-0">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
              )}
              <h1 className="text-2xl font-semibold text-foreground tracking-tight">
                {title}
              </h1>
            </div>
            {subtitle && (
              <p className={cn(
                'text-sm text-muted-foreground mt-1',
                Icon && 'ml-9'
              )}>
                {subtitle}
              </p>
            )}
          </div>

          {/* Actions */}
          {actions && (
            <div className="flex items-center gap-2 flex-shrink-0">
              {actions}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
