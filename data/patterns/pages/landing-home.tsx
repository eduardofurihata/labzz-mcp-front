'use client';

import { useState } from 'react';
import { Quote } from 'lucide-react';
import * as LucideIcons from 'lucide-react';

// Dados de exemplo da landing page
const landingPageData = {
  nome: 'Workshop Marketing Digital 2025',
  corPrimaria: '#06b6d4',
  corSecundaria: '#8b5cf6',
  theme: 'dark' as const,
  topTagEnabled: true,
  topTagText: 'VAGAS LIMITADAS',
  topTagColor: '#06b6d4',
  logoEnabled: false,
  logoUrl: null,
  heroTitle: 'MARKETING DIGITAL 2025',
  heroSubtitle: 'O maior evento de marketing digital do Brasil',
  heroDescription: 'Aprenda as estratégias mais avançadas de marketing digital com os maiores especialistas do mercado.',
  heroCta: 'GARANTIR MINHA VAGA',
  benefitsTitle: 'Por que Participar',
  benefitsSubtitle: 'Descubra o que torna este evento único',
  benefitsCards: [
    { icon: 'Trophy', title: 'Conteúdo Premium', subtitle: '+40 palestras', description: 'Acesso a conteúdos exclusivos com os maiores especialistas do mercado digital.' },
    { icon: 'Users', title: 'Networking', subtitle: '+2000 participantes', description: 'Conecte-se com profissionais de todo o Brasil e amplie sua rede de contatos.' },
    { icon: 'Zap', title: 'Resultados Rápidos', subtitle: 'Método comprovado', description: 'Estratégias práticas que você pode implementar imediatamente no seu negócio.' },
    { icon: 'Shield', title: 'Certificado', subtitle: 'Reconhecido', description: 'Receba um certificado de participação reconhecido pelo mercado.' },
  ],
  benefitsCtaEnabled: true,
  benefitsCtaText: 'Mais de 10.000 alunos formados',
  benefitsCtaIcon: 'Trophy',
  plansTitle: 'Escolha seu ingresso',
  plansDescription: 'Selecione o melhor plano para você',
  produtos: [
    { id: 'p1', nome: 'Ingresso Standard', preco: 197.00, beneficios: ['Acesso ao evento', 'Material digital', 'Certificado'], destaque: false },
    { id: 'p2', nome: 'Ingresso VIP', preco: 397.00, beneficios: ['Tudo do Standard', 'Área VIP exclusiva', 'Meet & Greet', 'Bônus especiais'], destaque: true },
    { id: 'p3', nome: 'Ingresso Premium', preco: 997.00, beneficios: ['Tudo do VIP', 'Mentoria em grupo', 'Acesso vitalício', 'Grupo exclusivo'], destaque: false },
  ],
  testimonialsTitle: 'O que dizem nossos Alunos',
  testimonialsSubtitle: 'Depoimentos reais de quem já participou',
  testimonials: [
    { name: 'Maria Silva', role: 'Empreendedora Digital', text: 'O evento mudou completamente minha visão sobre marketing digital. As estratégias que aprendi triplicaram minhas vendas em apenas 3 meses.', stars: 5 },
    { name: 'João Santos', role: 'CEO - Agência Digital', text: 'Conteúdo de altíssima qualidade. Os palestrantes são referência no mercado e o networking é incrível. Recomendo fortemente!', stars: 5 },
    { name: 'Ana Oliveira', role: 'Gestora de Tráfego', text: 'Já participei de diversos eventos, mas este superou todas as expectativas. O nível de profundidade e praticidade é incomparável.', stars: 5 },
  ],
  statsCards: [
    { number: '10.000+', title: 'Alunos Formados' },
    { number: '98%', title: 'Taxa de Satisfação' },
    { number: '4.9/5', title: 'Avaliação Média' },
  ],
  footerText: '2025 Workshop Marketing Digital. Todos os direitos reservados.',
};

