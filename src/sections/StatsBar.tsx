import { useRef, useEffect, useState } from 'react';
import { statsConfig } from '../config';

function AnimatedStat({
  value,
  suffix,
  label,
  decimals = 0,
}: {
  value: number;
  suffix: string;
  label: string;
  decimals?: number;
}) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;
            const duration = 2000;
            const startTime = performance.now();

            const animate = (now: number) => {
              const elapsed = now - startTime;
              const t = Math.min(elapsed / duration, 1);
              const eased = 1 - Math.pow(1 - t, 3);
              setDisplay(eased * value);
              if (t < 1) requestAnimationFrame(animate);
            };

            requestAnimationFrame(animate);
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  const formatted = decimals > 0 ? display.toFixed(decimals) : Math.round(display).toString();

  return (
    <div ref={ref} className="flex-1 flex flex-col items-center text-center" style={{ padding: '24px 16px' }}>
      <div
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(36px, 5vw, 56px)',
          fontWeight: 800,
          color: 'var(--cyan)',
          lineHeight: 1.1,
          marginBottom: 8,
        }}
      >
        {formatted}
        {suffix}
      </div>
      <div
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 12,
          fontWeight: 500,
          color: 'var(--text-muted)',
          textTransform: 'uppercase',
          letterSpacing: 2,
        }}
      >
        {label}
      </div>
    </div>
  );
}

export default function StatsBar() {
  return (
    <div
      id="stats-bar"
      className="w-full"
      style={{
        background: 'var(--surface)',
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <div className="content-container">
        <div className="flex flex-col sm:flex-row">
          {statsConfig.map((stat, i) => (
            <div key={i} className="flex flex-1 items-center">
              <AnimatedStat
                value={stat.value}
                suffix={stat.suffix}
                label={stat.label}
              />
              {i < statsConfig.length - 1 && (
                <div
                  className="hidden sm:block flex-shrink-0"
                  style={{
                    width: 1,
                    height: 60,
                    backgroundColor: 'var(--border)',
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
