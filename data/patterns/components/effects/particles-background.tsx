'use client';

import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
  blur: number;
}

interface ParticlesBackgroundProps {
  theme?: 'dark' | 'light';
  primaryColor?: string;
  particleCount?: number;
  connectionDistance?: number;
  mouseRepelDistance?: number;
}

export function ParticlesBackground({
  theme = 'dark',
  primaryColor = '#3b82f6',
  particleCount = 120,
  connectionDistance = 150,
  mouseRepelDistance = 200,
}: ParticlesBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0, isMoving: false });
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Configurar tamanho do canvas
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      initParticles();
    };

    // Inicializar partículas
    const initParticles = () => {
      particlesRef.current = [];
      for (let i = 0; i < particleCount; i++) {
        // Criar variação de tamanhos: pequenas, médias e algumas grandes
        let radius: number;
        let blur: number;
        const rand = Math.random();

        if (rand < 0.7) {
          // 70% partículas pequenas (reduzidas)
          radius = Math.random() * 1 + 0.5;
          blur = 0;
        } else if (rand < 0.9) {
          // 20% partículas médias (reduzidas)
          radius = Math.random() * 1.5 + 1.2;
          blur = 0;
        } else {
          // 10% partículas grandes com blur (reduzidas)
          radius = Math.random() * 2 + 2;
          blur = Math.random() * 1.5 + 0.5;
        }

        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          radius,
          opacity: Math.random() * 0.4 + 0.2,
          blur,
        });
      }
    };

    // Converter hex para RGB
    const hexToRgb = (hex: string) => {
      const hexPattern = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;
      const result = hexPattern.exec(hex);
      return result
        ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16),
          }
        : { r: 59, g: 130, b: 246 };
    };

    const rgb = hexToRgb(primaryColor);
    const particleColor = theme === 'dark'
      ? `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, OPACITY)`
      : `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, OPACITY)`;

    const lineColor = theme === 'dark'
      ? `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.15)`
      : `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.1)`;

    // Atualizar posição das partículas
    const updateParticles = () => {
      const particles = particlesRef.current;
      const mouse = mouseRef.current;

      particles.forEach((particle) => {
        // Movimento base
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Repulsão do mouse com área maior
        if (mouse.isMoving) {
          const dx = particle.x - mouse.x;
          const dy = particle.y - mouse.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < mouseRepelDistance) {
            const force = (mouseRepelDistance - distance) / mouseRepelDistance;
            const angle = Math.atan2(dy, dx);
            // Força maior para partículas maiores
            const pushForce = force * (3 + particle.radius * 0.5);
            particle.x += Math.cos(angle) * pushForce;
            particle.y += Math.sin(angle) * pushForce;
          }
        }

        // Bounce nas bordas
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.vx *= -1;
          particle.x = Math.max(0, Math.min(canvas.width, particle.x));
        }
        if (particle.y < 0 || particle.y > canvas.height) {
          particle.vy *= -1;
          particle.y = Math.max(0, Math.min(canvas.height, particle.y));
        }
      });
    };

    // Desenhar partículas e conexões
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const particles = particlesRef.current;

      // Desenhar apenas as partículas (sem conexões)
      particles.forEach((particle) => {
        ctx.fillStyle = particleColor.replace('OPACITY', particle.opacity.toString());

        // Aplicar blur se a partícula tiver
        if (particle.blur > 0) {
          ctx.filter = `blur(${particle.blur}px)`;
        } else {
          ctx.filter = 'none';
        }

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fill();

        // Resetar filter
        ctx.filter = 'none';
      });
    };

    // Loop de animação
    const animate = () => {
      updateParticles();
      draw();
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    // Inicializar
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [theme, primaryColor, particleCount, connectionDistance, mouseRepelDistance]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full"
      style={{ pointerEvents: 'auto' }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        mouseRef.current = {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
          isMoving: true,
        };
      }}
      onMouseLeave={() => {
        mouseRef.current.isMoving = false;
      }}
      onClick={(e) => {
        // Permitir que cliques passem através
        const target = e.target as HTMLElement;
        if (target === containerRef.current || target === canvasRef.current) {
          e.stopPropagation();
          // Encontrar elemento abaixo
          const elemBelow = document.elementFromPoint(e.clientX, e.clientY);
          if (elemBelow && elemBelow !== target) {
            elemBelow.dispatchEvent(new MouseEvent('click', {
              bubbles: true,
              cancelable: true,
              clientX: e.clientX,
              clientY: e.clientY,
            }));
          }
        }
      }}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{
          opacity: theme === 'dark' ? 0.6 : 0.4,
          pointerEvents: 'none',
        }}
      />
    </div>
  );
}
