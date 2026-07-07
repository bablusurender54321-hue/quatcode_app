import { useRef, useEffect, useState, useCallback } from 'react';
import { liveMarketConfig } from '../config';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface MarketMetric {
  label: string;
  value: string;
  change: string;
  isUp: boolean;
}

const INITIAL_METRICS: MarketMetric[] = [
  { label: 'NIFTY 50', value: '24,547.20', change: '+0.42%', isUp: true },
  { label: 'BANK NIFTY', value: '52,384.60', change: '+0.38%', isUp: true },
  { label: 'INDIA VIX', value: '12.34', change: '-2.1%', isUp: false },
  { label: 'USD/INR', value: '83.45', change: '+0.05%', isUp: true },
  { label: 'GOLD', value: '2,685.30', change: '+0.67%', isUp: true },
  { label: 'BTC/USD', value: '67,234.50', change: '+1.24%', isUp: true },
  { label: 'SENSEX', value: '80,586.20', change: '+0.45%', isUp: true },
  { label: 'CRUDE OIL', value: '78.45', change: '-0.32%', isUp: false },
];

interface Tick {
  time: string;
  price: number;
}

function MiniSparkline({ data, color }: { data: number[]; color: string }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const points = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * 100;
      const y = 30 - ((v - min) / range) * 24;
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <svg viewBox="0 0 100 32" style={{ width: '100%', height: 32 }} preserveAspectRatio="none">
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient id={`grad-${color.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.2" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon
        points={`0,30 ${points} 100,30`}
        fill={`url(#grad-${color.replace('#', '')})`}
      />
    </svg>
  );
}

export default function MarketDashboard() {
  const sectionRef = useRef<HTMLElement>(null);
  const [metrics, setMetrics] = useState<MarketMetric[]>(INITIAL_METRICS);
  const [ticks, setTicks] = useState<Tick[]>([]);
  const tickInterval = useRef<ReturnType<typeof setInterval> | null>(null);
  const sparkDataRef = useRef<number[][]>(
    INITIAL_METRICS.map(() =>
      Array.from({ length: 20 }, () => 50 + Math.random() * 20)
    )
  );

  // Scroll reveal
  useEffect(() => {
    gsap.fromTo(
      sectionRef.current,
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

  // Simulate live ticks
  const addTick = useCallback(() => {
    const now = new Date();
    const time = now.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });
    const basePrice = 24500 + Math.sin(Date.now() / 10000) * 200;
    const noise = (Math.random() - 0.5) * 50;
    const price = basePrice + noise;

    setTicks((prev) => {
      const next = [...prev, { time, price }];
      if (next.length > 30) next.shift();
      return next;
    });

    // Update sparklines
    sparkDataRef.current = sparkDataRef.current.map((arr) => {
      const next = [...arr, arr[arr.length - 1] * (1 + (Math.random() * 0.04 - 0.02))];
      if (next.length > 20) next.shift();
      return next;
    });

    // Update metrics
    setMetrics((prev) =>
      prev.map((m) => {
        const changeVal = parseFloat(m.change) + (Math.random() * 0.1 - 0.05);
        return {
          ...m,
          change: `${changeVal >= 0 ? '+' : ''}${changeVal.toFixed(2)}%`,
          isUp: changeVal >= 0,
        };
      })
    );
  }, []);

  useEffect(() => {
    // Fill initial ticks
    const initial: Tick[] = [];
    for (let i = 30; i > 0; i--) {
      const t = new Date(Date.now() - i * 2000);
      initial.push({
        time: t.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }),
        price: 24500 + Math.sin(i * 0.3) * 150 + Math.random() * 30,
      });
    }
    setTicks(initial);

    tickInterval.current = setInterval(addTick, 2000);
    return () => {
      if (tickInterval.current) clearInterval(tickInterval.current);
    };
  }, [addTick]);

  const sparkTicks = ticks.map((t) => t.price);
  const sparkColor =
    sparkTicks.length > 1 && sparkTicks[sparkTicks.length - 1] >= sparkTicks[0]
      ? 'var(--green)'
      : 'var(--red)';

  return (
    <section
      id="market-dashboard"
      ref={sectionRef}
      className="section-padding"
      style={{ background: 'var(--bg)' }}
    >
      <div className="content-container">
        {/* Header */}
        <div style={{ marginBottom: 48 }}>
          <div className="flex items-center justify-between flex-wrap" style={{ gap: 16, marginBottom: 8 }}>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
                fontWeight: 600,
                color: 'var(--text-muted)',
                letterSpacing: 2,
              }}
            >
              {liveMarketConfig.sectionLabel}
            </div>
            <div
              className="flex items-center"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 10,
                color: 'var(--green)',
                gap: 6,
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  backgroundColor: 'var(--green)',
                  display: 'inline-block',
                  animation: 'blink 1.5s step-end infinite',
                }}
              />
              LIVE
            </div>
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-section)',
              fontWeight: 700,
              color: 'white',
              marginBottom: 8,
            }}
          >
            {liveMarketConfig.heading}
          </h2>
          <p
            style={{
              fontSize: 14,
              color: 'var(--text-muted)',
              maxWidth: 640,
              lineHeight: 1.6,
            }}
          >
            {liveMarketConfig.sub}
          </p>
        </div>

        {/* Main dashboard grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Live chart card */}
          <div
            className="lg:col-span-2"
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 14,
              padding: '24px 20px',
            }}
          >
            <div className="flex items-center justify-between" style={{ marginBottom: 16 }}>
              <div>
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 14,
                    fontWeight: 600,
                    color: 'white',
                  }}
                >
                  NIFTY 50
                </div>
                <div className="flex items-center" style={{ gap: 8, marginTop: 4 }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 22,
                      fontWeight: 700,
                      color: sparkColor,
                    }}
                  >
                    {ticks.length > 0
                      ? ticks[ticks.length - 1].price.toLocaleString('en-IN', {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })
                      : '--'}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 11,
                      color: sparkColor,
                    }}
                  >
                    {sparkTicks.length > 1
                      ? `${sparkTicks[sparkTicks.length - 1] >= sparkTicks[0] ? '+' : ''}${(
                          ((sparkTicks[sparkTicks.length - 1] - sparkTicks[0]) / sparkTicks[0]) *
                          100
                        ).toFixed(2)}%`
                      : ''}
                  </span>
                </div>
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 10,
                  color: 'var(--text-dim)',
                }}
              >
                {ticks.length > 0 ? ticks[ticks.length - 1].time : '--:--:--'}
              </div>
            </div>

            {/* SVG Live chart */}
            <div style={{ height: 200, position: 'relative' }}>
              {ticks.length > 1 && (
                <svg
                  viewBox={`0 0 ${ticks.length - 1} 100`}
                  style={{ width: '100%', height: '100%', overflow: 'visible' }}
                  preserveAspectRatio="none"
                >
                  {(() => {
                    const prices = ticks.map((t) => t.price);
                    const min = Math.min(...prices);
                    const max = Math.max(...prices);
                    const range = max - min || 1;
                    const points = prices
                      .map((p, i) => `${i},${100 - ((p - min) / range) * 90 - 5}`)
                      .join(' ');
                    const areaPoints = `0,100 ${points} ${ticks.length - 1},100`;

                    return (
                      <>
                        <defs>
                          <linearGradient id="liveGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="var(--cyan)" stopOpacity="0.25" />
                            <stop offset="100%" stopColor="var(--cyan)" stopOpacity="0" />
                          </linearGradient>
                        </defs>
                        <polygon points={areaPoints} fill="url(#liveGrad)" />
                        <polyline
                          points={points}
                          fill="none"
                          stroke="var(--cyan)"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        {/* Last point dot */}
                        <circle
                          cx={ticks.length - 1}
                          cy={100 - ((prices[prices.length - 1] - min) / range) * 90 - 5}
                          r="2"
                          fill="var(--cyan)"
                        />
                      </>
                    );
                  })()}
                </svg>
              )}
            </div>
          </div>

          {/* Metrics grid */}
          <div className="grid grid-cols-2 gap-3">
            {metrics.map((m, i) => (
              <div
                key={m.label}
                style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderRadius: 12,
                  padding: '16px 14px',
                  transition: 'all 0.25s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-hover)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border)';
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 10,
                    color: 'var(--text-muted)',
                    marginBottom: 6,
                    letterSpacing: '0.5px',
                  }}
                >
                  {m.label}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 15,
                    fontWeight: 700,
                    color: 'white',
                    marginBottom: 4,
                  }}
                >
                  {m.value}
                </div>
                <MiniSparkline
                  data={sparkDataRef.current[i]}
                  color={m.isUp ? 'var(--green)' : 'var(--red)'}
                />
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 11,
                    color: m.isUp ? 'var(--green)' : 'var(--red)',
                    marginTop: 4,
                  }}
                >
                  {m.change}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
