import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Clock } from 'lucide-react';
import { blogPosts } from '../data/blogs';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import './BlogSection.css';

export default function BlogSection() {
  const [openId, setOpenId] = useState(null);
  const reduced = usePrefersReducedMotion();

  return (
    <section className="blog-section motion-section" id="blog">
      <div className="section-shell">
        <p className="section-eyebrow motion-fade">06 · Writing</p>
        <h2 className="section-title motion-fade">Technical blog</h2>
        <p className="blog-section__intro motion-fade">
          Notes on shipping LLM and SaaS features in production — structured data, access control, and advisory AI.
        </p>

        <ul className="blog-section__list">
          {blogPosts.map((post) => {
            const isOpen = openId === post.id;
            return (
              <li key={post.id} className="blog-card tile-card motion-fade">
                <div className="blog-card__meta">
                  <span>{post.date}</span>
                  <span className="blog-card__dot" aria-hidden="true">
                    ·
                  </span>
                  <span className="blog-card__time">
                    <Clock size={12} aria-hidden="true" /> {post.readTime}
                  </span>
                </div>
                <h3 className="blog-card__title">{post.title}</h3>
                <div className="blog-card__tags">
                  {post.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
                <p className="blog-card__excerpt">{post.excerpt}</p>
                <button
                  type="button"
                  className="blog-card__toggle"
                  aria-expanded={isOpen}
                  onClick={() => setOpenId(isOpen ? null : post.id)}
                >
                  {isOpen ? 'Close article' : 'Read on site'}
                  <ArrowUpRight size={16} aria-hidden="true" />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      className="blog-card__body"
                      initial={reduced ? false : { opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={reduced ? undefined : { opacity: 0, y: 8 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    >
                      {post.paragraphs.map((para) => (
                        <p key={para.slice(0, 40)}>{para}</p>
                      ))}
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
