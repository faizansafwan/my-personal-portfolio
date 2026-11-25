import React, { useState } from 'react';
import { ChevronDown, Clock } from 'lucide-react';
import { blogPosts } from '../data/blogs';
import './BlogSection.css';

export default function BlogSection() {
  const [openId, setOpenId] = useState(null);

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
            const bodyId = `post-${post.id}`;
            return (
              <li key={post.id} className="blog-card tile-card motion-fade">
                <article aria-labelledby={`${bodyId}-title`}>
                  <div className="blog-card__meta">
                    <span>{post.date}</span>
                    <span className="blog-card__dot" aria-hidden="true">
                      ·
                    </span>
                    <span className="blog-card__time">
                      <Clock size={12} aria-hidden="true" /> {post.readTime}
                    </span>
                  </div>
                  <h3 className="blog-card__title" id={`${bodyId}-title`}>
                    {post.title}
                  </h3>
                  <div className="blog-card__tags">
                    {post.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                  <p className="blog-card__excerpt">{post.excerpt}</p>
                  <button
                    type="button"
                    className={`blog-card__toggle${isOpen ? ' blog-card__toggle--open' : ''}`}
                    aria-expanded={isOpen}
                    aria-controls={bodyId}
                    onClick={() => setOpenId(isOpen ? null : post.id)}
                  >
                    {isOpen ? 'Close article' : 'Read article'}
                    <ChevronDown size={16} aria-hidden="true" />
                  </button>

                  <div id={bodyId} className={`blog-card__expand${isOpen ? ' blog-card__expand--open' : ''}`}>
                    <div className="blog-card__body">
                      {post.paragraphs.map((para) => (
                        <p key={para.slice(0, 40)}>{para}</p>
                      ))}
                    </div>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
