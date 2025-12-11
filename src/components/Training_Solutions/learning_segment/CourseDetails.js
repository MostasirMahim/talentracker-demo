"use client";

import { useState } from "react";
import "./course_detail.css";
import Image from "next/image";
import EnrollButton from "./EnrollNow";


export default function CourseDetail({ course: courseData }) {
  const [isEnrolling, setIsEnrolling] = useState(false);
  const handleEnroll = () => {
    setIsEnrolling(true);
    setTimeout(() => {
      window.open(courseData.enroll_now_link, "_blank");
      setIsEnrolling(false);
    }, 1000);
  };

  return (
    <div className="course-detail-container">
      <div className="course-hero">
        <div className="hero-gradient"></div>
        <div className="hero-content-course">
          <div className="course-thumbnail-wrapper">
            <div className="course-placeholder">
              {courseData?.thumbnail ? (
                <Image
                  src={`${process.env.NEXT_PUBLIC_BACKEND_API_URL}${
                    courseData?.thumbnail || ""
                  }`}
                  alt={courseData.program_title}
                  fill
                  className="course-thumbnail"
                />
              ) : (
                <div className="placeholder-content">
                  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="50" cy="30" r="15" fill="currentColor" />
                    <path
                      d="M20 60 Q50 45 80 60"
                      stroke="currentColor"
                      strokeWidth="3"
                      fill="none"
                    />
                    <rect
                      x="30"
                      y="65"
                      width="40"
                      height="20"
                      rx="3"
                      fill="currentColor"
                      opacity="0.5"
                    />
                  </svg>
                </div>
              )}
            </div>
            <div className="status-badge-course">{courseData?.status}</div>
          </div>

          <div className="hero-info-course">
            <h1 className="course-title">{courseData?.program_title}</h1>
            <p className="course-category">{courseData?.category}</p>

            <EnrollButton
              link={courseData.enroll_now_link}
              isEnrolling={isEnrolling}
            />
          </div>
        </div>
      </div>

      <div className="course-info-section">
        <h2>Course Details</h2>
        <div className="course-details-grid">
          <div className="detail-card">
            <div
              className="course-description-hero"
              dangerouslySetInnerHTML={{
                __html: courseData?.description,
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
