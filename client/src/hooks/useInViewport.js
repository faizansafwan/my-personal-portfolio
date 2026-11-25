import { useEffect, useState } from 'react';

/**
 * Live "is this element on screen?" flag (not once-only), used to pause off-screen
 * players. Frame-throttled scroll/resize check, same pattern as useInViewOnce —
 * deliberately not IntersectionObserver.
 */
export function useInViewport(ref, margin = 80) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let frame = 0;
    const check = () => {
      frame = 0;
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const next = r.bottom > -margin && r.top < window.innerHeight + margin && r.width > 0;
      setVisible((prev) => (prev === next ? prev : next));
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
  }, [ref, margin]);

  return visible;
}
