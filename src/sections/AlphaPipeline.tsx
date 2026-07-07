import { useRef, useEffect } from 'react';
import { alphaPipelineConfig } from '../config';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function AlphaPipeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardsRef.current || !lineRef.current) return;

    const cards = cardsRef.current.querySelectorAll('.pipeline-card');
    const line = lineRef.current;

    gsap.fromTo(
      cards,
      { opacity: 0, y: 40 },
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

    // Connector line animation
    gsap.fromTo(
      line,
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: 1.2,
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
      }
    );
  }, []);

  return (
    <section
      id="alpha-pipeline"
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
            {alphaPipelineConfig.sectionLabel}
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
            {alphaPipelineConfig.heading}
          </h2>
          <p
            style={{
              fontSize: 16,
              color: 'var(--text-muted)',
              maxWidth: 640,
              margin: '0 auto',
              lineHeight: 1.7,
            }}
          >
            {alphaPipelineConfig.body}
          </p>
        </div>

        {/* Cards + Connector */}
        <div className="relative">
          {/* Horizontal connector line (desktop) */}
          <div
            ref={lineRef}
            className="hidden lg:block absolute"
            style={{
              top: 40,
              left: '12.5%',
              right: '12.5%',
              height: 2,
              background: 'linear-gradient(90deg, var(--cyan), var(--violet))',
              opacity: 0.4,
              transformOrigin: 'left center',
              zIndex: 0,
            }}
          />

          <div
            ref={cardsRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative"
            style={{ zIndex: 1 }}
          >
            {alphaPipelineConfig.steps.map((step, i) => (
              <div
                key={i}
                className="pipeline-card card-hover"
                style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderRadius: 14,
                  padding: '28px 24px',
                  transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
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
                    fontFamily: 'var(--font-mono)',
                    fontSize: 14,
                    fontWeight: 600,
                    color: 'var(--cyan)',
                    marginBottom: 12,
                    letterSpacing: 1,
                  }}
                >
                  {step.number} //
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
                  {step.title}
                </h3>
                <p
                  style={{
                    fontSize: 14,
                    color: 'var(--text-muted)',
                    lineHeight: 1.65,
                  }}
                >
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