export default function LandingHomePage() {
  const [effectiveTheme] = useState<'dark' | 'light'>(landingPageData.theme);
  const lp = landingPageData;

  const scrollToPlans = () => {
    const plansSection = document.getElementById('plans-section');
    if (plansSection) {
      plansSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main
      className={`min-h-screen ${effectiveTheme === 'dark' ? 'bg-neutral-950' : 'bg-white'}`}
      style={{
        '--color-primary': lp.corPrimaria,
        '--color-secondary': lp.corSecundaria || lp.corPrimaria,
      } as React.CSSProperties}
    >
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-start justify-center overflow-hidden pt-16 sm:pt-20">
        {/* Accent glow */}
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[300px] sm:w-[400px] md:w-[600px] h-[300px] sm:h-[400px] md:h-[600px] rounded-full blur-[100px] sm:blur-[120px] md:blur-[150px]"
          style={{ backgroundColor: lp.corPrimaria, opacity: 0.1 }}
        />

        <div className="container relative z-10 text-center px-4 sm:px-6">
          {/* Badge do topo */}
          {lp.topTagEnabled && lp.topTagText && (
            <div className="animate-fade-in">
              <span
                className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 mb-3 sm:mb-4 text-xs sm:text-sm font-medium tracking-wider uppercase rounded-full"
                style={{
                  border: `1px solid ${lp.topTagColor || lp.corPrimaria}30`,
                  color: lp.topTagColor || lp.corPrimaria,
                  backgroundColor: `${lp.topTagColor || lp.corPrimaria}10`,
                }}
              >
                {lp.topTagText}
              </span>
            </div>
          )}

          {/* Titulo */}
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-4 sm:mb-6 animate-slide-up font-heading px-2">
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(135deg, ${lp.corPrimaria} 0%, ${lp.corPrimaria}dd 100%)`,
              }}
            >
              {(lp.heroTitle || 'EVENTO').split(' ')[0]}
            </span>
            <span className={effectiveTheme === 'dark' ? 'text-white' : 'text-gray-900'}>
              {' ' + (lp.heroTitle || 'EVENTO').split(' ').slice(1).join(' ')}
            </span>
          </h1>

          {/* Subtitulo */}
          {lp.heroSubtitle && (
            <p
              className={`text-base sm:text-lg md:text-xl lg:text-2xl max-w-2xl mx-auto mb-3 sm:mb-4 animate-slide-up px-4 ${effectiveTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}
              style={{ animationDelay: '0.1s' }}
            >
              {lp.heroSubtitle}
            </p>
          )}

          {/* Descrição */}
          {lp.heroDescription && (
            <p
              className={`text-sm sm:text-base md:text-lg max-w-xl mx-auto mb-8 sm:mb-12 animate-slide-up px-4 ${effectiveTheme === 'dark' ? 'text-gray-500' : 'text-gray-700'}`}
              style={{ animationDelay: '0.2s' }}
            >
              {lp.heroDescription}
            </p>
          )}

          {/* CTA */}
          <button
            onClick={scrollToPlans}
            className="group inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 font-semibold text-base sm:text-lg rounded-lg transition-all duration-300 animate-scale-in"
            style={{
              backgroundColor: lp.corPrimaria,
              color: effectiveTheme === 'dark' ? '#0a0a0a' : '#ffffff',
              animationDelay: '0.3s',
              boxShadow: `0 0 40px ${lp.corPrimaria}30`,
            }}
          >
            {lp.heroCta}
            <LucideIcons.ArrowDown className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-y-1 transition-transform" />
          </button>
        </div>

        {/* Scroll indicator */}
        <div className="hidden sm:block absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <LucideIcons.ArrowDown className={`w-6 h-6 ${effectiveTheme === 'dark' ? 'text-gray-600' : 'text-gray-400'}`} />
        </div>
      </section>

      {/* Seção de Benefícios */}
      {lp.benefitsCards && lp.benefitsCards.length > 0 && (
        <section className="py-12 sm:py-16 md:py-20">
          <div className={effectiveTheme === 'dark' ? 'bg-gradient-to-b from-neutral-950 to-neutral-900 py-12 sm:py-16 md:py-20' : ''}>
            <div className="container px-4 sm:px-6">
              <div className="text-center mb-10 sm:mb-12 md:mb-16">
                <h2 className={`text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 font-heading px-2 ${effectiveTheme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {(lp.benefitsTitle || 'Benefícios').split(' ').slice(0, -1).join(' ')}{' '}
                  <span
                    className="bg-clip-text text-transparent"
                    style={{ backgroundImage: `linear-gradient(135deg, ${lp.corPrimaria} 0%, ${lp.corPrimaria}dd 100%)` }}
                  >
                    {(lp.benefitsTitle || 'Benefícios').split(' ').slice(-1)[0]}
                  </span>
                </h2>
                {lp.benefitsSubtitle && (
                  <p className={`text-base sm:text-lg max-w-2xl mx-auto px-4 ${effectiveTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    {lp.benefitsSubtitle}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                {lp.benefitsCards.map((card, index) => {
                  const Icon = LucideIcons[card.icon as keyof typeof LucideIcons] as React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
                  return (
                    <div
                      key={index}
                      className={`group relative rounded-2xl p-6 sm:p-8 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-fade-in-up ${
                        effectiveTheme === 'dark'
                          ? 'bg-neutral-900 border border-neutral-800'
                          : 'bg-white border border-gray-200 shadow-md'
                      }`}
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="relative mb-4 sm:mb-6">
                        <div
                          className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full mb-3 sm:mb-4"
                          style={{ backgroundColor: `${lp.corPrimaria}10` }}
                        >
                          {Icon && <Icon className="w-6 h-6 sm:w-8 sm:h-8" style={{ color: lp.corPrimaria, strokeWidth: 1.5 }} />}
                        </div>
                      </div>
                      <h3 className={`text-base sm:text-lg font-semibold mb-2 ${effectiveTheme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{card.title}</h3>
                      {card.subtitle && (
                        <p className={`text-xs sm:text-sm font-medium mb-2 ${effectiveTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{card.subtitle}</p>
                      )}
                      <p className={`text-xs sm:text-sm leading-relaxed ${effectiveTheme === 'dark' ? 'text-gray-500' : 'text-gray-700'}`}>{card.description}</p>
                    </div>
                  );
                })}
              </div>

              {lp.benefitsCtaEnabled && lp.benefitsCtaText && (
                <div className="text-center mt-12 sm:mt-16">
                  <div
                    className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium"
                    style={{
                      backgroundColor: `${lp.corPrimaria}10`,
                      border: `1px solid ${lp.corPrimaria}20`,
                      color: lp.corPrimaria,
                    }}
                  >
                    <LucideIcons.Trophy className="w-3 h-3 sm:w-4 sm:h-4" style={{ strokeWidth: 1.5 }} />
                    <span>{lp.benefitsCtaText}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Seção de Planos */}
      <section
        id="plans-section"
        className="py-16 sm:py-20 md:py-24 relative"
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundColor: effectiveTheme === 'light'
              ? `${lp.corPrimaria}08`
              : `${lp.corPrimaria}05`,
            opacity: 0.6
          }}
        />

        <div className="container relative z-10 px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 font-heading px-2 ${effectiveTheme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              {(lp.plansTitle || 'Escolha seu plano').split(' ').slice(0, -1).join(' ')}{' '}
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: `linear-gradient(135deg, ${lp.corPrimaria} 0%, ${lp.corPrimaria}dd 100%)` }}
              >
                {(lp.plansTitle || 'Escolha seu plano').split(' ').slice(-1)[0]}
              </span>
            </h2>
            {lp.plansDescription && (
              <p className={`text-base sm:text-lg max-w-xl mx-auto px-4 ${effectiveTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                {lp.plansDescription}
              </p>
            )}
          </div>

          {/* Plan Cards - Inline example */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {lp.produtos.map((produto, index) => (
              <div
                key={produto.id}
                className={`relative rounded-2xl p-6 sm:p-8 transition-all duration-300 ${
                  produto.destaque
                    ? effectiveTheme === 'dark'
                      ? 'bg-neutral-800 border-2 scale-105'
                      : 'bg-white border-2 shadow-2xl scale-105'
                    : effectiveTheme === 'dark'
                      ? 'bg-neutral-900 border border-neutral-800'
                      : 'bg-white border border-gray-200 shadow-lg'
                }`}
                style={produto.destaque ? { borderColor: lp.corPrimaria } : {}}
              >
                {produto.destaque && (
                  <div
                    className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold text-white"
                    style={{ backgroundColor: lp.corPrimaria }}
                  >
                    MAIS POPULAR
                  </div>
                )}
                <h3 className={`text-lg font-bold mb-2 ${effectiveTheme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {produto.nome}
                </h3>
                <div className="mb-6">
                  <span className={`text-3xl font-bold ${effectiveTheme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    R$ {produto.preco.toFixed(2).replace('.', ',')}
                  </span>
                </div>
                <ul className="space-y-3 mb-8">
                  {produto.beneficios.map((beneficio, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <LucideIcons.Check className="w-4 h-4 flex-shrink-0" style={{ color: lp.corPrimaria }} />
                      <span className={`text-sm ${effectiveTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        {beneficio}
                      </span>
                    </li>
                  ))}
                </ul>
                <button
                  className="w-full py-3 rounded-lg font-semibold transition-all"
                  style={
                    produto.destaque
                      ? { backgroundColor: lp.corPrimaria, color: effectiveTheme === 'dark' ? '#0a0a0a' : '#fff' }
                      : { border: `2px solid ${lp.corPrimaria}`, color: lp.corPrimaria, backgroundColor: 'transparent' }
                  }
                >
                  Escolher Plano
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Seção de Depoimentos */}
      {lp.testimonials && lp.testimonials.length > 0 && (
        <section
          className="py-12 sm:py-16 md:py-20 relative overflow-hidden"
          style={effectiveTheme === 'light' ? {
            background: `linear-gradient(to bottom right, ${lp.corPrimaria}12, #f1f5f9, ${lp.corPrimaria}18)`
          } : {
            background: '#0a0a0a'
          }}
        >
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-10 w-48 sm:w-72 h-48 sm:h-72 rounded-full blur-[80px] sm:blur-[120px]" style={{ backgroundColor: lp.corPrimaria }} />
            <div className="absolute bottom-20 right-10 w-64 sm:w-96 h-64 sm:h-96 rounded-full blur-[100px] sm:blur-[140px]" style={{ backgroundColor: lp.corPrimaria }} />
          </div>

          <div className="container px-4 sm:px-6 relative z-10">
            <div className="text-center mb-10 sm:mb-12 md:mb-16">
              <h2 className={`text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 font-heading px-2 ${effectiveTheme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                {(lp.testimonialsTitle || 'Depoimentos').split(' ').slice(0, -1).join(' ')}{' '}
                <span
                  className="bg-clip-text text-transparent"
                  style={{ backgroundImage: `linear-gradient(135deg, ${lp.corPrimaria} 0%, ${lp.corPrimaria}dd 100%)` }}
                >
                  {(lp.testimonialsTitle || 'Depoimentos').split(' ').slice(-1)[0]}
                </span>
              </h2>
              {lp.testimonialsSubtitle && (
                <p className={`text-base sm:text-lg max-w-2xl mx-auto px-4 ${effectiveTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  {lp.testimonialsSubtitle}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto">
              {lp.testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className={`relative rounded-2xl p-6 sm:p-8 transition-all duration-300 hover:-translate-y-2 animate-fade-in-up ${
                    effectiveTheme === 'dark'
                      ? 'bg-neutral-900 border border-neutral-800'
                      : 'bg-white border border-gray-200 hover:border-gray-300 shadow-lg hover:shadow-xl'
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="absolute top-4 sm:top-6 right-4 sm:right-6 opacity-10">
                    <Quote
                      className="w-12 h-12 sm:w-16 sm:h-16"
                      style={{ color: effectiveTheme === 'dark' ? lp.corPrimaria : '#9ca3af' }}
                    />
                  </div>

                  <div className="flex gap-1 mb-3 sm:mb-4">
                    {[...Array(testimonial.stars || 5)].map((_, i) => (
                      <LucideIcons.Star
                        key={i}
                        className="w-3 h-3 sm:w-4 sm:h-4"
                        style={{
                          fill: effectiveTheme === 'dark' ? lp.corPrimaria : '#fbbf24',
                          color: effectiveTheme === 'dark' ? lp.corPrimaria : '#fbbf24'
                        }}
                      />
                    ))}
                  </div>

                  <p className={`mb-4 sm:mb-6 relative z-10 leading-relaxed text-sm sm:text-base ${effectiveTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    &quot;{testimonial.text}&quot;
                  </p>

                  <div className="flex items-center gap-3 sm:gap-4 relative z-10">
                    <div
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 flex items-center justify-center flex-shrink-0"
                      style={effectiveTheme === 'dark' ? {
                        borderColor: `${lp.corPrimaria}30`,
                        background: `linear-gradient(135deg, ${lp.corPrimaria}20, transparent)`
                      } : {
                        borderColor: '#d1d5db',
                        background: 'linear-gradient(135deg, #f3f4f6, transparent)'
                      }}
                    >
                      <span
                        className="font-bold text-base sm:text-lg"
                        style={{ color: effectiveTheme === 'dark' ? lp.corPrimaria : '#6b7280' }}
                      >
                        {testimonial.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className={`font-semibold text-sm sm:text-base ${effectiveTheme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{testimonial.name}</p>
                      {testimonial.role && (
                        <p className={`text-xs sm:text-sm ${effectiveTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{testimonial.role}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Stats */}
            {lp.statsCards && lp.statsCards.length > 0 && (
              <div className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 max-w-4xl mx-auto">
                {lp.statsCards.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className={`text-3xl sm:text-4xl font-bold mb-2 font-heading ${effectiveTheme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{stat.number}</div>
                    <p className={`text-xs sm:text-sm ${effectiveTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{stat.title}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className={`py-8 sm:py-10 md:py-12 border-t ${effectiveTheme === 'dark' ? 'border-neutral-800 bg-neutral-950' : 'border-gray-200 bg-gray-50'}`}>
        <div className="container text-center px-4 sm:px-6">
          {lp.footerText && (
            <p className={`text-xs sm:text-sm ${effectiveTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{lp.footerText}</p>
          )}
        </div>
      </footer>
    </main>
  );
}
