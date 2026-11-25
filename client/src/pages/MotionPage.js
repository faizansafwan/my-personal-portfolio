import React, { Suspense, useEffect, useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';
import PageBackdrop from '../components/PageBackdrop';
import NavBar from '../components/NavBar';
import SectionSwitcher from '../components/motion/SectionSwitcher';
import LottieStage from '../components/motion/LottieStage';
import LottieRail from '../components/motion/LottieRail';
import PhoneMockup from '../components/motion/PhoneMockup';
import LottieSpec from '../components/motion/LottieSpec';
import EmbedCode from '../components/motion/EmbedCode';
import VideoGrid from '../components/motion/VideoGrid';
import ProcessFlow from '../components/motion/ProcessFlow';
import { heroReel, lottieItems, motionVideos } from '../data/motion';
import { LINKS, SITE_URL, SITE_VERSION } from '../data/site';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';
import { useInViewport } from '../hooks/useInViewport';
import { firstInteraction, pageIdle } from '../utils/pageIdle';
import './MotionPage.css';

const BASE = import.meta.env.BASE_URL;
const PANEL_ID = 'lottie-inspector';

const sizes = lottieItems.map((i) => i.sizeKb);
const SIZE_RANGE = `${Math.min(...sizes)}–${Math.max(...sizes)} KB`;

function jsonLd() {
  const page = `${SITE_URL}motion/`;
  const person = { '@id': `${SITE_URL}#person` };
  const data = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${page}#page`,
    url: page,
    name: 'Motion Lab — Lottie UI animations & motion graphics',
    description:
      'Lightweight Lottie UI animations and short motion graphics videos for apps, websites and launches.',
    inLanguage: 'en',
    isPartOf: { '@id': `${SITE_URL}#website` },
    author: person,
    hasPart: [
      ...lottieItems.map((item) => ({
        '@type': 'CreativeWork',
        name: `${item.title} — Lottie animation`,
        description: `${item.useCase}. ${item.detail}`,
        encodingFormat: 'application/json',
        contentUrl: `${SITE_URL}${item.file}`,
        url: `${page}#${item.id}`,
        keywords: item.tags.join(', '),
        creator: person,
      })),
      {
        '@type': 'VideoObject',
        name: 'App state animation set — reel',
        description: 'All five Lottie app-state animations playing side by side.',
        thumbnailUrl: `${SITE_URL}${heroReel.poster}`,
        contentUrl: `${SITE_URL}${heroReel.src}`,
        duration: `PT${heroReel.seconds}S`,
        uploadDate: heroReel.uploadDate,
        width: heroReel.width,
        height: heroReel.height,
        creator: person,
      },
      ...motionVideos.map((v) => ({
        '@type': 'VideoObject',
        name: v.title,
        description: v.summary,
        thumbnailUrl: `${SITE_URL}${v.poster}`,
        ...(v.src ? { contentUrl: `${SITE_URL}${v.src}` } : {}),
        ...(v.embedUrl ? { embedUrl: v.embedUrl } : {}),
        duration: `PT${Math.round(v.seconds)}S`,
        uploadDate: v.uploadDate,
        creator: person,
      })),
    ],
  };
  // Escape "<" so the JSON can never close the <script> tag.
  return JSON.stringify(data).replace(/</g, '\\u003c');
}

