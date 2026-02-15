"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

const projects = [
  {
    id: 1,
    image: "/images/services_images/1_Executive_Search.jpeg",
    altText: "Project Image",
    title: "Executive Search & Head Hunting",
    category: "Financial",
    linkText: "Read More",
    detailsUrl: "/services/1",
  },
  {
    id: 9,
    image: "/images/services_images/7_Employee_Wellness__Mental_Health.jpg",
    altText: "Project Image",
    title: "Employer of Record (EOR) & PEO",
    category: "Strategy",
    linkText: "Read More",
    detailsUrl: "/services/9",
  },
  {
    id: 5,
    image: "/images/services_images/5_HR_Management_and_consultant.jpg",
    altText: "Project Image",
    title: "HR & Management Consultancy",
    category: "Business",
    linkText: "Read More",
    detailsUrl: "/services/5",
  },
  {
    id: 10,
    image: "/images/services_images/11_BIDA_BEGA_Investment_Advisory.jpg",
    altText: "Project Image",
    title: "Payroll Management",
    category: "Strategy",
    linkText: "Read More",
    detailsUrl: "/services/10",
  },
  {
    id: 8,
    image: "/images/services_images/9_Employer_of_Record_EOR__PEO.jpg",
    altText: "Project Image",
    title: "Remote & Contract Staffing",
    category: "Resources",
    linkText: "Read More",
    detailsUrl: "/services/8",
  },
  {
    id: 12,
    image: "/images/services_images/Tailored_Training_Solutions.jpg",
    altText: "Project Image",
    title: "Tailored Training Solutions",
    category: "Strategy",
    linkText: "Read More",
    detailsUrl: "/services/12",
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
          <div className="read-more-btn">
            <Link href="/services/" className="default-btn">
              See More <i className="ri-arrow-right-line"></i>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ServicesOverview;
