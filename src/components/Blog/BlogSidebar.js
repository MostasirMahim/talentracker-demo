"use client";

import React from "react";
import Link from "next/link";

const BlogSidebar = () => {
  return (
    <>
      <aside className="widget-area">
        <div className="widget widget_search">
          <form className="search-form">
            <label>
              <input
                type="search"
                className="search-field"
                placeholder="Search..."
              />
            </label>
            <button type="submit">
              <i className="ri-search-2-line"></i>
            </button>
          </form>
        </div>

        <div className="widget widget_enry_posts_thumb">
          <h3 className="widget-title">Popular Posts</h3>

          <article className="item">
            <Link href="/blog/details" className="thumb">
              <span
                className="fullimage cover"
                role="img"
                style={{
                  backgroundImage: `url(/images/blog/blog1.jpg)`,
                }}
              ></span>
            </Link>
            <div className="info">
              <h4 className="title usmall">
                <Link href="/blog/details">
                  Being The Best-Selling Smart Phone This Year
                </Link>
              </h4>
              <span className="date">
                <i className="ri-calendar-2-fill"></i> Jan 15, 2024
              </span>
            </div>
          </article>

          <article className="item">
            <Link href="/blog/details" className="thumb">
              <span
                className="fullimage cover"
                role="img"
                style={{
                  backgroundImage: `url(/images/blog/blog2.jpg)`,
                }}
              ></span>
            </Link>
            <div className="info">
              <h4 className="title usmall">
                <Link href="/blog/details">
                  Love Songs Helped Me Through Heartbreak
                </Link>
              </h4>
              <span className="date">
                <i className="ri-calendar-2-fill"></i> Jan 14, 2024
              </span>
            </div>
          </article>

          <article className="item">
            <Link href="/blog/details" className="thumb">
              <span
                className="fullimage cover"
                role="img"
                style={{
                  backgroundImage: `url(/images/blog/blog3.jpg)`,
                }}
              ></span>
            </Link>
            <div className="info">
              <h4 className="title usmall">
                <Link href="/blog/details">
                  Two Fashion Designers Busy With 2024 Winter Fashion
                </Link>
              </h4>
              <span className="date">
                <i className="ri-calendar-2-fill"></i> Jan 13, 2024
              </span>
            </div>
          </article>

          <article className="item">
            <Link href="/blog/details" className="thumb">
              <span
                className="fullimage cover"
                role="img"
                style={{
                  backgroundImage: `url(/images/blog/blog3.jpg)`,
                }}
              ></span>
            </Link>
            <div className="info">
              <h4 className="title usmall">
                <Link href="/blog/details">
                  Working in the Office is a Tradition For Women
                </Link>
              </h4>
              <span className="date">
                <i className="ri-calendar-2-fill"></i> Jan 12, 2024
              </span>
            </div>
          </article>
        </div>

        <div className="widget widget_categories">
          <h3 className="widget-title">Categories</h3>

          <ul>
            <li>
              <Link href="/blog">
                Business <span className="post-count">(2)</span>
              </Link>
            </li>
            <li>
              <Link href="/blog">
                Privacy <span className="post-count">(5)</span>
              </Link>
            </li>
            <li>
              <Link href="/blog">
                Technology <span className="post-count">(6)</span>
              </Link>
            </li>
            <li>
              <Link href="/blog">
                Tips <span className="post-count">(2)</span>
              </Link>
            </li>
            <li>
              <Link href="/blog">
                Uncategorized <span className="post-count">(1)</span>
              </Link>
            </li>
            <li>
              <Link href="/blog">
                Log in <span className="post-count">(1)</span>
              </Link>
            </li>
          </ul>
        </div>

        <div className="widget widget_newsletter">
          <h4>Subscribe To Our Newsletter</h4>
          <p>Subscribe to our newsletter to get the new updates!</p>

          <form className="newsletter-form">
            <input
              type="email"
              className="input-newsletter"
              placeholder="Enter your email"
              name="EMAIL"
              required
            />
            <button type="submit">Subscribe</button>
          </form>
        </div>

        <div className="widget widget_tag_cloud">
          <h3 className="widget-title">Tags</h3>

          <div className="tagcloud">
            <Link href="/blog">
              Advertisement <span className="tag-link-count"> (3)</span>
            </Link>
            <Link href="/blog">
              Business <span className="tag-link-count"> (3)</span>
            </Link>
            <Link href="/blog">
              Life <span className="tag-link-count"> (5)</span>
            </Link>
            <Link href="/blog">
              Lifestyle <span className="tag-link-count"> (2)</span>
            </Link>
            <Link href="/blog">
              Fashion <span className="tag-link-count"> (2)</span>
            </Link>
            <Link href="/blog">
              Inspiration <span className="tag-link-count"> (1)</span>
            </Link>
            <Link href="/blog">
              Blog <span className="tag-link-count"> (1)</span>
            </Link>
            <Link href="/blog">
              Ads <span className="tag-link-count"> (3)</span>
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
};

export default BlogSidebar;
