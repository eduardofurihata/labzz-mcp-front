'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ShoppingCart, Search, Download, TrendingUp, CheckCircle, XCircle, Clock, RefreshCw } from 'lucide-react';
import { PageHeader } from '@/components/dashboard/layout/PageHeader';
import { PageContainer } from '@/components/dashboard/layout/PageContainer';

interface Venda {
  id: string;
  clienteNome: string;
  clienteEmail: string;
  valorTotal: number;
  valorPago: number;
  status: string;
  metodoPagamento: string;
  parcelas: number;
  dataVenda: string;
  dataAprovacao?: string;
  produto: {
    id: string;
    nome: string;
    slug: string;
    preco: number;
  };
}

// Dados de exemplo
const exampleVendas: Venda[] = [
  {
    id: 'v1',
    clienteNome: 'Maria Silva',
    clienteEmail: 'maria@email.com',
    valorTotal: 297.00,
    valorPago: 297.00,
    status: 'APROVADA',
    metodoPagamento: 'Cartão de Crédito',
    parcelas: 3,
    dataVenda: '2025-01-15T10:30:00Z',
    dataAprovacao: '2025-01-15T10:31:00Z',
    produto: { id: 'p1', nome: 'Curso de Marketing Digital', slug: 'curso-marketing', preco: 297.00 },
  },
  {
    id: 'v2',
    clienteNome: 'João Santos',
    clienteEmail: 'joao@email.com',
    valorTotal: 1497.00,
    valorPago: 1497.00,
    status: 'APROVADA',
    metodoPagamento: 'Cartão de Crédito',
    parcelas: 12,
    dataVenda: '2025-01-14T14:00:00Z',
    dataAprovacao: '2025-01-14T14:02:00Z',
    produto: { id: 'p2', nome: 'Mentoria Premium', slug: 'mentoria-premium', preco: 1497.00 },
  },
  {
    id: 'v3',
    clienteNome: 'Ana Oliveira',
    clienteEmail: 'ana@email.com',
    valorTotal: 47.00,
    valorPago: 0,
    status: 'PENDENTE',
    metodoPagamento: 'Boleto',
    parcelas: 1,
    dataVenda: '2025-01-13T09:15:00Z',
    produto: { id: 'p3', nome: 'E-book Vendas Online', slug: 'ebook-vendas', preco: 47.00 },
  },
  {
    id: 'v4',
    clienteNome: 'Carlos Ferreira',
    clienteEmail: 'carlos@email.com',
    valorTotal: 297.00,
    valorPago: 297.00,
    status: 'REEMBOLSADA',
    metodoPagamento: 'Cartão de Crédito',
    parcelas: 1,
    dataVenda: '2025-01-12T16:45:00Z',
    produto: { id: 'p1', nome: 'Curso de Marketing Digital', slug: 'curso-marketing', preco: 297.00 },
  },
  {
    id: 'v5',
    clienteNome: 'Patricia Lima',
    clienteEmail: 'patricia@email.com',
    valorTotal: 397.00,
    valorPago: 397.00,
    status: 'APROVADA',
    metodoPagamento: 'PIX',
    parcelas: 1,
    dataVenda: '2025-01-11T11:20:00Z',
    dataAprovacao: '2025-01-11T11:20:30Z',
    produto: { id: 'p4', nome: 'Workshop Marketing Digital', slug: 'workshop-marketing', preco: 397.00 },
  },
];

const exampleStats = {
  resumo: {
    totalVendas: 5,
    vendasAprovadas: 3,
    vendasPendentes: 1,
    vendasCanceladas: 0,
    vendasReembolsadas: 1,
    valorTotal: 2535.00,
    valorRecebido: 2191.00,
    taxaAprovacao: 60.0,
  },
};

