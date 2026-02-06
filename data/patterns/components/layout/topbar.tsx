// TopBar - Sanitized from src/components/layout/TopBar.tsx
// Barra superior h-20 com busca centralizada, notificações com badge, menu do usuario com avatar e dropdown

'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import {
  Search,
  ExternalLink,
  Bell,
  User,
  Settings,
  LogOut,
  ChevronDown,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface TopBarProps {
  userName?: string;
  userEmail?: string;
  userRole?: string;
  tenantName?: string;
  tenantSlug?: string;
  notificationCount?: number;
  onSearch?: (query: string) => void;
}

export function TopBar({
  userName = 'Usuário',
  userEmail = 'usuario@email.com',
  userRole = 'Admin',
  tenantName,
  tenantSlug,
  notificationCount = 0,
  onSearch,
}: TopBarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch && searchQuery.trim()) {
      onSearch(searchQuery);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shrink-0">
      <div className="flex h-[79px] items-center justify-between px-6 gap-4 max-w-full overflow-hidden">
        {/* Search Section */}
        <div className="flex-1 max-w-2xl">
          <form onSubmit={handleSearch} className="relative">
            <Search className={cn(
              "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 transition-colors duration-200",
              isSearchFocused
                ? "text-[#0D2872] dark:text-[#355EC4]"
                : "text-slate-400 dark:text-slate-500"
            )} />
            <Input
              type="search"
              placeholder="Buscar produtos, landing pages, leads..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              className={cn(
                "pl-10 pr-4 h-11 bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700",
                "focus:bg-white dark:focus:bg-slate-800 focus:border-[#0D2872] dark:focus:border-[#355EC4]",
                "transition-all duration-200 placeholder:text-slate-400 dark:placeholder:text-slate-500"
              )}
            />
          </form>
        </div>

        {/* Actions Section */}
        <div className="flex items-center gap-2">
          {/* Preview Landing Page Button */}
          {tenantSlug && (
            <Button
              variant="outline"
              size="default"
              className={cn(
                "h-11 px-4 gap-2 border-[#0D2872]/20 dark:border-[#355EC4]/20",
                "hover:bg-[#0D2872]/5 dark:hover:bg-[#355EC4]/5",
                "text-[#0D2872] dark:text-[#355EC4]",
                "transition-all duration-200"
              )}
            >
              <ExternalLink className="h-4 w-4" />
              <span className="hidden sm:inline font-medium">Preview Landing Page</span>
            </Button>
          )}

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "relative h-11 w-11 rounded-lg",
                  "hover:bg-slate-100 dark:hover:bg-slate-800",
                  "text-slate-700 dark:text-slate-300",
                  "transition-all duration-200"
                )}
              >
                <Bell className="h-5 w-5" />
                {notificationCount > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-[10px] font-bold"
                  >
                    {notificationCount > 9 ? '9+' : notificationCount}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80 max-w-[calc(100vw-2rem)]">
              <DropdownMenuLabel className="font-semibold">
                Notificações
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              {notificationCount === 0 ? (
                <div className="py-8 text-center text-sm text-slate-500 dark:text-slate-400">
                  Nenhuma notificação
                </div>
              ) : (
                <div className="max-h-[300px] overflow-y-auto">
                  <DropdownMenuItem className="flex flex-col items-start gap-1 py-3 cursor-pointer">
                    <span className="font-medium text-sm">Nova venda realizada</span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      Produto X foi vendido há 5 minutos
                    </span>
                  </DropdownMenuItem>
                </div>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Profile */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className={cn(
                  "h-11 px-3 gap-3 rounded-lg",
                  "hover:bg-slate-100 dark:hover:bg-slate-800",
                  "transition-all duration-200"
                )}
              >
                {/* Avatar */}
                <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-gradient-to-br from-[#0D2872] to-[#355EC4] text-white font-semibold text-sm">
                  {userName.charAt(0).toUpperCase()}
                </div>

                {/* User Info - Hidden on mobile */}
                <div className="hidden md:flex flex-col items-start min-w-0">
                  <span className="text-sm font-semibold text-slate-900 dark:text-slate-100 truncate max-w-[120px]">
                    {userName}
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 truncate max-w-[120px]">
                    {tenantName || userRole}
                  </span>
                </div>

                <ChevronDown className="h-4 w-4 text-slate-400 dark:text-slate-500" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 max-w-[calc(100vw-2rem)]">
              <DropdownMenuLabel>
                <div className="flex flex-col gap-1">
                  <span className="font-semibold">{userName}</span>
                  <span className="text-xs font-normal text-slate-500 dark:text-slate-400">
                    {userEmail}
                  </span>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer gap-2">
                <User className="h-4 w-4" />
                <span>Meu Perfil</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer gap-2">
                <Settings className="h-4 w-4" />
                <span>Configurações</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer gap-2 text-red-600 dark:text-red-400 focus:text-red-600 dark:focus:text-red-400">
                <LogOut className="h-4 w-4" />
                <span>Sair</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
