import React, { useState } from 'react';
import { ArrowUpRight, ChevronDown } from 'lucide-react';
import { projects, earlierProjects } from '../data/projects';
import { LINKS } from '../data/site';
import MotionTeaser from './MotionTeaser';
import './Work.css';

function slug(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

/** Right-hand visual: a real screenshot when provided, otherwise the release pipeline. */
function ReleaseVisual({ project }) {
  if (project.image) {
    return (
      <figure className="work-visual work-visual--image">
        <img
          src={project.image.src}
          alt={project.image.alt}
          width={project.image.width}
          height={project.image.height}
          loading="lazy"
          decoding="async"
        />
      </figure>
    );
  }

  return (
    <figure className="work-visual" aria-label={`${project.name} pipeline`}>
      <div className="work-visual__bar" aria-hidden="true">
        <span>release {project.version}</span>
        <span>{slug(project.name)}</span>
      </div>
      <ol className="work-visual__steps">
        {project.caseStudy.pipeline.map((step, i) => (
          <li key={step} style={{ '--i': i }}>
            <span className="work-visual__check" aria-hidden="true">
              ✓
            </span>
            <span className="work-visual__num" aria-hidden="true">
              0{i + 1}
            </span>
            <span className="work-visual__label">{step}</span>
          </li>
        ))}
      </ol>
      <div className="work-visual__foot" aria-hidden="true">
        <span className="work-visual__status" />
        {project.liveUrl ? 'deployed · live' : 'shipped · private build'}
      </div>
    </figure>
  );
}

function CaseStudyPanel({ project }) {
  const { caseStudy } = project;
  return (
    <div className="work-case">
      {project.context ? <p className="work-case__context">{project.context}</p> : null}
      <div className="work-case__grid">
        <div>
          <h4 className="work-case__heading">The problem</h4>
          <p>{caseStudy.problem}</p>
        </div>
        <div>
          <h4 className="work-case__heading">My approach</h4>
          <p>{caseStudy.approach}</p>
        </div>
        <div>
          <h4 className="work-case__heading">Engineering decisions</h4>
          <p>{caseStudy.decisions}</p>
        </div>
        <div>
          <h4 className="work-case__heading">What I’d improve</h4>
          <p>{caseStudy.improve}</p>
        </div>
      </div>
    </div>
  );
}

function ProjectLinks({ project }) {
  const links = [
    project.liveUrl && { href: project.liveUrl, label: `Live: ${project.liveLabel ?? project.liveUrl}` },
    project.secondaryUrl && { href: project.secondaryUrl, label: project.secondaryLabel },
    project.githubUrl && { href: project.githubUrl, label: 'Code on GitHub' },
  ].filter(Boolean);

  if (!links.length) return null;
  return (
    <div className="work-row__links">
      {links.map((l) => (
        <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="work-row__live">
          {l.label} <ArrowUpRight size={14} aria-hidden="true" />
        </a>
      ))}
    </div>
  );
}

export default function Work() {
  const [expandedVersion, setExpandedVersion] = useState(null);

  const toggle = (version) => {
    setExpandedVersion((prev) => (prev === version ? null : version));
  };

  return (
    <section className="work motion-section" id="work">
      <div className="section-shell">
        <p className="section-eyebrow motion-fade">01 · Work</p>
        <h2 className="section-title motion-fade">Selected releases</h2>
        <p className="work__intro motion-fade">
          Problem → what I built → what changed. Open any release for the full case study; the complete stack lives
          under <a href="#credentials">Credentials</a>.
        </p>

        <div className="work__list">
          {projects.map((project) => {
            const isOpen = expandedVersion === project.version;
            const panelId = `case-${project.version}`;

            return (
              <article
                key={project.version}
                className={`work-row motion-fade${project.highlights ? ' work-row--featured' : ''}`}
                aria-labelledby={`title-${project.version}`}
              >
                <div className="work-row__panel">
                  <div className="work-row__main">
                    <header className="work-row__head">
                      <span className="work-row__version">{project.version}</span>
                      <h3 className="work-row__name" id={`title-${project.version}`}>
                        {project.name}
                        {project.isConcept ? <span className="work-row__concept"> (concept)</span> : null}
                      </h3>
                      <p className="work-row__cats">
                        {project.role ? <span className="work-row__role">{project.role}</span> : null}
                        {project.categories.join(' · ')}
                      </p>
                    </header>

                    <p className="work-row__pitch">{project.pitch}</p>
                    {project.outcome ? (
                      <p className="work-row__outcome">
                        <strong>Result:</strong> {project.outcome}
                      </p>
                    ) : null}

                    {project.highlights ? (
                      <ul className="work-row__highlights" aria-label={`${project.name} highlights`}>
                        {project.highlights.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    ) : null}

                    <p className="work-row__contrib">
                      <strong>My contribution:</strong> {project.contribution}
                    </p>

                    <div className="work-row__tags">
                      {project.tags.map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>

                    <ProjectLinks project={project} />
                  </div>

                  <div className="work-row__aside">
                    <ReleaseVisual project={project} />
                  </div>

                  <button
                    type="button"
                    className={`work-row__toggle${isOpen ? ' work-row__toggle--open' : ''}`}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggle(project.version)}
                  >
                    <span>{isOpen ? 'Close case study' : `Read the ${project.name} case study`}</span>
                    <ChevronDown className="work-row__chevron" size={18} aria-hidden="true" />
                  </button>
                </div>

                <div id={panelId} className={`work-row__expand${isOpen ? ' work-row__expand--open' : ''}`}>
                  <div className="work-row__expand-inner">
                    <CaseStudyPanel project={project} />
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <MotionTeaser />

        <div className="work-archive">
          <div className="work-archive__head motion-fade">
            <h3 className="work-archive__title">Earlier releases</h3>
            <a href={LINKS.github} target="_blank" rel="noopener noreferrer" className="work-archive__all">
              All repositories on GitHub <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          </div>
          <ul className="work-archive__list">
            {earlierProjects.map((p) => (
              <li key={p.name} className="work-archive__item motion-fade">
                <span className="work-archive__year">{p.year}</span>
                <div className="work-archive__body">
                  <p className="work-archive__name">
                    {p.name} <span>· {p.subtitle}</span>
                  </p>
                  <p className="work-archive__desc">{p.description}</p>
                  <p className="work-archive__tags">{p.tags.join(' · ')}</p>
                </div>
                <div className="work-archive__links">
                  {p.links.map((l) => (
                    <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer">
                      {l.label} <ArrowUpRight size={13} aria-hidden="true" />
                    </a>
                  ))}
                  {p.note ? <span className="work-archive__note">{p.note}</span> : null}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
