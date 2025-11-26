"use client";

import React from "react";
import Link from "next/link";
import BlogSmartPagination from "../SmartPagination/BlogSmartPagination";

const AllNewsPost = ({ blogs }) => {
  const blogList = blogs?.data || [];
  const pagination = blogs?.pagination;

  const formatBDTime = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleString("en-BD", {
      timeZone: "Asia/Dhaka",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (blogList.length === 0) {
    return (
      <div className="blog-area ptb-100">
        <div className="container">
          <div className="text-center">
            <h3>No blogs found</h3>
          </div>
        </div>
      </div>
    );
  }

  const truncateText = (text, maxLength) => {
    if (!text) return "";
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  return (
    <div className="blog-area ptb-70">
      <div className="container">
        <div className="row justify-content-center gy-5">
          {blogList.map((blog) => (
            <div className="col-lg-4 col-md-6" key={blog.id}>
              <div className="single-news-post">
                <div className="post-image-2"></div>
                <div className="post-content">
                  <ul className="meta">
                    <li>
                      <i className="ri-calendar-2-line"></i>{" "}
                      {formatBDTime(blog.created_at)}
                    </li>
                    <li>
                      <i className="ri-chat-thread-line"></i>
                      <Link href={`/news/${blog.id}`}>
                        {blog.category?.name}
                      </Link>
                    </li>
                  </ul>
                  <h3 style={{ minHeight: "100px", maxHeight: "100px" }}>
                    <Link href={`/news/${blog.id}`}>
                      {truncateText(blog.title, 90)}
                    </Link>
                  </h3>

                  <Link
                    style={{ marginTop: "20px", marginBottom: "30px" }}
                    href={`/news/${blog.id}`}
                    className="default-btn"
                  >
                    Read More <i className="ri-arrow-right-line"></i>
                  </Link>
                </div>
                <div className="post-image"></div>
              </div>
            </div>
          ))}
        </div>
        <BlogSmartPagination paginationData={pagination} />
      </div>
    </div>
  );
};

export default AllNewsPost;
