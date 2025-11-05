"use client";
  
import React from "react";
import Link from "next/link";

const ProjectSidebar = () => {
  return (
    <>
      <div className="widget-area">
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

        <div className="widget widget_service_categories">
          <h3 className="widget-title">Service Category</h3>

          <ul>
            <li>
              <Link href="/projects/details">
                Startup Advisory Solutions
                <i className="ri-arrow-right-s-line"></i>
              </Link>
            </li>
            <li>
              <Link href="/projects/details">
                Business Incorporation
                <i className="ri-arrow-right-s-line"></i>
              </Link>
            </li>
            <li>
              <Link href="/projects/details">
                Entrepreneur Consulting
                <i className="ri-arrow-right-s-line"></i>
              </Link>
            </li>
            <li>
              <Link href="/projects/details">
                Communication Services
                <i className="ri-arrow-right-s-line"></i>
              </Link>
            </li>
            <li>
              <Link href="/projects/details">
                Business Planning
                <i className="ri-arrow-right-s-line"></i>
              </Link>
            </li>
            <li>
              <Link href="/projects/details">
                Brand Development
                <i className="ri-arrow-right-s-line"></i>
              </Link>
            </li>
          </ul>
        </div>

        <div className="widget widget_tag_cloud">
          <h3 className="widget-title">Tags</h3>

          <div className="tagcloud">
            <Link href="#">
              Advertisement <span className="tag-link-count"> (3)</span>
            </Link>
            <Link href="#">
              Business <span className="tag-link-count"> (3)</span>
            </Link>
            <Link href="#">
              Life <span className="tag-link-count"> (5)</span>
            </Link>
            <Link href="#">
              Lifestyle <span className="tag-link-count"> (2)</span>
            </Link>
            <Link href="#">
              Fashion <span className="tag-link-count"> (2)</span>
            </Link>
            <Link href="#">
              Inspiration <span className="tag-link-count"> (1)</span>
            </Link>
            <Link href="#">
              Blog <span className="tag-link-count"> (1)</span>
            </Link>
            <Link href="#">
              Ads <span className="tag-link-count"> (3)</span>
            </Link>
          </div>
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
      </div>
    </>
  );
};

export default ProjectSidebar;
