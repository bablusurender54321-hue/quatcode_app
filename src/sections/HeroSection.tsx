import { useRef, useEffect, useState, useCallback } from 'react';
import { heroConfig } from '../config';
import gsap from 'gsap';

interface Dot {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
}

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const [typewriterText, setTypewriterText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [, setShowSecondCursor] = useState(true);
  const dotsRef = useRef<Dot[]>([]);
  const rafRef = useRef<number>(0);
  const textIndexRef = useRef(0);
  const charIndexRef = useRef(0);
  const isDeletingRef = useRef(false);

  // Particle network
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener('resize', resize);

    const w = canvas.offsetWidth;
    const h = canvas.offsetHeight;

    dotsRef.current = Array.from({ length: 70 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.7,
      vy: (Math.random() - 0.5) * 0.7,
      r: 0.5 + Math.random() * 1.5,
    }));

    const draw = () => {
      const cw = canvas.offsetWidth;
      const ch = canvas.offsetHeight;
      ctx.clearRect(0, 0, cw, ch);

      const dots = dotsRef.current;
      for (let i = 0; i < dots.length; i++) {
        const d = dots[i];
        d.x += d.vx;
        d.y += d.vy;

        if (d.x < 0 || d.x > cw) d.vx *= -1;
        if (d.y < 0 || d.y > ch) d.vy *= -1;

        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 229, 255, 0.5)';
        ctx.fill();

        for (let j = i + 1; j < dots.length; j++) {
          const d2 = dots[j];
          const dx = d.x - d2.x;
          const dy = d.y - d2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130) {
            const opacity = (1 - dist / 130) * 0.22;
            ctx.beginPath();
            ctx.moveTo(d.x, d.y);
            ctx.lineTo(d2.x, d2.y);
            ctx.strokeStyle = `rgba(0, 229, 255, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  // Typewriter effect
  useEffect(() => {
    const texts = heroConfig.typewriterTexts;
    const typeSpeed = 80;
    const deleteSpeed = 40;
    const pauseTime = 2000;

    const tick = () => {
      const currentText = texts[textIndexRef.current];

      if (isDeletingRef.current) {
        setTypewriterText(currentText.substring(0, charIndexRef.current - 1));
        charIndexRef.current--;
        if (charIndexRef.current === 0) {
          isDeletingRef.current = false;
          textIndexRef.current = (textIndexRef.current + 1) % texts.length;
        }
        setTimeout(tick, deleteSpeed);
      } else {
        setTypewriterText(currentText.substring(0, charIndexRef.current + 1));
        charIndexRef.current++;
        if (charIndexRef.current === currentText.length) {
          isDeletingRef.current = true;
          setTimeout(tick, pauseTime);
        } else {
          setTimeout(tick, typeSpeed);
        }
      }
    };

    const timer = setTimeout(tick, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Cursor blink
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((p) => !p);
      setShowSecondCursor((p) => !p);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  // Scroll indicator bounce
  useEffect(() => {
    if (!scrollIndicatorRef.current) return;
    gsap.to(scrollIndicatorRef.current, {
      y: 8,
      repeat: -1,
      yoyo: true,
      duration: 1,
      ease: 'power1.inOut',
    });
  }, []);

  // Fade out scroll indicator on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (scrollIndicatorRef.current && window.scrollY > 50) {
        gsap.to(scrollIndicatorRef.current, { opacity: 0, duration: 0.3 });
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollDown = useCallback(() => {
    document.querySelector('#stats-bar')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const pillsRow = (
    <div className="flex items-center" style={{ gap: 12 }}>
      {heroConfig.pills.map((pill, i) => (
        <span
          key={i}
          className="inline-flex items-center flex-shrink-0"
          style={{
            padding: '6px 14px',
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 100,
            fontFamily: 'var(--font-display)',
            fontSize: 12,
            color: 'var(--text-muted)',
            gap: 6,
          }}
        >
          <span style={{ color: 'var(--cyan)', fontSize: 8 }}>◆</span>
          {pill}
        </span>
      ))}
    </div>
  );

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{ height: '100vh' }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />

      <div
        className="relative z-10 flex flex-col items-center justify-center"
        style={{
          height: '100%',
          maxWidth: 900,
          margin: '0 auto',
          padding: '0 24px',
          textAlign: 'center',
        }}
      >
        {/* Eyebrow */}
        <div
          className="flex items-center justify-center"
          style={{ gap: 12, marginBottom: 24 }}
        >
          <div style={{ width: 2, height: 20, backgroundColor: 'var(--cyan)' }} />
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 11,
              fontWeight: 600,
              color: 'var(--cyan)',
              letterSpacing: 3,
              textTransform: 'uppercase',
            }}
          >
            {heroConfig.eyebrow}
          </span>
        </div>

        {/* Title */}
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(64px, 10vw, 112px)',
            fontWeight: 800,
            color: 'white',
            lineHeight: 1.05,
            letterSpacing: '-2px',
            marginBottom: 16,
          }}
        >
          QUANT<span style={{ color: 'var(--cyan)' }}>Σ</span>ODE
        </h1>

        {/* Typewriter */}
        <div
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(20px, 3vw, 36px)',
            fontWeight: 400,
            color: 'var(--text-muted)',
            marginBottom: 24,
            minHeight: '1.4em',
          }}
        >
          {heroConfig.typewriterPrefix}{' '}
          <span style={{ color: 'var(--cyan)' }}>
            {typewriterText}
            <span
              style={{
                opacity: showCursor ? 1 : 0,
                transition: 'opacity 0.1s',
                color: 'var(--cyan)',
              }}
            >
              |
            </span>
          </span>
        </div>

        {/* Body */}
        <p
          style={{
            fontSize: 16,
            lineHeight: 1.75,
            color: 'var(--text-muted)',
            maxWidth: 580,
            marginBottom: 36,
          }}
        >
          {heroConfig.body}
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap items-center justify-center" style={{ gap: 16, marginBottom: 40 }}>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex items-center justify-center no-underline"
            style={{
              height: 48,
              padding: '0 28px',
              backgroundColor: 'var(--cyan)',
              color: 'var(--bg)',
              fontFamily: 'var(--font-display)',
              fontSize: 14,
              fontWeight: 600,
              borderRadius: 24,
              letterSpacing: '0.5px',
              transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.03)';
              e.currentTarget.style.boxShadow = '0 0 30px rgba(0, 229, 255, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            {heroConfig.ctaPrimary}
          </a>
          <a
            href={heroConfig.ctaSecondaryHref}
            onClick={(e) => {
              e.preventDefault();
              document.querySelector(heroConfig.ctaSecondaryHref)?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex items-center justify-center no-underline"
            style={{
              height: 48,
              padding: '0 28px',
              backgroundColor: 'transparent',
              color: 'var(--text-primary)',
              fontFamily: 'var(--font-display)',
              fontSize: 14,
              fontWeight: 500,
              borderRadius: 24,
              border: '1px solid var(--border)',
              letterSpacing: '0.5px',
              transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.03)';
              e.currentTarget.style.borderColor = 'var(--cyan)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.borderColor = 'var(--border)';
            }}
          >
            {heroConfig.ctaSecondary}
          </a>
        </div>
      </div>

      {/* Pill marquee - full width */}
      <div className="w-full overflow-hidden" style={{ maxWidth: '100%', position: 'absolute', bottom: 20, left: 0, zIndex: 10 }}>
        <div className="pill-scroll flex" style={{ gap: 12, width: 'max-content' }}>
          {pillsRow}
          {pillsRow}
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center cursor-pointer"
        style={{ zIndex: 10, color: 'var(--text-muted)' }}
        onClick={handleScrollDown}
      >
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 10,
            letterSpacing: 2,
            marginBottom: 8,
          }}
        >
          SCROLL
        </span>
        <svg width="16" height="24" viewBox="0 0 16 24" fill="none" style={{ opacity: 0.6 }}>
          <path
            d="M8 4V20M8 20L2 14M8 20L14 14"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </section>
  );
}
