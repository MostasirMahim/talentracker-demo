"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import SmartPagination from "../SmartPagination/SmartPagination";

const AllBlogPost = ({ blogs }) => {
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

  return (
    <div className="blog-area ptb-100">
      <div className="container">
        <div className="row justify-content-center">
          {blogList.map((post) => (
            <div className="col-lg-4 col-md-6" key={post.id}>
              <div className="single-blog-post">
                <div className="post-image">
                  <Link href={`/blog/${post.id}`} className="d-block">
                    <Image
                      src={
                        post.featured_image
                          ? `${process.env.NEXT_PUBLIC_BACKEND_API_URL}${post.featured_image}`
                          : "/images/blog/blog1.jpg"
                      }
                      alt={post.altText || post.title}
                      width={860}
                      height={622}
                    />
                  </Link>
                </div>
                <div className="post-content">
                  <ul className="meta">
                    <li>
                      <i className="ri-calendar-2-line"></i>{" "}
                      {formatBDTime(post.created_at)}
                    </li>
                    <li>
                      <i className="ri-user-voice-line"></i>
                      <Link href={`/blog/${post.id}`}>{post.author}</Link>
                    </li>
                  </ul>
                  <h3>
                    <Link href={`/blog/${post.id}`}>{post.title}</Link>
                  </h3>
                  <p>{post.summary}</p>
                  <Link href={`/blog/${post.id}`} className="default-btn">
                    Read More <i className="ri-arrow-right-line"></i>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <SmartPagination paginationData={pagination} />
      </div>
    </div>
  );
};

export default AllBlogPost;