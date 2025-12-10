"use client";

import { useState } from "react";
import "./course_grid.css";
import CourseCard from "./CourseCard";

export default function CoursesPage({ courses: coursesData }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const categories = ["All", ...new Set(coursesData?.map((c) => c.category))];

  const filteredCourses =
    selectedCategory === "All"
      ? coursesData
      : coursesData?.filter((c) => c.category === selectedCategory);

  return (
    <div className="courses-page-container">
      <div className="courses-hero">
        <div className="hero-gradient-courses"></div>
        <div className="hero-content-courses">
          <h1 className="courses-hero-title">Explore Our Courses</h1>
          <p className="courses-hero-subtitle">
            Choose from our selection of professional development courses
          </p>
        </div>
      </div>
      <div className="filter-section">
        <h2>Filter by Category</h2>
        <div className="category-filters">
          {categories?.map((category) => (
            <button
              key={category}
              className={`filter-btn ${
                selectedCategory === category ? "active" : ""
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      <div className="courses-grid">
        {filteredCourses?.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
      {filteredCourses?.length === 0 && (
        <div className="no-results">
          <p>No courses found in this category.</p>
        </div>
      )}
    </div>
  );
}
