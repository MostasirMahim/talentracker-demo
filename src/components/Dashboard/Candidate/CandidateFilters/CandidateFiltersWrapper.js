"use client";
import React, { useState } from "react";
import { Filter } from "lucide-react";
import CandidateFilters from "./CandidateFilters";

const CandidateFiltersWrapper = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <>
      {/* Floating Filter Button */}
      {!isFilterOpen && (
        <button
          onClick={() => setIsFilterOpen(true)}
          className="fixed bottom-6 right-6 z-40 flex items-center gap-2 px-3 py-3 bg-linear-to-r from-blue-600 to-sky-600 text-white rounded-full hover:from-blue-700 hover:to-sky-700 transition-all duration-300 shadow-lg hover:shadow-xl font-semibold transform hover:scale-105 cursor-pointer"
          title="Open Filters"
        >
          <Filter className="w-5 h-5" />
        </button>
      )}

      {/* Filters Sidebar */}
      <CandidateFilters 
        isOpen={isFilterOpen} 
        onToggle={() => setIsFilterOpen(false)} 
      />
    </>
  );
};

export default CandidateFiltersWrapper;
