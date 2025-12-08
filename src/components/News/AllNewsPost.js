"use client";

import React from "react";
import Link from "next/link";
import SmartPagination from "../SmartPagination/SmartPagination";
import { useRouter } from "next/navigation";

const AllNewsPost = ({ blogs }) => {
  const blogList = blogs?.data || [];
  const pagination = blogs?.pagination;
  const router = useRouter();
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
            <h3>No News found</h3>
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
        <div className="row justify-content-center ">
          {blogList.map((blog) => (
            <div onClick={()=> router.push(`/news/${blog.id}`)} className="col-md-6" key={blog.id}>
              <div className="single-news-post">
                <div className="post-content">
                  <h3 style={{ minHeight: "80px", maxHeight: "100px" }}>
                    <Link href={`/news/${blog.id}`}>
                      {truncateText(blog.title, 90)}
                    </Link>
                  </h3>
                <ul className="meta">
                    <li>
                      <i className="ri-chat-quote-line"></i>{" "}
                      {blog.source}
                    </li>
                    </ul>
                    <ul className="meta" style={{ marginBottom: "50px" }}>
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

                </div>
                <div className="post-image"></div>
              </div>
            </div>
          ))}
        </div>
        <SmartPagination paginationData={pagination} />
      </div>
    </div>
  );
};

export default AllNewsPost;
