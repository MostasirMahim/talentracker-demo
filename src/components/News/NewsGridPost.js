"use client";

import React from "react";
import Link from "next/link";

const NewsGridPost = ({ blogs }) => {
  const formatBDTime = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleString("en-BD", {
      timeZone: "Asia/Dhaka",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const truncateText = (text, maxLength) => {
    if (!text) return "";
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  return (
    <>
      <div className="blog-area ptb-70">
        <div className="container">
          <div className="row justify-content-center gy-5">
            {blogs &&
              blogs.map((blog) => (
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
          <div className="read-more-btn text-center mt-2">
            <Link href="/news/all" className="default-btn">
              See More <i className="ri-arrow-right-line"></i>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewsGridPost;
