import { useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function motionFadeElements() {
  return gsap.utils.toArray('.motion-fade').filter((el) => !el.closest('.contact-block'));
}

export function usePortfolioMotion() {
  useLayoutEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return undefined;

    gsap.set('.motion-fade, .work-row', { clearProps: 'opacity,transform' });

    const ctx = gsap.context(() => {
      gsap.from('.hero__copy > *:not(.hero__actions)', {
        opacity: 0,
        y: 32,
        duration: 0.95,
        stagger: 0.07,
        ease: 'power3.out',
        delay: 0.08,
      });

      gsap.from('.hero-terminal', {
        opacity: 0,
        y: 28,
        rotateX: 8,
        transformPerspective: 800,
        duration: 1.05,
        ease: 'power3.out',
        delay: 0.22,
      });

      gsap.utils.toArray('.section-title').forEach((title) => {
        gsap.from(title, {
          scrollTrigger: {
            trigger: title,
            start: 'top 90%',
            once: true,
          },
          opacity: 0,
          x: -16,
          duration: 0.65,
          ease: 'power2.out',
        });
      });

      const fades = motionFadeElements();
      if (fades.length) {
        ScrollTrigger.batch(fades, {
          start: 'top 88%',
          once: true,
          onEnter: (batch) => {
            gsap.from(batch, {
              opacity: 0,
              y: 28,
              duration: 0.72,
              stagger: 0.05,
              ease: 'power3.out',
              overwrite: 'auto',
            });
          },
        });
      }

      gsap.utils.toArray('.work-row').forEach((row, i) => {
        gsap.from(row, {
          scrollTrigger: {
            trigger: row,
            start: 'top 88%',
            once: true,
          },
          opacity: 0,
          y: 36,
          scale: 0.98,
          duration: 0.75,
          delay: Math.min(i * 0.04, 0.2),
          ease: 'power3.out',
        });
      });
    });

    const refreshScroll = () => {
      ScrollTrigger.refresh();
    };

    refreshScroll();
    window.addEventListener('load', refreshScroll);
    window.addEventListener('hashchange', refreshScroll);
    const refreshTimer = window.setTimeout(refreshScroll, 150);

    return () => {
      window.clearTimeout(refreshTimer);
      window.removeEventListener('load', refreshScroll);
      window.removeEventListener('hashchange', refreshScroll);
      ctx.revert();
      gsap.set('.motion-fade, .work-row', { clearProps: 'opacity,transform' });
    };
  }, []);
}
