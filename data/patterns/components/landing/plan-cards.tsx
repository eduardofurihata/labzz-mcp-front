/**
 * Plan Cards - Pricing Section with Carousel
 *
 * Responsive pricing cards with optional carousel for 5+ products.
 * Supports dark/light theme, custom accent color, highlight badge.
 * Grid layout for 1-4 cards, horizontal snap carousel for 5+.
 *
 * @example
 * <PlanCards corPrimaria="#16A89A" theme="dark" />
 */

import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState, useEffect, useCallback, useMemo } from "react";

interface Produto {
  id: string;
  nome: string;
  descricao: string;
  preco: number;
  corPrimaria?: string;
  beneficios: string[];
  destaque: boolean;
  ordem: number;
  maxParcelas: number;
}

interface PlanCardsProps {
  corPrimaria?: string;
  theme?: 'dark' | 'light';
}

// Hardcoded example products (replaces API data)
const EXAMPLE_PRODUCTS: Produto[] = [
  {
    id: 'plan-1',
    nome: 'Plano Básico',
    descricao: 'Ideal para começar',
    preco: 97.00,
    corPrimaria: '#16A89A',
    beneficios: [
      'Acesso a plataforma',
      'Suporte por email',
      'Atualizações gratuitas',
      'Certificado de conclusão',
    ],
    destaque: false,
    ordem: 1,
    maxParcelas: 3,
  },
  {
    id: 'plan-2',
    nome: 'Plano Intermediário',
    descricao: 'Para quem quer mais',
    preco: 197.00,
    corPrimaria: '#16A89A',
    beneficios: [
      'Tudo do Plano Básico',
      'Suporte prioritário',
      'Acesso a conteúdos extras',
      'Comunidade exclusiva',
      'Bônus especiais',
    ],
    destaque: true,
    ordem: 2,
    maxParcelas: 6,
  },
  {
    id: 'plan-3',
    nome: 'Plano Avançado',
    descricao: 'Experiência completa',
    preco: 397.00,
    corPrimaria: '#16A89A',
    beneficios: [
      'Tudo do Plano Intermediário',
      'Mentoria individual',
      'Acesso vitalício',
      'Materiais exclusivos',
      'Certificado premium',
    ],
    destaque: false,
    ordem: 3,
    maxParcelas: 12,
  },
  {
    id: 'plan-4',
    nome: 'Plano VIP',
    descricao: 'O melhor investimento',
    preco: 697.00,
    corPrimaria: '#16A89A',
    beneficios: [
      'Tudo do Plano Avançado',
      'Consultoria personalizada',
      'Grupo VIP exclusivo',
      'Eventos presenciais',
      'Networking premium',
    ],
    destaque: false,
    ordem: 4,
    maxParcelas: 12,
  },
];

