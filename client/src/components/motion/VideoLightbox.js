import React, { useEffect, useRef } from 'react';
import { ArrowUpRight, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { formatDuration, ownerLabel } from '../../data/motion';
import './VideoLightbox.css';

const BASE = import.meta.env.BASE_URL;
const asset = (p) => (p ? (/^https?:/.test(p) ? p : `${BASE}${p}`) : null);
const arNumber = (aspect) => {
  const [w, h] = aspect.split(':').map(Number);
  return w / h;
};
const FOCUSABLE = 'a[href], button:not([disabled]), iframe, video[controls], [tabindex]:not([tabindex="-1"])';

export default function VideoLightbox({ videos, index, onIndex, onClose }) {
  const dialogRef = useRef(null);
  const closeRef = useRef(null);
  const touchX = useRef(null);
  const video = videos[index];
  const { project } = video;
  const many = videos.length > 1;
  // Other formats of the same project that are in the current playlist (respects grid filters).
  const siblings = project.cuts.filter((c) => videos.some((v) => v.id === c.id));

  const go = (delta) => onIndex((index + delta + videos.length) % videos.length);

  // Scroll lock + initial focus.
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  // Escape at window level: native <video> controls swallow keydown inside the dialog.
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onCloseRef.current();
      }
    };
    window.addEventListener('keydown', onKey, true);
    return () => window.removeEventListener('keydown', onKey, true);
  }, []);

  const onKeyDown = (e) => {
    if (many && (e.key === 'ArrowLeft' || e.key === 'ArrowRight') && e.target.tagName !== 'VIDEO') {
      e.preventDefault();
      go(e.key === 'ArrowLeft' ? -1 : 1);
      return;
    }
    if (e.key === 'Tab') {
      const nodes = Array.from(dialogRef.current.querySelectorAll(FOCUSABLE));
      if (!nodes.length) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  };

  const onTouchStart = (e) => {
    touchX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e) => {
    if (touchX.current == null || !many) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    touchX.current = null;
    if (Math.abs(dx) > 50) go(dx > 0 ? -1 : 1);
  };

  return (
    <div className="lightbox" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div
        ref={dialogRef}
        className="lightbox__dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="lightbox-title"
        onKeyDown={onKeyDown}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div className="lightbox__bar">
          <span className="lightbox__count">
            {String(index + 1).padStart(2, '0')} / {String(videos.length).padStart(2, '0')}
          </span>
          <button ref={closeRef} type="button" className="lightbox__icon" onClick={onClose} aria-label="Close video">
            <X size={20} aria-hidden="true" />
          </button>
        </div>

        <div className="lightbox__layout">
          <div
            className="lightbox__media"
            style={{ aspectRatio: video.aspect.replace(':', ' / '), '--ar': arNumber(video.aspect) }}
          >
            {video.embedUrl ? (
              <iframe
                key={video.id}
                src={video.embedUrl}
                title={video.title}
                allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                allowFullScreen
                loading="lazy"
              />
            ) : (
              <video key={video.id} controls playsInline preload="metadata" poster={asset(video.poster)}>
                <source src={asset(video.src)} type="video/mp4" />
                {video.captions ? (
                  <track kind="captions" src={asset(video.captions)} srcLang="en" label="Captions" default />
                ) : null}
              </video>
            )}
          </div>

          <div className="lightbox__details">
            <p className="lightbox__meta">
              {project.category} · {video.label} · {video.aspect} · {formatDuration(video.seconds)}
            </p>
            <h2 id="lightbox-title" className="lightbox__title">
              {project.title}
            </h2>
            <p className="lightbox__owner">
              {ownerLabel(project.owner)}
              {project.owner.note ? ` (${project.owner.note})` : ''}
            </p>
            <p className="lightbox__summary">{project.summary}</p>
            {siblings.length > 1 ? (
              <div className="lightbox__cuts" role="group" aria-label="Formats of this project">
                {siblings.map((c) => {
                  const on = c.id === video.id;
                  return (
                    <button
                      key={c.id}
                      type="button"
                      className={`lightbox__cut${on ? ' lightbox__cut--on' : ''}`}
                      aria-pressed={on}
                      onClick={() => !on && onIndex(videos.findIndex((v) => v.id === c.id))}
                    >
                      {c.label} · {c.aspect}
                    </button>
                  );
                })}
              </div>
            ) : null}
            <dl className="lightbox__dl">
              <div>
                <dt>Format</dt>
                <dd>
                  MP4 · {video.width}×{video.height} · {formatDuration(video.seconds)}
                </dd>
              </div>
              {project.languages?.length ? (
                <div>
                  <dt>Language</dt>
                  <dd>{project.languages.join(', ')}</dd>
                </div>
              ) : null}
              {project.tools?.length ? (
                <div>
                  <dt>Tools</dt>
                  <dd>{project.tools.join(', ')}</dd>
                </div>
              ) : null}
            </dl>
            {project.link ? (
              <a className="btn-ghost lightbox__link" href={project.link.href} target="_blank" rel="noopener noreferrer">
                {project.link.label}
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            ) : null}
            {many ? (
              <div className="lightbox__nav">
                <button type="button" className="lightbox__icon" onClick={() => go(-1)} aria-label="Previous video">
                  <ChevronLeft size={20} aria-hidden="true" />
                </button>
                <button type="button" className="lightbox__icon" onClick={() => go(1)} aria-label="Next video">
                  <ChevronRight size={20} aria-hidden="true" />
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
