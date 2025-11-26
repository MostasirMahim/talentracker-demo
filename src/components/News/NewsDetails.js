"use client";

import React from "react";
import Link from "next/link";
const NewsDetails = ({ blog }) => {
  if (!blog) {
    return (
      <div className="container py-5 text-center">
        <h4>Blog not found </h4>
      </div>
    );
  }

  const formatBDTime = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleString("en-BD", {
      timeZone: "Asia/Dhaka",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="blog-details-area pb-100 pt-7">
      <div className="container">
        <div className="row">
          <div className="w-100">
            <div className="blog-details-desc-r">
              <div className="article-content-r">
                <div className="entry-meta mb-3">
                  <ul>
                    <li>
                      <i className="ri-chat-thread-line"></i>
                      <Link href="#">{blog.category?.name}</Link>
                    </li>
                    <li>
                      <i className="ri-calendar-2-line"></i>
                      {formatBDTime(blog.created_at)}
                    </li>
                  </ul>
                </div>
                <h3 className="">&quot;{blog.title}&quot;</h3>
                <div className="flex-b">
                  <i className="ri-chat-quote-line"></i>
                  <span className="text-muted">{blog.source}</span>
                </div>
                <div
                  className="blog-content mt-3"
                  dangerouslySetInnerHTML={{ __html: blog.description }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsDetails;
