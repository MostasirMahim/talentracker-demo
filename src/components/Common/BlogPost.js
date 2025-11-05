"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

const blogPosts = [
  {
    id: 1,
    image: "/images/blog/blog1.jpg",
    altText: "Blog Image",
    date: "Jan 22, 2024",
    author: "Lords Evans",
    authorLink: "/blog/author",
    title: "The Secret of Your Business Success Find Quickly",
    shortDesc:
      "Lorem ipsum dolor sit amet, conseteturants atal into sadipscing elitr, sed diam nonumy eirmod nsa ada tempor invidunt ut.",
    btnText: "Read More",
    detailsUrl: "/blog/details",
  },
  {
    id: 2,
    image: "/images/blog/blog2.jpg",
    altText: "Blog Image",
    date: "Jan 22, 2024",
    author: "Sarah Taylor",
    authorLink: "/blog/author",
    title: "Consulting is a Good and Best Into Our Company",
    shortDesc:
      "Lorem ipsum dolor sit amet, conseteturants atal into sadipscing elitr, sed diam nonumy eirmod nsa ada tempor invidunt ut.",
    btnText: "Read More",
    detailsUrl: "/blog/details",
  },
  {
    id: 3,
    image: "/images/blog/blog3.jpg",
    altText: "Blog Image",
    date: "Jan 22, 2024",
    author: "James Andy",
    authorLink: "/blog/author",
    title: "Business Has Become a Good in the Global World",
    shortDesc:
      "Lorem ipsum dolor sit amet, conseteturants atal into sadipscing elitr, sed diam nonumy eirmod nsa ada tempor invidunt ut.",
    btnText: "Read More",
    detailsUrl: "/blog/details",
  },
];

const BlogPost = () => {
  return (
    <>
      <div id="blog" className="blog-area pt-100 pb-70">
        <div className="container">
          <div className="section-title">
            <span className="sub-title">OUR BLOGS</span>
            <h2>Meet Up With Our Blogs</h2>
          </div>

          <div className="row justify-content-center">
            {blogPosts &&
              blogPosts.map((post) => (
                <div className="col-lg-4 col-md-6" key={post.id}>
                  <div className="single-blog-post">
                    <div className="post-image">
                      <Link href={post.detailsUrl} className="d-block">
                        <Image
                          src={post.image}
                          alt={post.altText}
                          width={860}
                          height={622}
                        />
                      </Link>
                    </div>
                    <div className="post-content">
                      <ul className="meta">
                        <li>
                          <i className="ri-calendar-2-line"></i> {post.date}
                        </li>
                        <li>
                          <i className="ri-user-voice-line"></i>
                          <Link href={post.authorLink}>{post.author}</Link>
                        </li>
                      </ul>
                      <h3>
                        <Link href={post.detailsUrl}>{post.title}</Link>
                      </h3>

                      <p>{post.shortDesc}</p>

                      <Link href={post.detailsUrl} className="default-btn">
                        {post.btnText} <i className="ri-arrow-right-line"></i>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogPost;
