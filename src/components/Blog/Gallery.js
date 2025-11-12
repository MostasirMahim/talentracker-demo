"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

const posts = [
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
  {
    id: 4,
    image: "/images/blog/blog4.jpg",
    altText: "Blog Image",
    date: "Jan 16, 2024",
    author: "James Andy",
    authorLink: "/blog/author",
    title: "Business Has Become a Good in the Global World",
    shortDesc:
      "Lorem ipsum dolor sit amet, conseteturants atal into sadipscing elitr, sed diam nonumy eirmod nsa ada tempor invidunt ut.",
    btnText: "Read More",
    detailsUrl: "/blog/details",
  },
  {
    id: 5,
    image: "/images/blog/blog5.jpg",
    altText: "Blog Image",
    date: "Jan 14, 2024",
    author: "Sarah Taylor",
    authorLink: "/blog/author",
    title: "Magic Monday: Looking Forward With Hope",
    shortDesc:
      "Lorem ipsum dolor sit amet, conseteturants atal into sadipscing elitr, sed diam nonumy eirmod nsa ada tempor invidunt ut.",
    btnText: "Read More",
    detailsUrl: "/blog/details",
  },
  {
    id: 6,
    image: "/images/blog/blog6.jpg",
    altText: "Blog Image",
    date: "Jan 12, 2024",
    author: "James Andy",
    authorLink: "/blog/author",
    title: "Outsourcing IT Services: The Hows and Why",
    shortDesc:
      "Lorem ipsum dolor sit amet, conseteturants atal into sadipscing elitr, sed diam nonumy eirmod nsa ada tempor invidunt ut.",
    btnText: "Read More",
    detailsUrl: "/blog/details",
  },
];

const GalleryPost = ({ gallery }) => {
  return (
    <>
      
      <div className="blog-area ptb-100">
        <div className="container">
          <div className="section-title" style={{  marginTop: " -90px" }}>
            <h2>Gallery Style</h2>
            <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat.</p>
          </div>
          <div className="row justify-content-center">
            {posts &&
              posts.map((post) => (
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
                     
                      <h3>
                        <Link href={post.detailsUrl}>{post.title}</Link>
                      </h3>

                     

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

export default GalleryPost;
