// Sidebar - Sanitized from src/components/layout/sidebar.tsx
// Sidebar com logo BUILDER, gradiente from-slate-50, menus com icon containers 36x36,
// active state com gradient indicator, logout com hover vermelho

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Package,
  Users,
  ShoppingCart,
  Settings,
  LogOut,
  Palette,
  UserPlus,
} from 'lucide-react';

interface SidebarProps {
  userRole: string;
}

export function Sidebar({ userRole }: SidebarProps) {
  const pathname = usePathname();

  const navigation = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: LayoutDashboard,
      roles: ['SUPER_ADMIN', 'ADMIN_MASTER', 'ADMIN', 'VENDEDOR'],
      description: 'Visão geral do sistema'
    },
    {
      name: 'Produtos',
      href: '/dashboard/produtos',
      icon: Package,
      roles: ['SUPER_ADMIN', 'ADMIN_MASTER', 'ADMIN'],
      description: 'Gerencie seus produtos'
    },
    {
      name: 'Landing Pages',
      href: '/dashboard/landing-pages',
      icon: Palette,
      roles: ['SUPER_ADMIN', 'ADMIN_MASTER', 'ADMIN'],
      description: 'Crie páginas de vendas'
    },
    {
      name: 'Leads',
      href: '/dashboard/leads',
      icon: UserPlus,
      roles: ['SUPER_ADMIN', 'ADMIN_MASTER', 'ADMIN', 'VENDEDOR'],
      description: 'Gerencie seus leads'
    },
    {
      name: 'Vendas',
      href: '/dashboard/vendas',
      icon: ShoppingCart,
      roles: ['SUPER_ADMIN', 'ADMIN_MASTER', 'ADMIN', 'VENDEDOR'],
      description: 'Histórico de vendas'
    },
    {
      name: 'Usuários',
      href: '/dashboard/usuarios',
      icon: Users,
      roles: ['SUPER_ADMIN', 'ADMIN_MASTER'],
      description: 'Gerenciar usuários'
    },
    {
      name: 'Configurações',
      href: '/dashboard/configuracoes',
      icon: Settings,
      roles: ['SUPER_ADMIN', 'ADMIN_MASTER', 'ADMIN'],
      description: 'Ajustes do sistema'
    },
  ];

  const filteredNavigation = navigation.filter(item =>
    item.roles.includes(userRole)
  );

  return (
    <div className="flex h-full w-64 flex-col bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900 border-r border-slate-200 dark:border-slate-800">
      {/* Logo Section */}
      <div className="flex h-20 items-center px-6 border-b border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
        <Link
          href="/dashboard"
          className="flex items-center gap-3 transition-all duration-300 hover:scale-105"
        >
          <img
            src="https://cdn.eduzzcdn.com/topbar/orbita-new.svg"
            alt="Órbita"
            className="h-10 w-auto"
          />
          <div className="flex flex-col leading-none gap-0">
            <span className="text-lg font-bold text-slate-900 dark:text-slate-100">
              BUILDER
            </span>
            <span className="text-[9px] text-slate-500 dark:text-slate-400 font-medium tracking-wider">
              LANDING PAGE SYSTEM
            </span>
          </div>
        </Link>
      </div>

      {/* Navigation Section */}
      <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
        <div className="mb-3 px-3">
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            Menu Principal
          </p>
        </div>

        {filteredNavigation.map((item) => {
          const isActive = item.href === '/dashboard'
            ? pathname === item.href
            : pathname === item.href || pathname.startsWith(item.href + '/');

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'group relative flex items-center space-x-3 rounded-xl px-3 py-3 text-sm font-medium transition-all duration-200',
                isActive
                  ? 'bg-gradient-to-r from-[#0D2872]/10 to-[#355EC4]/10 text-[#0D2872] dark:text-[#355EC4] shadow-sm'
                  : 'text-slate-700 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-100'
              )}
            >
              {/* Active Indicator */}
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-[#0D2872] to-[#355EC4] rounded-r-full" />
              )}

              {/* Icon Container */}
              <div className={cn(
                'flex items-center justify-center w-9 h-9 rounded-lg transition-all duration-200',
                isActive
                  ? 'bg-gradient-to-br from-[#0D2872] to-[#355EC4] shadow-lg shadow-[#0D2872]/20'
                  : 'bg-slate-100 dark:bg-slate-800 group-hover:bg-slate-200 dark:group-hover:bg-slate-700'
              )}>
                <item.icon className={cn(
                  'h-5 w-5 transition-all duration-200',
                  isActive
                    ? 'text-white'
                    : 'text-slate-700 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-slate-100'
                )} />
              </div>

              {/* Text */}
              <div className="flex flex-col flex-1 min-w-0">
                <span className={cn(
                  'font-semibold truncate text-slate-900 dark:text-slate-100',
                  isActive && 'font-bold'
                )}>
                  {item.name}
                </span>
                {isActive && (
                  <span className="text-[10px] text-slate-600 dark:text-slate-400 truncate">
                    {item.description}
                  </span>
                )}
              </div>

              {/* Hover Effect */}
              {!isActive && (
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#0D2872]/0 to-[#355EC4]/0 group-hover:from-[#0D2872]/5 group-hover:to-[#355EC4]/5 transition-all duration-200" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer Section */}
      <div className="border-t border-slate-200 dark:border-slate-800 p-4 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
        <button
          className="group flex w-full items-center space-x-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-red-50 dark:hover:bg-red-950/20 hover:text-red-600 dark:hover:text-red-400 transition-all duration-200"
        >
          <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-slate-100 dark:bg-slate-800 group-hover:bg-red-100 dark:group-hover:bg-red-950/30 transition-all duration-200">
            <LogOut className="h-5 w-5" />
          </div>
          <span className="font-semibold">Sair</span>
        </button>
      </div>
    </div>
  );
}
