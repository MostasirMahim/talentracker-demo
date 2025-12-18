"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { projects } from "@/lib/service_static_data";
import { useSearchParams } from "next/navigation";
import { SearchX } from "lucide-react";

const ProjectsThreeColumn = () => {
  const searchParams = useSearchParams();
  const searchText = searchParams.get("searchText");
  const filteredProjects = searchText
    ? projects.filter((project) =>
        project.title.toLowerCase().includes(searchText.toLowerCase()) || project.category.toLowerCase().includes(searchText.toLowerCase())
      )
    : projects;

  if (filteredProjects.length === 0) {
    return (
      <div
        style={{
          width: "100%",
          minHeight: "300px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "14px",
          textAlign: "center",
        }}
      >
        <SearchX size={48} color="#999" />

        <h2
          style={{
            fontSize: "22px",
            fontWeight: "600",
            color: "#222",
          }}
        >
          No Service Found
        </h2>

        <p
          style={{
            fontSize: "14px",
            color: "#666",
            maxWidth: "420px",
          }}
        >
          We couldn&apos;t find any service matching your search.
        </p>
      </div>
    );
  }
  return (
    <>
      <div className="projects-area pb-100">
        <div className="container">
          {/* <div className="section-title">
            <span className="sub-title">COMPLETED PROJECTS</span>
            <h2>You Can Check Our Projects as Inspirations</h2>
          </div> */}

          <div className="row justify-content-center">
            {filteredProjects &&
              filteredProjects?.map((item) => (
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
