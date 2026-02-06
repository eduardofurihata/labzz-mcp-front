'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import {
  UserPlus,
  Search,
  Edit2,
  Trash2,
  Mail,
  Shield,
  CheckCircle2,
  XCircle,
  Calendar,
  Eye,
  EyeOff,
  Users
} from 'lucide-react';
import { PageHeader } from '@/components/dashboard/layout/PageHeader';
import { PageContainer } from '@/components/dashboard/layout/PageContainer';
import { Badge } from '@/components/ui/badge';

interface User {
  id: string;
  nome: string;
  email: string;
  role: string;
  status: string;
  createdAt: string;
}

// Dados de exemplo
const exampleUsers: User[] = [
  { id: 'u1', nome: 'Carlos Administrador', email: 'carlos@empresa.com', role: 'ADMIN_MASTER', status: 'ATIVO', createdAt: '2024-06-15T10:00:00Z' },
  { id: 'u2', nome: 'Maria Gerente', email: 'maria@empresa.com', role: 'ADMIN', status: 'ATIVO', createdAt: '2024-08-20T14:00:00Z' },
  { id: 'u3', nome: 'João Vendedor', email: 'joao@empresa.com', role: 'VENDEDOR', status: 'ATIVO', createdAt: '2024-10-05T09:00:00Z' },
  { id: 'u4', nome: 'Ana Vendedora', email: 'ana@empresa.com', role: 'VENDEDOR', status: 'ATIVO', createdAt: '2024-11-12T11:00:00Z' },
  { id: 'u5', nome: 'Pedro Ex-Vendedor', email: 'pedro@empresa.com', role: 'VENDEDOR', status: 'INATIVO', createdAt: '2024-07-01T08:00:00Z' },
];

