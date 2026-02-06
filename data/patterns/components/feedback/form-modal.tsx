'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

// Exemplo de interface de dados
interface ItemData {
  id: string;
  nome: string;
  descricao: string | null;
}

interface FormModalProps {
  isOpen: boolean;
  onClose: () => void;
  item?: ItemData | null;
  onSave: (data: { nome: string; descricao: string }) => Promise<void>;
  title?: string;
  description?: string;
}

export function FormModal({
  isOpen,
  onClose,
  item,
  onSave,
  title = 'Editar Item',
  description = 'Atualize as informações do item',
}: FormModalProps) {
  const [saving, setSaving] = useState(false);
  const [nome, setNome] = useState(item?.nome || '');
  const [descricao, setDescricao] = useState(item?.descricao || '');

  const handleSave = async () => {
    if (!nome.trim()) return;

    try {
      setSaving(true);
      await onSave({ nome: nome.trim(), descricao: descricao.trim() });
      onClose();
    } catch (error) {
      // Tratar erro (ex: toast de erro)
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Nome */}
          <div>
            <Label htmlFor="nome">Nome</Label>
            <Input
              id="nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Ex: Nome do item"
              className="mt-1"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Este nome será exibido publicamente
            </p>
          </div>

          {/* Descrição */}
          <div>
            <Label htmlFor="descricao">Descrição (Opcional)</Label>
            <Textarea
              id="descricao"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              placeholder="Adicione detalhes sobre este item..."
              rows={4}
              className="mt-1"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Adicione informações extras que ajudem na identificação
            </p>
          </div>

          {/* Info do item existente */}
          {item && (
            <div className="bg-muted/50 border border-border rounded-lg p-3">
              <p className="text-xs text-muted-foreground">
                <span className="font-medium text-foreground">ID:</span> {item.id}
              </p>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={saving}>
            Cancelar
          </Button>
          <Button onClick={handleSave} disabled={saving || !nome.trim()}>
            {saving ? 'Salvando...' : 'Salvar Alterações'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
