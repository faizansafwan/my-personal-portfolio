import React from 'react';
import { capabilities } from '../data/capabilities';
import LiveRequestConsole from './LiveRequestConsole';
import './HowIBuild.css';

export default function HowIBuild() {
  return (
    <section className="how-build motion-section" id="how-i-build">
      <div className="section-shell">
        <p className="section-eyebrow motion-fade">02 · How I build</p>
        <h2 className="section-title motion-fade">Capabilities &amp; proof</h2>

        <div className="how-build__pipeline" role="list">
          {capabilities.map((cap, index) => (
            <React.Fragment key={cap.index}>
              <article className="how-build__tile tile-card motion-fade" role="listitem">
                <span className="how-build__index">{cap.index}</span>
                <h3 className="how-build__tile-title">{cap.title}</h3>
                <p className="how-build__tile-desc">{cap.description}</p>
                <div className="how-build__tags">
                  {cap.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </article>
              {index < capabilities.length - 1 ? (
                <span className="how-build__connector" aria-hidden="true" />
              ) : null}
            </React.Fragment>
          ))}
        </div>

        <div className="how-build__console motion-fade">
          <LiveRequestConsole />
        </div>
      </div>
    </section>
  );
}
