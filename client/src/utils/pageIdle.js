let readyPromise = null;

/**
 * Resolves once the page has fully loaded and the main thread is idle.
 * Used to start heavy media (Lottie players, the hero reel) after first paint
 * and hydration, so they never compete with them.
 */
export function pageIdle() {
  if (!readyPromise) {
    readyPromise = new Promise((resolve) => {
      const idle = () =>
        'requestIdleCallback' in window
          ? window.requestIdleCallback(() => resolve(), { timeout: 2500 })
          : setTimeout(resolve, 300);
      if (document.readyState === 'complete') idle();
      else window.addEventListener('load', idle, { once: true });
    });
  }
  return readyPromise;
}

let interactionPromise = null;

/**
 * Resolves on the visitor's first scroll, pointer, touch or key interaction.
 * Video decoding waits for this: lab tools (Lighthouse) decode video on the main
 * thread in software, and real visitors interact within a second anyway.
 */
export function firstInteraction() {
  if (!interactionPromise) {
    interactionPromise = new Promise((resolve) => {
      const events = ['scroll', 'pointerdown', 'touchstart', 'keydown', 'wheel'];
      const done = () => {
        events.forEach((e) => window.removeEventListener(e, done, true));
        resolve();
      };
      events.forEach((e) => window.addEventListener(e, done, { capture: true, passive: true, once: true }));
    });
  }
  return interactionPromise;
}
