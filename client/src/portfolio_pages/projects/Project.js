import React, { useState, useRef, useEffect } from "react";
import './Project.css';
import tripAt from '../../images/Trip-at.png';
import tripAtMobile from '../../images/trip-at-mobile.png';
import retailSystem from '../../images/retail-system.png';
import studentPortal from '../../images/student-portal.png';
import holiStay from '../../images/holi-stay.png';

export default function Project() {
  const [activeIndex, setActiveIndex] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const sectionRef = useRef(null);

  const projectList = [
    {
      pName: 'Shakkya Holidays',
      subtitle: 'Travel Booking Platform',
      src: tripAtMobile,
      alt: 'Shakkya Holidays Travel Booking Application',
      link: 'https://shakkyaholidays.com/dashboard/home',
      tag: 'HTML · CSS · JavaScript · Next.js',
      year: '2026',
      desc: `Explore curated destination guides across Thailand, Vietnam, Malaysia, and Sri Lanka — then browse and book tour packages directly through a clean, intuitive interface.`,
      index: '01',
    },
    {
      pName: 'HoliStay',
      subtitle: 'Hotel Portfolio Website',
      src: holiStay,
      alt: 'HoliStay Hotel Portfolio',
      link: 'https://holistay.vercel.app/',
      tag: 'React · CSS · Vercel',
      year: '2026',
      desc: `A fully responsive, animated showcase website for a luxury resort — highlighting services, cultural experiences, and rooms with smooth UI transitions and mobile-first design.`,
      index: '02',
    },
    {
        pName: 'Business Management',
        subtitle: 'Full-Stack ERP Solution',
        src: retailSystem,
        alt: 'Retail Management System',
        link: 'https://github.com/faizansafwan/backend-retail-management',
        tag: '.NET · MSSQL · React · TypeScript · OpenAI API',
        year: '2025',
        desc: `End-to-end ERP covering billing, invoicing, inventory, purchases, orders, and customer management — with an OpenAI-powered pricing engine that recommends optimal prices based on demand and sales patterns.`,
        index: '03',
    },
    {
      pName: 'Trip At',
      subtitle: 'Travel Content Sharing Platform',
      src: tripAt,
      alt: 'Trip-At Web for travel content sharing',
      link: 'https://trip-at-one.vercel.app/',
      tag: 'MERN · Firebase · Tailwind',
      year: '2024',
      desc: `A community-driven travel platform where users share trip stories, upload photos, and collaboratively plan budgets — powered by real-time Firebase auth and a Redux-managed responsive UI.`,
      index: '04',
    },
    {
      pName: 'Student Portal',
      subtitle: 'Career Opportunity Finder',
      src: studentPortal,
      alt: 'Student Portal',
      link: 'https://github.com/AmnaAroos2000/Student_Portal',
      tag: 'PHP · MySQL · jQuery',
      year: '2023',
      desc: `Helps Sri Lankan A/L students discover eligible government universities and colleges based on their results — filtering institutions by stream, subject combination, and cutoff scores.`,
      index: '05',
    },
  ];

  const handleMouseMove = (e) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <section className="projects-section" ref={sectionRef} onMouseMove={handleMouseMove}>
      {/* Cursor blob */}
      <div
        className="cursor-blob"
        style={{ left: mousePos.x, top: mousePos.y }}
      />

      {/* Header */}
      <div className="projects-header">
        <span className="projects-label">SELECTED WORK</span>
        <h2 className="projects-title">Projects</h2>
      </div>

      {/* Project List */}
      <ul className="project-list">
        {projectList.map((project, i) => (
          <li
            key={i}
            className={`project-row ${activeIndex === i ? 'active' : ''} ${activeIndex !== null && activeIndex !== i ? 'dimmed' : ''}`}
            onMouseEnter={() => setActiveIndex(i)}
            onMouseLeave={() => setActiveIndex(null)}
          >
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="project-row-inner"
            >
              {/* Left: index + title */}
              <div className="project-row-left">
                <span className="project-num">{project.index}</span>
                <div className="project-name-group">
                  <span className="project-name">{project.pName}</span>
                  <span className="project-subtitle">{project.subtitle}</span>
                </div>
              </div>

              {/* Center: description (reveals on hover) */}
              <p className="project-desc">{project.desc}</p>

              {/* Right: tag + year + arrow */}
              <div className="project-row-right">
                <span className="project-tag">{project.tag}</span>
                <span className="project-year">{project.year}</span>
                <span className="project-arrow">↗</span>
              </div>
            </a>

            {/* Hover image */}
            {/* <div className="project-hover-image">
              <img src={project.src} alt={project.alt} />
            </div> */}
          </li>
        ))}
      </ul>

      {/* Footer line */}
      <div className="projects-footer">
        <span>5 projects · Full-Stack Development</span>
        <a
          href="https://github.com/faizansafwan"
          target="_blank"
          rel="noopener noreferrer"
          className="github-link"
        >
          View all on GitHub ↗
        </a>
      </div>
    </section>
  );
}