'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Package, Search, RefreshCw, CheckCircle, XCircle, Clock, Trash2, Calendar, ChevronDown, ChevronRight, Ticket, MapPin, Users, Check } from 'lucide-react';
import { PageHeader } from '@/components/dashboard/layout/PageHeader';
import { Pagination } from '@/components/dashboard/data-display/Pagination';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';

interface Produto {
  id: string;
  nome: string;
  slug: string;
  descricao: string | null;
  preco: number;
  status: string;
  eduzzContentId: number | null;
  eduzzSyncStatus: string;
  eventoDataInicio: string | null;
  eventoLocal: string | null;
}

interface Ingresso {
  id: string;
  nome: string;
  isPaid: boolean;
  isActive: boolean;
  lotes: Lote[];
}

interface Lote {
  id: string;
  nome: string;
  valor: number;
  quantidade: number;
  eduzzProductId: string;
  dataInicio: string;
  dataFim: string;
  isActive: boolean;
}

interface EventoAgrupado {
  id: string;
  nome: string;
  descricao: string | null;
  status: string;
  eventoDataInicio: string | null;
  eventoLocal: string | null;
  blinketEventId: string;
  blinket: {
    totalIngressos: number;
    totalLotes: number;
    precoMinimo: number;
    precoMaximo: number;
  };
  ingressos: Ingresso[];
}

// Dados de exemplo
const exampleEventos: EventoAgrupado[] = [
  {
    id: 'evt1',
    nome: 'Workshop Marketing Digital 2025',
    descricao: 'Workshop intensivo de marketing digital com as melhores estratégias do mercado para alavancar suas vendas online.',
    status: 'ATIVO',
    eventoDataInicio: '2025-04-15T09:00:00Z',
    eventoLocal: 'São Paulo - SP',
    blinketEventId: 'bk-001',
    blinket: { totalIngressos: 2, totalLotes: 3, precoMinimo: 197.00, precoMaximo: 497.00 },
    ingressos: [
      {
        id: 'ing1',
        nome: 'Ingresso VIP',
        isPaid: true,
        isActive: true,
        lotes: [
          { id: 'l1', nome: '1o Lote', valor: 397.00, quantidade: 100, eduzzProductId: 'edz-001', dataInicio: '2025-01-01T00:00:00Z', dataFim: '2025-02-28T23:59:59Z', isActive: true },
          { id: 'l2', nome: '2o Lote', valor: 497.00, quantidade: 50, eduzzProductId: 'edz-002', dataInicio: '2025-03-01T00:00:00Z', dataFim: '2025-04-14T23:59:59Z', isActive: false },
        ],
      },
      {
        id: 'ing2',
        nome: 'Ingresso Standard',
        isPaid: true,
        isActive: true,
        lotes: [
          { id: 'l3', nome: '1o Lote', valor: 197.00, quantidade: 200, eduzzProductId: 'edz-003', dataInicio: '2025-01-01T00:00:00Z', dataFim: '2025-04-14T23:59:59Z', isActive: true },
        ],
      },
    ],
  },
];

const exampleProdutosAvulsos: Produto[] = [
  { id: 'p1', nome: 'Curso de Marketing Digital', slug: 'curso-marketing-digital', descricao: 'Curso completo com 120 aulas sobre marketing digital', preco: 297.00, status: 'ATIVO', eduzzContentId: 12345, eduzzSyncStatus: 'SINCRONIZADO', eventoDataInicio: null, eventoLocal: null },
  { id: 'p2', nome: 'Mentoria Premium', slug: 'mentoria-premium', descricao: 'Mentoria individual com acompanhamento mensal', preco: 1497.00, status: 'ATIVO', eduzzContentId: 12346, eduzzSyncStatus: 'SINCRONIZADO', eventoDataInicio: null, eventoLocal: null },
  { id: 'p3', nome: 'E-book Vendas Online', slug: 'ebook-vendas-online', descricao: 'Guia prático para iniciar suas vendas na internet', preco: 47.00, status: 'INATIVO', eduzzContentId: null, eduzzSyncStatus: 'PENDENTE', eventoDataInicio: null, eventoLocal: null },
];

