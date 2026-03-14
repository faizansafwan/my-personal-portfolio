import React, { useState, useEffect } from "react";
import "./Nav.css";

export default function Nav() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const links = [
        { label: "Home",            href: "#home" },
        { label: "About",           href: "#about" },
        { label: "Experience",      href: "#experience" },
        { label: "Projects",        href: "#project" },
        { label: "Skills",          href: "#skill" },
        { label: "Blog",            href: "#blog" },
        { label: "Contact",         href: "#contact" },
    ];

    return (
        <header className={`nav-header ${scrolled ? "nav-header--scrolled" : ""}`}>
            <div className="nav-inner">
                {/* Logo */}
                <a className="nav-logo" href="#home">
                    FS<span className="nav-logo-dot">.</span>
                </a>

                {/* Desktop links */}
                <nav className="nav-links">
                    {links.map(({ label, href }) => (
                        <a key={href} className="nav-link" href={href}>
                            {label}
                        </a>
                    ))}
                </nav>

                {/* CTA */}
                <a href="#contact" className="nav-cta">
                    Hire Me ↗
                </a>

                {/* Hamburger */}
                <button
                    className={`nav-hamburger ${menuOpen ? "open" : ""}`}
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle menu"
                >
                    <span /><span /><span />
                </button>
            </div>

            {/* Mobile drawer */}
            <div className={`nav-drawer ${menuOpen ? "nav-drawer--open" : ""}`}>
                {links.map(({ label, href }) => (
                    <a
                        key={href}
                        className="nav-drawer-link"
                        href={href}
                        onClick={() => setMenuOpen(false)}
                    >
                        {label}
                    </a>
                ))}
                <a href="#contact" className="nav-drawer-cta" onClick={() => setMenuOpen(false)}>
                    Hire Me ↗
                </a>
            </div>
        </header>
    );
}