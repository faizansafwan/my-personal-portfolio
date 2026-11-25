import { useEffect, useState } from 'react';
import { pageIdle } from '../utils/pageIdle';

const BASE = import.meta.env.BASE_URL;
const textCache = new Map(); // src -> Promise<string>; shared by every player on the page
let playerPromise = null;
function loadPlayer() {
  if (!playerPromise) {
    // Light SVG player: no expressions engine, ~3x smaller than the full build. Browser-only.
    playerPromise = pageIdle().then(() =>
      import('lottie-web/build/player/esm/lottie_light.min.js').then((m) => m.default || m)
    );
  }
  return playerPromise;
}

function loadText(src) {
  if (!textCache.has(src)) {
    textCache.set(
      src,
      fetch(`${BASE}${src}`).then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status} for ${src}`);
        return r.text();
      })
    );
  }
  return textCache.get(src);
}

/**
 * Removes a listener without throwing if the instance was already destroyed.
 * Effect cleanups run after useLottie's own cleanup has called anim.destroy(),
 * and lottie-web throws on removeEventListener after destroy.
 */
export function offLottie(anim, event, fn) {
  try {
    anim?.removeEventListener(event, fn);
  } catch {
    /* instance already destroyed */
  }
}

/** Technical metadata straight from the Lottie JSON (never from hand-written copy). */
function readMeta(data, text) {
  return {
    version: data.v,
    fps: data.fr,
    inPoint: data.ip,
    outPoint: data.op,
    frames: Math.round(data.op - data.ip),
    seconds: (data.op - data.ip) / data.fr,
    width: data.w,
    height: data.h,
    name: data.nm,
    bytes: new Blob([text]).size,
    layers: (data.layers || []).map((l, i) => ({
      key: `${i}-${l.nm}`,
      name: l.nm || `Layer ${i + 1}`,
      type: l.ty,
      inPoint: l.ip,
      outPoint: l.op,
    })),
  };
}

/**
 * Loads a Lottie file into `containerRef` once `load` is true.
 * Destroys the instance on unmount and whenever `src` changes.
 *
 * @returns {{ anim: object|null, meta: object|null, error: Error|null }}
 */
export function useLottie(containerRef, src, { load = true, loop = true, autoplay = true } = {}) {
  const [state, setState] = useState({ anim: null, meta: null, error: null });

  useEffect(() => {
    if (!load || !src) return undefined;
    let cancelled = false;
    let anim = null;

    Promise.all([loadPlayer(), loadText(src)])
      .then(([lottie, text]) => {
        if (cancelled || !containerRef.current) return;
        const data = JSON.parse(text); // fresh copy: lottie-web mutates animationData
        const meta = readMeta(data, text);
        anim = lottie.loadAnimation({
          container: containerRef.current,
          renderer: 'svg',
          loop,
          autoplay,
          animationData: data,
          rendererSettings: { preserveAspectRatio: 'xMidYMid meet', progressiveLoad: true },
        });
        setState({ anim, meta, error: null });
      })
      .catch((error) => {
        if (!cancelled) setState({ anim: null, meta: null, error });
      });

    return () => {
      cancelled = true;
      anim?.destroy();
      setState({ anim: null, meta: null, error: null });
    };
    // loop/autoplay are read once per load; callers change `src` to reload.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src, load, containerRef]);

  return state;
}

/** Fetches (cached) metadata for a Lottie file without rendering it. */
export function useLottieMeta(src) {
  const [meta, setMeta] = useState(null);
  useEffect(() => {
    let cancelled = false;
    loadText(src)
      .then((text) => {
        if (!cancelled) setMeta(readMeta(JSON.parse(text), text));
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [src]);
  return meta;
}
