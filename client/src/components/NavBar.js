import React, { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { OPEN_TO_ROLES, SITE_VERSION } from '../data/site';
import { useActiveSection } from '../hooks/useActiveSection';
import './NavBar.css';

const NAV_LINKS = [
  { id: 'work', label: 'Work' },
  { id: 'how-i-build', label: 'How I build' },
  { id: 'journey', label: 'Journey' },
  { id: 'services', label: 'Services' },
  { id: 'credentials', label: 'Credentials' },
  { id: 'blog', label: 'Blog' },
  { id: 'contact', label: 'Contact' },
];
const SECTION_IDS = NAV_LINKS.map((l) => l.id);

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const active = useActiveSection(SECTION_IDS);
  const menuBtnRef = useRef(null);
  const firstLinkRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return undefined;
    document.body.style.overflow = 'hidden';
    firstLinkRef.current?.focus();
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setMenuOpen(false);
        menuBtnRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [menuOpen]);

  const statusLabel = OPEN_TO_ROLES ? 'Open to roles' : 'Heads-down, but say hi';

  return (
    <>
      <header className={`site-nav ${scrolled || menuOpen ? 'site-nav--scrolled' : ''}`}>
        <div className="site-nav__inner section-shell">
          <a href="#hero" className="site-nav__wordmark" aria-label="Faizan Safwan — back to top">
            <span className="site-nav__mark" aria-hidden="true">
              F<span>_</span>
            </span>
            <span className="site-nav__name">FAIZAN SAFWAN</span>
          </a>

          <nav className="site-nav__links" aria-label="Primary">
            {NAV_LINKS.map(({ id, label }) => (
              <a
                key={id}
                href={`#${id}`}
                className={`site-nav__link${active === id ? ' site-nav__link--active' : ''}`}
                aria-current={active === id ? 'location' : undefined}
              >
                {label}
              </a>
            ))}
          </nav>

          <div className="site-nav__meta">
            <span className="site-nav__status">
              <span className="site-nav__status-dot" aria-hidden="true" />
              {statusLabel}
            </span>
            <span className="site-nav__version">{SITE_VERSION}</span>
          </div>

          <button
            ref={menuBtnRef}
            type="button"
            className="site-nav__menu-btn"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span className="visually-hidden">{menuOpen ? 'Close menu' : 'Open menu'}</span>
            {menuOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
          </button>
        </div>
      </header>

      <div
        id="mobile-nav"
        className={`site-nav__overlay ${menuOpen ? 'site-nav__overlay--open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        aria-hidden={!menuOpen}
        inert={menuOpen ? undefined : ''}
      >
        <nav className="site-nav__overlay-nav" aria-label="Mobile">
          {NAV_LINKS.map(({ id, label }, i) => (
            <a
              key={id}
              ref={i === 0 ? firstLinkRef : undefined}
              href={`#${id}`}
              className="site-nav__overlay-link"
              style={{ '--i': i }}
              onClick={() => setMenuOpen(false)}
            >
              <span className="site-nav__overlay-index">0{i + 1}</span>
              {label}
            </a>
          ))}
        </nav>
        <div className="site-nav__overlay-footer">
          <span className="site-nav__status">
            <span className="site-nav__status-dot" aria-hidden="true" />
            {statusLabel}
          </span>
          <span className="site-nav__version">{SITE_VERSION}</span>
        </div>
      </div>
    </>
  );
}
