import React from 'react';
import { motion } from 'framer-motion';
import { SITE_VERSION } from '../data/site';
import profilePhoto from '../images/profile.png';
import ContactForm from './ContactForm';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import './AboutContact.css';

export default function AboutContact() {
  const reduced = usePrefersReducedMotion();

  return (
    <section className="about-contact motion-section" id="contact">
      <div className="section-shell about-contact__about-block">
        <p className="section-eyebrow motion-fade">08 · About</p>
        <h2 className="section-title motion-fade">About me</h2>

        <div className="about-contact__hero-row">
          <motion.div
            className="about-contact__photo-wrap motion-fade"
            whileHover={reduced ? undefined : { scale: 1.03 }}
            transition={{ type: 'spring', stiffness: 320, damping: 22 }}
          >
            <img
              src={profilePhoto}
              alt="Faizan Safwan"
              className="about-contact__photo"
              width={160}
              height={160}
              loading="lazy"
            />
            <span className="about-contact__photo-ring" aria-hidden="true" />
          </motion.div>

          <div className="about-contact__bio motion-fade">
            <p>
              I like problems that are more complicated than they first look. Most of my work has been in SaaS
              products and document-heavy workflows — edge cases like messy résumés, inventory that will not
              reconcile, and assessment scores that need to be explainable.
            </p>
            <p>
              At X4 Digital Labs I ship CVeezi; before that, EvalzNow and travel/commerce builds at Metro
              Coding. I lean on TypeScript, NestJS, PostgreSQL, and practical LLM integration — with tests and
              CI so features survive real users.
            </p>
            <p>
            BSc Software Engineering (Hons), Open University of Sri Lanka (2021–2026). Product work on Unitel POS
            and Python tooling keeps me honest about the full stack outside client delivery.
            </p>
          </div>
        </div>
      </div>

      <div className="section-shell">
        <ContactForm />
      </div>

      <footer className="site-footer section-shell">
        <p>© 2026 Faizan Safwan · {SITE_VERSION}</p>
      </footer>
    </section>
  );
}
