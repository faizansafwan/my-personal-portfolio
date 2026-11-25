import React, { useState } from 'react';
import { Github, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import { LINKS, OPEN_TO_ROLES } from '../data/site';
import './ContactForm.css';

const socials = [
  { href: LINKS.linkedin, label: 'LinkedIn', icon: Linkedin },
  { href: LINKS.github, label: 'GitHub', icon: Github },
];

function buildMailto(form) {
  const first = form.firstName.value.trim();
  const last = form.lastName.value.trim();
  const email = form.email.value.trim();
  const subject = form.subject.value.trim() || 'Portfolio inquiry';
  const message = form.message.value.trim();
  const body = `From: ${first} ${last} (${email})\n\n${message}`;
  return `mailto:fai.saf010@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export default function ContactForm() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.email.value.trim() || !form.message.value.trim()) return;
    window.location.href = buildMailto(form);
    setSent(true);
    window.setTimeout(() => setSent(false), 4000);
  };

  return (
    <div className="contact-block" id="contact-form">
      <div className="contact-block__head">
        <p className="section-eyebrow">Get in touch</p>
        <h2 className="section-title contact-block__title">
          Send a <span className="text-accent">message</span>
        </h2>
      </div>

      <div className="contact-block__grid">
        <form className="contact-form tile-card" onSubmit={handleSubmit}>
          <div className="contact-form__row">
            <div className="contact-form__field">
              <label htmlFor="firstName">First name</label>
              <input id="firstName" name="firstName" type="text" autoComplete="given-name" placeholder="Jane" />
            </div>
            <div className="contact-form__field">
              <label htmlFor="lastName">Last name</label>
              <input id="lastName" name="lastName" type="text" autoComplete="family-name" placeholder="Doe" />
            </div>
          </div>

          <div className="contact-form__field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="you@company.com"
            />
          </div>

          <div className="contact-form__field">
            <label htmlFor="subject">Subject</label>
            <input
              id="subject"
              name="subject"
              type="text"
              placeholder="Project opportunity, collaboration…"
            />
          </div>

          <div className="contact-form__field">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              placeholder="Tell me about your project or role…"
            />
          </div>

          <div className="contact-form__actions">
            <button type="submit" className="btn-primary contact-form__submit">
              {sent ? 'Opening your email app…' : 'Send message →'}
            </button>
            <span className="contact-form__hint">Usually replies within a day</span>
          </div>
        </form>

        <aside className="contact-aside">
          <div className="contact-aside__avail tile-card">
            <span className="contact-aside__pulse" aria-hidden="true" />
            <div>
              <strong>{OPEN_TO_ROLES ? 'Open to opportunities' : 'Heads-down, but say hi'}</strong>
              <p>Full-time, contract, and select freelance projects.</p>
            </div>
          </div>

          <ul className="contact-aside__info">
            <li className="tile-card contact-aside__info-card">
              <Mail size={18} aria-hidden="true" />
              <div>
                <span className="contact-aside__label">Email</span>
                <a href={LINKS.email}>fai.saf010@gmail.com</a>
              </div>
            </li>
            <li className="tile-card contact-aside__info-card">
              <Phone size={18} aria-hidden="true" />
              <div>
                <span className="contact-aside__label">Phone</span>
                <a href="tel:+94759339796">+94 75 933 9796</a>
              </div>
            </li>
            <li className="tile-card contact-aside__info-card">
              <MapPin size={18} aria-hidden="true" />
              <div>
                <span className="contact-aside__label">Location</span>
                <span>Mawanella, Sri Lanka</span>
              </div>
            </li>
          </ul>

          <div className="contact-aside__socials">
            <span className="contact-aside__label">Find me on</span>
            <div className="contact-aside__social-row">
              {socials.map(({ href, label, icon: Icon }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <a href={LINKS.resume} download="Faizan_Safwan_Resume.pdf" className="contact-aside__resume btn-ghost">
            Download résumé ↓
          </a>
        </aside>
      </div>
    </div>
  );
}
