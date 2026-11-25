import React from 'react';
import { timelineEntries } from '../data/timeline';
import './Journey.css';

export default function Journey() {
  return (
    <section className="journey motion-section" id="journey">
      <div className="section-shell">
        <p className="section-eyebrow motion-fade">05 · Journey</p>
        <h2 className="section-title motion-fade">Roles &amp; experiments</h2>

        <ol className="journey__feed">
          {timelineEntries.map((entry) => (
            <li key={`${entry.type}-${entry.title}`} className="journey__entry motion-fade">
              <span
                className={`journey__dot journey__dot--${entry.type.toLowerCase()}`}
                aria-hidden="true"
              />
              <div className="journey__body">
                <span className="journey__type">{entry.type}</span>
                <h3 className="journey__title">{entry.title}</h3>
                {entry.period ? <time className="journey__period">{entry.period}</time> : null}
                <p className="journey__desc">{entry.description}</p>
                {entry.bullets?.length ? (
                  <ul className="journey__bullets">
                    {entry.bullets.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
