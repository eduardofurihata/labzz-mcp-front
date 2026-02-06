'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Eye, Copy, Trash2, Palette, ExternalLink, Package, Lightbulb, Target, Zap, TrendingUp, CheckCircle2 } from 'lucide-react';
import { PageHeader } from '@/components/dashboard/layout/PageHeader';
import Link from 'next/link';

interface LandingPage {
  id: string;
  nome: string;
  slug: string;
  descricao: string | null;
  status: string;
  corPrimaria: string;
  corSecundaria: string | null;
  _count: {
    produtos: number;
  };
}

// Dados de exemplo
const exampleLandingPages: LandingPage[] = [
  {
    id: 'lp1',
    nome: 'Workshop Marketing Digital',
    slug: 'workshop-marketing',
    descricao: 'Landing page principal para o workshop de marketing digital com vendas de ingressos.',
    status: 'ATIVO',
    corPrimaria: '#06b6d4',
    corSecundaria: '#8b5cf6',
    _count: { produtos: 3 },
  },
  {
    id: 'lp2',
    nome: 'Mentoria Premium 2025',
    slug: 'mentoria-premium',
    descricao: 'Página de vendas da mentoria individual com acompanhamento mensal.',
    status: 'ATIVO',
    corPrimaria: '#10b981',
    corSecundaria: null,
    _count: { produtos: 1 },
  },
  {
    id: 'lp3',
    nome: 'Black Friday - Cursos',
    slug: 'black-friday-cursos',
    descricao: 'Promoção especial de Black Friday para todos os cursos digitais.',
    status: 'RASCUNHO',
    corPrimaria: '#f59e0b',
    corSecundaria: '#ef4444',
    _count: { produtos: 5 },
  },
  {
    id: 'lp4',
    nome: 'E-book Gratuito',
    slug: 'ebook-gratuito',
    descricao: null,
    status: 'INATIVO',
    corPrimaria: '#6366f1',
    corSecundaria: null,
    _count: { produtos: 1 },
  },
];

