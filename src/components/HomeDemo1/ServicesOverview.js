"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

const projects = [
  {
    id: 1,
    image: "/images/Services2/1_Executive_Search.jpeg",
    altText: "Project Image",
    title: "Executive Search & Head Hunting",
    category: "Financial",
    linkText: "Read More",
    detailsUrl: "/projects/details",
  },
  {
    id: 2,
    image: "/images/Services2/2_Recruitment_process_outsourcing.png",
    altText: "Recruitment Process Outsourcing (RPO)",
    title: "Strategy Consultancy",
    category: "Strategy",
    linkText: "Read More",
    detailsUrl: "/projects/details",
  },
  {
    id: 3,
    image: "/images/Services2/3_Pre-Employment_Check.jpg",
    altText: "Project Image",
    title: "Pre-Employment Screening",
    category: "Consultancy",
    linkText: "Read More",
    detailsUrl: "/projects/details",
  },
  {
    id: 4,
    image: "/images/Services2/4_Career_Counseling.jpg",
    altText: "Project Image",
    title: "Career Counselling & Placement",
    category: "Consultancy",
    linkText: "Read More",
    detailsUrl: "/projects/details",
  },
  {
    id: 5,
    image: "/images/Services2/5_HR_Management_and_consultant.jpg",
    altText: "Project Image",
    title: "HR & Management Consultancy",
    category: "Business",
    linkText: "Read More",
    detailsUrl: "/projects/details",
  },
  {
    id: 6,
    image: "/images/Services2/6_Organization_Culture_&_Change_Management.jpg",
    altText: "Project Image",
    title: ". Organization Culture & Change Management",
    category: "Marketing",
    linkText: "Read More",
    detailsUrl: "/projects/details",
  },
];

const ServicesOverview = () => {
  return (
    <>
      <div className="projects-area">
        <div className="container">
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
                      maxheight={463}
                      maxwidth={860}
                      
                    />
                    <h3>{item.title}</h3>
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

export default ServicesOverview;