export default function UsuariosPage() {
  const [users] = useState<User[]>(exampleUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    password: '',
    role: 'VENDEDOR',
  });
  const [submitting, setSubmitting] = useState(false);

  const openEditModal = (user: User) => {
    setSelectedUser(user);
    setFormData({ nome: user.nome, email: user.email, password: '', role: user.role });
    setShowEditModal(true);
  };

  const openDeleteModal = (user: User) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const stats = {
    total: users.length,
    active: users.filter(u => u.status === 'ATIVO').length,
    admins: users.filter(u => ['ADMIN', 'ADMIN_MASTER', 'SUPER_ADMIN'].includes(u.role)).length,
    vendedores: users.filter(u => u.role === 'VENDEDOR').length,
  };

  const getRoleBadge = (role: string) => {
    const config = {
      SUPER_ADMIN: { variant: 'default' as const, label: 'Super Admin', icon: Shield },
      ADMIN_MASTER: { variant: 'default' as const, label: 'Admin Master', icon: Shield },
      ADMIN: { variant: 'secondary' as const, label: 'Admin', icon: Shield },
      VENDEDOR: { variant: 'outline' as const, label: 'Vendedor', icon: UserPlus },
    };
    const roleConfig = config[role as keyof typeof config] || config.VENDEDOR;
    const Icon = roleConfig.icon;
    return (
      <Badge variant={roleConfig.variant} className="gap-1">
        <Icon className="h-3 w-3" />
        {roleConfig.label}
      </Badge>
    );
  };

  const getStatusBadge = (status: string) => {
    return status === 'ATIVO' ? (
      <Badge variant="success" className="gap-1">
        <CheckCircle2 className="h-3 w-3" />
        Ativo
      </Badge>
    ) : (
      <Badge variant="destructive" className="gap-1">
        <XCircle className="h-3 w-3" />
        Inativo
      </Badge>
    );
  };

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setShowCreateModal(false);
      setFormData({ nome: '', email: '', password: '', role: 'VENDEDOR' });
    }, 1000);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setShowEditModal(false);
      setSelectedUser(null);
    }, 1000);
  };

  const handleDeleteUser = () => {
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setShowDeleteModal(false);
      setSelectedUser(null);
    }, 1000);
  };

  return (
    <>
      <PageHeader
        icon={Users}
        breadcrumbs={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Usuários' }
        ]}
        title="Gerenciamento de Usuários"
        subtitle="Gerencie usuários, permissões e acessos do sistema"
        actions={
          <Button onClick={() => setShowCreateModal(true)}>
            <UserPlus className="mr-2 h-4 w-4" />
            Novo Usuário
          </Button>
        }
      />

      <PageContainer>
        <div className="space-y-6">
          {/* Métricas */}
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total de Usuários</CardTitle>
                <UserPlus className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.total}</div>
                <p className="text-xs text-muted-foreground">usuários cadastrados</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Usuários Ativos</CardTitle>
                <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.active}</div>
                <p className="text-xs text-muted-foreground">com acesso ativo</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Administradores</CardTitle>
                <Shield className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.admins}</div>
                <p className="text-xs text-muted-foreground">com permissões admin</p>
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
                  <select
                    value={roleFilter}
                    onChange={(e) => setRoleFilter(e.target.value)}
                    className="w-[180px] rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    <option value="all">Todas as funções</option>
                    <option value="SUPER_ADMIN">Super Admin</option>
                    <option value="ADMIN_MASTER">Admin Master</option>
                    <option value="ADMIN">Admin</option>
                    <option value="VENDEDOR">Vendedor</option>
                  </select>

                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-[150px] rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    <option value="all">Todos status</option>
                    <option value="ATIVO">Ativos</option>
                    <option value="INATIVO">Inativos</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tabela de Usuários */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Lista de Usuários</CardTitle>
                  <CardDescription className="mt-1">
                    {filteredUsers.length} usuário(s) encontrado(s)
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {filteredUsers.length === 0 ? (
                <div className="text-center py-12">
                  <div className="mx-auto h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-4">
                    <UserPlus className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">
                    Nenhum usuário encontrado
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground max-w-sm mx-auto">
                    {searchTerm || roleFilter !== 'all' || statusFilter !== 'all'
                      ? 'Tente ajustar os filtros de busca'
                      : 'Comece criando seu primeiro usuário no sistema'}
                  </p>
                  {!searchTerm && roleFilter === 'all' && statusFilter === 'all' && (
                    <Button className="mt-4" onClick={() => setShowCreateModal(true)}>
                      <UserPlus className="mr-2 h-4 w-4" />
                      Criar Primeiro Usuário
                    </Button>
                  )}
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Usuário</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Email</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Função</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Criado em</th>
                        <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsers.map((user) => (
                        <tr key={user.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-3">
                              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center border border-primary/20">
                                <span className="text-sm font-semibold text-primary">
                                  {user.nome.charAt(0).toUpperCase()}
                                </span>
                              </div>
                              <div>
                                <div className="text-sm font-medium text-foreground">{user.nome}</div>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Mail className="h-4 w-4" />
                              {user.email}
                            </div>
                          </td>
                          <td className="py-4 px-4">{getRoleBadge(user.role)}</td>
                          <td className="py-4 px-4">{getStatusBadge(user.status)}</td>
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Calendar className="h-4 w-4" />
                              {new Date(user.createdAt).toLocaleDateString('pt-BR')}
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex items-center justify-end gap-2">
                              <Button variant="ghost" size="icon" onClick={() => openEditModal(user)} title="Editar usuário">
                                <Edit2 className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" onClick={() => openDeleteModal(user)} title="Desativar usuário" className="text-destructive hover:text-destructive">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </PageContainer>

      {/* Create User Modal */}
      <Dialog open={showCreateModal} onOpenChange={setShowCreateModal}>
        <DialogContent onClose={() => setShowCreateModal(false)}>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <UserPlus className="h-5 w-5" />
              Criar Novo Usuário
            </DialogTitle>
            <DialogDescription>
              Preencha as informações para criar um novo usuário no sistema
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleCreateSubmit}>
            <div className="space-y-4">
              <div>
                <Label htmlFor="nome" className="flex items-center gap-2">
                  <UserPlus className="h-4 w-4" />
                  Nome Completo
                </Label>
                <Input
                  id="nome"
                  value={formData.nome}
                  onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                  required
                  placeholder="Ex: João Silva"
                  className="mt-1.5"
                />
              </div>

              <div>
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  placeholder="joao@empresa.com"
                  className="mt-1.5"
                />
                <p className="text-xs text-muted-foreground mt-1">Será usado para login no sistema</p>
              </div>

              <div>
                <Label htmlFor="password" className="flex items-center gap-2">
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  Senha
                </Label>
                <div className="relative mt-1.5">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                    minLength={6}
                    placeholder="Mínimo 6 caracteres"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Mínimo de 6 caracteres</p>
              </div>

              <div>
                <Label htmlFor="role" className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Função no Sistema
                </Label>
                <select
                  id="role"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  required
                  className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="VENDEDOR">Vendedor - Acesso básico</option>
                  <option value="ADMIN">Admin - Gerenciamento completo</option>
                  <option value="ADMIN_MASTER">Admin Master - Controle total</option>
                </select>
                <p className="text-xs text-muted-foreground mt-1">Define as permissões de acesso</p>
              </div>
            </div>

            <DialogFooter className="mt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => { setShowCreateModal(false); setShowPassword(false); }}
                disabled={submitting}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={submitting}>
                {submitting ? 'Criando...' : 'Criar Usuário'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit User Modal */}
      <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
        <DialogContent onClose={() => setShowEditModal(false)}>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Edit2 className="h-5 w-5" />
              Editar Usuário
            </DialogTitle>
            <DialogDescription>Atualize as informações do usuário</DialogDescription>
          </DialogHeader>

          <form onSubmit={handleEditSubmit}>
            <div className="space-y-4">
              <div>
                <Label htmlFor="edit-nome" className="flex items-center gap-2">
                  <UserPlus className="h-4 w-4" />
                  Nome Completo
                </Label>
                <Input
                  id="edit-nome"
                  value={formData.nome}
                  onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                  required
                  className="mt-1.5"
                />
              </div>

              <div>
                <Label htmlFor="edit-email" className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email
                </Label>
                <Input
                  id="edit-email"
                  type="email"
                  value={formData.email}
                  disabled
                  className="mt-1.5 opacity-50 cursor-not-allowed"
                />
                <p className="text-xs text-muted-foreground mt-1">O email não pode ser alterado</p>
              </div>

              <div>
                <Label htmlFor="edit-password" className="flex items-center gap-2">
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  Nova Senha (opcional)
                </Label>
                <div className="relative mt-1.5">
                  <Input
                    id="edit-password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    minLength={6}
                    placeholder="Deixe em branco para manter"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <div>
                <Label htmlFor="edit-role" className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Função no Sistema
                </Label>
                <select
                  id="edit-role"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  required
                  className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="VENDEDOR">Vendedor - Acesso básico</option>
                  <option value="ADMIN">Admin - Gerenciamento completo</option>
                  <option value="ADMIN_MASTER">Admin Master - Controle total</option>
                </select>
              </div>
            </div>

            <DialogFooter className="mt-6">
              <Button type="button" variant="outline" onClick={() => { setShowEditModal(false); setShowPassword(false); }} disabled={submitting}>
                Cancelar
              </Button>
              <Button type="submit" disabled={submitting}>
                {submitting ? 'Salvando...' : 'Salvar Alterações'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete User Modal */}
      <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
        <DialogContent onClose={() => setShowDeleteModal(false)}>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-destructive">
              <XCircle className="h-5 w-5" />
              Desativar Usuário
            </DialogTitle>
            <DialogDescription>Esta ação desativará o acesso do usuário ao sistema</DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-4">
              <p className="text-sm text-foreground">Você está prestes a desativar o usuário:</p>
              <div className="mt-3 flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center border border-primary/20">
                  <span className="text-sm font-semibold text-primary">
                    {selectedUser?.nome.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-foreground">{selectedUser?.nome}</p>
                  <p className="text-sm text-muted-foreground">{selectedUser?.email}</p>
                </div>
              </div>
            </div>

            <div className="mt-4 space-y-2">
              <p className="text-sm text-muted-foreground flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 mt-0.5 flex-shrink-0" />
                O usuário não poderá mais fazer login no sistema
              </p>
              <p className="text-sm text-muted-foreground flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 mt-0.5 flex-shrink-0" />
                Os dados do usuário serão mantidos
              </p>
              <p className="text-sm text-muted-foreground flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 mt-0.5 flex-shrink-0" />
                Esta ação pode ser revertida posteriormente
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setShowDeleteModal(false)} disabled={submitting}>
              Cancelar
            </Button>
            <Button type="button" variant="destructive" onClick={handleDeleteUser} disabled={submitting}>
              {submitting ? 'Desativando...' : 'Desativar Usuário'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
