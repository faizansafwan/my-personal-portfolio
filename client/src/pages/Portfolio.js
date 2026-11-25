import React from 'react';
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
        <Hero />
        <Work />
        <HowIBuild />
        <Journey />
        <Services />
        <EducationCerts />
        <BlogSection />
        <AboutContact />
      </main>
    </>
  );
}
