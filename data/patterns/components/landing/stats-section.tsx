/**
 * Stats Section - Social Proof Numbers
 *
 * Animated stat cards in a 4-column grid with icons and hover effects.
 * Pattern: dark glass cards, colored icon backgrounds, gradient glow on hover.
 *
 * @example
 * <StatsSection />
 */

import { Users, Calendar, Mic, Trophy } from "lucide-react";

const StatsSection = () => {
  const stats = [
    {
      icon: Calendar,
      number: "5+",
      label: "Edições realizadas",
      description: "Anos consecutivos transformando carreiras",
      color: "text-blue-500"
    },
    {
      icon: Users,
      number: "2000+",
      label: "Participantes",
      description: "Profissionais já capacitados",
      color: "text-green-500"
    },
    {
      icon: Mic,
      number: "50+",
      label: "Palestrantes",
      description: "Especialistas renomados do mercado",
      color: "text-purple-500"
    },
    {
      icon: Trophy,
      number: "95%",
      label: "Satisfação",
      description: "Dos participantes recomendam o evento",
      color: "text-orange-500"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-neutral-950 to-neutral-900/20">
      <div className="container px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-heading text-white">
            Números que <span className="text-gradient-primary">Impressionam</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Mais de 5 anos transformando carreiras e conectando profissionais
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div
                key={index}
                className={`group relative bg-neutral-900 border border-neutral-800 rounded-2xl p-8 text-center hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-1 animate-fade-in-up`}
                style={{
                  animationDelay: `${index * 0.1}s`
                }}
              >
                {/* Background glow effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Icon */}
                <div className="relative mb-6">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
                    index === 0 ? 'bg-blue-500/10' :
                    index === 1 ? 'bg-green-500/10' :
                    index === 2 ? 'bg-purple-500/10' :
                    'bg-orange-500/10'
                  }`}>
                    <IconComponent className={`w-8 h-8 ${stat.color}`} />
                  </div>
                </div>

                {/* Number */}
                <div className="relative mb-3">
                  <span className="text-4xl md:text-5xl font-bold font-heading text-white">
                    {stat.number}
                  </span>
                </div>

                {/* Label */}
                <h3 className="text-lg font-semibold text-white mb-2">
                  {stat.label}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-400 leading-relaxed">
                  {stat.description}
                </p>

                {/* Decorative line */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-cyan-400 text-sm font-medium">
            <Trophy className="w-4 h-4" />
            <span>Junte-se aos milhares de profissionais que já transformaram suas carreiras</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
