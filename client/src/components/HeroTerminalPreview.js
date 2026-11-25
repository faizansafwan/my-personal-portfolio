import React from 'react';
import './HeroTerminalPreview.css';

export default function HeroTerminalPreview() {
  return (
    <div className="hero-terminal tile-card" aria-label="Terminal preview">
      <div className="hero-terminal__chrome">
        <span className="hero-terminal__dot" />
        <span className="hero-terminal__dot" />
        <span className="hero-terminal__dot" />
      </div>
      <pre className="hero-terminal__body">
        <code>
          {`faizan@safwan:~$ focus
> Applicant tracking & CV workflows (CVeezi)
> Assessment analytics for institutions
> Document → structured data → product features
> Mawanella · remote-friendly`}
        </code>
      </pre>
      <div className="hero-terminal__tags">
        <span>SaaS delivery</span>
        <span>Applied AI</span>
        <span>Data-heavy UX</span>
      </div>
    </div>
  );
}
