import { useEffect } from 'react';

const REVEAL_LINE = 0.9; // reveal once an element's top passes 90% of the viewport height
const SAFETY_MS = 4000; // never leave content hidden longer than this

/**
 * Fades `.motion-fade` elements in as they scroll into view.
 * Only elements still below the fold are hidden, so pre-rendered content that is
 * already on screen never flickers. Uses a frame-throttled scroll check rather
 * than IntersectionObserver so anchor jumps and throttled frames can never
 * leave content stuck invisible. Skipped entirely under reduced motion.
 */
export function useRevealOnScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const limit = () => window.innerHeight * REVEAL_LINE;
    let pending = Array.from(document.querySelectorAll('.motion-fade')).filter(
      (el) => el.getBoundingClientRect().top > limit()
    );
    if (!pending.length) return undefined;

    pending.forEach((el) => el.classList.add('reveal-pending'));

    const reveal = (el) => {
      el.classList.remove('reveal-pending');
      el.classList.add('reveal-in');
    };

    let frame = 0;
    const check = () => {
      frame = 0;
      const line = limit();
      pending = pending.filter((el) => {
        if (el.getBoundingClientRect().top <= line) {
          reveal(el);
          return false;
        }
        return true;
      });
      if (!pending.length) stop();
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(check);
    };

    // Anything still hidden after the safety window that is above the fold gets shown.
    const safety = window.setTimeout(check, SAFETY_MS);

    function stop() {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      window.removeEventListener('hashchange', schedule);
    }

    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    window.addEventListener('hashchange', schedule);
    schedule();

    return () => {
      stop();
      window.clearTimeout(safety);
      if (frame) cancelAnimationFrame(frame);
      document.querySelectorAll('.reveal-pending, .reveal-in').forEach((el) => {
        el.classList.remove('reveal-pending', 'reveal-in');
      });
    };
  }, []);
}
