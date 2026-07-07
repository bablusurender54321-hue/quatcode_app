import { useRef, useEffect } from 'react';
import { contactConfig } from '../config';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current) return;
    gsap.fromTo(
      contentRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      }
    );
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="section-padding"
      style={{
        background:
          'linear-gradient(135deg, rgba(108,58,237,0.1) 0%, rgba(0,229,255,0.05) 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Animated gradient overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(225deg, rgba(108,58,237,0.08) 0%, rgba(0,229,255,0.03) 50%, rgba(108,58,237,0.08) 100%)',
          backgroundSize: '200% 200%',
          animation: 'gradientShift 8s ease infinite',
          pointerEvents: 'none',
        }}
      />
      <style>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>

      <div
        ref={contentRef}
        className="content-container relative text-center"
        style={{ zIndex: 1 }}
      >
        <div
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 11,
            fontWeight: 600,
            color: 'var(--text-muted)',
            letterSpacing: 3,
            textTransform: 'uppercase',
            marginBottom: 16,
          }}
        >
          {contactConfig.sectionLabel}
        </div>
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-section)',
            fontWeight: 700,
            color: 'white',
            marginBottom: 20,
          }}
        >
          {contactConfig.heading}
        </h2>
        <p
          style={{
            fontSize: 16,
            color: 'var(--text-muted)',
            maxWidth: 600,
            margin: '0 auto 36px',
            lineHeight: 1.7,
          }}
        >
          {contactConfig.body}
        </p>
        <a
          href={contactConfig.ctaHref}
          className="inline-flex items-center justify-center no-underline"
          style={{
            height: 48,
            padding: '0 28px',
            backgroundColor: 'transparent',
            color: 'var(--cyan)',
            fontFamily: 'var(--font-display)',
            fontSize: 14,
            fontWeight: 600,
            borderRadius: 24,
            border: '1px solid var(--cyan)',
            letterSpacing: '0.5px',
            transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--cyan)';
            e.currentTarget.style.color = 'var(--bg)';
            e.currentTarget.style.transform = 'scale(1.02)';
            e.currentTarget.style.boxShadow = '0 0 30px rgba(0, 229, 255, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = 'var(--cyan)';
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          {contactConfig.ctaText}
        </a>
      </div>
    </section>
  );
}
