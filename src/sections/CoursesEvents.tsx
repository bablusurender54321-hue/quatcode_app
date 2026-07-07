import { useRef, useEffect } from 'react';
import { coursesEventsConfig } from '../config';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function CoursesEvents() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current) return;
    const cards = contentRef.current.querySelectorAll('.offering-card');
    gsap.fromTo(
      cards,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      }
    );
  }, []);

  const { eyebrow, heading, sub, offerings } = coursesEventsConfig;

  return (
    <section
      id="courses-events"
      ref={sectionRef}
      className="section-padding"
      style={{
        background:
          'linear-gradient(135deg, rgba(108,58,237,0.12), rgba(0,229,255,0.04))',
      }}
    >
      <div ref={contentRef} className="content-container">
        {/* Section header */}
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
            {eyebrow}
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
            {heading}
          </h2>
          <p
            style={{
              fontSize: 16,
              color: 'var(--text-muted)',
              maxWidth: 600,
              margin: '0 auto',
              lineHeight: 1.7,
            }}
          >
            {sub}
          </p>
        </div>

        {/* Offerings grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {offerings.map((offering, idx) => (
            <div
              key={idx}
              className="offering-card"
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: 14,
                padding: '32px 28px',
                transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                display: 'flex',
                flexDirection: 'column',
                opacity: 0,
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
              {/* Tag */}
              <div
                style={{
                  display: 'inline-flex',
                  alignSelf: 'flex-start',
                  padding: '4px 12px',
                  background:
                    idx === 0
                      ? 'rgba(0, 229, 255, 0.1)'
                      : idx === 1
                        ? 'rgba(108, 58, 237, 0.15)'
                        : 'rgba(255, 209, 102, 0.1)',
                  border: `1px solid ${
                    idx === 0
                      ? 'rgba(0, 229, 255, 0.3)'
                      : idx === 1
                        ? 'rgba(108, 58, 237, 0.3)'
                        : 'rgba(255, 209, 102, 0.2)'
                  }`,
                  borderRadius: 100,
                  fontFamily: 'var(--font-mono)',
                  fontSize: 10,
                  fontWeight: 600,
                  letterSpacing: '1px',
                  color:
                    idx === 0 ? 'var(--cyan)' : idx === 1 ? 'var(--violet)' : 'var(--gold)',
                  marginBottom: 20,
                }}
              >
                {offering.tag}
              </div>

              {/* Title */}
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 22,
                  fontWeight: 700,
                  color: 'white',
                  marginBottom: 12,
                  lineHeight: 1.3,
                }}
              >
                {offering.title}
              </h3>

              {/* Description */}
              <p
                style={{
                  fontSize: 14,
                  color: 'var(--text-muted)',
                  lineHeight: 1.7,
                  marginBottom: 20,
                  flex: 1,
                }}
              >
                {offering.description}
              </p>

              {/* Meta row */}
              <div
                className="flex items-center flex-wrap"
                style={{ gap: 12, marginBottom: 20 }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 11,
                    color: 'var(--text-muted)',
                    padding: '3px 10px',
                    background: 'var(--surface-alt)',
                    borderRadius: 6,
                  }}
                >
                  {offering.duration}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 11,
                    color: 'var(--text-muted)',
                    padding: '3px 10px',
                    background: 'var(--surface-alt)',
                    borderRadius: 6,
                  }}
                >
                  {offering.level}
                </span>
              </div>

              {/* Highlights */}
              <div className="flex flex-wrap" style={{ gap: 6, marginBottom: 24 }}>
                {offering.highlights.map((h, i) => (
                  <span
                    key={i}
                    style={{
                      padding: '3px 10px',
                      background: 'rgba(0,229,255,0.06)',
                      border: '1px solid rgba(0,229,255,0.12)',
                      borderRadius: 6,
                      fontFamily: 'var(--font-mono)',
                      fontSize: 10,
                      color: 'var(--cyan)',
                    }}
                  >
                    {h}
                  </span>
                ))}
              </div>

              {/* CTA */}
              <a
                href={offering.ctaHref}
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector(offering.ctaHref)?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center justify-center no-underline"
                style={{
                  height: 44,
                  padding: '0 24px',
                  backgroundColor: 'transparent',
                  color: 'var(--text-primary)',
                  fontFamily: 'var(--font-display)',
                  fontSize: 13,
                  fontWeight: 600,
                  borderRadius: 24,
                  border: '1px solid var(--border)',
                  letterSpacing: '0.5px',
                  transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                  alignSelf: 'flex-start',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--cyan)';
                  e.currentTarget.style.color = 'var(--bg)';
                  e.currentTarget.style.borderColor = 'var(--cyan)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = 'var(--text-primary)';
                  e.currentTarget.style.borderColor = 'var(--border)';
                }}
              >
                {offering.ctaText}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
