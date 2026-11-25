import { useEffect, useRef } from 'react';

const COLORS = ['#ffbdd8', '#e6abf7', '#ffdb9c', '#a8c9ff', '#f7ebff', '#f28cb7'];

export default function Fireworks({ burstKey }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let raf = 0;
    const particles = [];
    const timeouts = [];
    let running = true;

    function resize() {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    }

    function launch() {
      if (!running) return;
      const x = width * (0.18 + Math.random() * 0.64);
      const y = height * (0.14 + Math.random() * 0.43);
      const color = COLORS[Math.floor(Math.random() * COLORS.length)];
      const count = width < 600 ? 55 : 85;
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + Math.random() * 0.24;
        const speed = Math.random() * 2.3 + 1.1;
        particles.push({
          x, y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1,
          decay: 0.009 + Math.random() * 0.009,
          size: 1.2 + Math.random() * 1.8,
          color,
        });
      }
    }

    function draw() {
      if (!running) return;
      ctx.clearRect(0, 0, width, height);
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.022;
        p.vx *= 0.995;
        p.life -= p.decay;
        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }
        ctx.globalAlpha = p.life;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      raf = window.requestAnimationFrame(draw);
    }

    resize();
    window.addEventListener('resize', resize);
    launch();
    [450, 1000, 1580, 2240, 2900, 3750, 4550].forEach((delay) => {
      timeouts.push(window.setTimeout(launch, delay));
    });
    draw();
    // Stop rendering once all the particles have faded.
    timeouts.push(window.setTimeout(() => {
      running = false;
      window.cancelAnimationFrame(raf);
      ctx.clearRect(0, 0, width, height);
    }, 7800));

    return () => {
      running = false;
      window.cancelAnimationFrame(raf);
      timeouts.forEach(window.clearTimeout);
      window.removeEventListener('resize', resize);
    };
  }, [burstKey]);

  return <canvas ref={canvasRef} className="fireworks-canvas" aria-hidden="true" />;
}
