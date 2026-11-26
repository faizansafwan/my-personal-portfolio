import React, { useRef } from 'react';
import { LottieThumb } from './motion/LottieRail';
import { lottieCollections, lottieItems } from '../data/motion';
import { LINKS } from '../data/site';
import { useInViewOnce } from '../hooks/useInViewOnce';
import { useInViewport } from '../hooks/useInViewport';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import './MotionTeaser.css';

// One animation from each of the two newest sets: the range at a glance. Each tile deep-links
// straight to that animation in the Motion page inspector.
const PREVIEW_IDS = ['tech-doc-to-data', 'jelly-success', 'tech-ai-thinking'];

const newest = lottieCollections.find((c) => c.isNew);
const setTitle = (item) => lottieCollections.find((c) => c.id === item.collectionId)?.title;

/** Home-page pointer to the separate Motion page (/motion/). */
export default function MotionTeaser() {
  const ref = useRef(null);
  const load = useInViewOnce(ref, 1);
  const visible = useInViewport(ref);
  const reduced = usePrefersReducedMotion();
  const previews = PREVIEW_IDS.map((id) => lottieItems.find((i) => i.id === id)).filter(Boolean);

  return (
    <aside className="motion-teaser motion-fade" ref={ref} aria-labelledby="motion-teaser-title">
      <div className="motion-teaser__copy">
        <p className="motion-teaser__eyebrow">Also shipping · Motion lab</p>
        <h3 className="motion-teaser__title" id="motion-teaser-title">
          Lottie UI animations &amp; motion graphics
        </h3>
        <p className="motion-teaser__text">
          {lottieItems.length} Lottie animations in {lottieCollections.length} sets
          {newest ? (
            <>
              , including the new <strong>{newest.title}</strong> set for SaaS, AI and developer products
            </>
          ) : null}
          . Inspect each one frame by frame, see it on a sample screen, and copy the embed code.
        </p>
        <a className="btn-ghost motion-teaser__link" href={LINKS.motion}>
          Open the motion lab →
        </a>
      </div>
      <ul className="motion-teaser__previews" aria-label="Animation previews">
        {previews.map((item) => (
          <li key={item.id} className="motion-teaser__preview">
            <a className="motion-teaser__tile" href={`${LINKS.motion}#${item.id}`}>
              <LottieThumb file={item.file} load={load} visible={visible} reduced={reduced} />
              <span className="motion-teaser__label">
                {item.title}
                <span className="motion-teaser__set">{setTitle(item)}</span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}