export default function ProdutosPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [syncFilter, setSyncFilter] = useState<string>('all');
  const [tipoFilter, setTipoFilter] = useState<string>('all');

  const [expandedEvents, setExpandedEvents] = useState<Set<string>>(new Set());
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [showFullDescription, setShowFullDescription] = useState<Set<string>>(new Set());

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const resumo = {
    totalEventos: exampleEventos.length,
    totalProdutosEmEventos: 3,
    totalProdutosAvulsos: exampleProdutosAvulsos.length,
  };

  const totalItems = exampleEventos.length + exampleProdutosAvulsos.length;

  const toggleEventExpanded = (eventId: string) => {
    setExpandedEvents(prev => {
      const newSet = new Set(prev);
      if (newSet.has(eventId)) newSet.delete(eventId);
      else newSet.add(eventId);
      return newSet;
    });
  };

  const toggleSelectItem = (itemId: string) => {
    setSelectedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) newSet.delete(itemId);
      else newSet.add(itemId);
      return newSet;
    });
  };

  const toggleFullDescription = (itemId: string) => {
    setShowFullDescription(prev => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) newSet.delete(itemId);
      else newSet.add(itemId);
      return newSet;
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price);
  };

  const getTotalPages = () => Math.ceil(totalItems / itemsPerPage);

  return (
    <>
      {/* Page Header */}
      <PageHeader
        icon={Package}
        breadcrumbs={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Produtos' }
        ]}
        title="Produtos"
        subtitle="Gerencie os produtos da landing page"
        actions={
          <Button variant="outline">
            <RefreshCw className="mr-2 h-4 w-4" />
            Sincronizar
          </Button>
        }
      />

      {/* Content Container */}
      <div className="container max-w-[1600px] mx-auto px-8 py-12 space-y-6">
        <div className="space-y-4">
          {/* Resumo */}
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Eventos</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{resumo.totalEventos}</div>
                <p className="text-xs text-muted-foreground">eventos cadastrados</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Ingressos/Lotes</CardTitle>
                <Ticket className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{resumo.totalProdutosEmEventos}</div>
                <p className="text-xs text-muted-foreground">produtos em eventos</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Produtos Avulsos</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{resumo.totalProdutosAvulsos}</div>
                <p className="text-xs text-muted-foreground">sem evento vinculado</p>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <Card>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <div className="lg:col-span-2 relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Buscar produtos, eventos, ingressos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <Select value={tipoFilter} onValueChange={setTipoFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os tipos</SelectItem>
                    <SelectItem value="evento">Eventos</SelectItem>
                    <SelectItem value="avulso">Produtos Avulsos</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os status</SelectItem>
                    <SelectItem value="ATIVO">Ativo</SelectItem>
                    <SelectItem value="INATIVO">Inativo</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={syncFilter} onValueChange={setSyncFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sincronização" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas as sincs</SelectItem>
                    <SelectItem value="SINCRONIZADO">Sincronizado</SelectItem>
                    <SelectItem value="PENDENTE">Pendente</SelectItem>
                    <SelectItem value="ERRO">Erro</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-2 mt-4">
                <Button className="flex-1">
                  <Search className="mr-2 h-4 w-4" />
                  Buscar
                </Button>
                {(searchTerm || statusFilter !== 'all' || syncFilter !== 'all' || tipoFilter !== 'all') && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchTerm('');
                      setStatusFilter('all');
                      setSyncFilter('all');
                      setTipoFilter('all');
                    }}
                  >
                    Limpar Filtros
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Barra de Ações em Massa */}
          {selectedItems.size > 0 && (
            <div className="fixed bottom-6 left-0 right-0 z-50 flex justify-center px-4">
              <Card className="bg-card shadow-2xl w-full max-w-4xl">
                <CardContent className="py-4 px-6">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold text-sm">
                        {selectedItems.size}
                      </div>
                      <span className="text-sm font-medium">
                        {selectedItems.size === 1 ? 'item selecionado' : 'itens selecionados'}
                      </span>
                    </div>
                    <div className="h-6 w-px bg-border" />
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" onClick={() => setSelectedItems(new Set())}>
                        Limpar Seleção
                      </Button>
                      <Button variant="destructive" size="sm">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Deletar Selecionados
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Lista Unificada */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                Produtos ({totalItems})
              </CardTitle>
              <CardDescription>
                {tipoFilter === 'evento' && 'Exibindo apenas eventos'}
                {tipoFilter === 'avulso' && 'Exibindo apenas produtos avulsos'}
                {tipoFilter === 'all' && 'Exibindo eventos e produtos avulsos'}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {/* Eventos */}
              {(tipoFilter === 'all' || tipoFilter === 'evento') && exampleEventos.map((evento) => (
                <div key={evento.id} className="border border-border rounded-lg overflow-hidden">
                  <div className="flex items-start gap-3 px-4 py-3 bg-card hover:bg-gray-100 transition-colors">
                    <Checkbox
                      checked={selectedItems.has(evento.id)}
                      onCheckedChange={() => toggleSelectItem(evento.id)}
                      className="mt-1"
                    />
                    <div onClick={() => toggleEventExpanded(evento.id)} className="flex-1 cursor-pointer">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-blue-400" />
                          <span className="font-semibold text-foreground">{evento.nome}</span>
                        </div>
                        {expandedEvents.has(evento.id) ? (
                          <ChevronDown className="w-5 h-5 text-muted-foreground" />
                        ) : (
                          <ChevronRight className="w-5 h-5 text-muted-foreground" />
                        )}
                      </div>

                      {evento.descricao && (
                        <div className="mb-2">
                          <p className={`text-sm text-muted-foreground ${!showFullDescription.has(evento.id) ? 'line-clamp-2' : ''}`}>
                            {evento.descricao}
                          </p>
                        </div>
                      )}

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          {evento.eventoDataInicio && (
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {new Date(evento.eventoDataInicio).toLocaleDateString('pt-BR')}
                            </span>
                          )}
                          {evento.eventoLocal && (
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {evento.eventoLocal}
                            </span>
                          )}
                          <span className="flex items-center gap-1">
                            <Ticket className="w-3 h-3" />
                            {evento.blinket.totalIngressos} ingressos, {evento.blinket.totalLotes} lotes
                          </span>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-sm text-muted-foreground">
                            R$ {evento.blinket.precoMinimo?.toFixed(2)} - R$ {evento.blinket.precoMaximo?.toFixed(2)}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            evento.status === 'ATIVO'
                              ? 'text-green-400 bg-green-500/20'
                              : 'text-muted-foreground bg-gray-500/20'
                          }`}>
                            {evento.status}
                          </span>
                          <Button variant="ghost" size="sm" className="h-8 px-2 text-red-400 hover:text-red-300 hover:bg-red-500/10">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Conteúdo Expandido */}
                  {expandedEvents.has(evento.id) && (
                    <div className="border-t border-border bg-gray-50 p-6">
                      {evento.ingressos.length > 0 ? (
                        <div className="space-y-6">
                          {evento.ingressos.map((ingresso) => (
                            <div key={ingresso.id} className="space-y-3">
                              <div className="flex items-center justify-between pb-2 border-b border-gray-300">
                                <div className="flex items-center gap-3">
                                  <Ticket className="w-5 h-5 text-blue-500" />
                                  <h3 className="font-semibold text-lg text-foreground">{ingresso.nome}</h3>
                                  {ingresso.isPaid && (
                                    <span className="px-2 py-0.5 rounded text-xs font-medium bg-yellow-500/20 text-yellow-600">
                                      Pago
                                    </span>
                                  )}
                                </div>
                                <span className="text-sm text-gray-600">
                                  {ingresso.lotes.length} lote{ingresso.lotes.length !== 1 ? 's' : ''}
                                </span>
                              </div>

                              <div className="pl-8">
                                <Table>
                                  <TableHeader>
                                    <TableRow className="border-gray-300">
                                      <TableHead className="text-gray-700">Lote</TableHead>
                                      <TableHead className="text-gray-700">Preço</TableHead>
                                      <TableHead className="text-gray-700">Vagas</TableHead>
                                      <TableHead className="text-gray-700">Período</TableHead>
                                      <TableHead className="text-gray-700">Status</TableHead>
                                    </TableRow>
                                  </TableHeader>
                                  <TableBody>
                                    {ingresso.lotes.map((lote) => (
                                      <TableRow
                                        key={lote.id}
                                        className={`border-gray-200 ${
                                          lote.isActive
                                            ? 'bg-white hover:bg-gray-50'
                                            : 'bg-gray-100 opacity-60'
                                        }`}
                                      >
                                        <TableCell>
                                          <div>
                                            <div className="font-medium text-foreground">{lote.nome}</div>
                                            <div className="flex items-center gap-2 text-xs text-gray-500">
                                              <span>ID: {lote.eduzzProductId}</span>
                                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-mono bg-green-500/20 text-green-700">
                                                <Check className="w-3 h-3" />
                                                Checkout OK
                                              </span>
                                            </div>
                                          </div>
                                        </TableCell>
                                        <TableCell>
                                          <span className="font-semibold text-green-600">
                                            R$ {lote.valor?.toFixed(2)}
                                          </span>
                                        </TableCell>
                                        <TableCell>
                                          <div className="flex items-center gap-1 text-gray-700">
                                            <Users className="w-4 h-4" />
                                            <span>{lote.quantidade}</span>
                                          </div>
                                        </TableCell>
                                        <TableCell>
                                          <div className="text-sm text-gray-600">
                                            <div>{new Date(lote.dataInicio).toLocaleDateString('pt-BR')}</div>
                                            <div className="text-xs">até {new Date(lote.dataFim).toLocaleDateString('pt-BR')}</div>
                                          </div>
                                        </TableCell>
                                        <TableCell>
                                          {lote.isActive ? (
                                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-700">
                                              Ativo
                                            </span>
                                          ) : (
                                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-500/20 text-red-600">
                                              Encerrado
                                            </span>
                                          )}
                                        </TableCell>
                                      </TableRow>
                                    ))}
                                  </TableBody>
                                </Table>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-center text-gray-500 py-8">Nenhum ingresso encontrado</p>
                      )}
                    </div>
                  )}
                </div>
              ))}

              {/* Produtos Avulsos */}
              {(tipoFilter === 'all' || tipoFilter === 'avulso') && exampleProdutosAvulsos.map((produto) => (
                <div key={produto.id} className="border border-border rounded-lg overflow-hidden">
                  <div className="flex items-start gap-3 px-4 py-3 bg-card hover:bg-gray-100 transition-colors">
                    <Checkbox
                      checked={selectedItems.has(produto.id)}
                      onCheckedChange={() => toggleSelectItem(produto.id)}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Package className="w-4 h-4 text-purple-400" />
                          <span className="font-semibold text-foreground">{produto.nome}</span>
                        </div>
                        <div className="w-5 h-5" />
                      </div>

                      {produto.descricao && (
                        <div className="mb-2">
                          <p className={`text-sm text-muted-foreground ${!showFullDescription.has(produto.id) ? 'line-clamp-2' : ''}`}>
                            {produto.descricao}
                          </p>
                        </div>
                      )}

                      <div className="flex items-center justify-between">
                        <div className="text-sm text-muted-foreground">
                          {!produto.descricao && (
                            <p className="text-gray-400 italic">Sem descrição</p>
                          )}
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-sm text-muted-foreground">
                            {formatPrice(produto.preco)}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            produto.status === 'ATIVO'
                              ? 'text-green-400 bg-green-500/20'
                              : 'text-muted-foreground bg-gray-500/20'
                          }`}>
                            {produto.status}
                          </span>
                          {produto.eduzzContentId && (
                            <span className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-mono bg-green-500/20 text-green-700">
                              <Check className="w-3 h-3" />
                              {produto.eduzzContentId}
                            </span>
                          )}
                          <Button variant="ghost" size="sm" className="h-8 px-2 text-red-400 hover:text-red-300 hover:bg-red-500/10">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {exampleEventos.length === 0 && exampleProdutosAvulsos.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  <Package className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>Nenhum produto encontrado com os filtros aplicados</p>
                </div>
              )}
            </CardContent>

            {totalItems > 0 && (
              <div className="border-t border-border px-6 py-4">
                <Pagination
                  currentPage={currentPage}
                  totalPages={getTotalPages()}
                  totalItems={totalItems}
                  itemsPerPage={itemsPerPage}
                  onPageChange={setCurrentPage}
                  onItemsPerPageChange={(value: number) => { setItemsPerPage(value); setCurrentPage(1); }}
                  itemsPerPageOptions={[5, 10, 20, 50, 100]}
                />
              </div>
            )}
          </Card>
        </div>
      </div>
    </>
  );
}
