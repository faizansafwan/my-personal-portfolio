import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeft, PlayCircle } from 'lucide-react';
import { offLottie, useLottie } from '../../hooks/useLottie';
import { useInViewOnce } from '../../hooks/useInViewOnce';
import { useInViewport } from '../../hooks/useInViewport';
import './PhoneMockup.css';

const FLOW_PRE_MS = 3000; // two loops of the loading animation

/**
 * Plays the selected animation on a sample app screen. "Play the flow" chains the
 * state that normally precedes it (e.g. Loading → Payment success).
 */
export default function PhoneMockup({ item, items, reduced }) {
  const wrapRef = useRef(null);
  const animRef = useRef(null);
  const [phase, setPhase] = useState('main'); // 'pre' | 'main'
  const load = useInViewOnce(wrapRef, 1);
  const visible = useInViewport(wrapRef);

  const pre = item.flowFrom ? items.find((i) => i.id === item.flowFrom) : null;
  const shown = phase === 'pre' && pre ? pre : item;
  const { anim } = useLottie(animRef, shown.file, { load, loop: shown.loop, autoplay: false });

  // Selecting another item resets any running flow.
  useEffect(() => {
    setPhase('main');
  }, [item.id]);

  useEffect(() => {
    if (phase !== 'pre') return undefined;
    const t = window.setTimeout(() => setPhase('main'), FLOW_PRE_MS);
    return () => window.clearTimeout(t);
  }, [phase]);

  useEffect(() => {
    if (!anim) return undefined;
    const apply = () => {
      if (reduced) anim.goToAndStop(anim.totalFrames - 1, true);
      else if (visible) anim.play();
      else anim.pause();
    };
    if (anim.isLoaded) apply();
    else anim.addEventListener('DOMLoaded', apply);
    return () => offLottie(anim, 'DOMLoaded', apply);
  }, [anim, visible, reduced]);

  const playFlow = () => {
    if (!pre) return;
    setPhase('pre');
  };

  const replay = () => {
    if (anim && !reduced) anim.goToAndPlay(0, true);
  };

  return (
    <div className="phone" ref={wrapRef}>
      <div className="phone__head">
        <span className="phone__label">In context · Sample screen</span>
        {pre ? (
          <button type="button" className="phone__flow" onClick={playFlow} disabled={phase === 'pre'}>
            <PlayCircle size={16} aria-hidden="true" />
            {phase === 'pre' ? `${pre.title}…` : `Play the flow: ${pre.title} → ${item.title}`}
          </button>
        ) : (
          <button type="button" className="phone__flow" onClick={replay} disabled={reduced}>
            <PlayCircle size={16} aria-hidden="true" />
            Replay on screen
          </button>
        )}
      </div>

      <div className="phone__frame">
        <div className="phone__screen">
          <div className="phone__status" aria-hidden="true">
            <span>9:41</span>
            <span className="phone__island" />
            <span className="phone__bars" />
          </div>
          <div className="phone__appbar" aria-hidden="true">
            <ChevronLeft size={18} />
            <span>Checkout</span>
          </div>
          <div className="phone__body">
            <div key={shown.id} ref={animRef} className="phone__anim" aria-hidden="true" />
            <p className="phone__title" aria-live="polite">
              {shown.screen.title}
            </p>
            <p className="phone__line">{shown.screen.line}</p>
            <p className="phone__sub">{shown.screen.sub}</p>
          </div>
          {shown.screen.cta ? (
            <span className="phone__cta" aria-hidden="true">
              {shown.screen.cta}
            </span>
          ) : (
            <span className="phone__cta phone__cta--ghost" aria-hidden="true" />
          )}
        </div>
      </div>
    </div>
  );
}