function HeroReel({ reduced }) {
  const wrapRef = useRef(null);
  const videoRef = useRef(null);
  const barRef = useRef(null);
  const timeRef = useRef(null);
  const visible = useInViewport(wrapRef);
  const [userPlay, setUserPlay] = useState(null); // null = default (autoplay unless reduced motion)
  const [idle, setIdle] = useState(false);
  const shouldPlay = userPlay ?? !reduced;

  // The poster (all five animations) paints instantly; decoding starts after load + idle and the
  // visitor's first scroll/tap, so the video never competes with first paint or first input.
  useEffect(() => {
    let alive = true;
    Promise.all([pageIdle(), firstInteraction()]).then(() => alive && setIdle(true));
    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (shouldPlay && visible && (idle || userPlay)) v.play().catch(() => {});
    else v.pause();
  }, [shouldPlay, visible, idle, userPlay]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return undefined;
    const onTime = () => {
      const p = v.duration ? v.currentTime / v.duration : 0;
      barRef.current?.style.setProperty('--p', p);
      if (timeRef.current) {
        const frame = Math.floor(v.currentTime * heroReel.fps);
        timeRef.current.textContent = `00:00:0${Math.floor(v.currentTime)}:${String(frame % heroReel.fps).padStart(2, '0')}`;
      }
    };
    v.addEventListener('timeupdate', onTime);
    return () => v.removeEventListener('timeupdate', onTime);
  }, []);

  const showPlay = !shouldPlay;

  return (
    <figure className="reel" ref={wrapRef}>
      <div className="reel__bar" aria-hidden="true">
        <span className="reel__rec" />
        <span>PGM · app-states-reel.mp4</span>
        <span className="reel__spec">
          {heroReel.width}×{heroReel.height} · {heroReel.fps} fps
        </span>
      </div>
      <div className="reel__screen" style={{ aspectRatio: `${heroReel.width} / ${heroReel.height}` }}>
        <video
          ref={videoRef}
          className="reel__video"
          src={`${BASE}${heroReel.src}`}
          poster={`${BASE}${heroReel.poster}`}
          muted
          loop
          playsInline
          preload="none"
          aria-label="Reel: the five Lottie app-state animations playing side by side"
        />
      </div>
      <div className="reel__foot">
        <button
          type="button"
          className="reel__toggle"
          onClick={() => setUserPlay(!shouldPlay)}
          aria-label={showPlay ? 'Play reel' : 'Pause reel'}
        >
          {showPlay ? <Play size={16} aria-hidden="true" /> : <Pause size={16} aria-hidden="true" />}
        </button>
        <span className="reel__progress" ref={barRef} aria-hidden="true">
          <span className="reel__playhead" />
        </span>
        <span className="reel__time" ref={timeRef} aria-hidden="true">
          00:00:00:00
        </span>
      </div>
      <figcaption className="visually-hidden">
        A three-second reel of the five Lottie animations shown below.
      </figcaption>
    </figure>
  );
}

