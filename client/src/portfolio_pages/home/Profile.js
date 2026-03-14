import React, { useRef, useEffect } from 'react';
import Nav from '../navbar/Nav';
import Typed from 'typed.js';
import About from '../about/About';
import Skill from '../skills/Skill';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Project from '../projects/Project';
import Blog from '../blog/Blog';
import Contact from '../contact/Contact';
import Footer from '../footer/Footer';
import Experience from '../workExperience/Experience';
import './Profile.css';
import '../../index.css';

export default function Profile() {
    const autoType = useRef(null);

    useEffect(() => {
        const typed = new Typed(autoType.current, {
            strings: ['Faizan'],
            typeSpeed: 120,
            backSpeed: 80,
            loop: false,
        });
        return () => typed.destroy();
    }, []);

    useEffect(() => {
        AOS.init({ duration: 2000 });
    }, []);

    return (
        <div className="profile-container container-fluid">
            <Nav />

            {/* ── Hero / Home ── */}
            <section className="hero-section" id="home">
                <div className="hero-blob hero-blob--top" />
                <div className="hero-blob hero-blob--bottom" />
                <div className="hero-deco">FS</div>

                <div className="hero-inner">
                    <div className="hero-eyebrow">
                        FULL STACK DEVELOPER · SRI LANKA
                    </div>

                    <h1 className="hero-name">
                        Hi, I'm<br />
                        <span className="hero-name-accent" ref={autoType} />
                    </h1>

                    <p className="hero-role">
                        ASSOCIATE SOFTWARE ENGINEER · OPEN TO OPPORTUNITIES
                    </p>

                    <p className="hero-desc">
                        Building <strong>scalable, production-grade</strong> web applications
                        across SaaS, e-commerce, and enterprise — from pixel-perfect UIs
                        to robust backend APIs.
                    </p>

                    <div className="hero-cta">
                        <a href="#project" className="hero-btn-primary">
                            VIEW MY WORK ↗
                        </a>
                        <a href="#contact" className="hero-btn-secondary">
                            GET IN TOUCH
                        </a>
                    </div>

                    <div className="hero-stats">
                        <div className="hero-stat">
                            <span className="hero-stat-num">2+</span>
                            <span className="hero-stat-label">YEARS EXP</span>
                        </div>
                        <div className="hero-stat-div" />
                        <div className="hero-stat">
                            <span className="hero-stat-num">5+</span>
                            <span className="hero-stat-label">PROJECTS</span>
                        </div>
                        <div className="hero-stat-div" />
                        <div className="hero-stat">
                            <span className="hero-stat-num">10+</span>
                            <span className="hero-stat-label">TECHNOLOGIES</span>
                        </div>
                    </div>

                    <div className="hero-socials">
                        <a className="hero-soc" href="https://github.com/faizansafwan"
                            target="_blank" rel="noopener noreferrer" aria-label="GitHub">gh</a>
                        <a className="hero-soc" href="https://www.linkedin.com/in/faizansafwan-20000/"
                            target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">in</a>
                        <a className="hero-soc" href="https://www.instagram.com/faizan_safwan/"
                            target="_blank" rel="noopener noreferrer" aria-label="Instagram">ig</a>
                        <a className="hero-soc" href="https://facebook.com/mohammed.faizan.374549"
                            target="_blank" rel="noopener noreferrer" aria-label="Facebook">fb</a>
                    </div>
                </div>

                <div className="hero-scroll">
                    <div className="hero-scroll-line" />
                    <span>SCROLL</span>
                </div>
            </section>

            {/* About */}
            <div className="about-layout position-relative" data-aos="fade-right" id="about">
                <About />
            </div>

            {/* Experience */}
            <div className="experience-layout" id="experience">
                <Experience />
            </div>

            {/* Projects */}
            <div className="project-layout" data-aos="zoom-out" id="project">
                <Project />
            </div>

            {/* Skills */}
            <div className="skill-layout" data-aos="fade-up" id="skill">
                <Skill />
            </div>

            {/* Blog */}
            <div className="blog-layout" id="blog">
                <Blog />
            </div>

            {/* Contact */}
            <div className="contact-layout" id="contact">
                <Contact />
            </div>

            {/* Footer */}
            <div className="footer-layout" id="footer">
                <Footer />
            </div>
        </div>
    );
}