import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import MotionApp from './MotionApp';

const container = document.getElementById('root');
const app = (
  <React.StrictMode>
    <MotionApp />
  </React.StrictMode>
);

// Production HTML is pre-rendered (scripts/prerender.js), so hydrate it; dev starts empty.
if (container.firstElementChild) {
  ReactDOM.hydrateRoot(container, app);
} else {
  ReactDOM.createRoot(container).render(app);
}
