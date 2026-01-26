"use client";
import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Filter, X, Search } from "lucide-react";
import SkillsModal from "../../jobs/SkillsModal/SkillsModal";

const CandidateFilters = ({ isOpen, onToggle }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Filter states
  const [phoneNumber, setPhoneNumber] = useState("");
  const [experienceMin, setExperienceMin] = useState(0);
  const [experienceMax, setExperienceMax] = useState(0);
  const [specialization, setSpecialization] = useState("");
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [location, setLocation] = useState("");
  const [expectedSalary, setExpectedSalary] = useState("");
  const [designation, setDesignation] = useState("");
  const [showSkillsModal, setShowSkillsModal] = useState(false);

  const handleFilter = () => {
    const params = new URLSearchParams(searchParams.toString());

    // Reset page to 1
    params.set("page", "1");
    const pageSize = searchParams.get("page_size") || "25";
    params.set("page_size", pageSize);

    // Add filters only if they have values
    if (phoneNumber.trim()) {
      params.set("phone_number", phoneNumber.trim());
    } else {
      params.delete("phone_number");
    }

    if (experienceMin > 0) {
      params.set("experience_min", experienceMin);
    } else {
      params.delete("experience_min");
    }

    if (experienceMax > 0) {
      params.set("experience_max", experienceMax);
    } else {
      params.delete("experience_max");
    }

    if (specialization.trim()) {
      params.set("specialization", specialization.trim());
    } else {
      params.delete("specialization");
    }

    if (selectedSkills.length > 0) {
      params.set("skills", selectedSkills.join(","));
    } else {
      params.delete("skills");
    }

    if (location.trim()) {
      params.set("location", location.trim());
    } else {
      params.delete("location");
    }

    if (expectedSalary) {
      params.set("expected_salary", expectedSalary);
    } else {
      params.delete("expected_salary");
    }

    if (designation.trim()) {
      params.set("designation", designation.trim());
    } else {
      params.delete("designation");
    }

    router.push(`?${params.toString()}`);
    onToggle();
  };

  const handleClear = () => {
    setPhoneNumber("");
    setExperienceMin(0);
    setExperienceMax(0);
    setSpecialization("");
    setSelectedSkills([]);
    setLocation("");
    setExpectedSalary("");
    setDesignation("");


    const params = new URLSearchParams();
    params.set("page", "1");
    const pageSize = searchParams.get("page_size") || "10";
    params.set("page_size", pageSize);

    router.push(`?${params.toString()}`);
    onToggle();
  };

  const handleSkillsSelect = (skills) => {
    setSelectedSkills(skills);
  };

  const getSelectedSkillsDisplay = () => {
    if (selectedSkills.length === 0) return "Select skills";
    if (selectedSkills.length === 1) return "1 skill selected";
    return `${selectedSkills.length} skills selected`;
  };

  return (
    <>
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => onToggle()}
      />

      {/* Sidebar Panel */}
      <div 
        className={`fixed inset-y-0 right-0 z-50 w-full md:w-[400px] bg-white shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex-none bg-linear-to-r from-blue-600 to-sky-600 px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-white" />
              <h3 className="text-lg font-bold text-white">
                Filter Candidates
              </h3>
            </div>
            <button
              onClick={() => onToggle()}
              className="p-1 text-white hover:bg-white/20 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
          <div className="space-y-5">
            {/* Experience Range */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Experience Range (Years)
              </label>
              <div className="bg-linear-to-br from-blue-50 to-sky-50 p-4 rounded-lg border border-blue-100">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-gray-600">
                      Min:
                    </span>
                    <span
                      className={`text-xl font-bold ${experienceMin > 0 ? "text-blue-600" : "text-gray-400"}`}
                    >
                      {experienceMin}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-gray-600">
                      Max:
                    </span>
                    <span
                      className={`text-xl font-bold ${experienceMax > 0 ? "text-sky-600" : "text-gray-400"}`}
                    >
                      {experienceMax}
                    </span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={experienceMin}
                      onChange={(e) => {
                        const val = parseInt(e.target.value);
                        setExperienceMin(val);
                        if (val > experienceMax && experienceMax > 0) {
                          setExperienceMax(val);
                        }
                      }}
                      className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer slider-thumb-blue"
                      style={{
                        background: `linear-gradient(to right, #2563eb ${experienceMin}%, #dbeafe ${experienceMin}%)`,
                      }}
                    />
                  </div>
                  <div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={experienceMax}
                      onChange={(e) => {
                        const val = parseInt(e.target.value);
                        setExperienceMax(val);
                        if (val < experienceMin && val > 0) {
                          setExperienceMin(val);
                        }
                      }}
                      className="w-full h-2 bg-sky-200 rounded-lg appearance-none cursor-pointer slider-thumb-sky"
                      style={{
                        background: `linear-gradient(to right, #0ea5e9 ${experienceMax}%, #e0f2fe ${experienceMax}%)`,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Phone Number */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Phone Number
              </label>
              <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Enter phone number"
                className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-200"
              />
            </div>

            {/* Specialization */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Specialization
              </label>
              <input
                type="text"
                value={specialization}
                onChange={(e) => setSpecialization(e.target.value)}
                placeholder="e.g., Software Development"
                className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-200"
              />
            </div>

            {/* Skills Selector */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Skills
              </label>
              <button
                onClick={() => setShowSkillsModal(true)}
                className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg hover:border-blue-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-200 bg-white text-left flex items-center justify-between group"
              >
                <span
                  className={
                    selectedSkills.length > 0
                      ? "text-gray-700 font-medium"
                      : "text-gray-400"
                  }
                >
                  {getSelectedSkillsDisplay()}
                </span>
                <Search className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
              </button>
            </div>

            {/* Location */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Location
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g., Dhaka, Bangladesh"
                className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-200"
              />
            </div>

            {/* Expected Salary */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Expected Salary
              </label>
              <input
                type="number"
                value={expectedSalary}
                onChange={(e) => setExpectedSalary(e.target.value)}
                placeholder="Enter amount"
                className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-200"
              />
            </div>

            {/* Designation */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Designation
              </label>
              <input
                type="text"
                value={designation}
                onChange={(e) => setDesignation(e.target.value)}
                placeholder="e.g., Senior Developer"
                className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-200"
              />
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex-none p-4 border-t border-gray-200 bg-gray-50/50">
          <div className="flex flex-col gap-3">
            <button
              onClick={handleFilter}
              className="w-full flex items-center justify-center gap-2 px-5 py-3 bg-linear-to-r from-blue-600 to-sky-600 text-white rounded-lg hover:from-blue-700 hover:to-sky-700 transition-all duration-300 shadow-md hover:shadow-lg font-bold"
            >
              <Filter className="w-5 h-5" />
              Apply Filters
            </button>
            <button
              onClick={handleClear}
              className="w-full flex items-center justify-center gap-2 px-5 py-3 bg-white text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-300 font-semibold border border-gray-300 hover:border-gray-400"
            >
              <X className="w-5 h-5" />
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      {/* Skills Modal */}
      {showSkillsModal && (
        <SkillsModal
          onClose={() => setShowSkillsModal(false)}
          onSelect={handleSkillsSelect}
          selectedSkills={selectedSkills}
        />
      )}

      <style jsx global>{`
        .slider-thumb-blue::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #2563eb;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
          transition: all 0.2s;
        }

        .slider-thumb-blue::-webkit-slider-thumb:hover {
          background: #1d4ed8;
          transform: scale(1.1);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
        }

        .slider-thumb-sky::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #0ea5e9;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
          transition: all 0.2s;
        }

        .slider-thumb-sky::-webkit-slider-thumb:hover {
          background: #0284c7;
          transform: scale(1.1);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
        }
      `}</style>
    </>
  );
};

export default CandidateFilters;
