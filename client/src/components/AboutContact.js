import React from 'react';
import { ArrowUp } from 'lucide-react';
import { LINKS, SITE_VERSION } from '../data/site';
import profilePhoto from '../images/profile.webp';
import ContactForm from './ContactForm';
import './AboutContact.css';

export default function AboutContact() {
  const year = new Date().getFullYear();

  return (
    <section className="about-contact motion-section" id="contact">
      <div className="section-shell about-contact__about-block">
        <p className="section-eyebrow motion-fade">07 · About</p>
        <h2 className="section-title motion-fade">About me</h2>

        <div className="about-contact__hero-row">
          <div className="about-contact__photo-wrap motion-fade">
            <img
              src={profilePhoto}
              alt="Portrait of Faizan Safwan"
              className="about-contact__photo"
              width={160}
              height={160}
              loading="lazy"
              decoding="async"
            />
            <span className="about-contact__photo-ring" aria-hidden="true" />
          </div>

          <div className="about-contact__bio motion-fade">
            <p>
              I like problems that are more complicated than they first look. Most of my work has been in SaaS
              products and document-heavy workflows — edge cases like messy résumés, inventory that will not
              reconcile, and assessment scores that need to be explainable.
            </p>
            <p>
              At X4 Digital Labs I ship CVeezi; before that, EvalzNow and travel/commerce builds at Metro Coding,
              and an internship at SKYREK. I lean on TypeScript, NestJS, PostgreSQL, and practical LLM integration —
              with tests and CI so features survive real users.
            </p>
            <p>
              I also co-founded Aqra Labs, where we build Aqra POS for Sri Lankan shops — so I know what owning a
              product after launch really means, not just shipping features. BSc Software
              Engineering (Hons), The Open University of Sri Lanka (2021–2026).
            </p>
          </div>
        </div>
      </div>

      <div className="section-shell">
        <ContactForm />
      </div>

      <footer className="site-footer section-shell">
        <p>
          © {year} Faizan Safwan · Built with React &amp; Vite · {SITE_VERSION}
        </p>
        <nav className="site-footer__links" aria-label="Footer">
          <a href={LINKS.github} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          <a href={LINKS.aqraLabs} target="_blank" rel="noopener noreferrer">
            Aqra Labs
          </a>
          <a href="#hero" className="site-footer__top">
            Back to top <ArrowUp size={14} aria-hidden="true" />
          </a>
        </nav>
      </footer>
    </section>
  );
}
