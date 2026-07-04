import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
  baseOpacity: number;
  phase: number; // unique sine-wave offset per particle
  floatSpeed: number; // how fast it bobs
  color: string;
}

const COLORS = [
  "rgba(255, 219, 112,", // --accent / gold
  "rgba(255, 118, 0,", // --orange
  "rgba(255, 255, 255,", // white
];

const HeroBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -9999, y: -9999 });
  const animFrame = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particles: Particle[] = [];
    const PARTICLE_COUNT = 70;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    const initParticles = () => {
      particles = Array.from({ length: PARTICLE_COUNT }, () => {
        const baseOpacity = Math.random() * 0.35 + 0.3;
        return {
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          radius: Math.random() * 1.5 + 0.8,
          opacity: baseOpacity,
          baseOpacity,
          phase: Math.random() * Math.PI * 2, // random start in cycle
          floatSpeed: Math.random() * 0.0004 + 0.0002, // 0.2–0.6 ms⁻¹
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
        };
      });
    };

    const draw = (now: DOMHighResTimeStamp = 0) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        // Per-particle sine wave — drives gentle float and opacity pulse
        const wave = Math.sin(now * p.floatSpeed + p.phase);

        // Gentle mouse repulsion
        const dx = p.x - mouse.current.x;
        const dy = p.y - mouse.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const influence = 120;
        if (dist < influence && dist > 0) {
          const force = ((influence - dist) / influence) * 0.25;
          p.vx += (dx / dist) * force;
          p.vy += (dy / dist) * force;
        }

        // Add a tiny sine nudge to vertical drift for organic float
        p.vy += wave * 0.003;

        // Speed cap
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        const maxSpeed = 0.6;
        if (speed > maxSpeed) {
          p.vx = (p.vx / speed) * maxSpeed;
          p.vy = (p.vy / speed) * maxSpeed;
        }

        // Damping back to natural drift
        p.vx *= 0.99;
        p.vy *= 0.99;

        p.x += p.vx;
        p.y += p.vy;

        // Wrap edges
        if (p.x < -5) p.x = canvas.width + 5;
        if (p.x > canvas.width + 5) p.x = -5;
        if (p.y < -5) p.y = canvas.height + 5;
        if (p.y > canvas.height + 5) p.y = -5;

        // Breathing opacity: oscillates ±30% around baseOpacity
        p.opacity = p.baseOpacity * (0.7 + 0.3 * wave);

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.opacity})`;
        ctx.fill();
      });

      // Draw subtle connecting lines between nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            const alpha = (1 - dist / 100) * 0.06;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(255, 219, 112, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animFrame.current = requestAnimationFrame(draw);
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const onMouseLeave = () => {
      mouse.current = { x: -9999, y: -9999 };
    };

    resize();
    initParticles();
    draw(performance.now());

    const resizeObserver = new ResizeObserver(() => {
      resize();
      initParticles();
    });
    resizeObserver.observe(canvas);

    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseleave", onMouseLeave);
    // Also listen on window for mouse move so particles respond even when hovering text
    window.addEventListener("mousemove", onMouseMove);

    return () => {
      cancelAnimationFrame(animFrame.current);
      resizeObserver.disconnect();
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true" />;
};

export default HeroBackground;