export default function VendasPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [vendas] = useState<Venda[]>(exampleVendas);
  const [stats] = useState(exampleStats);
  const [page, setPage] = useState(1);
  const totalPages = 1;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'APROVADA':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'PENDENTE':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'CANCELADA':
      case 'REEMBOLSADA':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'APROVADA':
        return 'text-green-500 bg-green-500/10';
      case 'PENDENTE':
        return 'text-yellow-500 bg-yellow-500/10';
      case 'CANCELADA':
      case 'REEMBOLSADA':
        return 'text-red-500 bg-red-500/10';
      default:
        return 'text-gray-500 bg-gray-500/10';
    }
  };

  const filteredVendas = vendas.filter(
    (venda) =>
      venda.clienteNome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      venda.clienteEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      venda.produto.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <PageHeader
        icon={ShoppingCart}
        breadcrumbs={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Vendas' }
        ]}
        title="Vendas"
        subtitle="Acompanhe todas as vendas realizadas via Eduzz"
        actions={
          <div className="flex gap-2">
            <Button variant="outline">
              <RefreshCw className="mr-2 h-4 w-4" />
              Atualizar
            </Button>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Exportar
            </Button>
          </div>
        }
      />

      <PageContainer>
        <div className="space-y-6">
          {/* Stats */}
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total de Vendas</CardTitle>
                <ShoppingCart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.resumo.totalVendas}</div>
                <p className="text-xs text-muted-foreground">{formatCurrency(stats.resumo.valorTotal)}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Vendas Aprovadas</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.resumo.vendasAprovadas}</div>
                <p className="text-xs text-muted-foreground">{formatCurrency(stats.resumo.valorRecebido)}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Taxa de Aprovação</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.resumo.taxaAprovacao.toFixed(1)}%</div>
                <p className="text-xs text-muted-foreground">de {stats.resumo.totalVendas} vendas</p>
              </CardContent>
            </Card>
          </div>

          {/* Search */}
          <Card>
            <CardContent className="pt-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Buscar por cliente, email ou produto..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardContent>
          </Card>

          {/* Vendas List */}
          {filteredVendas.length === 0 ? (
            <Card>
              <CardContent className="py-16">
                <div className="text-center">
                  <ShoppingCart className="mx-auto h-16 w-16 text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-semibold text-foreground">
                    Nenhuma venda encontrada
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground max-w-md mx-auto">
                    {searchTerm
                      ? 'Tente ajustar os filtros de busca'
                      : 'As vendas aparecerão aqui assim que forem processadas pela Eduzz'}
                  </p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {filteredVendas.map((venda) => (
                <Card key={venda.id}>
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          {getStatusIcon(venda.status)}
                          <h3 className="text-lg font-semibold text-foreground">
                            {venda.clienteNome}
                          </h3>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(venda.status)}`}
                          >
                            {venda.status}
                          </span>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                          <div>
                            <p className="text-xs text-muted-foreground">Email</p>
                            <p className="text-sm text-foreground">{venda.clienteEmail}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Produto</p>
                            <p className="text-sm text-foreground">{venda.produto.nome}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Pagamento</p>
                            <p className="text-sm text-foreground">
                              {venda.metodoPagamento}
                              {venda.parcelas > 1 && ` (${venda.parcelas}x)`}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Data</p>
                            <p className="text-sm text-foreground">{formatDate(venda.dataVenda)}</p>
                          </div>
                        </div>
                      </div>

                      <div className="text-right ml-4">
                        <p className="text-2xl font-bold text-foreground">
                          {formatCurrency(venda.valorTotal)}
                        </p>
                        {venda.valorPago !== venda.valorTotal && (
                          <p className="text-sm text-muted-foreground">
                            Pago: {formatCurrency(venda.valorPago)}
                          </p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center gap-2">
                  <Button variant="outline" onClick={() => setPage(page - 1)} disabled={page === 1}>
                    Anterior
                  </Button>
                  <span className="flex items-center px-4 text-muted-foreground">
                    Página {page} de {totalPages}
                  </span>
                  <Button variant="outline" onClick={() => setPage(page + 1)} disabled={page === totalPages}>
                    Próxima
                  </Button>
                </div>
              )}
            </div>
          )}

          {/* Info Box */}
          <div className="rounded-lg border border-blue-500 bg-blue-500/10 p-4">
            <p className="text-sm text-blue-400">
              As vendas são sincronizadas automaticamente via webhook da Eduzz. Configure o webhook em /dashboard/configurações
            </p>
          </div>
        </div>
      </PageContainer>
    </>
  );
}
