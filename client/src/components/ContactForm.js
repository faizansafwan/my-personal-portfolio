import React, { useState } from 'react';
import { Check, Copy, Github, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import { EMAIL, LINKS, LOCATION, OPEN_TO_ROLES, PHONE } from '../data/site';
import './ContactForm.css';

const socials = [
  { href: LINKS.linkedin, label: 'LinkedIn', icon: Linkedin },
  { href: LINKS.github, label: 'GitHub', icon: Github },
];

function buildMessage(form) {
  const name = `${form.firstName.value.trim()} ${form.lastName.value.trim()}`.trim();
  const email = form.email.value.trim();
  const subject = form.subject.value.trim() || 'Portfolio inquiry';
  const message = form.message.value.trim();
  const body = `From: ${name || 'Portfolio visitor'} (${email})\n\n${message}`;
  return { subject, body };
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

export default function ContactForm() {
  const [status, setStatus] = useState('idle'); // idle | opened
  const [draft, setDraft] = useState(null);
  const [copied, setCopied] = useState(null); // 'email' | 'message' | null

  const flashCopied = (what) => {
    setCopied(what);
    window.setTimeout(() => setCopied(null), 2200);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    const msg = buildMessage(form);
    setDraft(msg);
    setStatus('opened');
    window.location.href = `${LINKS.email}?subject=${encodeURIComponent(msg.subject)}&body=${encodeURIComponent(
      msg.body
    )}`;
  };

  const copyEmail = async () => {
    if (await copyText(EMAIL)) flashCopied('email');
  };

  const copyMessage = async () => {
    if (draft && (await copyText(`Subject: ${draft.subject}\n\n${draft.body}`))) flashCopied('message');
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
        <form className="contact-form tile-card" onSubmit={handleSubmit} noValidate>
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
            <label htmlFor="email">
              Email <span aria-hidden="true">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              inputMode="email"
              placeholder="you@company.com"
            />
          </div>

          <div className="contact-form__field">
            <label htmlFor="subject">Subject</label>
            <input id="subject" name="subject" type="text" placeholder="Project opportunity, collaboration…" />
          </div>

          <div className="contact-form__field">
            <label htmlFor="message">
              Message <span aria-hidden="true">*</span>
            </label>
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
              Send message →
            </button>
            <span className="contact-form__hint">Opens your email app · usually replies within a day</span>
          </div>

          <div className="contact-form__status" role="status">
            {status === 'opened' ? (
              <div className="contact-form__fallback">
                <p>
                  <strong>Your email app should open with the message ready.</strong> Nothing happened? Copy it and
                  send it from any mail service to <span className="contact-form__address">{EMAIL}</span>.
                </p>
                <div className="contact-form__fallback-actions">
                  <button type="button" className="btn-ghost" onClick={copyMessage}>
                    {copied === 'message' ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}
                    {copied === 'message' ? 'Message copied' : 'Copy message'}
                  </button>
                  <button type="button" className="btn-ghost" onClick={copyEmail}>
                    {copied === 'email' ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}
                    {copied === 'email' ? 'Address copied' : 'Copy address'}
                  </button>
                </div>
              </div>
            ) : null}
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
              <div className="contact-aside__info-text">
                <span className="contact-aside__label">Email</span>
                <a href={LINKS.email}>{EMAIL}</a>
              </div>
              <button
                type="button"
                className="contact-aside__copy"
                onClick={copyEmail}
                aria-label={copied === 'email' ? 'Email address copied' : 'Copy email address'}
              >
                {copied === 'email' ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}
              </button>
            </li>
            <li className="tile-card contact-aside__info-card">
              <Phone size={18} aria-hidden="true" />
              <div className="contact-aside__info-text">
                <span className="contact-aside__label">Phone</span>
                <a href={PHONE.href}>{PHONE.label}</a>
              </div>
            </li>
            <li className="tile-card contact-aside__info-card">
              <MapPin size={18} aria-hidden="true" />
              <div className="contact-aside__info-text">
                <span className="contact-aside__label">Location</span>
                <span>{LOCATION}</span>
              </div>
            </li>
          </ul>

          <div className="contact-aside__socials">
            <span className="contact-aside__label">Find me on</span>
            <div className="contact-aside__social-row">
              {socials.map(({ href, label, icon: Icon }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
                  <Icon size={18} aria-hidden="true" />
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
