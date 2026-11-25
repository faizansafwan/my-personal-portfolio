import { useEffect, useState } from 'react';

/**
 * Returns the id of the last section whose top has passed `offset` px from the top
 * of the viewport. Frame-throttled scroll check (no IntersectionObserver).
 */
export function useScrollSpy(ids, offset = 160) {
  const [active, setActive] = useState(null);
  const key = ids.join('|');

  useEffect(() => {
    const list = key.split('|').filter(Boolean);
    let frame = 0;
    const check = () => {
      frame = 0;
      let current = null;
      list.forEach((id) => {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top - offset <= 0) current = id;
      });
      setActive((prev) => (prev === current ? prev : current));
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
  }, [key, offset]);

  return active;
}
