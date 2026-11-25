import React, { useEffect, useRef, useState } from 'react';
import { Pause, Play, Repeat, RotateCcw } from 'lucide-react';
import { offLottie, useLottie } from '../../hooks/useLottie';
import { useInViewOnce } from '../../hooks/useInViewOnce';
import { useInViewport } from '../../hooks/useInViewport';
import Timeline from './Timeline';
import './LottieStage.css';

const SPEEDS = [0.25, 0.5, 1];
const BACKGROUNDS = [
  { id: 'dark', label: 'Dark' },
  { id: 'light', label: 'Light' },
  { id: 'checker', label: 'Checker' },
];

export default function LottieStage({ item, reduced, panelId }) {
  const wrapRef = useRef(null);
  const animRef = useRef(null);
  const wasPlayingRef = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [loop, setLoop] = useState(true);
  const [bg, setBg] = useState('dark');

  const load = useInViewOnce(wrapRef, 1);
  const visible = useInViewport(wrapRef);
  const { anim, meta, error } = useLottie(animRef, item.file, { load, loop, autoplay: false });

  // New instance: apply settings, then autoplay (or show the final frame under reduced motion).
  useEffect(() => {
    if (!anim) return undefined;
    const start = () => {
      anim.setSpeed(speed);
      anim.loop = loop;
      if (reduced) {
        anim.goToAndStop(anim.totalFrames - 1, true);
        setPlaying(false);
      } else {
        anim.goToAndStop(0, true);
        setPlaying(true);
      }
    };
    if (anim.isLoaded) start();
    else anim.addEventListener('DOMLoaded', start);
    const onComplete = () => setPlaying(false);
    anim.addEventListener('complete', onComplete);
    return () => {
      offLottie(anim, 'DOMLoaded', start);
      offLottie(anim, 'complete', onComplete);
    };
    // speed/loop are synced by their own effects; only a new instance restarts playback.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [anim, reduced]);

  // Play only while intended AND on screen.
  useEffect(() => {
    if (!anim) return;
    if (playing && visible) anim.play();
    else anim.pause();
  }, [anim, playing, visible]);

  useEffect(() => {
    anim?.setSpeed(speed);
  }, [anim, speed]);

  useEffect(() => {
    if (anim) anim.loop = loop;
  }, [anim, loop]);

  const atEnd = () => anim && anim.currentFrame >= anim.totalFrames - 1.5;

  const togglePlay = () => {
    if (!anim) return;
    if (!playing && atEnd()) anim.goToAndStop(0, true);
    setPlaying((p) => !p);
  };

  const replay = () => {
    if (!anim) return;
    anim.goToAndStop(0, true);
    setPlaying(true);
  };

  const step = (delta) => {
    if (!anim) return;
    setPlaying(false);
    const next = Math.min(anim.totalFrames - 1, Math.max(0, Math.round(anim.currentFrame) + delta));
    anim.goToAndStop(next, true);
  };

  const onStageKeyDown = (e) => {
    if (e.target !== e.currentTarget) return; // buttons/slider inside handle their own keys
    if (e.key === ' ' || e.key === 'Spacebar') {
      e.preventDefault();
      togglePlay();
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      e.preventDefault();
      step(e.key === 'ArrowLeft' ? -1 : 1);
    }
  };

  return (
    <div className="lottie-stage" ref={wrapRef} id={panelId} role="tabpanel" aria-label={`${item.title} inspector`}>
      <div
        className={`lottie-stage__screen lottie-stage__screen--${bg}`}
        tabIndex={0}
        role="group"
        aria-roledescription="animation preview"
        aria-label={`${item.title}. Space plays or pauses, arrow keys step one frame.`}
        onKeyDown={onStageKeyDown}
      >
        <div key={item.id} ref={animRef} className="lottie-stage__anim" aria-hidden="true" />
        {error ? <p className="lottie-stage__error">This animation could not load. Refresh to try again.</p> : null}
        <div className="lottie-stage__hud" aria-hidden="true">
          <span>{item.id}.json</span>
          <span>{meta ? `${meta.width}×${meta.height} · ${meta.fps} fps` : '—'}</span>
        </div>
      </div>

      <Timeline
        anim={anim}
        meta={meta}
        onScrubStart={() => {
          wasPlayingRef.current = playing;
          setPlaying(false);
        }}
        onScrubEnd={() => {
          if (wasPlayingRef.current) setPlaying(true);
        }}
      />

      <div className="lottie-stage__controls">
        <div className="lottie-stage__group">
          <button
            type="button"
            className="lottie-stage__btn lottie-stage__btn--primary"
            onClick={togglePlay}
            disabled={!anim}
            aria-label={playing ? 'Pause' : 'Play'}
          >
            {playing ? <Pause size={18} aria-hidden="true" /> : <Play size={18} aria-hidden="true" />}
          </button>
          <button type="button" className="lottie-stage__btn" onClick={replay} disabled={!anim} aria-label="Replay from start">
            <RotateCcw size={17} aria-hidden="true" />
          </button>
          <button
            type="button"
            className={`lottie-stage__btn${loop ? ' lottie-stage__btn--on' : ''}`}
            onClick={() => setLoop((l) => !l)}
            aria-pressed={loop}
            aria-label="Loop"
          >
            <Repeat size={17} aria-hidden="true" />
          </button>
        </div>

        <div className="lottie-stage__group" role="group" aria-label="Playback speed">
          {SPEEDS.map((s) => (
            <button
              key={s}
              type="button"
              className={`lottie-stage__chip${speed === s ? ' lottie-stage__chip--on' : ''}`}
              aria-pressed={speed === s}
              onClick={() => setSpeed(s)}
            >
              {s}×
            </button>
          ))}
        </div>

        <div className="lottie-stage__group" role="group" aria-label="Stage background">
          {BACKGROUNDS.map((b) => (
            <button
              key={b.id}
              type="button"
              className={`lottie-stage__chip${bg === b.id ? ' lottie-stage__chip--on' : ''}`}
              aria-pressed={bg === b.id}
              onClick={() => setBg(b.id)}
            >
              <span className={`lottie-stage__swatch lottie-stage__swatch--${b.id}`} aria-hidden="true" />
              {b.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
