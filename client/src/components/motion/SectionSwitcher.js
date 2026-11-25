import React from 'react';
import { useScrollSpy } from '../../hooks/useScrollSpy';
import './SectionSwitcher.css';

/** Sticky pill tabs under the hero. Anchor links; current section follows scroll. */
export default function SectionSwitcher({ sections }) {
  const active = useScrollSpy(
    sections.map((s) => s.id),
    180
  );

  return (
    <nav className="switcher" aria-label="Motion page sections">
      <div className="switcher__inner section-shell">
        <div className="switcher__pills">
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className={`switcher__pill${active === s.id ? ' switcher__pill--on' : ''}`}
              aria-current={active === s.id ? 'location' : undefined}
            >
              <span className="switcher__index">{s.index}</span>
              {s.label}
              {s.count != null ? <span className="switcher__count">{s.count}</span> : null}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
