/**
 * Hero Section - Landing Page
 *
 * Full-screen hero with gradient background, animated text, and scroll CTA.
 * Pattern: dark theme, radial dot pattern background, cyan accent glow.
 *
 * @example
 * <Hero logoUrl="/images/my-logo.svg" />
 */

import { ArrowDown } from "lucide-react";

interface HeroProps {
  logoUrl?: string;
}

const Hero = ({ logoUrl }: HeroProps) => {
  const scrollToPlans = () => {
    document.getElementById("plans")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-start justify-center overflow-hidden pt-20 md:pt-24">
      {/* Logo customizado no topo */}
      {logoUrl && (
        <div className="absolute top-8 left-8 z-20">
          <img src={logoUrl} alt="Logo" className="h-16 md:h-20 object-contain" />
        </div>
      )}

      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Accent glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-cyan-500/10 blur-[150px]" />

      <div className="container relative z-10 text-center px-4">
        <div className="animate-fade-in">
          <span className="inline-block px-4 py-2 mb-6 text-sm font-medium tracking-wider uppercase border border-cyan-500/30 rounded-full text-cyan-400">
            Evento Presencial 2026
          </span>
        </div>

        {/* Logo */}
        <div className="animate-fade-in mb-8" style={{ animationDelay: '0.05s' }}>
          <img
            src="/images/logo-example.svg"
            alt="Logo"
            className="h-24 md:h-32 lg:h-40 mx-auto object-contain"
          />
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 animate-slide-up font-heading">
          <span className="text-gradient-primary">EVENTO</span>
          <span className="text-white">NOME</span>
        </h1>

        <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto mb-4 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          O maior evento do segmento no Brasil
        </p>

        <p className="text-lg text-gray-400/80 max-w-xl mx-auto mb-12 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          Transforme sua carreira com os melhores profissionais do mercado.
          Networking, técnicas exclusivas e muito mais.
        </p>

        <button
          onClick={scrollToPlans}
          className="group inline-flex items-center gap-3 px-8 py-4 bg-cyan-500 text-white font-semibold text-lg rounded-lg hover:bg-cyan-600 transition-all duration-300 animate-scale-in shadow-lg shadow-cyan-500/20"
          style={{ animationDelay: '0.3s' }}
        >
          Garanta sua vaga
          <ArrowDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
        </button>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ArrowDown className="w-6 h-6 text-gray-400" />
      </div>
    </section>
  );
};

export default Hero;
