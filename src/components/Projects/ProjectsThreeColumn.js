"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { projects } from "@/lib/service_static_data";

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
