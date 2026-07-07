import { useRef, useEffect } from 'react';
import { teamsConfig } from '../config';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function TeamsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardsRef.current) return;
    const cards = cardsRef.current.querySelectorAll('.team-card');
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
      id="teams"
      ref={sectionRef}
      className="section-padding"
      style={{ background: 'var(--bg)' }}
    >
      <div className="content-container">
        <div className="text-center" style={{ marginBottom: 56 }}>
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
            {teamsConfig.sectionLabel}
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
            {teamsConfig.heading}
          </h2>
          <p
            style={{
              fontSize: 16,
              color: 'var(--text-muted)',
              maxWidth: 480,
              margin: '0 auto',
            }}
          >
            {teamsConfig.sub}
          </p>
        </div>

        {/* Cards grid - all teams shown, no filtering */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {teamsConfig.teams.map((team) => (
            <div
              key={team.title}
              className="team-card"
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: 14,
                padding: '28px 24px',
                transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                opacity: 0,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-hover)';
                e.currentTarget.style.boxShadow =
                  '0 8px 32px rgba(0,229,255,0.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border)';
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
                  e.currentTarget.style.transform = 'scale(1.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                {team.icon}
              </div>
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 18,
                  fontWeight: 700,
                  color: 'white',
                  marginBottom: 10,
                }}
              >
                {team.title}
              </h3>
              <p
                style={{
                  fontSize: 14,
                  color: 'var(--text-muted)',
                  lineHeight: 1.65,
                }}
              >
                {team.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
