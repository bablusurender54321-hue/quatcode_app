import { useRef, useEffect } from 'react';
import { coreFocusConfig } from '../config';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function FocusCard({ card }: { card: (typeof coreFocusConfig.cards)[0] }) {
  return (
    <div
      className="focus-card card-hover"
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 14,
        padding: '28px 24px',
        transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
        cursor: 'default',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'var(--border-hover)';
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = '0 16px 40px rgba(0,229,255,0.08)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--border)';
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <div
        style={{
          fontSize: 28,
          marginBottom: 12,
          display: 'inline-block',
          transition: 'transform 0.3s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.2) rotate(-5deg)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
        }}
      >
        {card.icon}
      </div>
      <h3
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 20,
          fontWeight: 700,
          color: 'white',
          marginBottom: 12,
        }}
      >
        {card.title}
      </h3>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {card.bullets.map((b, i) => (
          <li
            key={i}
            style={{
              fontSize: 13,
              color: 'var(--text-muted)',
              lineHeight: 1.6,
              marginBottom: 6,
              paddingLeft: 14,
              position: 'relative',
            }}
          >
            <span
              style={{
                position: 'absolute',
                left: 0,
                color: 'var(--cyan)',
                fontSize: 10,
              }}
            >
              ▪
            </span>
            {b}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function CoreFocus() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardsRef.current) return;
    const cards = cardsRef.current.querySelectorAll('.focus-card');
    gsap.fromTo(
      cards,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
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
      id="core-focus"
      ref={sectionRef}
      className="section-padding"
      style={{ background: 'var(--bg)' }}
    >
      <div className="content-container">
        <div className="text-center" style={{ marginBottom: 64 }}>
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
            {coreFocusConfig.sectionLabel}
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-section)',
              fontWeight: 700,
              color: 'white',
              marginBottom: 12,
            }}
          >
            {coreFocusConfig.heading}
          </h2>
          <p
            style={{
              fontSize: 16,
              color: 'var(--text-muted)',
              maxWidth: 480,
              margin: '0 auto',
            }}
          >
            {coreFocusConfig.sub}
          </p>
        </div>

        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {coreFocusConfig.cards.map((card, i) => (
            <FocusCard key={i} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
}
