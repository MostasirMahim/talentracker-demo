"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";


const BlogGridPost = ({ blogs }) => {
  const formatBDTime = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleString("en-BD", {
      timeZone: "Asia/Dhaka",
      year: "numeric",
      month: "short",
      day: "numeric",
      // hour: "2-digit",
      // minute: "2-digit",
    });
  };
  return (
    <>
      <div className="blog-area ptb-100">
        <div className="container">
          <div className="row justify-content-center">
            {blogs &&
              blogs.map((blog) => (
                <div className="col-lg-4 col-md-6" key={blog.id}>
                  <div className="single-blog-post">
                    <div className="post-image">
                      <Link href="#" className="d-block">
                        <Image
                          src={blog.featured_image || "/images/blog/blog1.jpg"}
                          alt={blog.alt_text}
                          width={860}
                          height={622}
                        />
                      </Link>
                    </div>
                    <div className="post-content">
                      <ul className="meta">
                        <li>
                          <i className="ri-calendar-2-line"></i> {formatBDTime(blog.created_at)}
                        </li>
                        <li>
                          <i className="ri-user-voice-line"></i>
                          <Link href="#">{blog.author}</Link>
                        </li>
                      </ul>
                      <h3>
                        <Link href="#">{blog.title}</Link>
                      </h3>

                      <p>{blog.summary}</p>

                      <Link href = {'/blog/all'} className="default-btn">
                        Read More<i className="ri-arrow-right-line"></i>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
          </div>
          <div className="read-more-btn">
            <Link href="/blog/all" className="default-btn">
              See More <i className="ri-arrow-right-line"></i>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogGridPost;
