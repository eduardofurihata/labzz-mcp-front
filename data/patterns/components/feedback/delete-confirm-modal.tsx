'use client';

import { AlertTriangle, Info, RefreshCw, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  type: 'evento' | 'ingresso' | 'lote' | 'massa' | 'landingpage';
  nome: string;
  produtosCount: number;
  step: 1 | 2;
  deleting: boolean;
  onCancel: () => void;
  onContinue: () => void;
  onConfirm: () => void;
}

export function DeleteConfirmModal({
  isOpen,
  type,
  nome,
  produtosCount,
  step,
  deleting,
  onCancel,
  onContinue,
  onConfirm,
}: DeleteConfirmModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onCancel}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-foreground">
            <AlertTriangle className="w-5 h-5 text-muted-foreground" />
            {step === 1 ? 'Confirmar Exclusão' : 'Confirmação Final'}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {step === 1 ? (
            <>
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  Você está prestes a excluir permanentemente:
                </p>

                <div className="rounded-lg border border-border bg-muted/50 p-4">
                  <div className="flex items-start gap-3">
                    <Info className="w-5 h-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                    <div className="space-y-2 flex-1">
                      <p className="font-medium text-foreground">
                        {type === 'massa' && `${produtosCount} ${produtosCount === 1 ? 'item selecionado' : 'itens selecionados'}`}
                        {type === 'evento' && nome}
                        {type === 'ingresso' && nome}
                        {type === 'lote' && nome}
                        {type === 'landingpage' && nome}
                      </p>

                      {type !== 'massa' && type !== 'landingpage' && (
                        <p className="text-sm text-muted-foreground">
                          {type === 'evento' && 'Evento completo'}
                          {type === 'ingresso' && 'Ingresso completo'}
                          {type === 'lote' && 'Lote individual'}
                        </p>
                      )}

                      {type !== 'landingpage' && (
                        <div className="pt-2 border-t border-border">
                          <p className="text-xs text-muted-foreground">
                            Total de produtos afetados: <span className="font-medium text-foreground">{produtosCount}</span>
                          </p>
                        </div>
                      )}

                      {type === 'landingpage' && (
                        <div className="pt-2 border-t border-border">
                          <p className="text-xs text-muted-foreground">
                            Landing page e todas as suas configurações serão removidas
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border border-border bg-background p-3">
                  <p className="text-xs text-muted-foreground">
                    Esta ação não pode ser desfeita. Os dados serão permanentemente removidos do sistema.
                  </p>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="space-y-4">
                <div className="rounded-lg border-2 border-border bg-muted/30 p-4">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-6 h-6 text-muted-foreground mt-0.5 flex-shrink-0" />
                    <div className="space-y-3 flex-1">
                      <div>
                        <p className="font-semibold text-foreground mb-1">
                          Última confirmação necessária
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {type === 'massa' ? (
                            <>
                              Confirme que deseja excluir <span className="font-medium text-foreground">{produtosCount} {produtosCount === 1 ? 'item' : 'itens'}</span> permanentemente.
                            </>
                          ) : (
                            <>
                              Confirme que deseja excluir <span className="font-medium text-foreground">{nome}</span> permanentemente.
                            </>
                          )}
                        </p>
                      </div>

                      <div className="space-y-2 pt-2 border-t border-border">
                        <div className="flex items-start gap-2">
                          <div className="w-1 h-1 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
                          <p className="text-xs text-muted-foreground">
                            Todos os dados serão permanentemente removidos
                          </p>
                        </div>
                        <div className="flex items-start gap-2">
                          <div className="w-1 h-1 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
                          <p className="text-xs text-muted-foreground">
                            Esta ação é irreversível e não pode ser desfeita
                          </p>
                        </div>
                        <div className="flex items-start gap-2">
                          <div className="w-1 h-1 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
                          <p className="text-xs text-muted-foreground">
                            Não há backup ou forma de recuperação
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        <DialogFooter className="gap-2 mt-6">
          <Button
            variant="outline"
            onClick={onCancel}
            disabled={deleting}
          >
            Cancelar
          </Button>
          {step === 1 ? (
            <Button
              variant="default"
              onClick={onContinue}
            >
              Continuar
            </Button>
          ) : (
            <Button
              variant="destructive"
              onClick={onConfirm}
              disabled={deleting}
            >
              {deleting ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Excluindo...
                </>
              ) : (
                <>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Confirmar Exclusão
                </>
              )}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
