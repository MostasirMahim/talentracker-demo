"use client";
import React, { useState } from "react";
import { Filter } from "lucide-react";
import ApplicationFilters from "./ApplicationFilters";

const ApplicationFiltersWrapper = ({ jobId }) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <>
      {/* Header */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="md:text-2xl font-bold text-gray-800">Job Applications</h1>
            <p className="hidden md:block text-sm text-gray-600 mt-1">
              View and filter all applications for this job posting
            </p>
          </div>
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex items-center gap-2 px-4 py-2.5 bg-linear-to-r from-blue-600 to-sky-600 text-white rounded-lg hover:from-blue-700 hover:to-sky-700 transition-all duration-300 shadow-md hover:shadow-lg font-semibold"
          >
            <Filter className="w-5 h-5" />
            <span className="hidden md:block">{isFilterOpen ? "Hide Filters" : "Show Filters"}</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <ApplicationFilters 
        jobId={jobId} 
        isOpen={isFilterOpen} 
        onToggle={() => setIsFilterOpen(!isFilterOpen)} 
      />
    </>
  );
};

export default ApplicationFiltersWrapper;
