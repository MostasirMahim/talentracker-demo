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
    detailsUrl: "/projects/details",
  },
  {
    id: 2,
    image: "/images/services_images/2_Recruitment_process_outsourcing.png",
    altText: "Recruitment Process Outsourcing (RPO)",
    title: "Strategy Consultancy",
    category: "Strategy",
    linkText: "Read More",
    detailsUrl: "/projects/details",
  },

  {
    id: 4,
    image: "/images/services_images/4_Career_Counseling.jpg",
    altText: "Project Image",
    title: "Career Counselling & Placement",
    category: "Consultancy",
    linkText: "Read More",
    detailsUrl: "/projects/details",
  },
    {
    id: 3,
    image: "/images/services_images/3_Pre-Employment_Check.jpg",
    altText: "Project Image",
    title: "Pre-Employment Screening",
    category: "Consultancy",
    linkText: "Read More",
    detailsUrl: "/projects/details",
  },
  {
    id: 5,
    image: "/images/services_images/5_HR_Management_and_consultant.jpg",
    altText: "Project Image",
    title: "HR & Management Consultancy",
    category: "Business",
    linkText: "Read More",
    detailsUrl: "/projects/details",
  },
  {
    id: 6,
    image: "/images/services_images/6_Organization_Culture__Change_Management.jpg",
    altText: "Project Image",
    title: "Organization Culture & Change Management",
    category: "Marketing",
    linkText: "Read More",
    detailsUrl: "/projects/details",
  },
  {
    id: 7,
    image: "/images/services_images/7_Employee_Wellness__Mental_Health.jpg",
    altText: "Project Image",
    title: "Employee Wellness & Mental Health",
    category: "Startup",
    linkText: "Read More",
    detailsUrl: "/projects/details",
  },
  {
    id: 8,
    image: "/images/services_images/8_Remote__Contract_Staffing.jpg",
    altText: "Project Image",
    title: "Remote & Contract Staffing",
    category: "Resources",
    linkText: "Read More",
    detailsUrl: "/projects/details",
  },
  {
    id: 9,
    image: "/images/services_images/9_Employer_of_Record_EOR__PEO.jpg",
    altText: "Project Image",
    title: "Employer of Record (EOR) & PEO",
    category: "Strategy",
    linkText: "Read More",
    detailsUrl: "/projects/details",
  },
  {
    id: 10,
    image: "/images/services_images/10_Payroll_Management.jpg",
    altText: "Project Image",
    title: "Payroll Management",
    category: "Strategy",
    linkText: "Read More",
    detailsUrl: "/projects/details",
  },
  {
    id: 11,
    image: "/images/services_images/11_BIDA_BEGA_Investment_Advisory.jpg",
    altText: "Project Image",
    title: "BIDA/BEGA/Investment Advisory",
    category: "Strategy",
    linkText: "Read More",
    detailsUrl: "/projects/details",
  },
  {
    id: 12,
    image: "/images/services_images/12_Tailored_Training_Solutions.jpg",
    altText: "Project Image",
    title: "Tailored Training Solutions",
    category: "Strategy",
    linkText: "Read More",
    detailsUrl: "/projects/details",
  },
  {
    id: 13,
    image: "/images/services_images/13_Labour_Law_Compliance_Audit.jpg",
    altText: "Project Image",
    title: "Labour Law Compliance Audit",
    category: "Strategy",
    linkText: "Read More",
    detailsUrl: "/projects/details",
  },
  {
    id: 14,
    image: "/images/services_images/14_Regulatory_Affairs_Consultancy.jpg",
    altText: "Project Image",
    title: "Regulatory Affairs Consultancy",
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
