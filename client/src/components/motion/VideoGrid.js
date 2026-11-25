import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowUpRight, Clapperboard, Play } from 'lucide-react';
import { formatDuration, ownerLabel, videoAspects, videoCategories } from '../../data/motion';
import { LINKS } from '../../data/site';
import VideoLightbox from './VideoLightbox';
import './VideoGrid.css';

const BASE = import.meta.env.BASE_URL;
const asset = (p) => (p ? (/^https?:/.test(p) ? p : `${BASE}${p}`) : null);
const arNumber = (aspect) => {
  const [w, h] = aspect.split(':').map(Number);
  return w / h;
};

/** One cut (format) of a project. Hover plays its short silent preview clip, never the full film. */
function CutCard({ cut, canPreview, onOpen }) {
  const videoRef = useRef(null);
  const previewSrc = cut.preview || cut.src;

  const start = () => {
    const v = videoRef.current;
    if (!canPreview || !v || !previewSrc) return;
    if (!v.getAttribute('src')) v.setAttribute('src', asset(previewSrc));
    v.currentTime = 0;
    v.play().catch(() => {});
  };
  const stop = () => {
    const v = videoRef.current;
    if (!v) return;
    v.pause();
    if (v.getAttribute('src')) v.currentTime = 0;
  };

  return (
    <li className="video-cut motion-fade" style={{ '--ar': arNumber(cut.aspect) }}>
      <button
        type="button"
        className="video-cut__btn"
        onClick={(e) => onOpen(e.currentTarget)}
        onMouseEnter={start}
        onMouseLeave={stop}
        aria-label={`Play ${cut.title} (${cut.aspect}, ${formatDuration(cut.seconds)})`}
      >
        <span className="video-cut__media" style={{ aspectRatio: cut.aspect.replace(':', ' / ') }}>
          {previewSrc && canPreview ? (
            <video
              ref={videoRef}
              className="video-cut__video"
              poster={asset(cut.poster)}
              muted
              loop
              playsInline
              preload="none"
              aria-hidden="true"
              tabIndex={-1}
            />
          ) : (
            <img
              className="video-cut__video"
              src={asset(cut.poster)}
              alt=""
              width={cut.width}
              height={cut.height}
              loading="lazy"
              decoding="async"
            />
          )}
          <span className="video-cut__play" aria-hidden="true">
            <Play size={20} />
          </span>
        </span>
        <span className="video-cut__body">
          <span className="video-cut__label">{cut.label}</span>
          <span className="video-cut__meta">
            {cut.aspect} · {formatDuration(cut.seconds)}
          </span>
        </span>
      </button>
    </li>
  );
}

