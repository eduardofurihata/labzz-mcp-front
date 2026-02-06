'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import {
  Users,
  Mail,
  Phone,
  Calendar,
  Tag,
  Download,
  Search,
  UserCheck,
  UserPlus,
  CheckCircle2,
  XCircle,
  Globe,
  MessageSquare
} from 'lucide-react';
import { PageHeader } from '@/components/dashboard/layout/PageHeader';
import { PageContainer } from '@/components/dashboard/layout/PageContainer';
import { Pagination } from '@/components/dashboard/data-display/Pagination';

interface Lead {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  cpf: string;
  status: string;
  origem: string;
  score: number;
  produto?: {
    id: string;
    nome: string;
  };
  evento?: {
    id: string;
    nome: string;
    dataInicio: string;
  };
  createdAt: string;
  metadata?: {
    utmSource?: string;
    utmMedium?: string;
    utmCampaign?: string;
  };
}

// Dados de exemplo
const exampleLeads: Lead[] = [
  {
    id: '1',
    nome: 'Maria Silva',
    email: 'maria@email.com',
    telefone: '(11) 99999-1234',
    cpf: '123.456.789-00',
    status: 'NOVO',
    origem: 'LANDING_PAGE',
    score: 85,
    produto: { id: 'p1', nome: 'Curso de Marketing Digital' },
    createdAt: '2025-01-15T10:30:00Z',
    metadata: { utmSource: 'google', utmMedium: 'cpc', utmCampaign: 'marketing-2025' },
  },
  {
    id: '2',
    nome: 'João Santos',
    email: 'joao@email.com',
    telefone: '(21) 98888-5678',
    cpf: '987.654.321-00',
    status: 'QUALIFICADO',
    origem: 'WHATSAPP',
    score: 72,
    produto: { id: 'p2', nome: 'Mentoria Premium' },
    createdAt: '2025-01-14T14:00:00Z',
  },
  {
    id: '3',
    nome: 'Ana Oliveira',
    email: 'ana@email.com',
    telefone: '(31) 97777-9012',
    cpf: '456.789.123-00',
    status: 'CONVERTIDO',
    origem: 'LANDING_PAGE',
    score: 95,
    produto: { id: 'p3', nome: 'E-book Vendas Online' },
    evento: { id: 'e1', nome: 'Workshop Vendas 2025', dataInicio: '2025-03-15T09:00:00Z' },
    createdAt: '2025-01-13T09:15:00Z',
    metadata: { utmSource: 'instagram', utmMedium: 'social' },
  },
  {
    id: '4',
    nome: 'Carlos Ferreira',
    email: 'carlos@email.com',
    telefone: '(41) 96666-3456',
    cpf: '321.654.987-00',
    status: 'PERDIDO',
    origem: 'EMAIL',
    score: 30,
    produto: { id: 'p1', nome: 'Curso de Marketing Digital' },
    createdAt: '2025-01-12T16:45:00Z',
  },
  {
    id: '5',
    nome: 'Patricia Lima',
    email: 'patricia@email.com',
    telefone: '(51) 95555-7890',
    cpf: '654.321.987-00',
    status: 'NOVO',
    origem: 'MANUAL',
    score: 60,
    createdAt: '2025-01-11T11:20:00Z',
  },
  {
    id: '6',
    nome: 'Roberto Almeida',
    email: 'roberto@email.com',
    telefone: '(61) 94444-2345',
    cpf: '789.123.456-00',
    status: 'QUALIFICADO',
    origem: 'LANDING_PAGE',
    score: 78,
    produto: { id: 'p2', nome: 'Mentoria Premium' },
    createdAt: '2025-01-10T08:00:00Z',
    metadata: { utmSource: 'facebook', utmMedium: 'cpc' },
  },
];

