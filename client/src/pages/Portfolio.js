import React from 'react';
import PageBackdrop from '../components/PageBackdrop';
import NavBar from '../components/NavBar';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Work from '../components/Work';
import HowIBuild from '../components/HowIBuild';
import Journey from '../components/Journey';
import EducationCerts from '../components/EducationCerts';
import BlogSection from '../components/BlogSection';
import AboutContact from '../components/AboutContact';
import { usePortfolioMotion } from '../hooks/usePortfolioMotion';

export default function Portfolio() {
  usePortfolioMotion();

  return (
    <>
      <PageBackdrop />
      <NavBar />
      <main>
        <Hero />
        <Services />
        <Work />
        <HowIBuild />
        <Journey />
        <EducationCerts />
        <BlogSection />
        <AboutContact />
      </main>
    </>
  );
}
