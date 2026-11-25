import React from 'react';
import { Download } from 'lucide-react';
import { useLottieMeta } from '../../hooks/useLottie';
import './LottieSpec.css';

const BASE = import.meta.env.BASE_URL;

/** Spec sheet read from the real JSON (size from the fetched bytes), plus download + embed. */
export default function LottieSpec({ item }) {
  const meta = useLottieMeta(item.file);
  const fileName = item.file.split('/').pop();

  const rows = [
    ['File size', meta ? `${(meta.bytes / 1024).toFixed(1)} KB` : `${item.sizeKb} KB`],
    ['Canvas', meta ? `${meta.width} × ${meta.height}` : '—'],
    ['Frame rate', meta ? `${meta.fps} fps` : `${item.fps} fps`],
    ['Duration', meta ? `${meta.seconds.toFixed(2)} s · ${meta.frames} frames` : `${item.seconds} s`],
    ['Layers', meta ? String(meta.layers.length) : '—'],
    ['Playback', item.loop ? 'Loop' : 'Play once'],
    ['Format', meta ? `Lottie JSON · bodymovin ${meta.version}` : 'Lottie JSON'],
  ];

  return (
    <div className="lottie-spec">
      <div className="lottie-spec__head">
        <h3 className="lottie-spec__title">
          {item.title}
          {item.concept ? <span className="lottie-spec__badge">Concept</span> : null}
        </h3>
        <p className="lottie-spec__detail">{item.detail}</p>
      </div>

      <dl className="lottie-spec__grid">
        {rows.map(([k, v]) => (
          <div key={k} className="lottie-spec__row">
            <dt>{k}</dt>
            <dd>{v}</dd>
          </div>
        ))}
      </dl>

      <div className="lottie-spec__actions">
        <a className="btn-ghost lottie-spec__download" href={`${BASE}${item.file}`} download={fileName}>
          <Download size={16} aria-hidden="true" /> Download JSON
        </a>
        <span className="lottie-spec__tags">{item.tags.map((t) => `#${t}`).join('  ')}</span>
      </div>
    </div>
  );
}
