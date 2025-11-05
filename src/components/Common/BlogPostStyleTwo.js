"use client";

import React from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";

const blogPosts = [
  {
    id: 1,
    image: "/images/blog/blog1.jpg",
    altText: "Blog Image",
    date: "Jan 22, 2024",
    author: "Lords Evans",
    authorLink: "#",
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
    authorLink: "#",
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
    authorLink: "#",
    title: "Business Has Become a Good in the Global World",
    shortDesc:
      "Lorem ipsum dolor sit amet, conseteturants atal into sadipscing elitr, sed diam nonumy eirmod nsa ada tempor invidunt ut.",
    btnText: "Read More",
    detailsUrl: "/blog/details",
  },
  {
    id: 4,
    image: "/images/blog/blog4.jpg",
    altText: "Blog Image",
    date: "Jan 22, 2024",
    author: "James Andy",
    authorLink: "#",
    title: "Business Has Become a Good in the Global World",
    shortDesc:
      "Lorem ipsum dolor sit amet, conseteturants atal into sadipscing elitr, sed diam nonumy eirmod nsa ada tempor invidunt ut.",
    btnText: "Read More",
    detailsUrl: "/blog/details",
  },
];

const BlogPostStyleTwo = () => {
  return (
    <>
      <div className="blog-area ptb-100 bg-fbf9f7">
        <div className="container">
          <div className="section-title">
            <span className="sub-title">OUR BLOGS</span>
            <h2>Meet Up With Our Blogs</h2>
            <p>
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore et dolore.
            </p>
          </div>

          <Swiper
            spaceBetween={30}
            pagination={{
              clickable: true,
            }}
            breakpoints={{
              0: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2,
              },
              922: {
                slidesPerView: 3,
              },
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: true,
              pauseOnMouseEnter: true,
            }}
            modules={[Pagination, Autoplay]}
            className="blog-slides"
          >
            {blogPosts &&
              blogPosts.map((post) => (
                <SwiperSlide className="single-blog-item" key={post.id}>
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
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default BlogPostStyleTwo;
