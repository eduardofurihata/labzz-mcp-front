// Auth Layout - Sanitized from src/app/(auth)/layout.tsx
// Layout de autenticação: página centralizada com fundo claro

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-slate-100 to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 p-4">
      {children}
    </div>
  )
}
