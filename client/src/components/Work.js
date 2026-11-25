import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { projects } from '../data/projects';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import './Work.css';

const expandEase = [0.16, 1, 0.3, 1];

function CaseStudyPanel({ caseStudy }) {
  return (
    <div className="work-case">
      <h4 className="work-case__heading">The problem</h4>
      <p>{caseStudy.problem}</p>
      <h4 className="work-case__heading">My approach</h4>
      <p>{caseStudy.approach}</p>
      <h4 className="work-case__heading">How it works</h4>
      <ol className="work-case__pipeline">
        {caseStudy.pipeline.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ol>
      <h4 className="work-case__heading">Engineering decisions</h4>
      <p>{caseStudy.decisions}</p>
      <h4 className="work-case__heading">What I’d improve</h4>
      <p>{caseStudy.improve}</p>
    </div>
  );
}

export default function Work() {
  const [expandedVersion, setExpandedVersion] = useState(null);
  const reducedMotion = usePrefersReducedMotion();

  const toggle = (version) => {
    setExpandedVersion((prev) => (prev === version ? null : version));
  };

  return (
    <section className="work motion-section" id="work">
      <div className="section-shell">
        <p className="section-eyebrow motion-fade">03 · Work</p>
        <h2 className="section-title motion-fade">Selected releases</h2>
        <p className="work__intro motion-fade">
          Problem → what I built → what changed. Tech stacks live under{' '}
          <a href="#credentials">Credentials</a>; here the focus is clarity.
        </p>

        <div className="work__list">
          {projects.map((project) => {
            const isOpen = expandedVersion === project.version;
            const studyLabel = `Read the ${project.name} case study`;

            return (
              <motion.article
                key={project.version}
                className="work-row"
                layout={!reducedMotion}
                transition={{ layout: { duration: 0.45, ease: expandEase } }}
              >
                <div className="work-row__panel">
                  <header className="work-row__head">
                    <span className="work-row__version">{project.version}</span>
                    <h3 className="work-row__name">
                      {project.name}
                      {project.isConcept ? (
                        <span className="work-row__concept"> (concept)</span>
                      ) : null}
                    </h3>
                    <p className="work-row__cats">{project.categories.join(' · ')}</p>
                  </header>

                  <div className="work-row__body">
                    {project.context ? <p className="work-row__context">{project.context}</p> : null}
                    <p className="work-row__pitch">{project.pitch}</p>
                    {project.outcome ? (
                      <p className="work-row__outcome">
                        <strong>Result:</strong> {project.outcome}
                      </p>
                    ) : null}
                    <div className="work-row__tags">
                      {project.tags.map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>
                    <p className="work-row__contrib">
                      <strong>My contribution:</strong> <em>{project.contribution}</em>
                    </p>
                    <div className="work-row__links">
                      {project.liveUrl ? (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="work-row__live"
                        >
                          Live: {project.liveLabel ?? project.liveUrl}
                        </a>
                      ) : null}
                      {project.githubUrl ? (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="work-row__live"
                        >
                          Code on GitHub ↗
                        </a>
                      ) : null}
                    </div>
                  </div>

                  <button
                    type="button"
                    className={`work-row__toggle${isOpen ? ' work-row__toggle--open' : ''}`}
                    aria-expanded={isOpen}
                    onClick={() => toggle(project.version)}
                  >
                    <span>{isOpen ? 'Close case study' : `${studyLabel} →`}</span>
                    <ChevronDown className="work-row__chevron" size={18} aria-hidden />
                  </button>
                </div>

                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      className="work-row__expand"
                      key="panel"
                      initial={reducedMotion ? false : { height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={reducedMotion ? undefined : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.48, ease: expandEase }}
                    >
                      <CaseStudyPanel caseStudy={project.caseStudy} />
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
