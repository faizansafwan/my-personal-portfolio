import { useEffect, useState } from 'react';

/**
 * True once the referenced element's top has entered the viewport.
 * Frame-throttled scroll check (no IntersectionObserver) so it behaves the same
 * inside iframes, after anchor jumps, and under throttled rendering.
 */
export function useInViewOnce(ref, line = 0.85) {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (inView) return undefined;
    let frame = 0;
    const check = () => {
      frame = 0;
      const el = ref.current;
      if (el && el.getBoundingClientRect().top < window.innerHeight * line) setInView(true);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(check);
    };
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    schedule();
    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [ref, line, inView]);

  return inView;
}
