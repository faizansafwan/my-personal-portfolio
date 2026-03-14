import React, { useState } from "react";
import "./Experience.css";

const experiences = [
  {
    role: "Associate Full Stack Developer",
    company: "Metro Coding",
    type: "Remote",
    date: "2025 JULY – PRESENT",
    current: true,
    subprojects: [
      {
        name: "EvalzNow — SaaS Human Capital Assessment Platform",
        stack: "Next.js · Node.js · MySQL · Tailwind · Recharts · JIRA",
        bullets: [
          "Built a scalable, competency-based SaaS analytics platform for behavioral and mental assessments, enabling institutions to analyze 90% of candidate talent proficiency.",
          "Designed interactive real-time analytics dashboards using Recharts for assessment scores, growth trends, and competency performance.",
          "Implemented multi-level RBAC supporting admin, client, and staff roles — enhancing data security and reducing unauthorized access.",
        ],
      },
      {
        name: "MK Design — Online E-Commerce Clothing Platform",
        stack: "Next.js · Node.js · MongoDB · Material UI · GraphQL · Redux",
        bullets: [
          "Resolved critical UI defects and frontend–backend integration issues, improving platform stability by over 95%.",
          "Enhanced responsive design and cross-device compatibility for a consistent shopping experience across all devices.",
          "Improved user confidence by delivering smoother navigation, easier access, and a more reliable purchasing flow.",
        ],
      },
    ],
  },
  {
    role: "Intern Full Stack Engineer",
    company: "SKYREK (PVT) Ltd",
    type: "",
    date: "JUN 2024 – JAN 2025",
    current: false,
    tags: ["HTML", "CSS", "JavaScript", "React", "Node.js", "Express", "MongoDB", "Redux", "Firebase", "Tailwind CSS"],
    subprojects: [
      {
        name: "Online E-Commerce Platform",
        stack: "React · Node · Express.js · MongoDB · Redux · Tailwind · Firebase",
        bullets: [
          "Designed and implemented clean, maintainable backend services for admin product, stock, and rating management with scalable API architecture.",
          "Collaborated with business analysts to translate requirements into accurate technical implementations aligned with functional expectations.",
          "Managed Git workflows — feature branches, daily commits, and resolving merge conflicts for smooth team collaboration.",
        ],
      },
    ],
  },
];

export default function Experience() {
  const [expandedIndexes, setExpandedIndexes] = useState({});

  const toggle = (i) => {
    setExpandedIndexes((prev) => ({ ...prev, [i]: !prev[i] }));
  };

  return (
    <section className="exp-section">
      <div className="exp-bg-word">XP</div>

      <div className="exp-header">
        <span className="exp-label">CAREER JOURNEY</span>
        <h2 className="exp-title">Work Experience</h2>
      </div>

      <div className="timeline">
        {experiences.map((exp, i) => (
          <div className="tl-entry" key={i}>
            <div className={`tl-dot ${exp.current ? "filled" : ""}`} />

            <div className="exp-card">
              <div className="exp-card-top">
                <div>
                  <div className="exp-role">{exp.role}</div>
                  <div className="exp-company">
                    <strong>{exp.company}</strong>
                    {exp.type && ` · ${exp.type}`}
                  </div>
                </div>
                <span className="exp-date">{exp.date}</span>
              </div>

              {/* Collapsible toggle */}
              {exp.collapsible && (
                <button className="exp-toggle" onClick={() => toggle(i)}>
                  {expandedIndexes[i] ? "HIDE PROJECTS" : "VIEW PROJECTS"}
                  <span className={`exp-arrow ${expandedIndexes[i] ? "open" : ""}`}>▾</span>
                </button>
              )}

              {/* Subprojects */}
              <div
                className={`exp-expandable ${
                  !exp.collapsible || expandedIndexes[i] ? "open" : ""
                }`}
              >
                {exp.subprojects.map((sp, j) => (
                  <div className="subproject" key={j}>
                    <div className="sp-name">{sp.name}</div>
                    <div className="sp-stack">{sp.stack}</div>
                    <ul className="sp-bullets">
                      {sp.bullets.map((b, k) => (
                        <li key={k}>{b}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Tags */}
              {exp.tags && (
                <div className="exp-tags">
                  {exp.tags.map((tag, t) => (
                    <span className="exp-tag" key={t}>{tag}</span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}