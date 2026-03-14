import React, { useRef } from 'react';
import profile from '../../images/profile.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faLocationDot, faGraduationCap } from '@fortawesome/free-solid-svg-icons';
import { motion, useInView } from 'framer-motion';
import './About.css';

const traits = [
    { name: 'Team Collaboration', sub: 'Effective communication and cooperative work ethic' },
    { name: 'Technical Skills',   sub: 'Strong programming foundation in web technologies' },
    { name: 'Problem Solving',    sub: 'Analytical approach to efficient solutions' },
    { name: 'Fast Learning',      sub: 'Quickly adapts to new tech & methodologies' },
];

const contactInfo = [
    { icon: faEnvelope,      label: 'EMAIL',     value: 'fai.saf010@gmail.com' },
    { icon: faLocationDot,   label: 'LOCATION',  value: 'Kegalle, Sri Lanka' },
    { icon: faGraduationCap, label: 'EDUCATION', value: 'BSc Software Engineering' },
];

export default function About() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: false, amount: 0.15 });

    return (
        <motion.section
            className="about-section"
            ref={ref}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
        >
            <div className="about-blob" />

            <div className="about-inner">
                {/* Header */}
                <span className="about-eyebrow">WHO I AM</span>
                <h2 className="about-title">About Me</h2>

                <div className="about-grid">

                    {/* ── Left: avatar + contact ── */}
                    <div className="about-left">
                        <div className="about-avatar">
                            {/* Show profile image if available, fallback to initials */}
                            <img
                                src={profile}
                                alt="Faizan Safwan"
                                className="about-avatar-img"
                                onError={e => { e.target.style.display = 'none'; }}
                            />
                            <span className="about-avatar-initials">FS</span>
                        </div>

                        <div className="about-contact-card">
                            {contactInfo.map(({ icon, label, value }) => (
                                <div className="about-contact-row" key={label}>
                                    <div className="about-contact-icon">
                                        <FontAwesomeIcon icon={icon} />
                                    </div>
                                    <div className="about-contact-text">
                                        <span className="about-contact-label">{label}</span>
                                        <span className="about-contact-val">{value}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* ── Right: bio + traits + stats ── */}
                    <div className="about-right">
                        <div className="about-bio-card">
                            <div className="about-name">Faizan Safwan</div>
                            <span className="about-role-tag">
                                ASSOCIATE SOFTWARE ENGINEER · FULL STACK DEVELOPER
                            </span>
                            <p className="about-bio">
                                A developer with hands-on experience building scalable, user-friendly and
                                production-grade web applications. Proven ability to deliver high-performance
                                solutions across SaaS, e-commerce, and enterprise platforms — experienced in
                                RESTful APIs, GraphQL, data visualization, and Microservices architecture.
                            </p>

                            <div className="about-divider" />

                            <div className="about-traits">
                                {traits.map(({ name, sub }) => (
                                    <div className="about-trait" key={name}>
                                        <div className="about-trait-dot" />
                                        <div className="about-trait-text">
                                            <span className="about-trait-name">{name}</span>
                                            <span className="about-trait-sub">{sub}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="about-stats">
                            <div className="about-stat">
                                <span className="about-stat-num">2+</span>
                                <span className="about-stat-label">YEARS EXP</span>
                            </div>
                            <div className="about-stat">
                                <span className="about-stat-num">5+</span>
                                <span className="about-stat-label">PROJECTS</span>
                            </div>
                            <div className="about-stat">
                                <span className="about-stat-num">10+</span>
                                <span className="about-stat-label">TECHNOLOGIES</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </motion.section>
    );
}