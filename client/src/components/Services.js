import React from 'react';
import { ExternalLink } from 'lucide-react';
import {
  services,
  servicesIntro,
  partnershipBlock,
  flagshipProducts,
} from '../data/services';
import { LINKS } from '../data/site';
import './Services.css';

export default function Services() {
  return (
    <section className="services motion-section" id="services">
      <div className="section-shell">
        <p className="section-eyebrow motion-fade">02 · Services &amp; products</p>
        <h2 className="section-title motion-fade">Build with me — solo or with Aqra Labs</h2>
        <p className="services__intro motion-fade">{servicesIntro}</p>

        <article className="services__partner tile-card motion-fade">
          <div className="services__partner-head">
            <h3 className="services__partner-title">{partnershipBlock.title}</h3>
            <a
              href={LINKS.aqraLabs}
              target="_blank"
              rel="noopener noreferrer"
              className="services__partner-link"
            >
              aqralabs.com <ExternalLink size={14} aria-hidden="true" />
            </a>
          </div>
          <p className="services__partner-body">
            I work efficiently with{' '}
            <a href={LINKS.aqraLabs} target="_blank" rel="noopener noreferrer">
              Aqra Labs
            </a>
            — a Sri Lanka–based software company delivering web systems, custom software, and mobile
            apps for retail, healthcare, education, logistics, finance, and more. Engagements are
            senior-led, scope is agreed up front, and you keep{' '}
            <strong>full ownership of code and IP</strong>. I remain your technical point of contact
            while we bring engineering, product, and go-to-market support together.
          </p>
          <ul className="services__partner-highlights">
            {partnershipBlock.highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>

        <div className="services__products motion-fade">
          <p className="services__products-label">Flagship product</p>
          {flagshipProducts.map(({ id, icon: Icon, name, tagline, description, link, linkLabel }) => (
              <article key={id} className="services__product tile-card">
                <div className="services__card-head">
                  <Icon size={22} strokeWidth={1.75} aria-hidden="true" />
                </div>
                <h3 className="services__card-title">{name}</h3>
                <p className="services__product-tagline">{tagline}</p>
                <p className="services__card-desc">{description}</p>
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="services__product-live"
                >
                  {linkLabel} ↗
                </a>
              </article>
            )
          )}
        </div>

        <p className="services__catalog-label motion-fade">Service catalog</p>
        <div className="services__grid">
          {services.map(({ id, icon: Icon, delivery, title, description, deliverables }) => (
            <article key={id} className="tile-card services__card motion-fade">
              <div className="services__card-head">
                <Icon size={20} strokeWidth={1.75} aria-hidden="true" />
                <span className="services__delivery">{delivery}</span>
              </div>
              <h3 className="services__card-title">{title}</h3>
              <p className="services__card-desc">{description}</p>
              <ul className="services__list">
                {deliverables.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <p className="services__cta motion-fade">
          <a href="#contact">Tell me about your project — I&apos;ll route solo or Aqra Labs delivery →</a>
        </p>
      </div>
    </section>
  );
}
