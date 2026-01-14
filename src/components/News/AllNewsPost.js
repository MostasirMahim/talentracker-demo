"use client";

import React from "react";
import Link from "next/link";
import SmartPagination from "../SmartPagination/SmartPagination";
import { useRouter } from "next/navigation";
import { Newspaper } from "lucide-react";

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
    <div
      style={{
        minHeight: "60vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f1f5f9",
        padding: "20px",
      }}
    >
      <div
        style={{
          textAlign: "center",
          maxWidth: "420px",
          backgroundColor: "#ffffff",
          padding: "42px 32px",
          borderRadius: "14px",
          boxShadow: "0 12px 30px rgba(15, 23, 42, 0.08)",
        }}
      >
        {/* Icon */}
        <div
          style={{
            width: "64px",
            height: "64px",
            margin: "0 auto 16px",
            borderRadius: "50%",
            backgroundColor: "#e0f2fe",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Newspaper size={30} color="#0284c7" />
        </div>

        {/* Title */}
        <h2
          style={{
            marginBottom: "10px",
            fontSize: "22px",
            fontWeight: 600,
            color: "#0f172a",
          }}
        >
          No News Found
        </h2>

        {/* Description */}
        <p
          style={{
            margin: 0,
            fontSize: "15px",
            color: "#64748b",
            lineHeight: 1.6,
          }}
        >
          There are no news articles available right now. Please check back
          later for the latest updates.
        </p>
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
