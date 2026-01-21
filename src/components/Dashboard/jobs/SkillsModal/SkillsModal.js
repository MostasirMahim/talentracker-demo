"use client";
import React, { useState, useEffect } from "react";
import axiosInstance from "@/lib/axiosIntance";
import { X, Search, Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "react-toastify";

const SkillsModal = ({ onClose, onSelect, selectedSkills = [] }) => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [tempSelectedSkills, setTempSelectedSkills] = useState([...selectedSkills]);
  const [skillNamesMap, setSkillNamesMap] = useState({});
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalCount: 0,
    pageSize: 20,
  });

  const fetchSkills = async (page = 1, search = "") => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: page.toString(),
        page_size: pagination.pageSize.toString(),
      });
      
      if (search.trim()) {
        params.append("skill", search.trim());
      }

      const response = await axiosInstance.get(
        `/api/jobs/v1/job_applications/skills/?${params.toString()}`,
      );
      
      if (response.status === 200) {
        const fetchedSkills = response.data.data || [];
        setSkills(fetchedSkills);
        
        // Update skill names map with new skills
        setSkillNamesMap((prev) => {
          const newMap = { ...prev };
          fetchedSkills.forEach((skill) => {
            newMap[skill.id] = skill.name;
          });
          return newMap;
        });
        
        setPagination({
          currentPage: response.data.pagination?.current_page || 1,
          totalPages: response.data.pagination?.total_pages || 1,
          totalCount: response.data.pagination?.total_count || 0,
          pageSize: pagination.pageSize,
        });
      }
    } catch (error) {
      toast.error("Failed to fetch skills. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills(1, "");
  }, []);

  const handleSearch = () => {
    fetchSkills(1, searchQuery);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    fetchSkills(1, "");
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      fetchSkills(newPage, searchQuery);
    }
  };

  const toggleSkill = (skillId) => {
    setTempSelectedSkills((prev) => {
      if (prev.includes(skillId)) {
        return prev.filter((id) => id !== skillId);
      } else {
        return [...prev, skillId];
      }
    });
  };

  const handleSelect = () => {
    onSelect(tempSelectedSkills);
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  const getSkillName = (skillId) => {
    if (skillNamesMap[skillId]) {
      return skillNamesMap[skillId];
    }
    const skill = skills.find((s) => s.id === skillId);
    return skill ? skill.name : `Skill ${skillId}`;
  };

  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative bg-white w-full max-w-4xl max-h-[85vh] rounded-xl shadow-2xl flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-linear-to-r from-blue-600 to-sky-600 px-4 py-3 flex items-center justify-between shrink-0">
          <h3 className="text-lg font-bold text-white">Select Skills</h3>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-white/20 rounded-full transition-all duration-200 text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="px-4 py-3 border-b bg-gray-50 shrink-0">
          <div className="flex gap-2">
            <div className="w-full relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                placeholder="Search skills..."
                className="w-full px-3 py-2 pl-9 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-200 text-sm"
              />
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
            <button
              onClick={handleSearch}
              disabled={loading}
              className="px-4 py-2 bg-linear-to-r from-blue-600 to-sky-600 text-white rounded-lg hover:from-blue-700 hover:to-sky-700 transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5 text-sm"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Searching...
                </>
              ) : (
                <>
                  <Search className="w-4 h-4" />
                  Search
                </>
              )}
            </button>
            {searchQuery && (
              <button
                onClick={handleClearSearch}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all duration-200 font-medium flex items-center gap-1.5 text-sm"
              >
                <X className="w-4 h-4" />
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Main Content - Split Layout */}
        <div className="flex-1 flex flex-col md:flex-row overflow-y-auto md:min-h-[300px]">
          {/* Left Side - Skills List */}
          <div className="flex-1 flex flex-col border-r">
            <div className="px-4 py-2 bg-gray-100 border-b">
              <h4 className="text-sm font-semibold text-gray-700">Available Skills</h4>
            </div>
            <div className="flex-1 overflow-y-auto px-4 py-3 h-auto ">
              {loading ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <Loader2 className="w-10 h-10 text-blue-600 animate-spin mb-3" />
                  <p className="text-gray-500 font-medium text-sm">Loading skills...</p>
                </div>
              ) : skills.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                    <Search className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-gray-500 font-medium">No skills found</p>
                  <p className="text-gray-400 text-xs mt-1">Try adjusting your search</p>
                </div>
              ) : (
                <div className="space-y-1.5">
                  {skills.map((skill) => (
                    <button
                      key={skill.id}
                      onClick={() => toggleSkill(skill.id)}
                      className={`w-full px-3 py-2 rounded-lg border transition-all duration-200 text-left text-sm ${
                        tempSelectedSkills.includes(skill.id)
                          ? "border-blue-500 bg-blue-50 font-medium text-blue-700"
                          : "border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50/50 text-gray-700"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="truncate">{skill.name}</span>
                        {tempSelectedSkills.includes(skill.id) && (
                          <div className="w-4 h-4 rounded-full bg-blue-600 flex items-center justify-center shrink-0 ml-2">
                            <svg
                              className="w-3 h-3 text-white"
                              fill="none"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="3"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path d="M5 13l4 4L19 7"></path>
                            </svg>
                          </div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {/* Pagination */}
            {!loading && skills.length > 0 && (
              <div className="px-4 py-2 border-t bg-gray-50 shrink-0">
                <div className="flex items-center justify-between">
                  <p className="text-xs text-gray-600">
                    {((pagination.currentPage - 1) * pagination.pageSize) + 1}-
                    {Math.min(pagination.currentPage * pagination.pageSize, pagination.totalCount)} of {pagination.totalCount}
                  </p>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handlePageChange(pagination.currentPage - 1)}
                      disabled={pagination.currentPage === 1}
                      className="p-1.5 rounded border border-gray-200 hover:border-blue-500 hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <span className="px-3 py-1 bg-white border border-gray-200 rounded font-medium text-xs">
                      {pagination.currentPage} / {pagination.totalPages}
                    </span>
                    <button
                      onClick={() => handlePageChange(pagination.currentPage + 1)}
                      disabled={pagination.currentPage === pagination.totalPages}
                      className="p-1.5 rounded border border-gray-200 hover:border-blue-500 hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Side - Selected Skills */}
          <div className="w-full md:w-80 flex flex-col bg-gray-50">
            <div className="px-4 py-2 bg-blue-600 border-b border-blue-700">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-semibold text-white">
                  Selected ({tempSelectedSkills.length})
                </h4>
                {tempSelectedSkills.length > 0 && (
                  <button
                    onClick={() => setTempSelectedSkills([])}
                    className="text-xs text-white hover:text-blue-100 font-medium"
                  >
                    Clear all
                  </button>
                )}
              </div>
            </div>
            <div className="flex-1 overflow-y-auto px-4 py-3  h-auto ">
              {tempSelectedSkills.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-3">
                    <Search className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-gray-500 font-medium text-sm">No skills selected</p>
                  <p className="text-gray-400 text-xs mt-1">Click skills to select</p>
                </div>
              ) : (
                <div className="space-y-1.5">
                  {tempSelectedSkills.map((skillId) => (
                    <div
                      key={skillId}
                      className="flex items-center justify-between px-3 py-2 bg-white border border-blue-200 rounded-lg text-sm"
                    >
                      <span className="text-gray-700 font-medium truncate">
                        {getSkillName(skillId)}
                      </span>
                      <button
                        onClick={() => toggleSkill(skillId)}
                        className="hover:bg-red-100 rounded-full p-1 transition-colors shrink-0 ml-2"
                      >
                        <X className="w-3.5 h-3.5 text-red-600" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-4 py-3 border-t bg-gray-50 flex gap-2 shrink-0">
          <button
            onClick={handleCancel}
            className="flex-1 px-5 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all duration-200 font-semibold border border-gray-200 text-sm"
          >
            Cancel
          </button>
          <button
            onClick={handleSelect}
            className="flex-1 px-5 py-2.5 bg-linear-to-r from-blue-600 to-sky-600 text-white rounded-lg hover:from-blue-700 hover:to-sky-700 transition-all duration-200 font-semibold shadow-md hover:shadow-lg text-sm"
          >
            Select ({tempSelectedSkills.length})
          </button>
        </div>
      </div>
    </div>
  );
};

export default SkillsModal;
