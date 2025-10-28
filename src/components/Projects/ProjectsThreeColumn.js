"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

const projects = [
  {
    id: 1,
    image: "/images/projects/projects1.jpg",
    altText: "Project Image",
    title: "Financial Consultancy",
    category: "Financial",
    linkText: "Read More",
    detailsUrl: "/projects/details",
  },
  {
    id: 2,
    image: "/images/projects/projects2.jpg",
    altText: "Project Image",
    title: "Strategy Consultancy",
    category: "Strategy",
    linkText: "Read More",
    detailsUrl: "/projects/details",
  },
  {
    id: 3,
    image: "/images/projects/projects3.jpg",
    altText: "Project Image",
    title: "Organizational Consultancy",
    category: "Consultancy",
    linkText: "Read More",
    detailsUrl: "/projects/details",
  },
  {
    id: 4,
    image: "/images/projects/projects4.jpg",
    altText: "Project Image",
    title: "Tax Consultancy",
    category: "Tax",
    linkText: "Read More",
    detailsUrl: "/projects/details",
  },
  {
    id: 5,
    image: "/images/projects/projects5.jpg",
    altText: "Project Image",
    title: "Business Consultancy",
    category: "Business",
    linkText: "Read More",
    detailsUrl: "/projects/details",
  },
  {
    id: 6,
    image: "/images/projects/projects6.jpg",
    altText: "Project Image",
    title: "Marketing Consultancy",
    category: "Marketing",
    linkText: "Read More",
    detailsUrl: "/projects/details",
  },
  {
    id: 7,
    image: "/images/projects/projects7.jpg",
    altText: "Project Image",
    title: "Tax Solutions",
    category: "Startup",
    linkText: "Read More",
    detailsUrl: "/projects/details",
  },
  {
    id: 8,
    image: "/images/projects/projects8.jpg",
    altText: "Project Image",
    title: "Consultancy Analytics",
    category: "Resources",
    linkText: "Read More",
    detailsUrl: "/projects/details",
  },
  {
    id: 9,
    image: "/images/projects/projects9.jpg",
    altText: "Project Image",
    title: "Business Planning",
    category: "Strategy",
    linkText: "Read More",
    detailsUrl: "/projects/details",
  },
];

const ProjectsThreeColumn = () => {
  return (
    <>
      <div className="projects-area pb-100">
        <div className="container">
          {/* <div className="section-title">
            <span className="sub-title">COMPLETED PROJECTS</span>
            <h2>You Can Check Our Projects as Inspirations</h2>
          </div> */}

          <div className="row justify-content-center">
            {projects &&
              projects.map((item) => (
                <div className="col-lg-4 col-md-6" key={item.id}>
                  <div className="single-projects-box">
                    <Image
                      src={item.image}
                      alt={item.altText}
                      width={860}
                      height={463}
                    />
                    <h3>{item.title}</h3>
                    <span>{item.category}</span>

                    <Link href={item.detailsUrl} className="default-btn">
                      {item.linkText} <i className="ri-arrow-right-line"></i>
                    </Link>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectsThreeColumn;
