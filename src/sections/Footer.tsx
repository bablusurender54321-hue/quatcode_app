import { footerConfig } from '../config';

export default function Footer() {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer
      id="footer"
      style={{
        background: 'var(--bg)',
        borderTop: '1px solid transparent',
        position: 'relative',
      }}
    >
      {/* Cyan gradient line */}
      <div
        style={{
          height: 1,
          background: 'linear-gradient(90deg, transparent, var(--cyan), transparent)',
        }}
      />

      <div className="content-container" style={{ padding: '64px 24px 32px' }}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12" style={{ marginBottom: 48 }}>
          {/* Brand column */}
          <div className="md:col-span-1">
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 16,
                fontWeight: 700,
                color: 'white',
                marginBottom: 12,
                letterSpacing: '0.5px',
              }}
            >
              {footerConfig.heading}
            </div>
            <p
              style={{
                fontSize: 13,
                color: 'var(--text-muted)',
                lineHeight: 1.65,
                maxWidth: 280,
              }}
            >
              {footerConfig.body}
            </p>
          </div>

          {/* Link columns */}
          {footerConfig.columns.map((col, i) => (
            <div key={i}>
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 11,
                  fontWeight: 700,
                  color: 'var(--text-muted)',
                  textTransform: 'uppercase',
                  letterSpacing: 2,
                  marginBottom: 16,
                }}
              >
                {col.title}
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {col.links.map((link, j) => (
                  <li key={j} style={{ marginBottom: 10 }}>
                    <a
                      href={link.href}
                      onClick={(e) => handleClick(e, link.href)}
                      target={link.href.startsWith('http') ? '_blank' : undefined}
                      rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="no-underline"
                      style={{
                        fontSize: 13,
                        color: 'var(--text-muted)',
                        transition: 'color 0.25s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = 'var(--cyan)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = 'var(--text-muted)';
                      }}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between"
          style={{
            paddingTop: 24,
            borderTop: '1px solid var(--border)',
            gap: 16,
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              color: 'var(--text-dim)',
            }}
          >
            {footerConfig.copyright}
          </span>

          <div className="flex items-center" style={{ gap: 20 }}>
            {footerConfig.bottomLinks.map((link, i) => (
              <a
                key={i}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="no-underline"
                style={{
                  fontSize: 12,
                  color: 'var(--text-muted)',
                  transition: 'color 0.25s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--cyan)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--text-muted)';
                }}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