export default function LeadsPage() {
  const [leads] = useState<Lead[]>(exampleLeads);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [origemFilter, setOrigemFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Estatísticas calculadas dos dados
  const stats = {
    total: leads.length,
    novos: leads.filter(l => l.status === 'NOVO').length,
    qualificados: leads.filter(l => l.status === 'QUALIFICADO').length,
    convertidos: leads.filter(l => l.status === 'CONVERTIDO').length,
  };

  const getStatusBadge = (status: string) => {
    const config = {
      NOVO: {
        variant: 'default' as const,
        icon: UserPlus,
        label: 'Novo'
      },
      QUALIFICADO: {
        variant: 'secondary' as const,
        icon: UserCheck,
        label: 'Qualificado'
      },
      CONVERTIDO: {
        variant: 'success' as const,
        icon: CheckCircle2,
        label: 'Convertido'
      },
      PERDIDO: {
        variant: 'destructive' as const,
        icon: XCircle,
        label: 'Perdido'
      },
    };

    const statusConfig = config[status as keyof typeof config] || {
      variant: 'outline' as const,
      icon: Tag,
      label: status
    };

    const Icon = statusConfig.icon;

    return (
      <Badge variant={statusConfig.variant} className="gap-1">
        <Icon className="h-3 w-3" />
        {statusConfig.label}
      </Badge>
    );
  };

  const getOrigemIcon = (origem: string) => {
    const icons: Record<string, JSX.Element> = {
      LANDING_PAGE: <Globe className="w-4 h-4" />,
      WHATSAPP: <MessageSquare className="w-4 h-4" />,
      EMAIL: <Mail className="w-4 h-4" />,
      MANUAL: <Users className="w-4 h-4" />,
    };
    return icons[origem] || <Tag className="w-4 h-4" />;
  };

  const getOrigemLabel = (origem: string) => {
    const labels: Record<string, string> = {
      LANDING_PAGE: 'Landing Page',
      WHATSAPP: 'WhatsApp',
      EMAIL: 'Email',
      MANUAL: 'Manual',
    };
    return labels[origem] || origem;
  };

  const filteredLeads = leads.filter(lead => {
    const matchesSearch =
      lead.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
    const matchesOrigem = origemFilter === 'all' || lead.origem === origemFilter;

    return matchesSearch && matchesStatus && matchesOrigem;
  });

  // Paginação
  const totalPages = Math.ceil(filteredLeads.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedLeads = filteredLeads.slice(startIndex, endIndex);

  // Reset para página 1 quando filtros mudarem
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter, origemFilter]);

  const exportToCSV = () => {
    const headers = ['Nome', 'Email', 'Telefone', 'Status', 'Origem', 'Produto', 'Evento', 'Data'];
    const rows = filteredLeads.map(lead => [
      lead.nome,
      lead.email,
      lead.telefone,
      lead.status,
      lead.origem,
      lead.produto?.nome || '-',
      lead.evento?.nome || '-',
      new Date(lead.createdAt).toLocaleDateString('pt-BR'),
    ]);

    const csv = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `leads-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  return (
    <>
      <PageHeader
        icon={MessageSquare}
        breadcrumbs={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Leads' }
        ]}
        title="Gerenciamento de Leads"
        subtitle="Gerencie seus leads e oportunidades de vendas"
        actions={
          <Button onClick={exportToCSV} variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Exportar CSV
          </Button>
        }
      />

      <PageContainer>
        <div className="space-y-6">
          {/* Métricas */}
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total de Leads
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.total}</div>
                <p className="text-xs text-muted-foreground">
                  leads cadastrados
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Novos
                </CardTitle>
                <UserPlus className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.novos}</div>
                <p className="text-xs text-muted-foreground">
                  aguardando contato
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Qualificados
                </CardTitle>
                <UserCheck className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.qualificados}</div>
                <p className="text-xs text-muted-foreground">
                  em negociação
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Filtros e Busca */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Buscar por nome ou email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <div className="flex gap-2">
                  <Select
                    value={statusFilter}
                    onValueChange={setStatusFilter}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Todos os status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos os status</SelectItem>
                      <SelectItem value="NOVO">Novo</SelectItem>
                      <SelectItem value="QUALIFICADO">Qualificado</SelectItem>
                      <SelectItem value="CONVERTIDO">Convertido</SelectItem>
                      <SelectItem value="PERDIDO">Perdido</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select
                    value={origemFilter}
                    onValueChange={setOrigemFilter}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Todas as origens" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas as origens</SelectItem>
                      <SelectItem value="LANDING_PAGE">Landing Page</SelectItem>
                      <SelectItem value="WHATSAPP">WhatsApp</SelectItem>
                      <SelectItem value="EMAIL">Email</SelectItem>
                      <SelectItem value="MANUAL">Manual</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tabela de Leads */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Lista de Leads</CardTitle>
                  <CardDescription className="mt-1">
                    {filteredLeads.length} lead(s) encontrado(s)
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {filteredLeads.length === 0 ? (
                <div className="text-center py-12">
                  <div className="mx-auto h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-4">
                    <Users className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">
                    Nenhum lead encontrado
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground max-w-sm mx-auto">
                    {searchTerm || statusFilter !== 'all' || origemFilter !== 'all'
                      ? 'Tente ajustar os filtros de busca'
                      : 'Seus leads aparecerão aqui quando forem capturados'}
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                          Lead
                        </th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                          Contato
                        </th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                          Produto/Evento
                        </th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                          Status
                        </th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                          Origem
                        </th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                          Score
                        </th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                          Data
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedLeads.map((lead) => (
                        <tr
                          key={lead.id}
                          className="border-b border-border hover:bg-muted/50 transition-colors"
                        >
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-3">
                              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center border border-primary/20">
                                <span className="text-sm font-semibold text-primary">
                                  {lead.nome.charAt(0).toUpperCase()}
                                </span>
                              </div>
                              <div>
                                <div className="text-sm font-medium text-foreground">
                                  {lead.nome}
                                </div>
                                {lead.metadata?.utmSource && (
                                  <div className="text-xs text-muted-foreground">
                                    UTM: {lead.metadata.utmSource}
                                  </div>
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Mail className="h-4 w-4" />
                                {lead.email}
                              </div>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Phone className="h-4 w-4" />
                                {lead.telefone}
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <div className="space-y-1">
                              {lead.produto && (
                                <div className="text-sm font-medium text-foreground">
                                  {lead.produto.nome}
                                </div>
                              )}
                              {lead.evento && (
                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                  <Calendar className="h-3 w-3" />
                                  {lead.evento.nome}
                                </div>
                              )}
                              {!lead.produto && !lead.evento && (
                                <span className="text-sm text-muted-foreground">-</span>
                              )}
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            {getStatusBadge(lead.status)}
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              {getOrigemIcon(lead.origem)}
                              {getOrigemLabel(lead.origem)}
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-2">
                              <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-gradient-to-r from-primary to-primary/60 transition-all"
                                  style={{ width: `${lead.score}%` }}
                                />
                              </div>
                              <span className="text-sm text-muted-foreground font-medium min-w-[2rem]">
                                {lead.score}
                              </span>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Calendar className="h-4 w-4" />
                              {new Date(lead.createdAt).toLocaleDateString('pt-BR')}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Paginação */}
              {filteredLeads.length > 0 && (
                <div className="mt-6 pt-6 border-t border-border">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    totalItems={filteredLeads.length}
                    itemsPerPage={itemsPerPage}
                    onPageChange={setCurrentPage}
                    onItemsPerPageChange={(items: number) => {
                      setItemsPerPage(items);
                      setCurrentPage(1);
                    }}
                    itemsPerPageOptions={[10, 25, 50, 100]}
                  />
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </PageContainer>
    </>
  );
}