function Chips({ label, options, value, onChange }) {
  return (
    <div className="video-filters__group" role="group" aria-label={label}>
      {['All', ...options].map((opt) => (
        <button
          key={opt}
          type="button"
          className={`video-filters__chip${value === opt ? ' video-filters__chip--on' : ''}`}
          aria-pressed={value === opt}
          onClick={() => onChange(opt)}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="video-empty tile-card motion-fade">
      <span className="video-empty__icon" aria-hidden="true">
        <Clapperboard size={26} />
      </span>
      <div className="video-empty__text">
        <p className="video-empty__title">New motion videos are in production</p>
        <p className="video-empty__body">
          See the Lottie work above or ask for a sample: app promos, explainers, social ads and logo animations, cut for
          16:9, 9:16 and 1:1.
        </p>
      </div>
      <div className="video-empty__actions">
        <a className="btn-primary" href={LINKS.contra} target="_blank" rel="noopener noreferrer">
          Ask for a sample on Contra
        </a>
        <a className="btn-ghost" href="#lottie">
          See the Lottie work ↑
        </a>
      </div>
      <span className="video-empty__strip" aria-hidden="true">
        <span>00:00</span>
        <span className="video-empty__track" />
        <span>REC</span>
      </span>
    </div>
  );
}

/** Motion videos grouped by project; each project shows its cuts side by side at equal height. */
export default function VideoGrid({ projects, reduced }) {
  const [category, setCategory] = useState('All');
  const [aspect, setAspect] = useState('All');
  const [openId, setOpenId] = useState(null);
  const [canHover, setCanHover] = useState(false);
  const openerRef = useRef(null);

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
    setCanHover(mq.matches);
    const on = () => setCanHover(mq.matches);
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);

  const allCuts = useMemo(() => projects.flatMap((p) => p.cuts), [projects]);
  const categories = useMemo(() => videoCategories.filter((c) => projects.some((p) => p.category === c)), [projects]);
  const aspects = useMemo(() => videoAspects.filter((a) => allCuts.some((c) => c.aspect === a)), [allCuts]);

  // Filter cuts, then drop projects left with none. Cuts carry their project for the lightbox.
  const shown = projects
    .filter((p) => category === 'All' || p.category === category)
    .map((p) => ({
      ...p,
      cuts: p.cuts
        .filter((c) => aspect === 'All' || c.aspect === aspect)
        .map((c) => ({ ...c, project: p, title: `${p.title}: ${c.label}` })),
    }))
    .filter((p) => p.cuts.length);
  const playlist = shown.flatMap((p) => p.cuts);
  const openIndex = playlist.findIndex((c) => c.id === openId);

  if (!projects.length) return <EmptyState />;

  return (
    <>
      {categories.length > 1 || aspects.length > 1 ? (
        <div className="video-filters motion-fade">
          {categories.length > 1 ? (
            <Chips label="Filter by category" options={categories} value={category} onChange={setCategory} />
          ) : null}
          {aspects.length > 1 ? (
            <Chips label="Filter by format" options={aspects} value={aspect} onChange={setAspect} />
          ) : null}
        </div>
      ) : null}
      <p className="visually-hidden" aria-live="polite">
        {playlist.length} {playlist.length === 1 ? 'video' : 'videos'} shown
      </p>

      {shown.length ? (
        <ul className="video-projects">
          {shown.map((project) => (
            <li key={project.id} className="video-project" aria-labelledby={`project-${project.id}`}>
              <div className="video-project__head motion-fade">
                <p className="video-project__eyebrow">
                  {project.category} · <span className="video-project__owner">{ownerLabel(project.owner)}</span>
                </p>
                <h3 className="video-project__title" id={`project-${project.id}`}>
                  {project.title}
                </h3>
                <p className="video-project__summary">{project.summary}</p>
                <p className="video-project__facts">
                  <span>
                    {project.cuts.length} {project.cuts.length === 1 ? 'cut' : 'cuts'}
                  </span>
                  {project.languages?.length ? <span>{project.languages.join(', ')}</span> : null}
                  {project.link ? (
                    <a href={project.link.href} target="_blank" rel="noopener noreferrer">
                      {project.link.label}
                      <ArrowUpRight size={14} aria-hidden="true" />
                    </a>
                  ) : null}
                </p>
              </div>
              <ul className="video-project__cuts" aria-label={`${project.title} cuts`}>
                {project.cuts.map((cut) => (
                  <CutCard
                    key={cut.id}
                    cut={cut}
                    canPreview={canHover && !reduced}
                    onOpen={(el) => {
                      openerRef.current = el;
                      setOpenId(cut.id);
                    }}
                  />
                ))}
              </ul>
            </li>
          ))}
        </ul>
      ) : (
        <p className="video-grid__none">No videos match these filters yet.</p>
      )}

      {openIndex >= 0 ? (
        <VideoLightbox
          videos={playlist}
          index={openIndex}
          onIndex={(i) => setOpenId(playlist[i].id)}
          onClose={() => {
            setOpenId(null);
            openerRef.current?.focus();
          }}
        />
      ) : null}
    </>
  );
}
