// Exemplo de página de criação/edição
// Pattern: Formulário completo com seções, validação visual e ações
// Layout: dashboard-layout

'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import {
  FileText,
  Save,
  RefreshCw,
  ArrowLeft,
  Info,
  ChevronRight,
  Home,
  ImageIcon,
  Tag,
  Settings,
} from 'lucide-react';

// Dados de exemplo para edição (quando editando item existente)
const exampleItem = {
  id: 'item-001',
  nome: 'Curso Completo de Marketing Digital',
  slug: 'curso-marketing-digital',
  descricao: 'Aprenda as melhores estratégias de marketing digital para alavancar suas vendas online.',
  categoria: 'curso',
  status: 'RASCUNHO',
  preco: '297.00',
  imagem: '',
  destaque: true,
  metaTitle: 'Curso de Marketing Digital | Orbita Builder',
  metaDescription: 'O curso mais completo de marketing digital do mercado.',
};

export default function CreateEditExamplePage() {
  // Estado do formulário
  const [formData, setFormData] = useState(exampleItem);
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Atualizar campo
  const handleFieldChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Limpar erro do campo ao editar
    if (errors[field]) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  // Gerar slug automaticamente
  const generateSlug = (nome: string) => {
    return nome
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  };

  // Validar formulário
  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.nome.trim()) newErrors.nome = 'O nome é obrigatório';
    if (!formData.slug.trim()) newErrors.slug = 'O slug é obrigatório';
    if (!formData.categoria) newErrors.categoria = 'Selecione uma categoria';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Salvar
  const handleSave = async () => {
    if (!validate()) return;

    try {
      setIsSaving(true);
      // Simulação de salvamento
      await new Promise(resolve => setTimeout(resolve, 1500));
      // Em produção: await api.post('/api/items', formData) ou api.put(...)
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      {/* Page Header com breadcrumb e ações */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="container max-w-[1600px] mx-auto px-8 py-6">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <a href="/dashboard" className="hover:text-foreground transition-colors flex items-center gap-1">
              <Home className="h-4 w-4" />
              Dashboard
            </a>
            <ChevronRight className="h-4 w-4" />
            <a href="/dashboard/produtos" className="hover:text-foreground transition-colors">
              Produtos
            </a>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground font-medium">
              {formData.id ? 'Editar Produto' : 'Novo Produto'}
            </span>
          </nav>

          {/* Título + Ações */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <a
                href="/dashboard/produtos"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                Voltar
              </a>
              <div>
                <h1 className="text-2xl font-bold text-foreground flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  {formData.id ? 'Editar Produto' : 'Novo Produto'}
                </h1>
                <p className="text-sm text-muted-foreground mt-1">
                  {formData.id
                    ? 'Atualize as informações do produto'
                    : 'Preencha as informações para criar um novo produto'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="outline" asChild>
                <a href="/dashboard/produtos">Cancelar</a>
              </Button>
              <Button onClick={handleSave} disabled={isSaving}>
                {isSaving ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Salvando...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    {formData.id ? 'Salvar Alterações' : 'Criar Produto'}
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Conteúdo do formulário */}
      <div className="container max-w-[1600px] mx-auto px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Coluna principal (2/3) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Seção: Informações Básicas */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Info className="h-5 w-5 text-primary" />
                  Informações Básicas
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Nome */}
                <div>
                  <Label htmlFor="nome">Nome do Produto *</Label>
                  <Input
                    id="nome"
                    value={formData.nome}
                    onChange={(e) => {
                      handleFieldChange('nome', e.target.value);
                      if (!formData.id) {
                        handleFieldChange('slug', generateSlug(e.target.value));
                      }
                    }}
                    placeholder="Ex: Curso Completo de Marketing Digital"
                    className={`mt-1 ${errors.nome ? 'border-destructive' : ''}`}
                  />
                  {errors.nome && (
                    <p className="text-xs text-destructive mt-1">{errors.nome}</p>
                  )}
                </div>

                {/* Slug */}
                <div>
                  <Label htmlFor="slug">Slug (URL) *</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm text-muted-foreground whitespace-nowrap">
                      /vendas/
                    </span>
                    <Input
                      id="slug"
                      value={formData.slug}
                      onChange={(e) => handleFieldChange('slug', e.target.value)}
                      placeholder="curso-marketing-digital"
                      className={errors.slug ? 'border-destructive' : ''}
                    />
                  </div>
                  {errors.slug && (
                    <p className="text-xs text-destructive mt-1">{errors.slug}</p>
                  )}
                  <p className="text-xs text-muted-foreground mt-1">
                    Apenas letras minúsculas, números e hífens. Usado na URL pública.
                  </p>
                </div>

                {/* Descrição */}
                <div>
                  <Label htmlFor="descricao">Descrição</Label>
                  <Textarea
                    id="descricao"
                    value={formData.descricao}
                    onChange={(e) => handleFieldChange('descricao', e.target.value)}
                    placeholder="Descreva o produto em detalhes..."
                    rows={4}
                    className="mt-1"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Esta descrição será exibida na landing page do produto
                  </p>
                </div>

                {/* Categoria */}
                <div>
                  <Label htmlFor="categoria">Categoria *</Label>
                  <Select
                    value={formData.categoria}
                    onValueChange={(value) => handleFieldChange('categoria', value)}
                  >
                    <SelectTrigger className={`mt-1 ${errors.categoria ? 'border-destructive' : ''}`}>
                      <SelectValue placeholder="Selecione uma categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="curso">Curso Online</SelectItem>
                      <SelectItem value="evento">Evento Presencial</SelectItem>
                      <SelectItem value="mentoria">Mentoria</SelectItem>
                      <SelectItem value="ebook">E-book</SelectItem>
                      <SelectItem value="outro">Outro</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.categoria && (
                    <p className="text-xs text-destructive mt-1">{errors.categoria}</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Seção: Preço e Imagem */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Tag className="h-5 w-5 text-primary" />
                  Preço e Mídia
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Preço */}
                <div>
                  <Label htmlFor="preco">Preço (R$)</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm text-muted-foreground">R$</span>
                    <Input
                      id="preco"
                      type="number"
                      step="0.01"
                      min="0"
                      value={formData.preco}
                      onChange={(e) => handleFieldChange('preco', e.target.value)}
                      placeholder="0.00"
                    />
                  </div>
                </div>

                {/* Imagem */}
                <div>
                  <Label htmlFor="imagem">URL da Imagem</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <ImageIcon className="h-4 w-4 text-muted-foreground" />
                    <Input
                      id="imagem"
                      value={formData.imagem}
                      onChange={(e) => handleFieldChange('imagem', e.target.value)}
                      placeholder="https://exemplo.com/imagem.jpg"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Imagem de capa do produto (recomendado: 1200x630px)
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Seção: SEO */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Settings className="h-5 w-5 text-primary" />
                  SEO e Meta Tags
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="metaTitle">Meta Title</Label>
                  <Input
                    id="metaTitle"
                    value={formData.metaTitle}
                    onChange={(e) => handleFieldChange('metaTitle', e.target.value)}
                    placeholder="Título para mecanismos de busca"
                    className="mt-1"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    {formData.metaTitle.length}/60 caracteres (recomendado)
                  </p>
                </div>

                <div>
                  <Label htmlFor="metaDescription">Meta Description</Label>
                  <Textarea
                    id="metaDescription"
                    value={formData.metaDescription}
                    onChange={(e) => handleFieldChange('metaDescription', e.target.value)}
                    placeholder="Descrição para mecanismos de busca"
                    rows={2}
                    className="mt-1"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    {formData.metaDescription.length}/160 caracteres (recomendado)
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar (1/3) */}
          <div className="space-y-6">
            {/* Status */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Publicação</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) => handleFieldChange('status', value)}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="RASCUNHO">Rascunho</SelectItem>
                      <SelectItem value="ATIVO">Ativo</SelectItem>
                      <SelectItem value="INATIVO">Inativo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Destaque */}
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Produto em Destaque</Label>
                    <p className="text-xs text-muted-foreground">
                      Exibir na seção de destaques
                    </p>
                  </div>
                  <Switch
                    checked={formData.destaque}
                    onCheckedChange={(checked) => handleFieldChange('destaque', checked)}
                  />
                </div>

                {/* Botão de salvar (mobile/sidebar) */}
                <Button onClick={handleSave} disabled={isSaving} className="w-full">
                  {isSaving ? (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      Salvando...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      {formData.id ? 'Salvar Alterações' : 'Criar Produto'}
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Info box */}
            {formData.id && (
              <Card className="bg-muted/50">
                <CardContent className="pt-6">
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-muted-foreground">ID do Produto</p>
                      <p className="text-sm font-mono text-foreground">{formData.id}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">URL Pública</p>
                      <p className="text-sm text-primary break-all">
                        /vendas/{formData.slug}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Dicas */}
            <Card className="border-blue-500/20 bg-blue-500/5">
              <CardContent className="pt-6">
                <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Info className="h-4 w-4 text-blue-500" />
                  Dicas
                </h4>
                <ul className="space-y-2 text-xs text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <div className="w-1 h-1 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />
                    Use um título claro e objetivo para melhor conversão
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1 h-1 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />
                    A descrição deve destacar os benefícios do produto
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1 h-1 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />
                    Imagens de alta qualidade aumentam a taxa de conversão
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
