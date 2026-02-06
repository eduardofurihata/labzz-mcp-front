'use client';

import { useState } from 'react';
import { CheckCircle, Mail, Phone, Clock, ArrowRight, Share2 } from 'lucide-react';

// Dados de exemplo da compra
const exampleOrderData = {
  transactionId: 'TXN-2025-001234',
  productName: 'Workshop Marketing Digital 2025 - Ingresso VIP',
  customerName: 'Maria Silva',
  customerEmail: 'maria@email.com',
};

export default function ObrigadoPage() {
  const [orderData] = useState(exampleOrderData);

  const shareOnWhatsApp = () => {
    const message = `Acabei de garantir minha vaga! ${orderData.productName}`;
    const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <main className="min-h-screen bg-neutral-950 relative overflow-hidden">
      {/* Accent glow */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full blur-[150px]"
        style={{ backgroundColor: '#06b6d4', opacity: 0.1 }}
      />

      <div className="container relative z-10 px-4 sm:px-6 py-12 sm:py-20">
        {/* Success Icon */}
        <div className="text-center mb-8 animate-scale-in">
          <div className="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 mb-6 shadow-lg shadow-green-500/50">
            <CheckCircle className="w-12 h-12 sm:w-14 sm:h-14 text-white" />
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 font-heading">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-500">
              Parabéns!
            </span>
            <br />
            <span className="text-white">Compra Realizada</span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto">
            Sua inscrição foi confirmada com sucesso!
          </p>
        </div>

        {/* Order Details Card */}
        <div className="max-w-3xl mx-auto mb-8">
          <div className="bg-neutral-900/80 backdrop-blur-sm border border-neutral-800 rounded-2xl p-6 sm:p-8 shadow-xl">
            {/* Customer Info */}
            <div className="mb-6 pb-6 border-b border-neutral-800">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                Detalhes da Compra
              </h2>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center shrink-0">
                    <span className="text-cyan-400 font-bold text-lg">
                      {orderData.customerName.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Nome</p>
                    <p className="text-white font-medium">{orderData.customerName}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-gray-400">
                  <Mail className="w-5 h-5 text-cyan-500" />
                  <span className="text-sm">{orderData.customerEmail}</span>
                </div>

                <div className="flex items-center gap-3 text-gray-400">
                  <div className="text-xs">
                    <span className="text-gray-500">ID da Transacao:</span>{' '}
                    <span className="font-mono text-cyan-400">{orderData.transactionId}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Next Steps */}
            <div>
              <h3 className="text-lg font-bold text-white mb-4">Próximos Passos</h3>

              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center shrink-0">
                    <span className="text-cyan-400 font-bold text-sm">1</span>
                  </div>
                  <div>
                    <p className="text-white font-medium mb-1">Verifique seu e-mail</p>
                    <p className="text-sm text-gray-400">
                      Enviamos um e-mail de confirmação com todos os detalhes da sua compra e instruções de acesso.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center shrink-0">
                    <span className="text-cyan-400 font-bold text-sm">2</span>
                  </div>
                  <div>
                    <p className="text-white font-medium mb-1">Acesse sua area de membros</p>
                    <p className="text-sm text-gray-400">
                      Você receberá as credenciais de acesso à plataforma em alguns minutos.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center shrink-0">
                    <span className="text-cyan-400 font-bold text-sm">3</span>
                  </div>
                  <div>
                    <p className="text-white font-medium mb-1">Prepare-se para o evento</p>
                    <p className="text-sm text-gray-400">
                      Fique atento as informações sobre data, horário e local do evento.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          <button
            onClick={shareOnWhatsApp}
            className="group flex items-center justify-center gap-2 px-6 py-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl transition-all shadow-lg hover:shadow-green-600/25"
          >
            <Share2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
            Compartilhar no WhatsApp
          </button>

          <a
            href="/"
            className="group flex items-center justify-center gap-2 px-6 py-4 bg-neutral-800 hover:bg-neutral-700 text-white font-semibold rounded-xl transition-all border border-neutral-700"
          >
            Voltar para Home
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* Important Info */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-xl p-6">
            <h3 className="text-lg font-bold text-cyan-400 mb-3 flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Informações Importantes
            </h3>

            <ul className="space-y-2 text-sm text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 mt-1">-</span>
                <span>O acesso ao conteúdo será liberado automaticamente após a confirmação do pagamento</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 mt-1">-</span>
                <span>Pagamentos via boleto podem levar até 3 dias úteis para compensação</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 mt-1">-</span>
                <span>Em caso de dúvidas, entre em contato com nosso suporte</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 mt-1">-</span>
                <span>Guarde este e-mail de confirmação para referência futura</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Support Section */}
        <div className="max-w-3xl mx-auto mt-12 text-center">
          <p className="text-gray-400 mb-4">Precisa de ajuda?</p>
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
            <a
              href="mailto:suporte@exemplo.com"
              className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              <Mail className="w-4 h-4" />
              suporte@exemplo.com
            </a>
            <a
              href="https://wa.me/5511999999999"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              <Phone className="w-4 h-4" />
              (11) 99999-9999
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
