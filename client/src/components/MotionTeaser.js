import React, { useRef } from 'react';
import { LottieThumb } from './motion/LottieRail';
import { featuredCollection } from '../data/motion';
import { LINKS } from '../data/site';
import { useInViewOnce } from '../hooks/useInViewOnce';
import { useInViewport } from '../hooks/useInViewport';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import './MotionTeaser.css';

const PREVIEW_IDS = ['jelly-loading', 'jelly-success', 'jelly-add-to-cart'];

/** Home-page pointer to the separate Motion page (/motion/). */
export default function MotionTeaser() {
  const ref = useRef(null);
  const load = useInViewOnce(ref, 1);
  const visible = useInViewport(ref);
  const reduced = usePrefersReducedMotion();
  const previews = featuredCollection.items.filter((i) => PREVIEW_IDS.includes(i.id));

  return (
    <aside className="motion-teaser motion-fade" ref={ref} aria-labelledby="motion-teaser-title">
      <div className="motion-teaser__copy">
        <p className="motion-teaser__eyebrow">Also shipping · Motion lab</p>
        <h3 className="motion-teaser__title" id="motion-teaser-title">
          Lottie UI animations &amp; motion graphics
        </h3>
        <p className="motion-teaser__text">
          New: the {featuredCollection.title}. One glossy jelly material morphs into each app state, at{' '}
          {featuredCollection.sizeRange} per file for iOS, Android and the web. Inspect it frame by frame, see it on a
          sample screen, and copy the embed code.
        </p>
        <a className="btn-ghost motion-teaser__link" href={LINKS.motion}>
          Open the motion lab →
        </a>
      </div>
      <ul className="motion-teaser__previews" aria-label="Animation previews">
        {previews.map((item) => (
          <li key={item.id} className="motion-teaser__preview">
            <LottieThumb file={item.file} load={load} visible={visible} reduced={reduced} />
            <span className="motion-teaser__label">{item.title}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}
