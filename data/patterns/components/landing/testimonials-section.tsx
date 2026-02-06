/**
 * Testimonials Section - Social Proof
 *
 * 3-column grid of testimonial cards with star ratings, avatars, and
 * summary stats row. Pattern: dark cards, cyan accents, quote decoration.
 *
 * @example
 * <TestimonialsSection />
 */

import { Quote, Star } from "lucide-react";

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Carlos Silva",
      role: "Profissional Experiente",
      image: "https://ui-avatars.com/api/?name=Carlos+Silva&background=0ea5e9&color=fff&size=128",
      content: "Este evento mudou completamente minha visão sobre o mercado. As técnicas que aprendi aqui me ajudaram a triplicar meu faturamento em apenas 6 meses.",
      rating: 5,
    },
    {
      name: "Rodrigo Mendes",
      role: "Empresário",
      image: "https://ui-avatars.com/api/?name=Rodrigo+Mendes&background=0ea5e9&color=fff&size=128",
      content: "Networking de altíssimo nível! Conheci fornecedores e parceiros que transformaram meu negócio. Valeu cada centavo investido.",
      rating: 5,
    },
    {
      name: "Felipe Santos",
      role: "Profissional há 3 anos",
      image: "https://ui-avatars.com/api/?name=Felipe+Santos&background=0ea5e9&color=fff&size=128",
      content: "Participei de todas as edições e sempre saio com algo novo. Os palestrantes são referência no mercado e compartilham experiências reais.",
      rating: 5,
    },
  ];

  return (
    <section className="py-20 bg-neutral-950 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500 rounded-full blur-[120px]" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-400 rounded-full blur-[140px]" />
      </div>

      <div className="container px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-heading text-white">
            O que dizem os <span className="text-gradient-primary">Participantes</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Histórias reais de profissionais que transformaram suas carreiras
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="relative bg-neutral-900 border border-neutral-800 rounded-2xl p-8 hover:border-cyan-500/50 transition-all duration-300 hover:-translate-y-2 animate-fade-in-up"
              style={{
                animationDelay: `${index * 0.1}s`,
              }}
            >
              {/* Quote icon */}
              <div className="absolute top-6 right-6 opacity-10">
                <Quote className="w-16 h-16 text-cyan-400" />
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-cyan-400 text-cyan-400" />
                ))}
              </div>

              {/* Content */}
              <p className="text-gray-300 mb-6 relative z-10 leading-relaxed">
                &quot;{testimonial.content}&quot;
              </p>

              {/* Author */}
              <div className="flex items-center gap-4 relative z-10">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full border-2 border-cyan-500/30"
                />
                <div>
                  <p className="font-semibold text-white">{testimonial.name}</p>
                  <p className="text-sm text-gray-400">{testimonial.role}</p>
                </div>
              </div>

              {/* Decorative gradient */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </div>
          ))}
        </div>

        {/* Bottom Stats */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-4xl font-bold text-white mb-2 font-heading">98%</div>
            <p className="text-gray-400 text-sm">Taxa de Satisfação</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-white mb-2 font-heading">2000+</div>
            <p className="text-gray-400 text-sm">Profissionais Capacitados</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-white mb-2 font-heading">5+</div>
            <p className="text-gray-400 text-sm">Anos de Experiência</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
