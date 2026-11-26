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
import {
  featuredCollection,
  heroReel,
  lottieCollections,
  lottieItems,
  motionProjects,
  motionVideos,
} from '../data/motion';
import { LINKS, SITE_URL, SITE_VERSION } from '../data/site';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';
import { useInViewport } from '../hooks/useInViewport';
import { firstInteraction, pageIdle } from '../utils/pageIdle';
import './MotionPage.css';

const BASE = import.meta.env.BASE_URL;
const PANEL_ID = 'lottie-inspector';

const sizes = lottieItems.map((i) => i.sizeKb);
const SIZE_RANGE = `${Math.round(Math.min(...sizes))}–${Math.round(Math.max(...sizes))} KB`;
const collectionOf = (item) => lottieCollections.find((c) => c.id === item.collectionId) || featuredCollection;

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
      ...lottieCollections.map((c) => ({
        '@type': 'CreativeWork',
        name: `${c.title} (Lottie animation collection)`,
        description: c.summary,
        url: `${page}#${c.items[0].id}`,
        creator: person,
        hasPart: c.items.map((item) => ({
          '@type': 'CreativeWork',
          name: `${item.title} (${c.title}, Lottie animation)`,
          description: `${item.useCase}. ${item.detail}`,
          encodingFormat: 'application/json',
          contentUrl: `${SITE_URL}${item.file}`,
          ...(item.dotLottie
            ? {
                associatedMedia: {
                  '@type': 'MediaObject',
                  contentUrl: `${SITE_URL}${item.dotLottie}`,
                  encodingFormat: 'application/zip',
                },
              }
            : {}),
          url: `${page}#${item.id}`,
          keywords: item.tags.join(', '),
          creator: person,
        })),
      })),
      {
        '@type': 'VideoObject',
        name: heroReel.title,
        description: heroReel.description,
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
        description: v.project.summary,
        thumbnailUrl: `${SITE_URL}${v.poster}`,
        ...(v.src ? { contentUrl: `${SITE_URL}${v.src}` } : {}),
        ...(v.embedUrl ? { embedUrl: v.embedUrl } : {}),
        duration: `PT${Math.floor(v.seconds / 60)}M${Math.round(v.seconds % 60)}S`,
        uploadDate: v.project.uploadDate,
        width: v.width,
        height: v.height,
        url: `${page}#videos`,
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

  // The poster (the featured set) paints instantly; decoding starts after load + idle and the
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
        <span>PGM · {heroReel.fileName}</span>
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
          aria-label={`Reel: ${heroReel.description}`}
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
        A three-second reel of the {featuredCollection.title} animations shown below.
      </figcaption>
    </figure>
  );
}

export default function MotionPage() {
  useRevealOnScroll();
  const reduced = usePrefersReducedMotion();
  const [selectedId, setSelectedId] = useState(featuredCollection.items[0].id);
  const selected = lottieItems.find((i) => i.id === selectedId) || lottieItems[0];
  const collection = collectionOf(selected);

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
              <p className="motion-hero__eyebrow">Motion lab · v2</p>
              <h1 className="motion-hero__title" id="motion-title">
                Motion that <span className="text-accent">ships.</span>
              </h1>
              <p className="motion-hero__lead">
                Lightweight Lottie UI animations and short motion graphics videos for apps, websites and launches.
              </p>
              <p className="motion-hero__stats">
                <span>
                  {lottieItems.length} Lottie animations · {lottieCollections.length} sets
                </span>
                <span>
                  {motionVideos.length ? `${motionVideos.length} motion videos` : 'videos in production'}
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
                App-state animation sets
              </h2>
              <div className="collection-switch motion-fade" role="group" aria-label="Animation collections">
                {lottieCollections.map((c) => {
                  const on = c.id === collection.id;
                  return (
                    <button
                      key={c.id}
                      type="button"
                      className={`collection-switch__btn${on ? ' collection-switch__btn--on' : ''}`}
                      style={{ '--set-accent': c.accent }}
                      aria-pressed={on}
                      onClick={() => !on && select(c.items[0].id)}
                    >
                      <span className="collection-switch__strip" aria-hidden="true">
                        <img src={`${BASE}${c.strip}`} alt="" width="960" height="240" loading="lazy" decoding="async" />
                      </span>
                      <span className="collection-switch__text">
                        <span className="collection-switch__title">
                          {c.title}
                          {c.isNew ? <span className="collection-switch__new">New</span> : null}
                        </span>
                        <span className="collection-switch__summary">{c.summary}</span>
                        <span className="collection-switch__meta">
                          {c.items.length} animations · {c.sizeRange}
                          {c.isNew ? '' : ` · ${c.label}`}
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>
              <p className="motion-section__intro motion-fade">{collection.intro}</p>
              <p className="motion-section__note motion-fade">
                <span className="motion-section__badge">{collection.concept}</span>
                Built with an AI-assisted, code-first workflow and tested frame by frame in the Lottie player.
              </p>
  
              <div className="inspector">
                <div className="inspector__stage">
                  <LottieStage item={selected} reduced={reduced} panelId={PANEL_ID} />
                </div>
                <div className="inspector__rail">
                  <LottieRail
                    items={collection.items}
                    selectedId={selected.id}
                    onSelect={select}
                    reduced={reduced}
                    panelId={PANEL_ID}
                  />
                </div>
                <aside className="inspector__side" aria-label={`${selected.title} details`}>
                  <PhoneMockup item={selected} items={collection.items} reduced={reduced} />
                  <LottieSpec item={selected} collection={collection} />
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
                Launch films and social cuts, grouped by project. Each project ships in the formats it runs in: 16:9,
                9:16 or 1:1, with captions in English, Sinhala or Tamil on request. Tap a cut to play it with sound.
              </p>
              <VideoGrid projects={motionProjects} reduced={reduced} />
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