export default function MotionPage() {
  useRevealOnScroll();
  const reduced = usePrefersReducedMotion();
  const [selectedId, setSelectedId] = useState(lottieItems[0].id);
  const selected = lottieItems.find((i) => i.id === selectedId) || lottieItems[0];

  // Deep links: /motion/#payment_success opens that animation in the stage.
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (lottieItems.some((i) => i.id === id)) {
      setSelectedId(id);
      document.getElementById('lottie')?.scrollIntoView();
    }
  }, []);

  const select = (id) => {
    setSelectedId(id);
    window.history.replaceState(null, '', `#${id}`);
  };

  const sections = [
    { id: 'lottie', index: '01', label: 'Lottie UI', count: lottieItems.length },
    { id: 'videos', index: '02', label: 'Motion videos', count: motionVideos.length },
    { id: 'process', index: '03', label: 'Process' },
  ];

  const ctas = (
    <div className="motion-hero__actions">
      <a className="btn-primary" href={LINKS.contra} target="_blank" rel="noopener noreferrer">
        Hire me on Contra →
      </a>
      <a className="btn-ghost" href={`${LINKS.email}?subject=${encodeURIComponent('Motion project')}`}>
        Email me
      </a>
    </div>
  );

  return (
    <>
      <a className="skip-link" href="#lottie">
        Skip to the animations
      </a>
      <PageBackdrop />
      <NavBar variant="motion" />
      <main className="motion-page">
        <Suspense fallback={null}>
          <section className="motion-hero" aria-labelledby="motion-title">
            <div className="section-shell">
              <p className="motion-hero__eyebrow">Motion lab · v1</p>
              <h1 className="motion-hero__title" id="motion-title">
                Motion that <span className="text-accent">ships.</span>
              </h1>
              <p className="motion-hero__lead">
                Lightweight Lottie UI animations and short motion graphics videos for apps, websites and launches.
              </p>
              <p className="motion-hero__stats">
                <span>{lottieItems.length} Lottie animations</span>
                <span>
                  {motionVideos.length ? `${motionVideos.length} videos` : 'videos in production'}
                </span>
                <span>{SIZE_RANGE} per animation</span>
                <span>iOS · Android · Web</span>
              </p>
              {ctas}
              <HeroReel reduced={reduced} />
            </div>
          </section>
        </Suspense>
        <Suspense fallback={null}>
          <SectionSwitcher sections={sections} />
        </Suspense>
        <Suspense fallback={null}>
          <section className="motion-section" id="lottie" aria-labelledby="lottie-title">
            <div className="section-shell">
              <p className="section-eyebrow motion-fade">01 · Lottie UI animations</p>
              <h2 className="section-title motion-fade" id="lottie-title">
                App-state animation set
              </h2>
              <p className="motion-section__intro motion-fade">
                Five matching animations for the moments every app has — success, loading, error, empty cart and upload
                done. Same badge, same motion language, all vector. Pick one to inspect it frame by frame.
              </p>
              <p className="motion-section__note motion-fade">
                <span className="motion-section__badge">Concept set</span>
                Built with an AI-assisted, code-first workflow and tested frame by frame in the Lottie player.
              </p>
  
              <div className="inspector">
                <div className="inspector__stage">
                  <LottieStage item={selected} reduced={reduced} panelId={PANEL_ID} />
                </div>
                <div className="inspector__rail">
                  <LottieRail
                    items={lottieItems}
                    selectedId={selected.id}
                    onSelect={select}
                    reduced={reduced}
                    panelId={PANEL_ID}
                  />
                </div>
                <aside className="inspector__side" aria-label={`${selected.title} details`}>
                  <PhoneMockup item={selected} items={lottieItems} reduced={reduced} />
                  <LottieSpec item={selected} />
                </aside>
                <div className="inspector__embed">
                  <EmbedCode fileName={selected.file.split('/').pop()} loop={selected.loop} />
                </div>
              </div>
            </div>
          </section>
        </Suspense>
        <Suspense fallback={null}>
          <section className="motion-section" id="videos" aria-labelledby="videos-title">
            <div className="section-shell">
              <p className="section-eyebrow motion-fade">02 · Motion graphics videos</p>
              <h2 className="section-title motion-fade" id="videos-title">
                Promos, explainers &amp; social cuts
              </h2>
              <p className="motion-section__intro motion-fade">
                Short videos for launches and feeds — delivered in 16:9, 9:16 and 1:1, with captions in English, Sinhala
                or Tamil.
              </p>
              <VideoGrid videos={motionVideos} reduced={reduced} />
            </div>
          </section>
        </Suspense>
        <Suspense fallback={null}>
          <section className="motion-section" id="process" aria-labelledby="process-title">
            <div className="section-shell">
              <p className="section-eyebrow motion-fade">03 · Process &amp; deliverables</p>
              <h2 className="section-title motion-fade" id="process-title">
                From brief to production file
              </h2>
              <ProcessFlow />
            </div>
          </section>
        </Suspense>
        <Suspense fallback={null}>
          <section className="motion-cta" aria-labelledby="cta-title">
            <div className="section-shell">
              <div className="motion-cta__band motion-fade">
                <div>
                  <h2 className="motion-cta__title" id="cta-title">
                    Need an animation that loads in a blink?
                  </h2>
                  <p className="motion-cta__text">
                    Tell me the moment in your app — I’ll send a style frame first, then the production file.
                  </p>
                </div>
                {ctas}
              </div>
            </div>
          </section>
        </Suspense>
      </main>

      <footer className="motion-footer section-shell">
        <p>
          © {new Date().getFullYear()} Faizan Safwan · Motion lab · {SITE_VERSION}
        </p>
        <nav className="motion-footer__links" aria-label="Footer">
          <a href={BASE}>Portfolio home</a>
          <a href={`${BASE}#work`}>Engineering work</a>
          <a href={LINKS.contra} target="_blank" rel="noopener noreferrer">
            Contra
          </a>
          <a href={LINKS.github} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
        </nav>
      </footer>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd() }} />
    </>
  );
}
