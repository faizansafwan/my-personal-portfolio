import React, { useEffect, useRef, useState } from 'react';
import { offLottie } from '../../hooks/useLottie';
import './Timeline.css';

/**
 * Edit-bay timeline: frame ruler, lime playhead, frame counter, and one track per
 * Lottie layer drawn from its real in/out points. The ruler is a keyboard slider.
 */
export default function Timeline({ anim, meta, onScrubStart, onScrubEnd }) {
  const [frame, setFrame] = useState(0);
  const trackRef = useRef(null);
  const draggingRef = useRef(false);

  const total = meta ? Math.max(1, meta.frames) : 1;
  const last = total - 1;

  useEffect(() => {
    if (!anim) return undefined;
    const onFrame = () => setFrame(Math.min(last, Math.max(0, Math.round(anim.currentFrame))));
    anim.addEventListener('enterFrame', onFrame);
    anim.addEventListener('DOMLoaded', onFrame);
    onFrame();
    return () => {
      offLottie(anim, 'enterFrame', onFrame);
      offLottie(anim, 'DOMLoaded', onFrame);
    };
  }, [anim, last]);

  const seek = (f) => {
    if (!anim) return;
    const clamped = Math.min(last, Math.max(0, Math.round(f)));
    anim.goToAndStop(clamped, true);
    setFrame(clamped);
  };

  const frameFromPointer = (clientX) => {
    const rect = trackRef.current.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
    return ratio * last;
  };

  const onPointerDown = (e) => {
    if (!anim) return;
    draggingRef.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    onScrubStart?.();
    seek(frameFromPointer(e.clientX));
  };
  const onPointerMove = (e) => {
    if (draggingRef.current) seek(frameFromPointer(e.clientX));
  };
  const endDrag = () => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    onScrubEnd?.();
  };

  const onKeyDown = (e) => {
    const step = e.shiftKey ? 10 : 1;
    const map = { ArrowLeft: frame - step, ArrowRight: frame + step, Home: 0, End: last };
    if (!(e.key in map)) return;
    e.preventDefault();
    e.stopPropagation(); // the stage also listens for arrows; don't double-step
    onScrubStart?.();
    seek(map[e.key]);
  };

  const fps = meta?.fps || 60;
  const seconds = meta?.seconds || 0;
  const marks = [];
  for (let t = 0; t <= seconds + 1e-6; t += 0.5) marks.push(t);
  const pct = (f) => `${(f / last) * 100}%`;

  return (
    <div className="timeline" style={{ '--p': last ? frame / last : 0 }}>
      <div className="timeline__row timeline__row--ruler">
        <span className="timeline__label timeline__counter" aria-hidden="true">
          {String(frame).padStart(3, '0')} / {String(last).padStart(3, '0')}
        </span>
        <div
          ref={trackRef}
          className="timeline__ruler"
          role="slider"
          tabIndex={anim ? 0 : -1}
          aria-label="Timeline scrubber"
          aria-valuemin={0}
          aria-valuemax={last}
          aria-valuenow={frame}
          aria-valuetext={`Frame ${frame} of ${last}, ${(frame / fps).toFixed(2)} seconds`}
          aria-disabled={!anim}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onKeyDown={onKeyDown}
          style={{ '--tick': `calc(100% / ${Math.max(1, last / 10)})` }}
        >
          {marks.map((t) => (
            <span key={t} className="timeline__mark" style={{ left: pct(Math.min(last, t * fps)) }}>
              {t.toFixed(1)}s
            </span>
          ))}
        </div>
      </div>

      {meta?.layers?.length ? (
        <ul className="timeline__tracks" aria-label={`${meta.layers.length} animation layers`}>
          {meta.layers.map((layer) => {
            const start = Math.max(0, layer.inPoint);
            const end = Math.min(last, layer.outPoint);
            return (
              <li key={layer.key} className="timeline__row">
                <span className="timeline__label" title={layer.name}>
                  {layer.name}
                </span>
                <span className="timeline__lane">
                  <span
                    className="timeline__bar"
                    style={{ left: pct(start), width: `calc(${pct(Math.max(1, end - start))})` }}
                  />
                </span>
              </li>
            );
          })}
        </ul>
      ) : null}

      <span className="timeline__playhead" aria-hidden="true" />
    </div>
  );
}
