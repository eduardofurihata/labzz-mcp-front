'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Webhook,
  CreditCard,
  Settings,
  Link2,
  CheckCircle2,
  XCircle,
  Clock,
  RefreshCw,
  Save,
  TestTube2,
  BookOpen,
  Shield,
  AlertCircle,
  ExternalLink,
  X,
  Plus,
  Edit,
  Trash2,
  Calendar,
  Info,
  Loader2,
} from 'lucide-react';
import { PageHeader } from '@/components/dashboard/layout/PageHeader';
import { PageContainer } from '@/components/dashboard/layout/PageContainer';

// ============================================================
// INTEGRAÇÃO TAB (inline)
// ============================================================
function IntegracaoTab() {
  const [loading, setLoading] = useState(false);
  const [testing, setTesting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null);
  const [showNewTokenInput, setShowNewTokenInput] = useState(false);
  const [bearerToken, setBearerToken] = useState('');

  // Dados de exemplo do status da configuração
  const configInfo = {
    hasClientId: true,
    clientIdPreview: 'edzpap_****...7f3a',
    lastSync: '2025-01-15T14:30:00Z',
    webhookUrl: 'https://api.seudominio.com/api/webhooks/eduzz',
  };

  const handleRemoveToken = () => {
    setShowNewTokenInput(true);
    setBearerToken('');
  };

  const handleSave = () => {
    if (!bearerToken) {
      setMessage({ type: 'error', text: 'Preencha o Bearer Token' });
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setMessage({ type: 'success', text: 'Bearer Token salvo com sucesso!' });
      setBearerToken('');
      setShowNewTokenInput(false);
      setLoading(false);
    }, 1000);
  };

  const handleTest = () => {
    setTesting(true);
    setMessage(null);
    setTimeout(() => {
      setMessage({ type: 'success', text: 'Conexão com a API Eduzz funcionando! (24 produtos encontrados)' });
      setTesting(false);
    }, 1500);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Link2 className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">Integração Eduzz</h2>
            <p className="text-sm text-muted-foreground">
              Configure suas credenciais da API Eduzz para sincronizar produtos e vendas
            </p>
          </div>
        </div>
      </div>

      {/* Grid de 2 colunas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Status da Configuração */}
        <Card className="border-border/50 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-primary" />
              </div>
              <div>
                <CardTitle className="text-base font-semibold text-foreground">
                  Status da Integração
                </CardTitle>
                <CardDescription className="text-xs mt-0.5">
                  Informações sobre a conexão com a API Eduzz
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between p-4 rounded-xl border border-border/50 bg-card hover:bg-muted/30 hover:border-border transition-all">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                  <Shield className="w-4 h-4 text-primary" />
                </div>
                <span className="text-sm font-medium text-foreground">Bearer Token</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <span className="text-sm text-muted-foreground">Configurado</span>
                <span className="text-xs text-muted-foreground/60 ml-1">
                  ({configInfo.clientIdPreview})
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 rounded-xl border border-border/50 bg-card hover:bg-muted/30 hover:border-border transition-all">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                  <Clock className="w-4 h-4 text-primary" />
                </div>
                <span className="text-sm font-medium text-foreground">Última Sincronização</span>
              </div>
              <span className="text-sm text-muted-foreground">
                {new Date(configInfo.lastSync).toLocaleString('pt-BR')}
              </span>
            </div>

            <div className="p-4 rounded-xl border border-border/50 bg-card">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                  <Link2 className="w-4 h-4 text-primary" />
                </div>
                <span className="text-sm font-medium text-foreground">Webhook URL</span>
              </div>
              <code className="text-xs bg-muted/30 border border-border/50 px-3 py-2 rounded-lg block break-all text-muted-foreground font-mono">
                {configInfo.webhookUrl}
              </code>
            </div>
          </CardContent>
        </Card>

        {/* Formulário de Configuração */}
        <Card className="border-border/50 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                <Shield className="w-5 h-5 text-primary" />
              </div>
              <div>
                <CardTitle className="text-base font-semibold text-foreground">
                  Configuração do Token
                </CardTitle>
                <CardDescription className="text-xs mt-0.5">
                  Insira o Bearer Token obtido no portal de desenvolvedores da Eduzz
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="bearerToken" className="text-sm font-medium text-foreground">
                Bearer Token
              </Label>

              {configInfo.hasClientId && !showNewTokenInput ? (
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2 px-4 py-3 rounded-xl border border-border/50 bg-gradient-to-br from-muted/30 to-muted/10 flex-1">
                    <Shield className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-sm font-mono text-foreground">
                      {configInfo.clientIdPreview}
                    </span>
                    <span className="text-xs text-muted-foreground ml-auto">
                      Token configurado
                    </span>
                  </div>
                  <Button variant="outline" size="sm" onClick={handleRemoveToken} className="flex-shrink-0 hover:bg-muted/50">
                    <X className="w-4 h-4 mr-1" />
                    Alterar
                  </Button>
                </div>
              ) : (
                <>
                  <Input
                    id="bearerToken"
                    type="password"
                    placeholder="edzpap_..."
                    value={bearerToken}
                    onChange={(e) => setBearerToken(e.target.value)}
                    className="border-border"
                  />
                  <p className="text-xs text-muted-foreground">
                    Token de acesso da API Eduzz (começa com &quot;edzpap_&quot;)
                  </p>
                </>
              )}
            </div>

            <div className="p-4 rounded-xl border border-border/50 bg-gradient-to-br from-muted/20 to-muted/10">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center flex-shrink-0">
                  <Shield className="w-4 h-4 text-primary" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-foreground">Segurança</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    O token é criptografado (AES-256-GCM) antes de ser salvo no banco de dados e nunca é exposto publicamente.
                  </p>
                </div>
              </div>
            </div>

            {/* Botões de Ação */}
            <div className="flex flex-wrap gap-3 pt-2">
              {(!configInfo.hasClientId || showNewTokenInput) && (
                <Button onClick={handleSave} disabled={loading}>
                  {loading ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Salvando...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Salvar Token
                    </>
                  )}
                </Button>
              )}

              {configInfo.hasClientId && !showNewTokenInput && (
                <Button onClick={handleTest} disabled={testing} variant="outline">
                  {testing ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Testando...
                    </>
                  ) : (
                    <>
                      <TestTube2 className="w-4 h-4 mr-2" />
                      Testar Conexão
                    </>
                  )}
                </Button>
              )}

              {showNewTokenInput && (
                <Button
                  onClick={() => { setShowNewTokenInput(false); setBearerToken(''); }}
                  variant="ghost"
                >
                  Cancelar
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Mensagens */}
      {message && (
        <Card
          className={`shadow-sm ${
            message.type === 'success'
              ? 'border-green-500/50 bg-gradient-to-br from-green-500/10 to-green-500/5'
              : message.type === 'error'
              ? 'border-red-500/50 bg-gradient-to-br from-red-500/10 to-red-500/5'
              : 'border-blue-500/50 bg-gradient-to-br from-blue-500/10 to-blue-500/5'
          }`}
        >
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              {message.type === 'success' ? (
                <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              ) : message.type === 'error' ? (
                <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
              )}
              <p
                className={`text-sm font-medium ${
                  message.type === 'success'
                    ? 'text-green-600 dark:text-green-400'
                    : message.type === 'error'
                    ? 'text-red-600 dark:text-red-400'
                    : 'text-blue-600 dark:text-blue-400'
                }`}
              >
                {message.text}
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Documentação */}
      <Card className="border-border/50 shadow-sm">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-base font-semibold">Documentação</CardTitle>
              <CardDescription className="text-xs mt-0.5">
                Links úteis para configuração da integração
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <a
              href="https://developers.eduzz.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 rounded-xl border border-border/50 hover:bg-muted/30 hover:border-border transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Portal do Desenvolvedor</p>
                  <p className="text-xs text-muted-foreground">Obtenha seu Bearer Token</p>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </a>

            <a
              href="https://api.eduzz.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 rounded-xl border border-border/50 hover:bg-muted/30 hover:border-border transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                  <Link2 className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">API Base URL</p>
                  <p className="text-xs text-muted-foreground">Endpoint da API v1</p>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </a>

            <div className="p-4 rounded-xl bg-gradient-to-br from-muted/30 to-muted/10 border border-border/50">
              <p className="text-xs text-muted-foreground mb-2 font-medium">Formato de autenticação:</p>
              <code className="text-xs bg-background/50 px-3 py-2 rounded-lg block font-mono border border-border/50">
                Authorization: Bearer edzpap_...
              </code>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// ============================================================
// PARCELAMENTO TAB (inline)
// ============================================================

interface RegraParcelamento {
  id: string;
  diasAteEvento: number;
  maxParcelas: number;
}

function ParcelamentoTab() {
  const [regras, setRegras] = useState<RegraParcelamento[]>([
    { id: 'r1', diasAteEvento: 90, maxParcelas: 12 },
    { id: 'r2', diasAteEvento: 30, maxParcelas: 6 },
    { id: 'r3', diasAteEvento: 7, maxParcelas: 3 },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRegra, setEditingRegra] = useState<RegraParcelamento | null>(null);
  const [formData, setFormData] = useState({ diasAteEvento: '', maxParcelas: '' });
  const [showHowItWorksModal, setShowHowItWorksModal] = useState(false);

  const handleEdit = (regra: RegraParcelamento) => {
    setEditingRegra(regra);
    setFormData({ diasAteEvento: regra.diasAteEvento.toString(), maxParcelas: regra.maxParcelas.toString() });
    setIsModalOpen(true);
  };

  const openCreateModal = () => {
    setEditingRegra(null);
    setFormData({ diasAteEvento: '', maxParcelas: '' });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingRegra(null);
    setFormData({ diasAteEvento: '', maxParcelas: '' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    closeModal();
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <CreditCard className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">Regras de Parcelamento</h2>
              <p className="text-sm text-muted-foreground">
                Configure quantas parcelas são permitidas baseado na antecedência do evento
              </p>
            </div>
          </div>
        </div>
        <div className="flex gap-2 flex-shrink-0">
          <Button variant="outline" onClick={() => setShowHowItWorksModal(true)} className="hover:bg-muted/50">
            <Info className="w-4 h-4 mr-2" />
            Como funciona
          </Button>
          <Button onClick={openCreateModal}>
            <Plus className="w-4 h-4 mr-2" />
            Nova Regra
          </Button>
        </div>
      </div>

      {/* Regras List */}
      <Card className="border-border/50 shadow-sm">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-base font-semibold">Regras Configuradas</CardTitle>
              <CardDescription className="text-xs mt-0.5">
                {regras.length} regra(s) configurada(s)
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {regras.map((regra) => (
              <div
                key={regra.id}
                className="flex items-center justify-between p-4 rounded-xl border border-border/50 hover:bg-muted/30 hover:border-border transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">
                      {regra.diasAteEvento}+ dias antes do evento
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Permite até {regra.maxParcelas}x sem juros
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => handleEdit(regra)} className="hover:bg-muted/50">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="hover:bg-red-50 dark:hover:bg-red-950/20 hover:border-red-200 dark:hover:border-red-900">
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Modal de Criar/Editar */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={closeModal} />
          <Card className="relative w-full max-w-md border-border/50 shadow-2xl">
            <CardHeader className="border-b border-border/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                    {editingRegra ? <Edit className="w-5 h-5 text-primary" /> : <Plus className="w-5 h-5 text-primary" />}
                  </div>
                  <div>
                    <CardTitle className="text-base">
                      {editingRegra ? 'Editar Regra' : 'Nova Regra'}
                    </CardTitle>
                    <CardDescription className="text-xs mt-0.5">
                      {editingRegra ? 'Atualize os valores da regra de parcelamento' : 'Configure uma nova regra de parcelamento'}
                    </CardDescription>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={closeModal} className="h-8 w-8 p-0 hover:bg-muted/50">
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>

            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-5 pt-6">
                <div className="space-y-2">
                  <Label htmlFor="diasAteEvento" className="flex items-center gap-2 text-sm font-medium">
                    <Calendar className="w-4 h-4 text-primary" />
                    Dias antes do evento
                  </Label>
                  <Input
                    id="diasAteEvento"
                    type="number"
                    min="0"
                    value={formData.diasAteEvento}
                    onChange={(e) => setFormData({ ...formData, diasAteEvento: e.target.value })}
                    placeholder="Ex: 90"
                    required
                    className="border-border/50"
                  />
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Produtos com esta antecedência ou mais aplicarão esta regra
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="maxParcelas" className="flex items-center gap-2 text-sm font-medium">
                    <CreditCard className="w-4 h-4 text-primary" />
                    Máximo de parcelas
                  </Label>
                  <Input
                    id="maxParcelas"
                    type="number"
                    min="1"
                    max="24"
                    value={formData.maxParcelas}
                    onChange={(e) => setFormData({ ...formData, maxParcelas: e.target.value })}
                    placeholder="Ex: 12"
                    required
                    className="border-border/50"
                  />
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Número máximo de parcelas permitidas (1-24)
                  </p>
                </div>

                <div className="flex gap-3 pt-4 border-t border-border/50">
                  <Button type="button" variant="outline" onClick={closeModal} className="flex-1 hover:bg-muted/50">
                    Cancelar
                  </Button>
                  <Button type="submit" className="flex-1">
                    {editingRegra ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 mr-2" />
                        Atualizar
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4 mr-2" />
                        Criar
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </form>
          </Card>
        </div>
      )}

      {/* Modal "Como funciona" */}
      {showHowItWorksModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowHowItWorksModal(false)} />
          <Card className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto border-border/50 shadow-2xl">
            <CardHeader className="border-b border-border/50 sticky top-0 bg-card z-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                    <Info className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Como funciona o Parcelamento</CardTitle>
                    <CardDescription className="text-xs mt-0.5">
                      Entenda como as regras são aplicadas aos seus produtos
                    </CardDescription>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setShowHowItWorksModal(false)} className="h-8 w-8 p-0 hover:bg-muted/50">
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>

            <CardContent className="pt-6 space-y-6">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center text-sm font-semibold text-primary">1</div>
                  <h3 className="font-semibold text-foreground">Conceito Principal</h3>
                </div>
                <div className="pl-11 space-y-3">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    As regras de parcelamento definem quantas parcelas são permitidas baseado em
                    <span className="font-semibold text-foreground"> quantos dias faltam para a data do produto</span>.
                  </p>
                  <div className="p-4 rounded-xl bg-gradient-to-br from-muted/30 to-muted/10 border border-border/50">
                    <p className="text-sm text-foreground leading-relaxed">
                      <span className="font-semibold">Exemplo prático:</span> Se você criar uma regra
                      &quot;90+ dias = 12x&quot;, produtos com 90 dias ou mais de antecedência permitirão até 12 parcelas.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center text-sm font-semibold text-primary">2</div>
                  <h3 className="font-semibold text-foreground">Exemplo com Regras</h3>
                </div>
                <div className="pl-11 space-y-2">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-muted/30 to-muted/10 border border-border/50">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-foreground">90+ dias antes</span>
                      <span className="text-sm text-muted-foreground">até 12x</span>
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-gradient-to-br from-muted/30 to-muted/10 border border-border/50">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-foreground">30+ dias antes</span>
                      <span className="text-sm text-muted-foreground">até 6x</span>
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-gradient-to-br from-muted/30 to-muted/10 border border-border/50">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-foreground">7+ dias antes</span>
                      <span className="text-sm text-muted-foreground">até 3x</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>

            <div className="border-t border-border/50 p-6 bg-muted/20 sticky bottom-0">
              <Button onClick={() => setShowHowItWorksModal(false)} className="w-full">
                Entendi
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}

// ============================================================
// MAIN PAGE: Configurações com Tabs
// ============================================================
export default function ConfiguracoesPage() {
  const [activeTab, setActiveTab] = useState<'integracao' | 'parcelamento'>('integracao');

  return (
    <>
      <PageHeader
        icon={Settings}
        breadcrumbs={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Configurações' }
        ]}
        title="Configurações"
        subtitle="Gerencie as integrações e configurações do sistema"
      />

      <PageContainer>
        <div className="space-y-8">
          {/* Tabs */}
          <div className="flex gap-2">
            <Button
              variant={activeTab === 'integracao' ? 'default' : 'outline'}
              onClick={() => setActiveTab('integracao')}
              className="gap-2"
            >
              <Webhook className="w-4 h-4" />
              Integração
            </Button>
            <Button
              variant={activeTab === 'parcelamento' ? 'default' : 'outline'}
              onClick={() => setActiveTab('parcelamento')}
              className="gap-2"
            >
              <CreditCard className="w-4 h-4" />
              Parcelamento
            </Button>
          </div>

          {/* Tab Content */}
          {activeTab === 'integracao' && <IntegracaoTab />}
          {activeTab === 'parcelamento' && <ParcelamentoTab />}
        </div>
      </PageContainer>
    </>
  );
}
