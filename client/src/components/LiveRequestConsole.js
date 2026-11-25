import React, { useEffect, useRef, useState } from 'react';
import { consoleMocks } from '../data/consoleMocks';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import { useInViewOnce } from '../hooks/useInViewOnce';
import './LiveRequestConsole.css';

const CHARS_PER_SECOND = 90;

export default function LiveRequestConsole() {
  const reducedMotion = usePrefersReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [shown, setShown] = useState(0);
  const rootRef = useRef(null);
  const tabRefs = useRef([]);

  const active = consoleMocks[activeIndex];
  const fullText = `${active.request}\n\n${active.response}`;
  const done = shown >= fullText.length;

  // Start typing only once the console is on screen.
  const inView = useInViewOnce(rootRef);

  // Time-based typing on animation frames: a handful of renders, not one per character.
  useEffect(() => {
    if (!inView) return undefined;
    if (reducedMotion) {
      setShown(fullText.length);
      return undefined;
    }
    setShown(0);
    let frame;
    const start = performance.now();
    const tick = (now) => {
      const next = Math.min(fullText.length, Math.floor(((now - start) / 1000) * CHARS_PER_SECOND));
      setShown(next);
      if (next < fullText.length) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [activeIndex, inView, reducedMotion, fullText]);

  const onTabKeyDown = (e) => {
    const last = consoleMocks.length - 1;
    let next = null;
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') next = activeIndex === last ? 0 : activeIndex + 1;
    if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') next = activeIndex === 0 ? last : activeIndex - 1;
    if (e.key === 'Home') next = 0;
    if (e.key === 'End') next = last;
    if (next === null) return;
    e.preventDefault();
    setActiveIndex(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <div className="live-console tile-card" ref={rootRef}>
      <div className="live-console__layout">
        <div className="live-console__rail" role="tablist" aria-label="Preset API requests" aria-orientation="vertical">
          {consoleMocks.map((mock, i) => (
            <button
              key={mock.id}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              id={`console-tab-${mock.id}`}
              type="button"
              role="tab"
              aria-selected={i === activeIndex}
              aria-controls="console-panel"
              tabIndex={i === activeIndex ? 0 : -1}
              className={`live-console__cmd ${i === activeIndex ? 'live-console__cmd--active' : ''}`}
              onClick={() => setActiveIndex(i)}
              onKeyDown={onTabKeyDown}
            >
              {mock.command}
            </button>
          ))}
        </div>
        <div
          className="live-console__pane"
          role="tabpanel"
          id="console-panel"
          aria-labelledby={`console-tab-${active.id}`}
        >
          {/* Screen readers get the full text at once; the typing effect is visual only. */}
          <span className="visually-hidden">{fullText}</span>
          <pre className="live-console__output" aria-hidden="true">
            <code>{fullText.slice(0, shown)}</code>
            {!done && !reducedMotion ? <span className="live-console__cursor">▌</span> : null}
          </pre>
          <p
            key={active.id}
            className={`live-console__insight${done ? ' live-console__insight--visible' : ''}`}
            aria-live="polite"
          >
            {done ? active.insight : ''}
          </p>
        </div>
      </div>
      <p className="live-console__caption">
        A simulated console, not a live backend — it mirrors the shape of requests from the real projects above.
      </p>
    </div>
  );
}
