import { useRef, useEffect, useState } from 'react';
import { terminalConfig } from '../config';

interface LineState {
  text: string;
  color: string;
  highlight?: string;
  highlightColor?: string;
  visible: boolean;
}

export default function TerminalSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [lines, setLines] = useState<LineState[]>(
    terminalConfig.lines.map((l) => ({
      text: l.text,
      color: l.color,
      highlight: l.highlight,
      highlightColor: l.highlightColor,
      visible: false,
    }))
  );
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;

            terminalConfig.lines.forEach((line, i) => {
              setTimeout(() => {
                setLines((prev) =>
                  prev.map((l, idx) => (idx === i ? { ...l, visible: true } : l))
                );
              }, line.delay);
            });
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const getColor = (color: string) => {
    switch (color) {
      case 'green':
        return 'var(--green)';
      case 'cyan':
        return 'var(--cyan)';
      case 'gold':
        return 'var(--gold)';
      default:
        return 'var(--text-primary)';
    }
  };

  const renderLine = (line: LineState) => {
    if (!line.highlight) {
      return (
        <span style={{ color: getColor(line.color) }}>{line.text}</span>
      );
    }

    const parts = line.text.split(line.highlight);
    return (
      <span>
        <span style={{ color: getColor(line.color) }}>{parts[0]}</span>
        <span style={{ color: getColor(line.highlightColor || 'gold') }}>
          {line.highlight}
        </span>
        <span style={{ color: getColor(line.color) }}>{parts[1]}</span>
      </span>
    );
  };

  return (
    <section
      id="terminal"
      ref={sectionRef}
      className="section-padding"
      style={{ background: 'var(--bg)' }}
    >
      <div className="content-container">
        <div
          className="mx-auto"
          style={{
            maxWidth: 640,
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 14,
            overflow: 'hidden',
          }}
        >
          {/* macOS chrome */}
          <div
            className="flex items-center"
            style={{
              padding: '12px 16px',
              borderBottom: '1px solid var(--border)',
              background: 'var(--surface-alt)',
              gap: 8,
            }}
          >
            <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#FF5F56', display: 'inline-block' }} />
            <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#FFBD2E', display: 'inline-block' }} />
            <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#27C93F', display: 'inline-block' }} />
            <span
              style={{
                marginLeft: 12,
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
                color: 'var(--text-muted)',
              }}
            >
              {terminalConfig.filename}
            </span>
          </div>

          {/* Terminal body */}
          <div
            style={{
              padding: '20px 24px',
              fontFamily: 'var(--font-mono)',
              fontSize: 13,
              lineHeight: 2,
              minHeight: 280,
            }}
          >
            {lines.map((line, i) => (
              <div
                key={i}
                style={{
                  opacity: line.visible ? 1 : 0,
                  transition: 'opacity 0.1s ease',
                  minHeight: '2em',
                }}
              >
                {renderLine(line)}
              </div>
            ))}
            {lines[lines.length - 1]?.visible && (
              <span
                className="cursor-blink"
                style={{
                  display: 'inline-block',
                  width: 10,
                  height: 16,
                  background: 'var(--cyan)',
                  verticalAlign: 'middle',
                  marginLeft: 2,
                }}
              >
                &nbsp;
              </span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
