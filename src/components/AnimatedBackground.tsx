import { useEffect, useRef } from 'react';

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  baseR: number;
  alpha: number;
};

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // always enabled; monochrome styling applied

    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    let animId = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Config
    const PARTICLE_COUNT = Math.max(60, Math.floor(window.innerWidth / 15));
    const particles: Particle[] = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      r: Math.random() * 1.8 + 0.6,
      baseR: 0,
      alpha: Math.random() * 0.6 + 0.15,
    }));
    for (const p of particles) p.baseR = p.r;

    const mouse = { x: -9999, y: -9999, active: false };
    const ripples: { x: number; y: number; r: number; a: number }[] = [];

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
      mouse.active = false;
    };
    const onClick = (e: MouseEvent) => {
      ripples.push({ x: e.clientX, y: e.clientY, r: 0, a: 0.8 });
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseout', onLeave);
    window.addEventListener('mouseleave', onLeave);
    window.addEventListener('click', onClick);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // solid black background
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // update particles
      for (const p of particles) {
        // simple movement
        p.x += p.vx;
        p.y += p.vy;

        // wrapping
        if (p.x < -20) p.x = canvas.width + 20;
        if (p.x > canvas.width + 20) p.x = -20;
        if (p.y < -20) p.y = canvas.height + 20;
        if (p.y > canvas.height + 20) p.y = -20;

        // mouse interaction: grow + repel
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (mouse.active && dist < 140) {
          const force = (1 - dist / 140) * 0.6;
          // repel
          p.vx += (dx / (dist || 1)) * force * 0.4;
          p.vy += (dy / (dist || 1)) * force * 0.4;
          // grow and brighten
          p.r = Math.min(p.baseR * 3, p.r + 0.12 * force * 10);
          p.alpha = Math.min(1, p.alpha + 0.06 * force * 10);
        } else {
          // relax back
          p.r += (p.baseR - p.r) * 0.02;
          p.alpha += ((Math.random() * 0.6 + 0.15) - p.alpha) * 0.01;
        }

        // subtle damping
        p.vx *= 0.995;
        p.vy *= 0.995;

        // monochrome particles (white/gray)
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(0.4, p.r), 0, Math.PI * 2);
        const gray = Math.floor(180 + p.alpha * 40);
        ctx.fillStyle = `rgba(${gray},${gray},${gray},${p.alpha})`;
        ctx.fill();
      }

      // connecting lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            const alpha = 0.04 * (1 - dist / 120);
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(200,200,200,${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        r.r += 6;
        r.a -= 0.01;
        if (r.a <= 0) ripples.splice(i, 1);
        else {
          ctx.beginPath();
          ctx.arc(r.x, r.y, r.r, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(220,220,220,${r.a * 0.6})`;
          ctx.lineWidth = 2;
          ctx.stroke();
        }
      }

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseout', onLeave);
      window.removeEventListener('mouseleave', onLeave);
      window.removeEventListener('click', onClick);
      // no toggle listeners to remove
    };
  }, []);


  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ opacity: 0.85 }}
    />
  );
}
