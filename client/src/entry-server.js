import React from 'react';
import { renderToString } from 'react-dom/server';
import App from './App';
import MotionApp from './MotionApp';

/** Used at build time by scripts/prerender.js to produce static HTML for crawlers. */
export function render() {
  return renderToString(<App />);
}

export function renderMotion() {
  return renderToString(<MotionApp />);
}
