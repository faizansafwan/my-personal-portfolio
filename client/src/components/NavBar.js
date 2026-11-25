import React, { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { LINKS, OPEN_TO_ROLES, SITE_VERSION } from '../data/site';
import { useActiveSection } from '../hooks/useActiveSection';
import './NavBar.css';

const BASE = import.meta.env.BASE_URL;

/** `page: 'motion'` marks a link to the separate Motion page; the rest are home-page sections. */
const NAV_LINKS = [
  { id: 'work', label: 'Work' },
  { id: 'motion', label: 'Motion', page: 'motion' },
  { id: 'how-i-build', label: 'How I build' },
  { id: 'journey', label: 'Journey' },
  { id: 'services', label: 'Services' },
  { id: 'credentials', label: 'Credentials' },
  { id: 'blog', label: 'Blog' },
  { id: 'contact', label: 'Contact' },
];
const HOME_SECTION_IDS = NAV_LINKS.filter((l) => !l.page).map((l) => l.id);
const NO_SECTIONS = [];

/**
 * @param {{ variant?: 'home' | 'motion' }} props
 *   home   — section links are in-page anchors, active link follows scroll
 *   motion — section links point back to the home page; "Motion" is active
 */
export default function NavBar({ variant = 'home' }) {
  const isHome = variant === 'home';
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const activeSection = useActiveSection(isHome ? HOME_SECTION_IDS : NO_SECTIONS);
  const active = isHome ? activeSection : 'motion';
  const menuBtnRef = useRef(null);
  const firstLinkRef = useRef(null);

  const hrefFor = (link) => {
    if (link.page === 'motion') return LINKS.motion;
    return isHome ? `#${link.id}` : `${BASE}#${link.id}`;
  };

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
  const currentAttr = (link) => {
    if (active !== link.id) return undefined;
    return link.page ? 'page' : 'location';
  };

  return (
    <>
      <header className={`site-nav ${scrolled || menuOpen ? 'site-nav--scrolled' : ''}`}>
        <div className="site-nav__inner section-shell">
          <a
            href={isHome ? '#hero' : BASE}
            className="site-nav__wordmark"
            aria-label={isHome ? 'Faizan Safwan — back to top' : 'Faizan Safwan — home page'}
          >
            <span className="site-nav__mark" aria-hidden="true">
              F<span>_</span>
            </span>
            <span className="site-nav__name">FAIZAN SAFWAN</span>
          </a>

          <nav className="site-nav__links" aria-label="Primary">
            {NAV_LINKS.map((link) => (
              <a
                key={link.id}
                href={hrefFor(link)}
                className={`site-nav__link${active === link.id ? ' site-nav__link--active' : ''}${
                  link.page ? ' site-nav__link--page' : ''
                }`}
                aria-current={currentAttr(link)}
              >
                {link.label}
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
          {NAV_LINKS.map((link, i) => (
            <a
              key={link.id}
              ref={i === 0 ? firstLinkRef : undefined}
              href={hrefFor(link)}
              className={`site-nav__overlay-link${active === link.id ? ' site-nav__overlay-link--active' : ''}`}
              aria-current={currentAttr(link)}
              style={{ '--i': i }}
              onClick={() => setMenuOpen(false)}
            >
              <span className="site-nav__overlay-index">{String(i + 1).padStart(2, '0')}</span>
              {link.label}
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
