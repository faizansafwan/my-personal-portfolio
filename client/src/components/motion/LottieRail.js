import React, { useEffect, useRef } from 'react';
import { offLottie, useLottie } from '../../hooks/useLottie';
import { useInViewOnce } from '../../hooks/useInViewOnce';
import { useInViewport } from '../../hooks/useInViewport';
import './LottieRail.css';

/** Small looping preview. Shows the final frame under reduced motion; pauses off-screen. */
export function LottieThumb({ file, load, visible, reduced, className = '' }) {
  const boxRef = useRef(null);
  const { anim } = useLottie(boxRef, file, { load, loop: true, autoplay: false });

  useEffect(() => {
    if (!anim) return undefined;
    const apply = () => {
      if (reduced) anim.goToAndStop(anim.totalFrames - 1, true);
      else if (visible) anim.play();
      // Never parked on frame 0: these animations pop in, so frame 0 is blank.
      else if (anim.currentFrame < 1) anim.goToAndStop(anim.totalFrames - 1, true);
      else anim.pause();
    };
    if (anim.isLoaded) apply();
    else anim.addEventListener('DOMLoaded', apply);
    return () => offLottie(anim, 'DOMLoaded', apply);
  }, [anim, visible, reduced]);

  return <div ref={boxRef} className={`lottie-thumb ${className}`} aria-hidden="true" />;
}

export default function LottieRail({ items, selectedId, onSelect, reduced, panelId }) {
  const railRef = useRef(null);
  const tabRefs = useRef({});
  const load = useInViewOnce(railRef, 1);
  const visible = useInViewport(railRef);

  const onKeyDown = (e) => {
    const index = items.findIndex((i) => i.id === selectedId);
    const last = items.length - 1;
    let next = null;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = index === last ? 0 : index + 1;
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = index === 0 ? last : index - 1;
    if (e.key === 'Home') next = 0;
    if (e.key === 'End') next = last;
    if (next === null) return;
    e.preventDefault();
    const id = items[next].id;
    onSelect(id);
    tabRefs.current[id]?.focus();
  };

  return (
    <div className="lottie-rail" ref={railRef}>
      <div className="lottie-rail__list" role="tablist" aria-label="Lottie animations">
        {items.map((item) => {
          const selected = item.id === selectedId;
          return (
            <button
              key={item.id}
              ref={(el) => {
                tabRefs.current[item.id] = el;
              }}
              type="button"
              role="tab"
              id={`lottie-tab-${item.id}`}
              aria-selected={selected}
              aria-controls={panelId}
              tabIndex={selected ? 0 : -1}
              className={`lottie-rail__tab${selected ? ' lottie-rail__tab--on' : ''}`}
              onClick={() => onSelect(item.id)}
              onKeyDown={onKeyDown}
            >
              <span className="lottie-rail__thumb">
                <LottieThumb file={item.file} load={load} visible={visible} reduced={reduced} />
              </span>
              <span className="lottie-rail__text">
                <span className="lottie-rail__title">{item.title}</span>
                <span className="lottie-rail__use">{item.useCase}</span>
                <span className="lottie-rail__meta">
                  {item.sizeKb} KB · {item.seconds} s{item.loop ? ' loop' : ''}
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
