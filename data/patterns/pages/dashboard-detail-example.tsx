// Exemplo de página de detalhe de item
// Pattern: Visualização completa com seções, status, timeline e ações
// Layout: dashboard-layout

'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Clock,
  ArrowLeft,
  ChevronRight,
  Home,
  Edit,
  Trash2,
  ExternalLink,
  MessageSquare,
  DollarSign,
  Tag,
  Activity,
  CheckCircle,
  AlertCircle,
  RefreshCw,
} from 'lucide-react';

// Dados de exemplo do lead
const exampleLead = {
  id: 'lead-001',
  nome: 'Maria Santos',
  email: 'maria.santos@email.com',
  telefone: '(11) 99999-8888',
  origem: 'Landing Page - Marketing Digital',
  status: 'qualificado',
  dataCadastro: '2026-01-15T10:30:00',
  ultimaInteracao: '2026-02-03T14:20:00',
  produto: 'Curso Completo de Marketing Digital',
  valorPotencial: 'R$ 1.497,00',
  cidade: 'São Paulo - SP',
  observacoes: 'Lead muito interessado, já participou do webinar gratuito.',
  tags: ['hot-lead', 'webinar', 'marketing'],
};

// Histórico de interações
const exampleTimeline = [
  {
    id: '1',
    tipo: 'cadastro',
    descricao: 'Lead capturado via Landing Page',
    data: '2026-01-15T10:30:00',
    icon: User,
    color: 'text-blue-500',
  },
  {
    id: '2',
    tipo: 'email',
    descricao: 'E-mail de boas-vindas enviado automaticamente',
    data: '2026-01-15T10:31:00',
    icon: Mail,
    color: 'text-green-500',
  },
  {
    id: '3',
    tipo: 'interacao',
    descricao: 'Abriu o e-mail de boas-vindas',
    data: '2026-01-15T14:22:00',
    icon: CheckCircle,
    color: 'text-green-500',
  },
  {
    id: '4',
    tipo: 'nota',
    descricao: 'Entrou em contato perguntando sobre formas de pagamento',
    data: '2026-01-20T09:15:00',
    icon: MessageSquare,
    color: 'text-purple-500',
  },
  {
    id: '5',
    tipo: 'status',
    descricao: 'Status alterado para "Qualificado"',
    data: '2026-01-20T09:30:00',
    icon: Activity,
    color: 'text-yellow-500',
  },
  {
    id: '6',
    tipo: 'interacao',
    descricao: 'Participou do webinar ao vivo',
    data: '2026-02-03T14:20:00',
    icon: CheckCircle,
    color: 'text-green-500',
  },
];

// Helper de status
const getStatusBadge = (status: string) => {
  const map: Record<string, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' }> = {
    novo: { label: 'Novo', variant: 'secondary' },
    contactado: { label: 'Contactado', variant: 'outline' },
    qualificado: { label: 'Qualificado', variant: 'default' },
    convertido: { label: 'Convertido', variant: 'default' },
    perdido: { label: 'Perdido', variant: 'destructive' },
  };
  const config = map[status] || { label: status, variant: 'outline' as const };
  return <Badge variant={config.variant}>{config.label}</Badge>;
};

// Helper de data
const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};

