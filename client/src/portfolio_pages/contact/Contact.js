import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMobileAlt, faMapMarkerAlt, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faLinkedin, faFacebook, faGithub, faInstagram } from "@fortawesome/free-brands-svg-icons";
import "./Contact.css";

const contactInfo = [
  { icon: faMobileAlt,    label: "PHONE",    value: "+94 75 933 9796" },
  { icon: faMapMarkerAlt, label: "LOCATION", value: "Kegalle, Sri Lanka" },
  { icon: faEnvelope,     label: "EMAIL",    value: "fai.saf010@gmail.com" },
];

const socials = [
  { icon: faLinkedin,  href: "https://www.linkedin.com/in/faizansafwan-20000/",  label: "LinkedIn" },
  { icon: faGithub,    href: "https://github.com/faizansafwan",                  label: "GitHub" },
  { icon: faFacebook,  href: "https://facebook.com/mohammed.faizan.374549",      label: "Facebook" },
  { icon: faInstagram, href: "https://www.instagram.com/faizan_safwan/",         label: "Instagram" },
];

export default function Contact() {
  return (
    <section className="ct-section">
      <div className="ct-blob ct-blob--purple" />
      <div className="ct-blob ct-blob--amber" />

      <div className="ct-inner">
        <span className="ct-eyebrow">CONTACT</span>
        <h2 className="ct-title">
          Get In <span>Touch</span>
        </h2>

        <div className="ct-grid">

          {/* Left: Form */}
          <form className="ct-form" onSubmit={(e) => e.preventDefault()}>
            <div className="ct-row">
              <div className="ct-field">
                <label>FIRST NAME</label>
                <input type="text" placeholder="Faizan" />
              </div>
              <div className="ct-field">
                <label>LAST NAME</label>
                <input type="text" placeholder="Safwan" />
              </div>
            </div>

            <div className="ct-field">
              <label>EMAIL ADDRESS</label>
              <input type="email" placeholder="hello@example.com" />
            </div>

            <div className="ct-field">
              <label>SUBJECT</label>
              <input type="text" placeholder="Project opportunity, collaboration..." />
            </div>

            <div className="ct-field">
              <label>MESSAGE</label>
              <textarea placeholder="Tell me about your project or idea..." rows={5} />
            </div>

            <div className="ct-submit-row">
              <button className="ct-btn" type="submit">
                Send Message &nbsp;↗
              </button>
              <span className="ct-hint">Usually replies within 24h</span>
            </div>
          </form>

          {/* Right: Info */}
          <div className="ct-right">

            {/* Availability */}
            <div className="ct-avail">
              <span className="ct-dot" />
              <div className="ct-avail-text">
                <strong>Open to opportunities</strong>
                <br />
                Available for freelance &amp; full-time roles
              </div>
            </div>

            {/* Info cards */}
            <div className="ct-info-group">
              {contactInfo.map(({ icon, label, value }) => (
                <div className="ct-info-card" key={label}>
                  <div className="ct-info-icon">
                    <FontAwesomeIcon icon={icon} />
                  </div>
                  <div className="ct-info-text">
                    <span className="ct-info-label">{label}</span>
                    <span className="ct-info-val">{value}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="ct-divider" />

            {/* Socials */}
            <div>
              <p className="ct-social-label">FIND ME ON</p>
              <div className="ct-socials">
                {socials.map(({ icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    className="ct-soc"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                  >
                    <FontAwesomeIcon icon={icon} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}