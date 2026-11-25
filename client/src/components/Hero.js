import React from 'react';
import { LINKS, LOCATION } from '../data/site';
import HeroTerminalPreview from './HeroTerminalPreview';
import './Hero.css';

export default function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="hero__glow" aria-hidden="true" />
      <div className="section-shell hero__grid">
        <div className="hero__copy">
          <p className="hero__eyebrow">Full-stack engineer · Co-founder, Aqra Labs</p>
          <h1 className="hero__name">Faizan Safwan</h1>
          <p className="hero__headline">
            I build SaaS and AI-powered products that turn messy documents and user input into structured,
            maintainable software.
          </p>
          <p className="hero__proof">
            Shipping <strong>CVeezi</strong> at X4 Digital Labs, building <strong>Aqra POS</strong> as co-founder of
            Aqra Labs — and previously assessment, travel, and commerce platforms at Metro Coding.
          </p>
          <div className="hero__actions">
            <a href="#work" className="btn-primary">
              View the work →
            </a>
            <a href={LINKS.resume} className="btn-ghost" download="Faizan_Safwan_Resume.pdf">
              Download résumé ↓
            </a>
          </div>
          <p className="hero__fine">
            {LOCATION} ·{' '}
            <a href={LINKS.email} className="hero__email">
              Email me
            </a>{' '}
            · usually replies within a day
          </p>
        </div>
        <div className="hero__aside">
          <HeroTerminalPreview />
        </div>
      </div>
    </section>
  );
}