const PlanCards = ({ corPrimaria = '#16A89A', theme = 'dark' }: PlanCardsProps) => {
  // Refs
  const trackRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  // State
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  const produtos = EXAMPLE_PRODUCTS;

  // Always show 4 cards per slide on desktop
  const CARDS_PER_SLIDE = 4;

  // Group products into slides
  const slides = useMemo(() => {
    const grouped: Array<typeof produtos> = [];
    for (let i = 0; i < produtos.length; i += CARDS_PER_SLIDE) {
      grouped.push(produtos.slice(i, i + CARDS_PER_SLIDE));
    }
    return grouped;
  }, [produtos]);

  // Determine if carousel is needed (more than 4 products)
  const showCarousel = produtos.length > CARDS_PER_SLIDE;
  const totalSlides = slides.length;

  const handleSelectPlan = useCallback((produto: Produto) => {
    console.log('Selected plan:', produto.nome);
  }, []);

  // Navigation functions
  const scrollToSlide = useCallback((index: number) => {
    const track = trackRef.current;
    if (!track) return;

    const slideWidth = track.offsetWidth;
    track.scrollTo({
      left: slideWidth * index,
      behavior: 'smooth'
    });
  }, []);

  const scrollToPrev = useCallback(() => {
    if (currentSlide > 0) {
      scrollToSlide(currentSlide - 1);
    }
  }, [currentSlide, scrollToSlide]);

  const scrollToNext = useCallback(() => {
    if (currentSlide < totalSlides - 1) {
      scrollToSlide(currentSlide + 1);
    }
  }, [currentSlide, totalSlides, scrollToSlide]);

  // Intersection Observer for detecting current slide
  useEffect(() => {
    const track = trackRef.current;
    if (!track || !showCarousel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const slideIndex = Number(entry.target.getAttribute('data-slide-index'));
            setCurrentSlide(slideIndex);
          }
        });
      },
      {
        root: track,
        threshold: 0.5
      }
    );

    const slideElements = track.querySelectorAll('.carousel-slide');
    slideElements.forEach((slide) => observer.observe(slide));

    return () => observer.disconnect();
  }, [showCarousel, slides.length]);

  // Check scroll bounds
  useEffect(() => {
    const track = trackRef.current;
    if (!track || !showCarousel) return;

    const checkScrollBounds = () => {
      const { scrollLeft, scrollWidth, clientWidth } = track;
      setCanScrollPrev(scrollLeft > 10);
      setCanScrollNext(scrollLeft < scrollWidth - clientWidth - 10);
    };

    track.addEventListener('scroll', checkScrollBounds);
    checkScrollBounds();

    return () => track.removeEventListener('scroll', checkScrollBounds);
  }, [showCarousel]);

  // Smart auto-play
  useEffect(() => {
    if (!showCarousel || isHovered) {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
        autoPlayRef.current = null;
      }
      return;
    }

    autoPlayRef.current = setInterval(() => {
      const nextIndex = currentSlide < totalSlides - 1 ? currentSlide + 1 : 0;
      scrollToSlide(nextIndex);
    }, 5000);

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [showCarousel, isHovered, currentSlide, totalSlides, scrollToSlide]);

  // Keyboard navigation
  useEffect(() => {
    if (!showCarousel) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          scrollToPrev();
          break;
        case 'ArrowRight':
          e.preventDefault();
          scrollToNext();
          break;
        case 'Home':
          e.preventDefault();
          scrollToSlide(0);
          break;
        case 'End':
          e.preventDefault();
          scrollToSlide(totalSlides - 1);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showCarousel, scrollToPrev, scrollToNext, scrollToSlide, totalSlides]);

  return (
    <section id="plans" className="py-24" aria-label="Planos disponíveis">
      <div className="container">
        {/* Carousel wrapper */}
        <div className="relative">
          {/* Navigation buttons (Netflix style) */}
          {showCarousel && (
            <>
              {/* Previous button */}
              <button
                onClick={scrollToPrev}
                disabled={!canScrollPrev}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className={`
                  absolute left-0 top-1/2 -translate-y-1/2 z-10
                  w-16 h-full
                  flex items-center justify-center
                  transition-opacity duration-300
                  ${isHovered ? 'opacity-100' : 'opacity-0'}
                  ${!canScrollPrev && 'invisible'}
                `}
                aria-label="Slide anterior"
              >
                <div className={`w-12 h-12 rounded-full backdrop-blur-sm flex items-center justify-center transition-all duration-200 hover:scale-110 ${
                  theme === 'dark'
                    ? 'bg-white/10 hover:bg-white/20'
                    : 'bg-black/10 hover:bg-black/20 shadow-lg'
                }`}>
                  <ChevronLeft className={`w-6 h-6 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-800'
                  }`} />
                </div>
              </button>

              {/* Next button */}
              <button
                onClick={scrollToNext}
                disabled={!canScrollNext}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className={`
                  absolute right-0 top-1/2 -translate-y-1/2 z-10
                  w-16 h-full
                  flex items-center justify-center
                  transition-opacity duration-300
                  ${isHovered ? 'opacity-100' : 'opacity-0'}
                  ${!canScrollNext && 'invisible'}
                `}
                aria-label="Próximo slide"
              >
                <div className={`w-12 h-12 rounded-full backdrop-blur-sm flex items-center justify-center transition-all duration-200 hover:scale-110 ${
                  theme === 'dark'
                    ? 'bg-white/10 hover:bg-white/20'
                    : 'bg-black/10 hover:bg-black/20 shadow-lg'
                }`}>
                  <ChevronRight className={`w-6 h-6 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-800'
                  }`} />
                </div>
              </button>
            </>
          )}

          {/* Slides container */}
          <div
            ref={trackRef}
            role="region"
            aria-label="Carrossel de planos"
            aria-live="polite"
            className={
              showCarousel
                ? 'flex overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-hide'
                : `grid gap-6 ${
                    produtos.length === 1 ? 'grid-cols-1 max-w-md mx-auto' :
                    produtos.length === 2 ? 'grid-cols-1 md:grid-cols-2 max-w-3xl mx-auto' :
                    produtos.length === 3 ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto' :
                    'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                  }`
            }
            style={showCarousel ? {
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              scrollSnapType: 'x mandatory'
            } : {}}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {showCarousel ? (
              // Carousel mode
              slides.map((slideProducts, slideIndex) => (
                <div
                  key={slideIndex}
                  className="carousel-slide flex-shrink-0 w-full snap-start snap-always"
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`Slide ${slideIndex + 1} de ${totalSlides}`}
                  data-slide-index={slideIndex}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 px-2 sm:px-4">
                    {slideProducts.map((produto, cardIndex) => (
                      <div
                        key={produto.id}
                        className={`relative flex flex-col h-full rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-300 opacity-0 animate-fadeInUp group cursor-pointer ${
                          theme === 'dark'
                            ? 'bg-neutral-900 border border-neutral-800'
                            : 'bg-white border border-gray-200 shadow-lg'
                        }`}
                        style={{
                          animationDelay: `${cardIndex * 100}ms`,
                          animationFillMode: 'forwards',
                          borderColor: produto.corPrimaria ? `${produto.corPrimaria}40` : undefined,
                        }}
                      >
                        {/* Glow effect on hover */}
                        <div
                          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                          style={{
                            background: `radial-gradient(circle at 50% 0%, ${produto.corPrimaria || corPrimaria}15, transparent 70%)`,
                          }}
                        />
                        {/* Highlight badge */}
                        {produto.destaque && (
                          <div className="absolute top-3 sm:top-4 right-3 sm:right-4 z-10">
                            <span className={`px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs font-bold rounded-full shadow-lg ${
                              theme === 'dark' ? 'bg-cyan-500 text-white' : 'bg-blue-500 text-white'
                            }`}>
                              POPULAR
                            </span>
                          </div>
                        )}

                        {/* Header */}
                        <div className={`p-4 sm:p-6 border-b ${theme === 'dark' ? 'border-neutral-800' : 'border-gray-200'}`}>
                          <h3 className={`text-lg sm:text-xl md:text-2xl font-bold mb-1 sm:mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                            {produto.nome}
                          </h3>
                          <p className={`text-xs sm:text-sm line-clamp-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                            {produto.descricao}
                          </p>
                        </div>

                        {/* Price */}
                        <div className="p-4 sm:p-6">
                          <div className="flex items-baseline gap-1 sm:gap-2">
                            <span className={`text-xs sm:text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>R$</span>
                            <span className={`text-2xl sm:text-3xl md:text-4xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                              {produto.preco.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </span>
                          </div>
                          {produto.maxParcelas > 1 && (
                            <p className={`text-xs sm:text-sm mt-1 sm:mt-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                              ou em até {produto.maxParcelas}x de R$ {(produto.preco / produto.maxParcelas).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </p>
                          )}
                        </div>

                        {/* Features */}
                        <div className="flex-1 p-4 sm:p-6 pt-0">
                          <ul className="space-y-2 sm:space-y-3">
                            {produto.beneficios.slice(0, 5).map((beneficio, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <Check className={`w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 mt-0.5 ${
                                  theme === 'dark' ? 'text-cyan-500' : 'text-green-500'
                                }`} />
                                <span className={`text-xs sm:text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{beneficio}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* CTA Button */}
                        <div className="p-4 sm:p-6 pt-0 mt-auto">
                          <button
                            onClick={() => handleSelectPlan(produto)}
                            className={`w-full py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg font-semibold text-sm sm:text-base active:scale-95 transition-all duration-200 shadow-lg ${
                              theme === 'dark'
                                ? 'bg-cyan-500 text-white hover:bg-cyan-400 shadow-cyan-500/20 hover:shadow-xl hover:shadow-cyan-500/30'
                                : 'text-white hover:opacity-90'
                            }`}
                            style={{
                              backgroundColor: produto.corPrimaria || corPrimaria,
                            }}
                          >
                            Selecionar Plano
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              // Grid mode (1-4 products)
              produtos.map((produto) => (
                <div
                  key={produto.id}
                  className={`relative flex flex-col h-full rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-300 group cursor-pointer hover:scale-[1.02] hover:-translate-y-1 ${
                    theme === 'dark'
                      ? 'bg-neutral-900 border border-neutral-800'
                      : 'bg-white border border-gray-200 shadow-lg hover:shadow-2xl'
                  }`}
                  style={{
                    borderColor: produto.corPrimaria ? `${produto.corPrimaria}40` : undefined,
                  }}
                >
                  {/* Glow effect on hover */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{
                      background: `radial-gradient(circle at 50% 0%, ${produto.corPrimaria || corPrimaria}15, transparent 70%)`,
                    }}
                  />
                  {/* Highlight badge */}
                  {produto.destaque && (
                    <div className="absolute top-3 sm:top-4 right-3 sm:right-4 z-10">
                      <span className={`px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs font-bold rounded-full shadow-lg ${
                        theme === 'dark' ? 'bg-cyan-500 text-white' : 'bg-blue-500 text-white'
                      }`}>
                        POPULAR
                      </span>
                    </div>
                  )}

                  {/* Header */}
                  <div className={`p-4 sm:p-6 border-b ${theme === 'dark' ? 'border-neutral-800' : 'border-gray-200'}`}>
                    <h3 className={`text-lg sm:text-xl md:text-2xl font-bold mb-1 sm:mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      {produto.nome}
                    </h3>
                    <p className={`text-xs sm:text-sm line-clamp-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      {produto.descricao}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="p-4 sm:p-6">
                    <div className="flex items-baseline gap-1 sm:gap-2">
                      <span className={`text-xs sm:text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>R$</span>
                      <span className={`text-2xl sm:text-3xl md:text-4xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        {produto.preco.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </span>
                    </div>
                    {produto.maxParcelas > 1 && (
                      <p className={`text-xs sm:text-sm mt-1 sm:mt-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        ou em até {produto.maxParcelas}x de R$ {(produto.preco / produto.maxParcelas).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </p>
                    )}
                  </div>

                  {/* Features */}
                  <div className="flex-1 p-4 sm:p-6 pt-0">
                    <ul className="space-y-2 sm:space-y-3">
                      {produto.beneficios.slice(0, 5).map((beneficio, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className={`w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 mt-0.5 ${
                            theme === 'dark' ? 'text-cyan-500' : 'text-green-500'
                          }`} />
                          <span className={`text-xs sm:text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{beneficio}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA Button */}
                  <div className="p-4 sm:p-6 pt-0 mt-auto">
                    <button
                      onClick={() => handleSelectPlan(produto)}
                      className={`w-full py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg font-semibold text-sm sm:text-base active:scale-95 transition-all duration-200 shadow-lg ${
                        theme === 'dark'
                          ? 'bg-cyan-500 text-white hover:bg-cyan-400 shadow-cyan-500/20 hover:shadow-xl hover:shadow-cyan-500/30'
                          : 'text-white hover:opacity-90'
                      }`}
                      style={{
                        backgroundColor: produto.corPrimaria || corPrimaria,
                      }}
                    >
                      Selecionar Plano
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Dot indicators (Apple style) */}
          {showCarousel && totalSlides > 1 && (
            <nav aria-label="Navegação de slides" className="flex justify-center gap-2 mt-8">
              {Array.from({ length: totalSlides }).map((_, index) => (
                <button
                  key={index}
                  role="tab"
                  aria-selected={index === currentSlide}
                  aria-label={`Slide ${index + 1}`}
                  tabIndex={index === currentSlide ? 0 : -1}
                  onClick={() => scrollToSlide(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? 'w-8'
                      : 'w-2 bg-neutral-600 hover:bg-neutral-500'
                  }`}
                  style={index === currentSlide ? { backgroundColor: corPrimaria } : {}}
                  aria-current={index === currentSlide ? "true" : "false"}
                />
              ))}
            </nav>
          )}
        </div>
      </div>
    </section>
  );
};

export default PlanCards;
