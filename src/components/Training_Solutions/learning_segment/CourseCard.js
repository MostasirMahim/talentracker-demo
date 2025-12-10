"use client"

import Link from "next/link"
import "./course_card.css"
import Image from "next/image"

export default function CourseCard({ course }) {
  return (
    <Link href={`/courses/${course.id}`}>
      <div className="course-card-item">
        <div className="course-card-image">
          {course?.thumbnail ? (
            <Image src={`${process.env.NEXT_PUBLIC_BACKEND_API_URL}${course?.thumbnail}`} alt={course.program_title} fill />
          ) : (
            <div className="course-card-placeholder">
              <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M20 30 L50 15 L80 30 L80 70 Q80 80 70 80 L30 80 Q20 80 20 70 Z"
                  fill="currentColor"
                  opacity="0.3"
                />
                <circle cx="35" cy="50" r="8" fill="currentColor" />
                <circle cx="65" cy="50" r="8" fill="currentColor" />
                <path d="M35 60 Q50 68 65 60" stroke="currentColor" strokeWidth="2" fill="none" />
              </svg>
            </div>
          )}
          <div className="card-overlay">
            <span className="card-status">{course.status}</span>
          </div>
        </div>

        <div className="course-card-content">
          <span className="card-category">{course.category}</span>
          <h3 className="card-title">{course.program_title}</h3>
          <p className="card-description">{course.description.substring(0, 80)}...</p>

          <div className="card-footer">
            <button className="card-view-btn">View Details</button>
          </div>
        </div>
      </div>
    </Link>
  )
}
