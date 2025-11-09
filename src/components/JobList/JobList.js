"use client";
import React, { useState } from "react";
import { Briefcase, MapPin, Calendar, Search } from "lucide-react";
import "./JobList.css";
import Link from "next/link";
import Image from "next/image";
import SmartPagination from "../SmartPagination/SmartPagination";
import { format_date } from "@/lib/utility_functions";
import { useRouter } from "next/navigation";

const JobList = ({ jobs, job_types, job_categories, job_locations }) => {
  const router = useRouter();
  const [category, setCategory] = useState(null);
  const [jobType, setJobType] = useState(null);
  const [location, setLocation] = useState(null);
  const [keyword, setKeyword] = useState(null);

  const handleSearch = () => {
    let URL = "?";
    if (category && category !== "None") {
      URL += `job_category=${category}&`;
    }
    if (jobType && jobType !== "None") {
      URL += `job_type=${jobType}&`;
    }
    if (location && location !== "None") {
      URL += `job_location=${location}&`;
    }
    if (keyword) {
      URL += `keyword=${keyword}&`;
    }
    if (URL.endsWith("&")) {
      URL = URL.slice(0, -1);
    }
    if (URL !== "?") {
      router.push(URL);
      router.refresh();
    }
  };

  const handleClearFilters = () => {
    setCategory(null);
    setJobType(null);
    setLocation(null);
    setKeyword("");
    router.push(window.location.pathname);
    router.refresh();
  };

  return (
    <div className="job-list container my-4">
      <h3 className="fw-bold text-main mb-4">All Jobs</h3>

      {/* Search Bar */}
      <div className="card border shadow-sm mb-4 p-4 search-bar">
        {/* Row 1: Keyword */}
        <div className="row mb-3">
          <div className="col-12">
            <input
              type="text"
              className="form-control keyword-input"
              placeholder="Search jobs by keyword (e.g., designer, backend, react)"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
          </div>
        </div>

        {/* Row 2: Filters */}
        <div className="row g-2 align-items-center">
          <div className="col-md-4 col-sm-6">
            <select
              className="form-select"
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value={"None"}>Categories</option>
              {job_categories?.data?.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-4 col-sm-6">
            <select
              className="form-select"
              onChange={(e) => setJobType(e.target.value)}
            >
              <option value={"None"}>Job Types</option>
              {job_types?.data?.map((job_type) => (
                <option key={job_type.id} value={job_type.id}>
                  {job_type.name}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-3 col-sm-6">
            <select
              className="form-select"
              onChange={(e) => setLocation(e.target.value)}
            >
              <option value={"None"}>Locations</option>
              {job_locations?.data?.map((location) => (
                <option key={location.id} value={location.id}>
                  {location.city}, {location.country}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-1 col-sm-6 d-grid">
            <button
              onClick={handleSearch}
              className="btn btn-secondary d-flex align-items-center justify-content-center"
            >
              <Search size={16} /> Search
            </button>
          </div>
        </div>

        <div>
          {(category || jobType || location || keyword) && (
            <button
              className="btn btn-secondary mt-2"
              onClick={handleClearFilters}
            >
              Clear Filters
            </button>
          )}
        </div>
      </div>

      {/* Job Cards */}
      {jobs?.data?.map((job, idx) => (
        <div key={idx} className="card job-card mb-4 p-1 shadow-sm border">
          <div className="card-body d-flex flex-column flex-md-row align-items-md-center justify-content-between">
            <div className="d-flex flex-column flex-md-row align-items-start gap-3 w-100">
              <div className="d-flex  justify-content-center justify-content-md-start mb-3 mb-md-0">
                <Image
                  src="https://www.searchenginejournal.com/wp-content/uploads/2017/06/shutterstock_268688447.jpg"
                  alt="company-logo"
                  className="job-logo"
                  width={80}
                  height={80}
                />
              </div>

              <div className="flex-grow-1">
                <Link href={`jobs/1`}>
                  <h5 className="job-title text-main mb-1">{job?.title}</h5>
                </Link>
                <div className="text-muted small d-flex flex-wrap gap-3">
                  <span className="d-flex align-items-center">
                    <Briefcase size={14} className="me-1 text-main" />
                    {job?.job_type?.name}
                  </span>
                  <span className="d-flex align-items-center">
                    <MapPin size={14} className="me-1 text-main" />
                    {job?.job_location?.city}, {job?.job_location?.country}
                  </span>
                  <span className="d-flex align-items-center">
                    <Calendar size={14} className="me-1 text-main" />
                    {format_date(job?.created_at)}
                  </span>
                </div>
                <p className="mt-2 mb-0 text-secondary small">
                  {job?.short_description}
                </p>
              </div>
            </div>

            <div className="mt-3 mt-md-0 d-flex justify-content-md-end">
              <Link href="/career" className="default-btn">
                Apply<i className="ri-arrow-right-line"></i>
              </Link>
            </div>
          </div>
        </div>
      ))}

      {/* Pagination */}
      <SmartPagination paginationData={jobs?.pagination} />
    </div>
  );
};

export default JobList;