export default function LandingPagesPage() {
  const [landingPages] = useState<LandingPage[]>(exampleLandingPages);

  const getStatusBadge = (status: string) => {
    const config = {
      ATIVO: { variant: 'success' as const, label: 'Ativo' },
      RASCUNHO: { variant: 'warning' as const, label: 'Rascunho' },
      INATIVO: { variant: 'secondary' as const, label: 'Inativo' },
    };
    return config[status as keyof typeof config] || config.INATIVO;
  };

  return (
    <>
      {/* Page Header */}
      <PageHeader
        icon={Palette}
        breadcrumbs={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Landing Pages' }
        ]}
        title="Landing Pages"
        subtitle="Gerencie suas landing pages de vendas"
        actions={
          <Link href="/dashboard/landing-pages/novo">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nova Landing Page
            </Button>
          </Link>
        }
      />

      {/* Content Container */}
      <div className="container max-w-[1600px] mx-auto px-8 py-12 space-y-6">
        {landingPages.length === 0 ? (
          <Card>
            <CardContent className="py-16">
              <div className="text-center">
                <Palette className="mx-auto h-16 w-16 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-semibold text-foreground">
                  Nenhuma landing page encontrada
                </h3>
                <p className="mt-2 text-sm text-muted-foreground max-w-md mx-auto">
                  Crie sua primeira landing page para começar a vender seus produtos
                </p>
                <div className="mt-6">
                  <Link href="/dashboard/landing-pages/novo">
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Criar Landing Page
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {/* Card para Criar Nova */}
              <Link href="/dashboard/landing-pages/novo">
                <Card className="hover:border-primary transition-all duration-200 cursor-pointer h-full border-2 border-dashed">
                  <CardContent className="p-5 flex flex-col items-center justify-center h-full min-h-[280px]">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <Plus className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-base font-semibold text-foreground mb-2">
                      Nova Landing Page
                    </h3>
                    <p className="text-sm text-muted-foreground text-center">
                      Crie uma nova página de vendas
                    </p>
                  </CardContent>
                </Card>
              </Link>

              {/* Cards das Landing Pages */}
              {landingPages.map((lp) => {
                const statusConfig = getStatusBadge(lp.status);
                return (
                  <Card
                    key={lp.id}
                    className="hover:border-input transition-colors flex flex-col"
                  >
                    <CardContent className="p-5 flex flex-col flex-1">
                      {/* Header */}
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div className="flex-1 min-w-0">
                          <h3 className="text-base font-semibold text-foreground truncate mb-1">
                            {lp.nome}
                          </h3>
                          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <ExternalLink className="w-3 h-3 flex-shrink-0" />
                            <span className="truncate">/{lp.slug}</span>
                          </div>
                        </div>
                        <Badge variant={statusConfig.variant} className="flex-shrink-0">
                          {statusConfig.label}
                        </Badge>
                      </div>

                      {/* Descrição */}
                      {lp.descricao && (
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                          {lp.descricao}
                        </p>
                      )}

                      {/* Spacer */}
                      <div className="flex-1" />

                      {/* Bottom Section */}
                      <div className="space-y-3 mt-auto">
                        <div className="flex items-center justify-between pt-3 border-t border-border">
                          <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1.5 text-sm">
                              <Package className="w-4 h-4 text-muted-foreground" />
                              <span className="text-foreground font-medium">
                                {lp._count?.produtos || 0}
                              </span>
                              <span className="text-muted-foreground">
                                {lp._count?.produtos === 1 ? 'produto' : 'produtos'}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-1">
                            <div
                              className="w-5 h-5 rounded border border-border"
                              style={{ backgroundColor: lp.corPrimaria }}
                              title="Cor Primária"
                            />
                            {lp.corSecundaria && (
                              <div
                                className="w-5 h-5 rounded border border-border -ml-1.5"
                                style={{ backgroundColor: lp.corSecundaria }}
                                title="Cor Secundária"
                              />
                            )}
                          </div>
                        </div>

                        {/* Ações */}
                        <div className="flex gap-2">
                          <Link href={`/dashboard/landing-pages/${lp.id}`} className="flex-1">
                            <Button variant="outline" size="sm" className="w-full">
                              <Edit className="w-4 h-4 mr-2" />
                              Editar
                            </Button>
                          </Link>
                          <Link href={`/vendas/${lp.slug}`} target="_blank">
                            <Button variant="outline" size="sm">
                              <Eye className="w-4 h-4" />
                            </Button>
                          </Link>
                          <Button variant="outline" size="sm" title="Duplicar">
                            <Copy className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            title="Excluir"
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Banners Educacionais */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
              <Card className="border overflow-hidden relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16" />
                <CardContent className="p-6 relative">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                      <CheckCircle2 className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-foreground">
                        Elementos Essenciais
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        O que não pode faltar na sua LP
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-900/50">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-bold text-primary">1</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">Título Impactante</p>
                        <p className="text-xs text-muted-foreground mt-0.5">Comunique o valor em 5 segundos</p>
                      </div>
                    </div>

                    <div className="flex gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-900/50">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-bold text-primary">2</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">Prova Social</p>
                        <p className="text-xs text-muted-foreground mt-0.5">Depoimentos reais geram confiança</p>
                      </div>
                    </div>

                    <div className="flex gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-900/50">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-bold text-primary">3</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">CTA Claro</p>
                        <p className="text-xs text-muted-foreground mt-0.5">Botão visível e objetivo</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border overflow-hidden relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 rounded-full -mr-16 -mt-16" />
                <CardContent className="p-6 relative">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-foreground">
                        Aumente suas Conversões
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        Táticas comprovadas de marketing
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-900/50">
                      <Zap className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-foreground">Urgência e Escassez</p>
                        <p className="text-xs text-muted-foreground mt-0.5">Ofertas limitadas motivam ação</p>
                      </div>
                    </div>

                    <div className="flex gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-900/50">
                      <Target className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-foreground">Foco no Benefício</p>
                        <p className="text-xs text-muted-foreground mt-0.5">Mostre resultados, não recursos</p>
                      </div>
                    </div>

                    <div className="flex gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-900/50">
                      <Lightbulb className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-foreground">Teste A/B</p>
                        <p className="text-xs text-muted-foreground mt-0.5">Otimize continuamente</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </>
        )}
      </div>
    </>
  );
}
