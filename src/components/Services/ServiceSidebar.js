"use client";

import React, { useState } from "react";
import Link from "next/link";
import { projects } from "@/lib/service_static_data";
import { useRouter } from "next/navigation";

const ServiceSidebar = ({ id }) => {
    const [searchText, setSearchText] = useState("");
    const router = useRouter();
  const services = projects
    .filter((project) => project.id !== id)
    .map((project) => ({
      id: project.id,
      title: project.title,
    }));

  const categoryCount = projects.reduce((acc, project) => {
    const existing = acc.find((item) => item.category === project.category);

    if (existing) {
      existing.count += 1;
    } else {
      acc.push({
        category: project.category,
        count: 1,
      });
    }

    return acc;
  }, []);
   const handleSubmit = (e) => {
    e.preventDefault();
    if (!searchText.trim()) return;
    router.push(`/services/?searchText=${encodeURIComponent(searchText)}`);
    setSearchText("");
  };
  return (
    <>
      <div className="widget-area">
        <div className="widget widget_search">
          <form className="search-form" onSubmit={handleSubmit}>
            <label>
              <input
                type="search"
                className="search-field"
                placeholder="Search..."
                onChange={(e) => setSearchText(e.target.value)}
              />
            </label>
            <button type="submit">
              <i className="ri-search-2-line"></i>
            </button>
          </form>
        </div>

        <div className="widget widget_service_categories">
          <h3 className="widget-title">Other Services</h3>
          <ul>
            {services.map((service) => (
              <li key={service.id}>
                <Link href={`/services/${service.id}`}>
                  {service.title}
                  <i className="ri-arrow-right-s-line"></i>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="widget widget_tag_cloud">
          <h3 className="widget-title">Categories</h3>

          <div className="tagcloud">
            {categoryCount.map((category) => (
              <Link
                key={category.category}
                href={`/services/?searchText=${category.category}`}
              >
                {category.category}{" "}
                <span className="tag-link-count"> ({category.count})</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ServiceSidebar;
