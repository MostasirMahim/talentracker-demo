"use client";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useRouter, useSearchParams } from "next/navigation";
import { Filter, X, Search } from "lucide-react";
import SkillsModal from "../SkillsModal/SkillsModal";

const ApplicationFilters = ({ jobId, isOpen, onToggle }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Filter states
  const [isRead, setIsRead] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [experienceMin, setExperienceMin] = useState(0);
  const [experienceMax, setExperienceMax] = useState(0);
  const [specialization, setSpecialization] = useState("");
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [location, setLocation] = useState("");
  const [expectedSalary, setExpectedSalary] = useState("");
  const [designation, setDesignation] = useState("");
  const [appliedAt, setAppliedAt] = useState(null);
  const [status, setStatus] = useState("");
  const [showSkillsModal, setShowSkillsModal] = useState(false);

  const statusOptions = [
    { value: "", label: "All Status" },
    { value: "pending", label: "Pending" },
    { value: "accepted", label: "Accepted" },
    { value: "rejected", label: "Rejected" },
    { value: "reached", label: "Reached" },
  ];

  const handleFilter = () => {
    const params = new URLSearchParams(searchParams.toString());
    
    // Always keep job, page_size, and reset page to 1
    params.set("job", jobId);
    params.set("page", "1");
    const pageSize = searchParams.get("page_size") || "25";
    params.set("page_size", pageSize);

    // Add filters only if they have values
    if (isRead !== null) {
      params.set("is_read", isRead);
    } else {
      params.delete("is_read");
    }

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

    if (appliedAt) {
      // Format date in local timezone to avoid timezone shift issues
      const year = appliedAt.getFullYear();
      const month = String(appliedAt.getMonth() + 1).padStart(2, '0');
      const day = String(appliedAt.getDate()).padStart(2, '0');
      const formattedDate = `${year}-${month}-${day}`;
      params.set("applied_at", formattedDate);
    } else {
      params.delete("applied_at");
    }

    if (status) {
      params.set("status", status);
    } else {
      params.delete("status");
    }

    router.push(`?${params.toString()}`);
    onToggle();
  };

  const handleClear = () => {
    setIsRead(null);
    setPhoneNumber("");
    setExperienceMin(0);
    setExperienceMax(0);
    setSpecialization("");
    setSelectedSkills([]);
    setLocation("");
    setExpectedSalary("");
    setDesignation("");
    setAppliedAt(null);
    setStatus("");

    const params = new URLSearchParams();
    params.set("job", jobId);
    params.set("page", "1");
    const pageSize = searchParams.get("page_size") || "25";
    params.set("page_size", pageSize);
    
    router.push(`?${params.toString()}`);
  };

  const handleSkillsSelect = (skills) => {
    setSelectedSkills(skills);
  };

  const getSelectedSkillsDisplay = () => {
    if (selectedSkills.length === 0) return "Select skills";
    if (selectedSkills.length === 1) return "1 skill selected";
    return `${selectedSkills.length} skills selected`;
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Filter Panel */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden mb-6">
        {/* Header */}
        <div className="bg-linear-to-r from-blue-600 to-sky-600 px-4 py-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-white" />
              <h3 className="text-base font-bold text-white">Filter Applications</h3>
            </div>
            <button
              onClick={handleClear}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-all duration-200 backdrop-blur-sm text-sm"
            >
              <X className="w-3.5 h-3.5" />
              <span className="text-xs font-medium">Clear All</span>
            </button>
          </div>
        </div>

        {/* Filter Fields */}
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            
            {/* Is Read Toggle */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Read Status
              </label>
              <div className="flex gap-2">
                <button
                  onClick={() => setIsRead(null)}
                  className={`flex-1 px-4 py-2.5 rounded-lg font-medium transition-all duration-200 ${
                    isRead === null
                      ? "bg-linear-to-r from-blue-600 to-sky-600 text-white shadow-md"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setIsRead("true")}
                  className={`flex-1 px-4 py-2.5 rounded-lg font-medium transition-all duration-200 ${
                    isRead === "true"
                      ? "bg-linear-to-r from-green-600 to-emerald-600 text-white shadow-md"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  Read
                </button>
                <button
                  onClick={() => setIsRead("false")}
                  className={`flex-1 px-4 py-2.5 rounded-lg font-medium transition-all duration-200 ${
                    isRead === "false"
                      ? "bg-linear-to-r from-indigo-600 to-purple-600 text-white shadow-md"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  Unread
                </button>
              </div>
            </div>

            {/* Status Select */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Application Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-200 bg-white text-gray-700 font-medium"
              >
                {statusOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
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

            {/* Experience Range */}
            <div className="space-y-2 md:col-span-2 lg:col-span-3">
              <label className="block text-sm font-semibold text-gray-700">
                Experience Range (Years)
              </label>
              <div className="bg-linear-to-br from-blue-50 to-sky-50 p-4 rounded-lg border border-blue-100">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-gray-600">Min:</span>
                    <span className={`text-xl font-bold ${experienceMin > 0 ? 'text-blue-600' : 'text-gray-400'}`}>
                      {experienceMin}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-gray-600">Max:</span>
                    <span className={`text-xl font-bold ${experienceMax > 0 ? 'text-sky-600' : 'text-gray-400'}`}>
                      {experienceMax}
                    </span>
                  </div>
                </div>
                <div className="space-y-3">
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
                        background: `linear-gradient(to right, #2563eb ${experienceMin}%, #dbeafe ${experienceMin}%)`
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
                        background: `linear-gradient(to right, #0ea5e9 ${experienceMax}%, #e0f2fe ${experienceMax}%)`
                      }}
                    />
                  </div>
                </div>
              </div>
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
                <span className={selectedSkills.length > 0 ? "text-gray-700 font-medium" : "text-gray-400"}>
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

            {/* Applied Date */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Applied Date
              </label>
              <DatePicker
                selected={appliedAt}
                onChange={(date) => setAppliedAt(date)}
                dateFormat="yyyy-MM-dd"
                placeholderText="Select date"
                className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-200"
                wrapperClassName="w-full"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-2 mt-5">
            <button
              onClick={handleFilter}
              className="flex-1 flex items-center justify-center gap-2 px-5 py-2.5 bg-linear-to-r from-blue-600 to-sky-600 text-white rounded-lg hover:from-blue-700 hover:to-sky-700 transition-all duration-300 shadow-md hover:shadow-lg font-semibold text-sm"
            >
              <Filter className="w-4 h-4" />
              Apply Filters
            </button>
            <button
              onClick={handleClear}
              className="flex-1 flex items-center justify-center gap-2 px-5 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all duration-300 font-semibold text-sm border border-gray-200"
            >
              <X className="w-4 h-4" />
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
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
          transition: all 0.2s;
        }
        
        .slider-thumb-blue::-webkit-slider-thumb:hover {
          background: #1d4ed8;
          transform: scale(1.1);
          box-shadow: 0 4px 8px rgba(0,0,0,0.3);
        }

        .slider-thumb-sky::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #0ea5e9;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
          transition: all 0.2s;
        }
        
        .slider-thumb-sky::-webkit-slider-thumb:hover {
          background: #0284c7;
          transform: scale(1.1);
          box-shadow: 0 4px 8px rgba(0,0,0,0.3);
        }

        .react-datepicker-wrapper {
          width: 100%;
        }

        .react-datepicker {
          font-family: inherit;
          border: 2px solid #e5e7eb;
          border-radius: 0.75rem;
          box-shadow: 0 10px 25px rgba(0,0,0,0.1);
        }

        .react-datepicker__header {
          background-color: #2563eb;
          border-bottom: none;
          border-radius: 0.625rem 0.625rem 0 0;
          padding-top: 1rem;
        }

        .react-datepicker__current-month,
        .react-datepicker__day-name {
          color: white;
          font-weight: 600;
        }

        .react-datepicker__day--selected {
          background-color: #0ea5e9;
          border-radius: 0.5rem;
        }

        .react-datepicker__day:hover {
          background-color: #dbeafe;
          border-radius: 0.5rem;
        }
      `}</style>
    </>
  );
};

export default ApplicationFilters;
