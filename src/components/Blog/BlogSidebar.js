"use client";

import React from "react";
import Link from "next/link";

const BlogSidebar = ({ category, tags }) => {
  console.log("category", category);
  console.log("tags", tags);

  return (
    <aside className="widget-area">
      {/* Search Widget */}
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

      {/* Categories Widget */}
      <div className="widget widget_categories">
        <h3 className="widget-title">Category</h3>
        <ul>
         <li className="fw-bold"> 
          {category}
          </li>
        </ul>
      </div>

      {/* Tags Widget */}
      <div className="widget widget_tag_cloud">
        <h3 className="widget-title">Tags</h3>
        <div className="tagcloud">
          {tags.map((tag, index) => (
            <Link key={index} href="#" className="tag-cloud-link">
              {tag} <span className="tag-link-count">(1)</span>
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default BlogSidebar;
