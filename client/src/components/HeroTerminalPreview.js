import React from 'react';
import './HeroTerminalPreview.css';

const LINES = [
  { kind: 'cmd', text: 'whoami' },
  { kind: 'out', text: 'Full-stack engineer · applied AI' },
  { kind: 'out', text: 'CVeezi @ X4 Digital Labs' },
  { kind: 'out', text: 'Co-founder, Aqra Labs → Aqra POS' },
  { kind: 'out', text: 'Mawanella, LK · remote-friendly' },
  { kind: 'cmd', text: 'ls ./focus' },
  { kind: 'out', text: 'saas/  document-ai/  pos/  dashboards/' },
];

export default function HeroTerminalPreview() {
  return (
    <figure className="hero-terminal tile-card" aria-label="Terminal summary: who I am and what I focus on">
      <div className="hero-terminal__chrome" aria-hidden="true">
        <span className="hero-terminal__dot" />
        <span className="hero-terminal__dot" />
        <span className="hero-terminal__dot" />
        <span className="hero-terminal__title">faizan@safwan: ~</span>
      </div>
      <pre className="hero-terminal__body">
        <code>
          {LINES.map((line, i) => (
            <span key={line.text} className={`hero-terminal__line hero-terminal__line--${line.kind}`} style={{ '--i': i }}>
              {line.kind === 'cmd' ? <span className="hero-terminal__prompt">$ </span> : '> '}
              {line.text}
              {'\n'}
            </span>
          ))}
          <span className="hero-terminal__line" style={{ '--i': LINES.length }}>
            <span className="hero-terminal__prompt">$ </span>
            <span className="hero-terminal__caret" aria-hidden="true" />
          </span>
        </code>
      </pre>
      <figcaption className="hero-terminal__tags">
        <span>SaaS delivery</span>
        <span>Applied AI</span>
        <span>Data-heavy UX</span>
      </figcaption>
    </figure>
  );
}
