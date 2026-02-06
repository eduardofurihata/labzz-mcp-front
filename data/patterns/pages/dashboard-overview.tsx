'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Package,
  Users,
  TrendingUp,
  DollarSign,
  LayoutDashboard,
  ArrowUpRight,
  ArrowDownRight,
  Palette,
  Target,
  Zap,
  CheckCircle2,
  MousePointerClick
} from 'lucide-react';
import { PageHeader } from '@/components/dashboard/layout/PageHeader';
import Link from 'next/link';

export default function DashboardPage() {
  // Dados do gráfico de vendas semanal
  const chartData = [
    { day: 'Seg', value: 20 },
    { day: 'Ter', value: 35 },
    { day: 'Qua', value: 28 },
    { day: 'Qui', value: 45 },
    { day: 'Sex', value: 38 },
    { day: 'Sáb', value: 52 },
    { day: 'Dom', value: 42 },
  ];

  const maxValue = Math.max(...chartData.map(d => d.value));

  return (
    <>
      <PageHeader
        icon={LayoutDashboard}
        breadcrumbs={[{ label: 'Dashboard' }]}
        title="Bem-vindo de volta!"
        subtitle="Aqui está um resumo do seu negócio hoje"
      />

      {/* Content Container - Alinhado com o header */}
      <div className="container max-w-[1600px] mx-auto px-8 py-12 space-y-6">
        {/* Stats Grid - 4 colunas */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {/* Card 1 - Vendas */}
          <Card className="border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-emerald-600 dark:text-emerald-500" strokeWidth={1.5} />
                </div>
                <div className="flex items-center gap-1 text-xs font-medium text-emerald-600 dark:text-emerald-500">
                  <ArrowUpRight className="w-3 h-3" />
                  <span>12%</span>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Vendas Hoje</p>
                <p className="text-2xl font-bold text-foreground">R$ 2.450</p>
                <p className="text-xs text-muted-foreground">vs R$ 2.180 ontem</p>
              </div>
            </CardContent>
          </Card>

          {/* Card 2 - Leads */}
          <Card className="border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-blue-600 dark:text-blue-500" strokeWidth={1.5} />
                </div>
                <div className="flex items-center gap-1 text-xs font-medium text-blue-600 dark:text-blue-500">
                  <ArrowUpRight className="w-3 h-3" />
                  <span>8%</span>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Novos Leads</p>
                <p className="text-2xl font-bold text-foreground">127</p>
                <p className="text-xs text-muted-foreground">vs 118 ontem</p>
              </div>
            </CardContent>
          </Card>

          {/* Card 3 - Conversão */}
          <Card className="border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                  <Target className="w-5 h-5 text-purple-600 dark:text-purple-500" strokeWidth={1.5} />
                </div>
                <div className="flex items-center gap-1 text-xs font-medium text-red-600 dark:text-red-500">
                  <ArrowDownRight className="w-3 h-3" />
                  <span>3%</span>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Taxa de Conversão</p>
                <p className="text-2xl font-bold text-foreground">3.2%</p>
                <p className="text-xs text-muted-foreground">vs 3.3% ontem</p>
              </div>
            </CardContent>
          </Card>

          {/* Card 4 - Produtos */}
          <Card className="border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center">
                  <Package className="w-5 h-5 text-orange-600 dark:text-orange-500" strokeWidth={1.5} />
                </div>
                <div className="flex items-center gap-1 text-xs font-medium text-muted-foreground">
                  <span>--</span>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Produtos Ativos</p>
                <p className="text-2xl font-bold text-foreground">24</p>
                <p className="text-xs text-muted-foreground">8 categorias</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Gráfico e Ações Rápidas */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Gráfico de Vendas - 2 colunas */}
          <Card className="border lg:col-span-2">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-base font-bold text-foreground">Vendas da Semana</h3>
                  <p className="text-sm text-muted-foreground">Últimos 7 dias</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    <span className="text-xs text-muted-foreground">Vendas</span>
                  </div>
                </div>
              </div>

              {/* Gráfico de Barras Simples */}
              <div className="space-y-4">
                <div className="flex items-end justify-between gap-2 h-48">
                  {chartData.map((item, index) => (
                    <div key={index} className="flex-1 flex flex-col items-center gap-2">
                      <div className="w-full flex items-end justify-center h-full">
                        <div
                          className="w-full bg-primary/20 hover:bg-primary/30 rounded-t transition-all relative group cursor-pointer"
                          style={{ height: `${(item.value / maxValue) * 100}%` }}
                        >
                          <div
                            className="absolute bottom-0 w-full bg-primary rounded-t transition-all"
                            style={{ height: '100%' }}
                          />
                          <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <span className="text-xs font-medium text-foreground bg-background border border-border rounded px-2 py-1 whitespace-nowrap">
                              {item.value}
                            </span>
                          </div>
                        </div>
                      </div>
                      <span className="text-xs text-muted-foreground">{item.day}</span>
                    </div>
                  ))}
                </div>

                {/* Resumo */}
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div>
                    <p className="text-xs text-muted-foreground">Total da Semana</p>
                    <p className="text-lg font-bold text-foreground">R$ 15.240</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Média Diária</p>
                    <p className="text-lg font-bold text-foreground">R$ 2.177</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Melhor Dia</p>
                    <p className="text-lg font-bold text-foreground">Sábado</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Ações Rápidas - 1 coluna */}
          <Card className="border">
            <CardContent className="p-6">
              <div className="mb-6">
                <h3 className="text-base font-bold text-foreground">Ações Rápidas</h3>
                <p className="text-sm text-muted-foreground">Acesso rápido</p>
              </div>

              <div className="flex flex-col gap-3">
                <Link href="/dashboard/produtos" className="block">
                  <Button variant="outline" className="w-full justify-start h-auto p-3 hover:bg-slate-100 dark:hover:bg-slate-800">
                    <div className="flex items-center gap-3 w-full">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Package className="w-4 h-4 text-primary" strokeWidth={1.5} />
                      </div>
                      <div className="text-left flex-1">
                        <p className="text-sm font-medium text-foreground">Produtos</p>
                        <p className="text-xs text-muted-foreground">Gerenciar catálogo</p>
                      </div>
                    </div>
                  </Button>
                </Link>

                <Link href="/dashboard/landing-pages" className="block">
                  <Button variant="outline" className="w-full justify-start h-auto p-3 hover:bg-slate-100 dark:hover:bg-slate-800">
                    <div className="flex items-center gap-3 w-full">
                      <div className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center flex-shrink-0">
                        <Palette className="w-4 h-4 text-secondary" strokeWidth={1.5} />
                      </div>
                      <div className="text-left flex-1">
                        <p className="text-sm font-medium text-foreground">Landing Pages</p>
                        <p className="text-xs text-muted-foreground">Criar páginas</p>
                      </div>
                    </div>
                  </Button>
                </Link>

                <Link href="/dashboard/leads" className="block">
                  <Button variant="outline" className="w-full justify-start h-auto p-3 hover:bg-slate-100 dark:hover:bg-slate-800">
                    <div className="flex items-center gap-3 w-full">
                      <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                        <Users className="w-4 h-4 text-blue-600 dark:text-blue-500" strokeWidth={1.5} />
                      </div>
                      <div className="text-left flex-1">
                        <p className="text-sm font-medium text-foreground">Leads</p>
                        <p className="text-xs text-muted-foreground">Ver contatos</p>
                      </div>
                    </div>
                  </Button>
                </Link>

                <Link href="/dashboard/vendedores" className="block">
                  <Button variant="outline" className="w-full justify-start h-auto p-3 hover:bg-slate-100 dark:hover:bg-slate-800">
                    <div className="flex items-center gap-3 w-full">
                      <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center flex-shrink-0">
                        <Users className="w-4 h-4 text-purple-600 dark:text-purple-500" strokeWidth={1.5} />
                      </div>
                      <div className="text-left flex-1">
                        <p className="text-sm font-medium text-foreground">Vendedores</p>
                        <p className="text-xs text-muted-foreground">Gerenciar equipe</p>
                      </div>
                    </div>
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Cards Didáticos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Card 1 - Otimize suas Vendas */}
          <Card className="border overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16" />
            <CardContent className="p-6 relative">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-white" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-foreground">
                    Otimize suas Vendas
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Estratégias para aumentar resultados
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-900/50">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-primary">1</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Landing Pages Eficientes</p>
                    <p className="text-xs text-muted-foreground mt-0.5">Crie páginas que convertem visitantes em clientes</p>
                  </div>
                </div>

                <div className="flex gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-900/50">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-primary">2</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Acompanhe Métricas</p>
                    <p className="text-xs text-muted-foreground mt-0.5">Monitore leads, conversões e vendas em tempo real</p>
                  </div>
                </div>

                <div className="flex gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-900/50">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-primary">3</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Teste e Otimize</p>
                    <p className="text-xs text-muted-foreground mt-0.5">Experimente diferentes abordagens e melhore continuamente</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Card 2 - Maximize Conversões */}
          <Card className="border overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 rounded-full -mr-16 -mt-16" />
            <CardContent className="p-6 relative">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-white" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-foreground">
                    Maximize Conversões
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Táticas comprovadas de marketing
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-900/50">
                  <Zap className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                  <div>
                    <p className="text-sm font-medium text-foreground">Prova Social</p>
                    <p className="text-xs text-muted-foreground mt-0.5">Depoimentos e avaliações geram confiança</p>
                  </div>
                </div>

                <div className="flex gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-900/50">
                  <Target className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                  <div>
                    <p className="text-sm font-medium text-foreground">Chamadas Claras</p>
                    <p className="text-xs text-muted-foreground mt-0.5">CTAs diretos e objetivos aumentam ação</p>
                  </div>
                </div>

                <div className="flex gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-900/50">
                  <MousePointerClick className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                  <div>
                    <p className="text-sm font-medium text-foreground">Experiência Fluida</p>
                    <p className="text-xs text-muted-foreground mt-0.5">Processo de compra simples e rápido</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
