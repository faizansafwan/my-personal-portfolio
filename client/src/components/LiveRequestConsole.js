import React, { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { consoleMocks } from '../data/consoleMocks';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import './LiveRequestConsole.css';

const CHAR_DELAY_MS = 12;

export default function LiveRequestConsole({ compact = false }) {
  const reducedMotion = usePrefersReducedMotion();
  const [activeId, setActiveId] = useState(consoleMocks[0].id);
  const [displayText, setDisplayText] = useState('');
  const [phase, setPhase] = useState('idle');

  const active = consoleMocks.find((m) => m.id === activeId) ?? consoleMocks[0];
  const fullText = `${active.request}\n\n${active.response}`;

  const runTyping = useCallback(() => {
    if (reducedMotion) {
      setDisplayText(fullText);
      setPhase('done');
      return;
    }
    setPhase('typing');
    setDisplayText('');
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setDisplayText(fullText.slice(0, i));
      if (i >= fullText.length) {
        window.clearInterval(id);
        setPhase('done');
      }
    }, CHAR_DELAY_MS);
    return () => window.clearInterval(id);
  }, [fullText, reducedMotion]);

  useEffect(() => {
    const cleanup = runTyping();
    return cleanup;
  }, [activeId, runTyping]);

  const selectCommand = (id) => {
    setActiveId(id);
  };

  return (
    <div className={`live-console tile-card ${compact ? 'live-console--compact' : ''}`}>
      <div className="live-console__layout">
        <div className="live-console__rail" role="tablist" aria-label="Preset API requests">
          {consoleMocks.map((mock) => (
            <button
              key={mock.id}
              type="button"
              role="tab"
              aria-selected={mock.id === activeId}
              className={`live-console__cmd ${mock.id === activeId ? 'live-console__cmd--active' : ''}`}
              onClick={() => selectCommand(mock.id)}
            >
              {mock.command}
            </button>
          ))}
        </div>
        <div className="live-console__pane" role="tabpanel">
          <pre className="live-console__output" aria-live="polite">
            <code>{displayText}</code>
            {phase === 'typing' && !reducedMotion ? (
              <span className="live-console__cursor" aria-hidden="true">
                ▌
              </span>
            ) : null}
          </pre>
          <AnimatePresence mode="wait">
            {phase === 'done' ? (
              <motion.p
                key={active.id}
                className="live-console__insight"
                initial={reducedMotion ? false : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              >
                {active.insight}
              </motion.p>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
      {!compact ? (
        <p className="live-console__caption">
          A simulated console, not a live backend — it mirrors the shape of requests from the real projects
          below.
        </p>
      ) : null}
    </div>
  );
}
