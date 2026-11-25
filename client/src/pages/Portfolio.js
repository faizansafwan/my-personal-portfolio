import React, { Suspense } from 'react';
import PageBackdrop from '../components/PageBackdrop';
import NavBar from '../components/NavBar';
import Hero from '../components/Hero';
import Work from '../components/Work';
import HowIBuild from '../components/HowIBuild';
import Journey from '../components/Journey';
import Services from '../components/Services';
import EducationCerts from '../components/EducationCerts';
import BlogSection from '../components/BlogSection';
import AboutContact from '../components/AboutContact';
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';

/**
 * Section order: proof first (work, how, journey), then the service offer,
 * then supporting credentials, writing, and the close.
 */
const SECTIONS = [Hero, Work, HowIBuild, Journey, Services, EducationCerts, BlogSection, AboutContact];

export default function Portfolio() {
  useRevealOnScroll();

  return (
    <>
      <a className="skip-link" href="#work">
        Skip to work
      </a>
      <PageBackdrop />
      <NavBar />
      <main>
        {/* Each boundary hydrates as its own interruptible chunk, so first input isn't blocked by one long task. */}
        {SECTIONS.map((Section, i) => (
          <Suspense key={i} fallback={null}>
            <Section />
          </Suspense>
        ))}
      </main>
    </>
  );
}
