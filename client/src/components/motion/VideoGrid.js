import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Clapperboard, Play } from 'lucide-react';
import { formatDuration, videoAspects, videoCategories } from '../../data/motion';
import { LINKS } from '../../data/site';
import VideoLightbox from './VideoLightbox';
import './VideoGrid.css';

const BASE = import.meta.env.BASE_URL;
const asset = (p) => (p ? (/^https?:/.test(p) ? p : `${BASE}${p}`) : null);
const ratio = (aspect) => aspect.replace(':', ' / ');

function VideoCard({ video, canPreview, onOpen }) {
  const videoRef = useRef(null);

  const start = () => {
    const v = videoRef.current;
    if (!canPreview || !v || !video.src) return;
    if (!v.getAttribute('src')) v.setAttribute('src', asset(video.src));
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
    <li className="video-card motion-fade">
      <button
        type="button"
        className="video-card__btn"
        onClick={(e) => onOpen(e.currentTarget)}
        onMouseEnter={start}
        onMouseLeave={stop}
        aria-label={`Play ${video.title} (${formatDuration(video.seconds)}, ${video.aspect})`}
      >
        <span className="video-card__media" style={{ aspectRatio: ratio(video.aspect) }}>
          {video.src && canPreview ? (
            <video
              ref={videoRef}
              className="video-card__video"
              poster={asset(video.poster)}
              muted
              loop
              playsInline
              preload="none"
              aria-hidden="true"
              tabIndex={-1}
            />
          ) : (
            <img
              className="video-card__video"
              src={asset(video.poster)}
              alt=""
              loading="lazy"
              decoding="async"
            />
          )}
          <span className="video-card__badges" aria-hidden="true">
            <span>{video.aspect}</span>
            <span>{formatDuration(video.seconds)}</span>
            <span>{video.category}</span>
          </span>
          <span className="video-card__play" aria-hidden="true">
            <Play size={20} />
          </span>
        </span>
        <span className="video-card__body">
          <span className="video-card__title">
            {video.title}
            <span className="video-card__owner">{video.client ? `Client · ${video.client}` : 'Concept'}</span>
          </span>
          <span className="video-card__summary">{video.summary}</span>
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

export default function VideoGrid({ videos, reduced }) {
  const [category, setCategory] = useState('All');
  const [aspect, setAspect] = useState('All');
  const [openIndex, setOpenIndex] = useState(null);
  const [canHover, setCanHover] = useState(false);
  const openerRef = useRef(null);

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
    setCanHover(mq.matches);
    const on = () => setCanHover(mq.matches);
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);

  const categories = useMemo(() => videoCategories.filter((c) => videos.some((v) => v.category === c)), [videos]);
  const aspects = useMemo(() => videoAspects.filter((a) => videos.some((v) => v.aspect === a)), [videos]);
  const filtered = videos.filter(
    (v) => (category === 'All' || v.category === category) && (aspect === 'All' || v.aspect === aspect)
  );

  if (!videos.length) {
    return (
      <div className="video-empty tile-card motion-fade">
        <span className="video-empty__icon" aria-hidden="true">
          <Clapperboard size={26} />
        </span>
        <div className="video-empty__text">
          <p className="video-empty__title">New motion videos are in production</p>
          <p className="video-empty__body">
            See the Lottie work above or ask for a sample — app promos, explainers, social ads and logo animations, cut
            for 16:9, 9:16 and 1:1.
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

  return (
    <>
      <div className="video-filters motion-fade">
        <Chips label="Filter by category" options={categories} value={category} onChange={setCategory} />
        {aspects.length > 1 ? (
          <Chips label="Filter by aspect ratio" options={aspects} value={aspect} onChange={setAspect} />
        ) : null}
      </div>
      <p className="visually-hidden" aria-live="polite">
        {filtered.length} {filtered.length === 1 ? 'video' : 'videos'} shown
      </p>

      {filtered.length ? (
        <ul className="video-grid">
          {filtered.map((video, i) => (
            <VideoCard
              key={video.id}
              video={video}
              canPreview={canHover && !reduced}
              onOpen={(el) => {
                openerRef.current = el;
                setOpenIndex(i);
              }}
            />
          ))}
        </ul>
      ) : (
        <p className="video-grid__none">No videos match these filters yet.</p>
      )}

      {openIndex !== null ? (
        <VideoLightbox
          videos={filtered}
          index={openIndex}
          onIndex={setOpenIndex}
          onClose={() => {
            setOpenIndex(null);
            openerRef.current?.focus();
          }}
        />
      ) : null}
    </>
  );
}
