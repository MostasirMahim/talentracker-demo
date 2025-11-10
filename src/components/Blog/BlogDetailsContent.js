"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import BlogSidebar from "@/components/Blog/BlogSidebar";

const BlogDetailsContent = ({ blog }) => {
  console.log(blog.featured_image, "blog featured_image");
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
    <div className="blog-details-area ptb-100">
      <div className="container">
        <div className="row">
          {/* LEFT SIDE - Blog Content */}
          <div className="col-lg-8 col-md-12">
            <div className="blog-details-desc">
              {/* Featured Image */}
              <div className="article-image mb-3">
                <Image
                  src={`${process.env.NEXT_PUBLIC_BACKEND_API_URL}${blog.featured_image}` || "/images/blog/blog1.jpg"}
                  alt={blog.title}
                  width={860}
                  height={622}
                  className="rounded-3"
                />
              </div>

              {/* Blog Info */}
              <div className="article-content">
                <div className="entry-meta mb-3">
                  <ul>
                    <li>
                      <i className="ri-shield-user-line"></i>
                      <Link href="#">{blog.author}</Link>
                    </li>
                    <li>
                      <i className="ri-calendar-2-line"></i>
                      {formatBDTime(blog.created_at)}
                    </li>
                    
                  </ul>
                </div>

                {/* Title */}
                <h3 className="mb-3">{blog.title}</h3>

                {/* Summary */}
                <p className="text-muted">{blog.summary}</p>

                {/* Content (from backend HTML) */}
                <div
                  className="blog-content mt-3"
                  dangerouslySetInnerHTML={{ __html: blog.content }}
                ></div>
              </div>

              {/* Footer - Tags + Share */}
              <div className="article-footer mt-4 d-flex justify-content-between align-items-center flex-wrap">
                

                <div className="article-share">
                  <ul className="social d-flex gap-2 mb-0">
                    <li className="fw-bold">Share : </li>
                    <li>
                      <a
                        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                          typeof window !== "undefined"
                            ? window.location.href
                            : ""
                        )}`}
                        target="_blank"
                        rel="noreferrer"
                        className="facebook"
                      >
                        <i className="ri-facebook-fill"></i>
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://www.linkedin.com/"
                        target="_blank"
                        rel="noreferrer"
                        className="linkedin"
                      >
                        <i className="ri-linkedin-fill"></i>
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://www.twitter.com/"
                        target="_blank"
                        rel="noreferrer"
                        className="twitter"
                      >
                        <i className="ri-twitter-fill"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE - Sidebar */}
          <div className="col-lg-4 col-md-12">
            <BlogSidebar category={blog.category} tags={blog.tags} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetailsContent;
