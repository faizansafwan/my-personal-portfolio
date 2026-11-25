import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import './EmbedCode.css';

const PLATFORMS = [
  { id: 'web', label: 'Web' },
  { id: 'rn', label: 'React Native' },
  { id: 'flutter', label: 'Flutter' },
];

function snippet(platform, fileName, loop) {
  if (platform === 'rn') {
    return `import LottieView from 'lottie-react-native';

<LottieView
  source={require('./${fileName}')}
  autoPlay
  loop={${loop}}
  style={{ width: 240, height: 240 }}
/>`;
  }
  if (platform === 'flutter') {
    return `// pubspec.yaml → dependencies: lottie: ^3.0.0
// and assets: - assets/${fileName}
Lottie.asset(
  'assets/${fileName}',
  width: 240,
  height: 240,
  repeat: ${loop},
)`;
  }
  return `<div id="anim" style="width:240px;height:240px"></div>
<script src="https://cdn.jsdelivr.net/npm/lottie-web@5.12.2/build/player/lottie_light.min.js"></script>
<script>
  lottie.loadAnimation({
    container: document.getElementById('anim'),
    renderer: 'svg',
    loop: ${loop},
    autoplay: true,
    path: '${fileName}',
  });
</script>`;
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    try {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.setAttribute('readonly', '');
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand('copy');
      ta.remove();
      return ok;
    } catch {
      return false;
    }
  }
}

export default function EmbedCode({ fileName, loop }) {
  const [platform, setPlatform] = useState('web');
  const [status, setStatus] = useState('');
  const code = snippet(platform, fileName, loop);

  const onCopy = async () => {
    const ok = await copyText(code);
    const label = PLATFORMS.find((p) => p.id === platform).label;
    setStatus(ok ? `Copied ${label} embed code` : 'Copy failed — select the code and copy it manually');
    window.setTimeout(() => setStatus(''), 2600);
  };

  return (
    <div className="embed">
      <div className="embed__head">
        <div className="embed__tabs" role="group" aria-label="Embed platform">
          {PLATFORMS.map((p) => (
            <button
              key={p.id}
              type="button"
              className={`embed__tab${platform === p.id ? ' embed__tab--on' : ''}`}
              aria-pressed={platform === p.id}
              onClick={() => setPlatform(p.id)}
            >
              {p.label}
            </button>
          ))}
        </div>
        <button type="button" className="embed__copy" onClick={onCopy}>
          {status.startsWith('Copied') ? <Check size={15} aria-hidden="true" /> : <Copy size={15} aria-hidden="true" />}
          {status.startsWith('Copied') ? 'Copied' : 'Copy embed code'}
        </button>
      </div>
      <pre className="embed__code" tabIndex={0} aria-label={`${platform} embed code`}>
        <code>{code}</code>
      </pre>
      <p className="visually-hidden" aria-live="polite">
        {status}
      </p>
    </div>
  );
}
