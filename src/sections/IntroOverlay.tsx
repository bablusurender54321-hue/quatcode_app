import { useRef, useEffect } from 'react';
import gsap from 'gsap';

const CHARS = 'ΣαβρσμλΔ∂∫≈≠≤≥∞01AF3E9C';

interface Column {
  x: number;
  y: number;
  speed: number;
  chars: string[];
  length: number;
}

export default function IntroOverlay({ onComplete }: { onComplete: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const rafRef = useRef<number>(0);
  const columnsRef = useRef<Column[]>([]);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      onComplete();
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Init columns
    const colCount = Math.floor(window.innerWidth / 16);
    columnsRef.current = Array.from({ length: colCount }, () => ({
      x: Math.floor(Math.random() * colCount) * 16,
      y: Math.random() * -canvas.height,
      speed: 1 + Math.random() * 2.5,
      chars: Array.from({ length: 15 + Math.floor(Math.random() * 20) }, () =>
        CHARS[Math.floor(Math.random() * CHARS.length)]
      ),
      length: 15 + Math.floor(Math.random() * 20),
    }));

    const draw = () => {
      ctx.fillStyle = 'rgba(4, 6, 15, 0.15)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      columnsRef.current.forEach((col) => {
        col.chars.forEach((char, i) => {
          const y = col.y - i * 16;
          if (y < -20 || y > canvas.height + 20) return;

          if (i === 0) {
            ctx.fillStyle = 'rgba(0, 229, 255, 0.9)';
            ctx.font = 'bold 14px "JetBrains Mono", monospace';
          } else {
            const opacity = 0.08 + (1 - i / col.length) * 0.12;
            ctx.fillStyle = `rgba(0, 229, 255, ${opacity})`;
            ctx.font = '13px "JetBrains Mono", monospace';
          }
          ctx.fillText(char, col.x, y);
        });

        col.y += col.speed;
        if (col.y - col.length * 16 > canvas.height) {
          col.y = -20;
          col.x = Math.floor(Math.random() * colCount) * 16;
          col.speed = 1 + Math.random() * 2.5;
        }
      });

      rafRef.current = requestAnimationFrame(draw);
    };

    // Fade in canvas
    gsap.fromTo(canvas, { opacity: 0 }, { opacity: 1, duration: 0.4 });
    rafRef.current = requestAnimationFrame(draw);

    // GSAP Timeline
    const tl = gsap.timeline({
      onComplete: () => {
        dissolveOverlay();
      },
    });
    tlRef.current = tl;

    // Corner texts
    tl.fromTo(
      '#intro-corner-tl',
      { x: -40, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
      0.4
    );
    tl.fromTo(
      '#intro-corner-br',
      { x: 40, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
      0.5
    );

    // Character split animation for logo
    const logoEl = logoRef.current;
    if (logoEl) {
      const text = 'QUANTΣODE';
      logoEl.innerHTML = '';
      text.split('').forEach((char, i) => {
        const span = document.createElement('span');
        span.textContent = char;
        span.style.display = 'inline-block';
        if (char === 'Σ') span.classList.add('sigma');
        logoEl.appendChild(span);

        tl.fromTo(
          span,
          { opacity: 0, y: 40, filter: 'blur(8px)' },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 0.5,
            ease: 'power2.out',
          },
          0.8 + i * 0.08
        );
      });
    }

    // Glitch effect
    tl.add(() => {
      logoEl?.classList.add('glitch-active');
      setTimeout(() => logoEl?.classList.remove('glitch-active'), 150);
    }, 2.0);
    tl.add(() => {
      logoEl?.classList.add('glitch-active');
      setTimeout(() => logoEl?.classList.remove('glitch-active'), 150);
    }, 2.08);
    tl.add(() => {
      logoEl?.classList.add('glitch-active');
      setTimeout(() => logoEl?.classList.remove('glitch-active'), 150);
    }, 2.16);

    // Typewriter sub
    tl.add(() => {
      const sub = '// SYSTEMATIC TRADING LAB';
      let idx = 0;
      if (subRef.current) subRef.current.textContent = '';
      const typeInterval = setInterval(() => {
        if (subRef.current && idx < sub.length) {
          subRef.current.textContent += sub[idx];
          idx++;
        } else {
          clearInterval(typeInterval);
        }
      }, 30);
    }, 2.5);

    // Meta fade in
    tl.fromTo(metaRef, { opacity: 0 }, { opacity: 1, duration: 0.4 }, 3.5);

    // Line draw
    tl.fromTo(lineRef, { width: 0 }, { width: 200, duration: 0.5, ease: 'power2.out' }, 4.0);

    // Auto dissolve at 5s
    tl.add(() => {
      dissolveOverlay();
    }, 5.0);

    function dissolveOverlay() {
      const overlay = overlayRef.current;
      if (!overlay) return;
      gsap.to(overlay, {
        scale: 1.05,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.inOut',
        onComplete: () => {
          cancelAnimationFrame(rafRef.current);
          overlay.style.display = 'none';
          overlay.style.pointerEvents = 'none';
          onComplete();
        },
      });
    }

    return () => {
      cancelAnimationFrame(rafRef.current);
      tl.kill();
      window.removeEventListener('resize', resize);
    };
  }, [onComplete]);

  return (
    <div id="intro-overlay" ref={overlayRef}>
      <canvas id="intro-canvas" ref={canvasRef} />
      <div id="intro-center">
        <div id="intro-logo" ref={logoRef}>QUANTΣODE</div>
        <div id="intro-sub" ref={subRef} />
        <div id="intro-meta" ref={metaRef}>MNIT JAIPUR &nbsp;|&nbsp; EST. 2026</div>
        <div className="intro-line" ref={lineRef} />
      </div>
      <div id="intro-corner-tl">QuantCode Club</div>
      <div id="intro-corner-br">ALGO · RESEARCH · HFT</div>
    </div>
  );
}
