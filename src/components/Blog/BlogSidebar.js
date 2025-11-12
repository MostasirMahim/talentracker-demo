"use client";

import React from "react";
import Link from "next/link";

const BlogSidebar = ({ category, tags }) => {
  console.log("category", category);
  console.log("tags", tags);

  return (
    <aside className="widget-area">
 

      {/* Categories Widget */}
      <div className="widget widget_categories">
        <h3 className="widget-title fs-3">Category</h3>
        <ul>
         <li className="fw-bold"> 
          {category}
          </li>
        </ul>
      </div>

      {/* Tags Widget */}
      <div className="widget widget_tag_cloud">
        <h3 className="widget-title fs-3">Tags</h3>
        <div className="tagcloud ">
          {tags.map((tag, index) => (
            <Link key={index} href="#" className="tag-cloud-link ">
              {tag} <span className="tag-link-count">(1)</span>
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default BlogSidebar;
