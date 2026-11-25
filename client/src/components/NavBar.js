import React, { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { OPEN_TO_ROLES, SITE_VERSION } from '../data/site';
import './NavBar.css';

const NAV_LINKS = [
  { href: '#work', label: 'Work' },
  { href: '#how-i-build', label: 'How I build' },
  { href: '#journey', label: 'Journey' },
  { href: '#credentials', label: 'Credentials' },
  { href: '#blog', label: 'Blog' },
  { href: '#contact', label: 'Contact' },
];

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const statusLabel = OPEN_TO_ROLES ? 'Open to roles' : 'Heads-down, but say hi';

  return (
    <>
      <header className={`site-nav ${scrolled ? 'site-nav--scrolled' : ''}`}>
        <div className="site-nav__inner section-shell">
          <a href="#hero" className="site-nav__wordmark">
            FAIZAN SAFWAN
          </a>

          <nav className="site-nav__links" aria-label="Primary">
            {NAV_LINKS.map(({ href, label }) => (
              <a key={href} href={href} className="site-nav__link">
                {label}
              </a>
            ))}
          </nav>

          <div className="site-nav__meta">
            <span className="site-nav__status" role="status">
              <span className="site-nav__status-dot" aria-hidden="true" />
              {statusLabel}
            </span>
            <span className="site-nav__version">{SITE_VERSION}</span>
          </div>

          <button
            type="button"
            className="site-nav__menu-btn"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span className="visually-hidden">{menuOpen ? 'Close menu' : 'Open menu'}</span>
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      <div
        id="mobile-nav"
        className={`site-nav__overlay ${menuOpen ? 'site-nav__overlay--open' : ''}`}
        hidden={!menuOpen}
      >
        <nav className="site-nav__overlay-nav" aria-label="Mobile">
          {NAV_LINKS.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="site-nav__overlay-link"
              onClick={() => setMenuOpen(false)}
            >
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
