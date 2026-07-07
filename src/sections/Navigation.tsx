import { useEffect, useState, useRef } from 'react';
import { siteConfig, navigationConfig } from '../config';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setMobileOpen(false);
    }
  };

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-[999] flex items-center justify-between nav-main"
      style={{
        padding: '0 5vw',
        backgroundColor: scrolled ? 'rgba(4, 6, 15, 0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(0, 229, 255, 0.12)' : '1px solid transparent',
        transition: 'background-color 0.3s ease, backdrop-filter 0.3s ease, border-bottom 0.3s ease',
      }}
    >
      <a
        href="#hero"
        onClick={(e) => handleClick(e, '#hero')}
        className="no-underline"
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 18,
          fontWeight: 600,
          color: 'var(--cyan)',
          letterSpacing: '1px',
        }}
      >
        {siteConfig.brandName}
      </a>

      {/* Desktop links */}
      <div className="hidden md:flex items-center" style={{ gap: 32 }}>
        {navigationConfig.links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            onClick={(e) => handleClick(e, link.href)}
            className="nav-link-custom"
          >
            {link.label}
          </a>
        ))}
      </div>

      {/* Desktop CTA */}
      <a
        href={navigationConfig.ctaHref}
        onClick={(e) => handleClick(e, navigationConfig.ctaHref)}
        className="nav-link-custom hidden md:inline-block"
        style={{
          border: '1px solid var(--cyan)',
          color: 'var(--cyan)',
          padding: '8px 16px',
          borderRadius: 6,
          fontFamily: 'var(--font-mono)',
          fontSize: 12,
          letterSpacing: '1px',
          transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'var(--cyan)';
          e.currentTarget.style.color = 'var(--bg)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'transparent';
          e.currentTarget.style.color = 'var(--cyan)';
        }}
      >
        {navigationConfig.ctaText}
      </a>

      {/* Mobile hamburger */}
      <button
        className="md:hidden flex flex-col justify-center items-center"
        style={{ gap: 5, background: 'none', border: 'none', cursor: 'pointer', padding: 8 }}
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle menu"
      >
        <span
          style={{
            width: 22,
            height: 1.5,
            backgroundColor: mobileOpen ? 'var(--cyan)' : 'var(--text-primary)',
            transition: 'all 0.3s ease',
            transform: mobileOpen ? 'rotate(45deg) translate(4.5px, 4.5px)' : 'none',
          }}
        />
        <span
          style={{
            width: 22,
            height: 1.5,
            backgroundColor: mobileOpen ? 'var(--cyan)' : 'var(--text-primary)',
            transition: 'all 0.3s ease',
            opacity: mobileOpen ? 0 : 1,
          }}
        />
        <span
          style={{
            width: 22,
            height: 1.5,
            backgroundColor: mobileOpen ? 'var(--cyan)' : 'var(--text-primary)',
            transition: 'all 0.3s ease',
            transform: mobileOpen ? 'rotate(-45deg) translate(4.5px, -4.5px)' : 'none',
          }}
        />
      </button>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="md:hidden absolute left-0 right-0 flex flex-col"
          style={{
            top: 'var(--nav-height, 64px)',
            backgroundColor: 'rgba(4, 6, 15, 0.98)',
            backdropFilter: 'blur(20px)',
            borderBottom: '1px solid var(--border)',
            padding: '24px 5vw',
            gap: 20,
          }}
        >
          {navigationConfig.links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleClick(e, link.href)}
              className="nav-link-custom"
              style={{ fontSize: 15 }}
            >
              {link.label}
            </a>
          ))}
          <a
            href={navigationConfig.ctaHref}
            onClick={(e) => handleClick(e, navigationConfig.ctaHref)}
            className="nav-link-custom"
            style={{
              border: '1px solid var(--cyan)',
              color: 'var(--cyan)',
              padding: '10px 16px',
              borderRadius: 6,
              fontFamily: 'var(--font-mono)',
              fontSize: 12,
              textAlign: 'center',
              letterSpacing: '1px',
            }}
          >
            {navigationConfig.ctaText}
          </a>
        </div>
      )}
    </nav>
  );
}
