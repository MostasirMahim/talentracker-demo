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
  // Helper function to limit text length
  const truncateText = (text, maxLength) => {
    if (!text) return "";
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
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
                          src={
                            blog.featured_image
                              ? `${process.env.NEXT_PUBLIC_BACKEND_API_URL}${blog.featured_image}`
                              : "/images/blog/blog1.jpg"
                          }
                          alt={blog.altText || blog.title}
                          width={400}
                          height={250}
                          style={{
                            width: "100%",
                            height: "250px",
                            objectFit: "cover",
                            borderRadius: "8px",
                          }}
                        />
                      </Link>
                    </div>
                    <div className="post-content">
                      <ul className="meta">
                        <li>
                          <i className="ri-calendar-2-line"></i>{" "}
                          {formatBDTime(blog.created_at)}
                        </li>
                        <li>
                          <i className="ri-user-voice-line"></i>
                          <Link href="#">{blog.author}</Link>
                        </li>
                      </ul>
                      <h3 style={{ minHeight: "60px" }}>
                        <Link href="#">{truncateText(blog.title, 50)}</Link>
                      </h3>

                      <p style={{ minHeight: "80px" }}>
                        {truncateText(blog.summary, 120)}
                      </p>


                      <Link href={`/blog/${blog.id}`} className="default-btn">
                        Read More <i className="ri-arrow-right-line"></i>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
          </div>
          <div className="read-more-btn text-center mt-2">
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
