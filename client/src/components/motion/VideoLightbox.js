import React, { useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { deliverables, formatDuration } from '../../data/motion';
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
  const many = videos.length > 1;

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
              {video.category} · {video.aspect} · {formatDuration(video.seconds)}
            </p>
            <h2 id="lightbox-title" className="lightbox__title">
              {video.title}
            </h2>
            <p className="lightbox__owner">{video.client ? `Client: ${video.client}` : 'Concept piece'}</p>
            <p className="lightbox__summary">{video.summary}</p>
            <dl className="lightbox__dl">
              {video.tools?.length ? (
                <div>
                  <dt>Tools</dt>
                  <dd>{video.tools.join(', ')}</dd>
                </div>
              ) : null}
              {video.languages?.length ? (
                <div>
                  <dt>Languages</dt>
                  <dd>{video.languages.join(', ')}</dd>
                </div>
              ) : null}
              <div>
                <dt>Deliverables</dt>
                <dd>{deliverables.video.slice(0, 2).join(' · ')}</dd>
              </div>
            </dl>
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