const formatDateTime = (dateStr: string) => {
  return new Date(dateStr).toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export default function DetailExamplePage() {
  const lead = exampleLead;
  const timeline = exampleTimeline;
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleting, setDeleting] = useState(false);

  return (
    <>
      {/* Page Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="container max-w-[1600px] mx-auto px-8 py-6">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <a href="/dashboard" className="hover:text-foreground transition-colors flex items-center gap-1">
              <Home className="h-4 w-4" />
              Dashboard
            </a>
            <ChevronRight className="h-4 w-4" />
            <a href="/dashboard/leads" className="hover:text-foreground transition-colors">
              Leads
            </a>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground font-medium">{lead.nome}</span>
          </nav>

          {/* Título + Ações */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <a
                href="/dashboard/leads"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                Voltar
              </a>
              <div className="flex items-center gap-3">
                {/* Avatar */}
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-lg font-bold text-primary">
                    {lead.nome.charAt(0)}
                  </span>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-foreground flex items-center gap-3">
                    {lead.nome}
                    {getStatusBadge(lead.status)}
                  </h1>
                  <p className="text-sm text-muted-foreground">{lead.email}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Edit className="mr-2 h-4 w-4" />
                Editar
              </Button>
              <Button variant="outline" size="sm" className="text-destructive hover:text-destructive" onClick={() => setShowDeleteDialog(true)}>
                <Trash2 className="mr-2 h-4 w-4" />
                Excluir
              </Button>
              <Button size="sm">
                <DollarSign className="mr-2 h-4 w-4" />
                Converter em Venda
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Conteúdo */}
      <div className="container max-w-[1600px] mx-auto px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Coluna principal (2/3) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Informações do Lead */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <User className="h-5 w-5 text-primary" />
                  Informações do Lead
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Nome Completo</p>
                      <p className="text-sm font-medium text-foreground">{lead.nome}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">E-mail</p>
                      <a href={`mailto:${lead.email}`} className="text-sm text-primary hover:underline flex items-center gap-1">
                        <Mail className="h-3.5 w-3.5" />
                        {lead.email}
                      </a>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Telefone</p>
                      <p className="text-sm font-medium text-foreground flex items-center gap-1">
                        <Phone className="h-3.5 w-3.5 text-muted-foreground" />
                        {lead.telefone}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Localização</p>
                      <p className="text-sm font-medium text-foreground flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                        {lead.cidade}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Origem</p>
                      <p className="text-sm font-medium text-foreground flex items-center gap-1">
                        <ExternalLink className="h-3.5 w-3.5 text-muted-foreground" />
                        {lead.origem}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Produto de Interesse</p>
                      <p className="text-sm font-medium text-foreground flex items-center gap-1">
                        <Tag className="h-3.5 w-3.5 text-muted-foreground" />
                        {lead.produto}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Observações */}
                {lead.observacoes && (
                  <>
                    <Separator className="my-6" />
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Observações</p>
                      <p className="text-sm text-foreground bg-muted/50 rounded-lg p-3">
                        {lead.observacoes}
                      </p>
                    </div>
                  </>
                )}

                {/* Tags */}
                {lead.tags.length > 0 && (
                  <>
                    <Separator className="my-6" />
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Tags</p>
                      <div className="flex flex-wrap gap-2">
                        {lead.tags.map(tag => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Timeline de Interações */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Activity className="h-5 w-5 text-primary" />
                  Histórico de Interações
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-1">
                  {timeline.map((item, index) => {
                    const Icon = item.icon;
                    const isLast = index === timeline.length - 1;

                    return (
                      <div key={item.id} className="flex gap-4">
                        {/* Linha vertical + ícone */}
                        <div className="flex flex-col items-center">
                          <div className={`w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0`}>
                            <Icon className={`h-4 w-4 ${item.color}`} />
                          </div>
                          {!isLast && (
                            <div className="w-px h-full bg-border min-h-[24px]" />
                          )}
                        </div>

                        {/* Conteúdo */}
                        <div className="pb-6">
                          <p className="text-sm font-medium text-foreground">
                            {item.descricao}
                          </p>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {formatDateTime(item.data)}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar (1/3) */}
          <div className="space-y-6">
            {/* Resumo Rápido */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Resumo</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Status</span>
                  {getStatusBadge(lead.status)}
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Valor Potencial</span>
                  <span className="text-sm font-semibold text-green-600">{lead.valorPotencial}</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Cadastrado em</span>
                  <span className="text-sm text-foreground flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    {formatDate(lead.dataCadastro)}
                  </span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Última interação</span>
                  <span className="text-sm text-foreground flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    {formatDate(lead.ultimaInteracao)}
                  </span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Interações</span>
                  <span className="text-sm font-medium text-foreground">{timeline.length}</span>
                </div>
              </CardContent>
            </Card>

            {/* Ações Rápidas */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Ações Rápidas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <Mail className="mr-2 h-4 w-4" />
                  Enviar E-mail
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Adicionar Nota
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Phone className="mr-2 h-4 w-4" />
                  Registrar Ligação
                </Button>
                <Button className="w-full justify-start">
                  <DollarSign className="mr-2 h-4 w-4" />
                  Converter em Venda
                </Button>
              </CardContent>
            </Card>

            {/* Alerta */}
            <Card className="border-yellow-500/20 bg-yellow-500/5">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Lead quente</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Este lead participou do webinar recentemente. Considere entrar em contato nos próximos dias.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Modal de Confirmação de Exclusão */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Trash2 className="h-5 w-5 text-destructive" />
              Excluir Lead
            </DialogTitle>
            <DialogDescription>
              Tem certeza que deseja excluir o lead <strong>{lead.nome}</strong>? Esta ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
              Cancelar
            </Button>
            <Button
              variant="destructive"
              disabled={deleting}
              onClick={async () => {
                setDeleting(true);
                // Em produção: await api.delete(`/api/leads/${lead.id}`)
                await new Promise(r => setTimeout(r, 1000));
                setDeleting(false);
                setShowDeleteDialog(false);
              }}
            >
              {deleting ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Excluindo...
                </>
              ) : (
                'Confirmar Exclusão'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
