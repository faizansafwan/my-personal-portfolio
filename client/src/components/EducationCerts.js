import React from 'react';
import { education, certifications } from '../data/education';
import { skillGroups } from '../data/skills';
import './EducationCerts.css';

export default function EducationCerts() {
  return (
    <section className="edu-certs motion-section" id="credentials">
      <div className="section-shell edu-certs__grid">
        <div>
          <p className="section-eyebrow motion-fade">07 · Education</p>
          <h2 className="section-title motion-fade">Education</h2>
          <ul className="edu-certs__edu-list">
            {education.map((item) => (
              <li key={item.degree} className="tile-card edu-certs__edu-card motion-fade">
                <h3 className="edu-certs__degree">{item.degree}</h3>
                <p className="edu-certs__school">{item.institution}</p>
                <p className="edu-certs__period">{item.period}</p>
                {item.detail ? <p className="edu-certs__detail">{item.detail}</p> : null}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="section-eyebrow motion-fade">Certifications</p>
          <h2 className="section-title motion-fade">Courses &amp; credentials</h2>
          <ul className="edu-certs__cert-list">
            {certifications.map((cert) => (
              <li key={`${cert.title}-${cert.provider}`} className="edu-certs__cert motion-fade">
                <span className="edu-certs__cert-title">{cert.title}</span>
                <span className="edu-certs__cert-meta">
                  {cert.provider}
                  {cert.status ? ` · ${cert.status}` : ''}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="section-shell edu-certs__skills">
        <p className="section-eyebrow motion-fade">Technical skills</p>
        <h2 className="section-title motion-fade">Stack &amp; tools</h2>
        <p className="edu-certs__skills-intro motion-fade">
          Technologies I use in production — grouped here so the hero and project stories stay about problems and
          outcomes, not keyword lists.
        </p>
        <div className="edu-certs__skill-groups">
          {skillGroups.map((group) => (
            <div key={group.label} className="tile-card edu-certs__skill-group motion-fade">
              <h3 className="edu-certs__skill-label">{group.label}</h3>
              <div className="edu-certs__tags">
                {group.items.map((skill) => (
                  <span key={skill}>{skill}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
