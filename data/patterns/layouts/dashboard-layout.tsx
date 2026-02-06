// Dashboard Layout - Sanitized from src/app/dashboard/layout.tsx + DashboardLayoutExample.tsx
// Layout completo: Sidebar (w-64) + TopBar (h-20) + área de conteúdo com scroll

import { Sidebar } from '@/components/layout/sidebar';
import { TopBar } from '@/components/layout/TopBar';

interface User {
  id: string;
  nome: string;
  email: string;
  role: string;
  avatarUrl?: string;
  tenant: {
    id: string;
    nome: string;
    slug: string;
    plano: string;
  };
}

// Dados de exemplo do usuário
const exampleUser: User = {
  id: '1',
  nome: 'João Silva',
  email: 'joao@empresa.com',
  role: 'ADMIN',
  tenant: {
    id: '1',
    nome: 'Minha Empresa',
    slug: 'minha-empresa',
    plano: 'PRO',
  },
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = exampleUser;

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-950 overflow-hidden">
      <Sidebar userRole={user.role} />
      <div className="flex flex-1 flex-col min-w-0">
        <TopBar
          userName={user.nome}
          userEmail={user.email}
          userRole={user.role}
          tenantName={user.tenant?.nome}
          tenantSlug={user.tenant?.slug}
          notificationCount={3}
        />
        <main className="flex-1 overflow-y-auto overflow-x-hidden bg-slate-50 dark:bg-slate-950">
          <div className="container max-w-[1600px] mx-auto px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
