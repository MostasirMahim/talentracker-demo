"use client";
import React, { useState, useEffect } from "react";
import axiosInstance from "@/lib/axiosIntance";
import AdminSmartPagination from "@/components/SmartPagination/AdminSmartPagination";
import { toast } from "react-toastify";
import Image from "next/image";

export default function AllCandidateTestimonialList({
  testimonials: initialTestimonials,
}) {
  // State for testimonials data
  const [testimonials, setTestimonials] = useState([]);
  const [paginationData, setPaginationData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // State for search and filter
  const [searchTerm, setSearchTerm] = useState("");
  const [filterPublished, setFilterPublished] = useState("all");

  // State for modals
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showPublishModal, setShowPublishModal] = useState(false);
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);
  const [pendingPublishState, setPendingPublishState] = useState(null);

  // Update state when props change (pagination, new data from server)
  useEffect(() => {
    if (initialTestimonials) {
      setTestimonials(initialTestimonials.data || []);
      setPaginationData(initialTestimonials.pagination || {});
    }
  }, [initialTestimonials]);

  // Filter testimonials based on search and publish filter
  const filteredTestimonials = testimonials.filter((item) => {
    const matchesSearch =
      item.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.company_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.designation?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.message?.toLowerCase().includes(searchTerm.toLowerCase());

    if (filterPublished === "published")
      return matchesSearch && item.is_published === true;
    if (filterPublished === "unpublished")
      return matchesSearch && item.is_published === false;
    return matchesSearch;
  });

  // Handle publish/unpublish toggle
  const handlePublishToggle = (testimonial) => {
    setSelectedTestimonial(testimonial);
    setPendingPublishState(!testimonial.is_published);
    setShowPublishModal(true);
  };

  // Confirm publish/unpublish
  const confirmPublishToggle = async () => {
    if (!selectedTestimonial) return;

    const newPublishState = pendingPublishState;
    const originalState = selectedTestimonial.is_published;

    // Optimistic update
    setTestimonials((prev) =>
      prev.map((item) =>
        item.id === selectedTestimonial.id
          ? { ...item, is_published: newPublishState }
          : item,
      ),
    );
    setShowPublishModal(false);

    try {
      const response = await axiosInstance.patch(
        `/api/candidates/v1/candidates/testimonials/${selectedTestimonial.id}/`,
        { is_published: newPublishState },
      );

      if (response.data && response.data.code === 200) {
        toast.success(
          `Testimonial ${newPublishState ? "published" : "unpublished"} successfully`,
        );
      } else {
        // Revert if failed
        setTestimonials((prev) =>
          prev.map((item) =>
            item.id === selectedTestimonial.id
              ? { ...item, is_published: originalState }
              : item,
          ),
        );
        toast.error(response.data?.message || "Update failed");
      }
    } catch (error) {
      // Revert on error
      setTestimonials((prev) =>
        prev.map((item) =>
          item.id === selectedTestimonial.id
            ? { ...item, is_published: originalState }
            : item,
        ),
      );
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setSelectedTestimonial(null);
      setPendingPublishState(null);
    }
  };

  // Handle delete click
  const handleDeleteClick = (testimonial) => {
    setSelectedTestimonial(testimonial);
    setShowDeleteModal(true);
  };

  // Confirm delete
  const confirmDelete = async () => {
    if (!selectedTestimonial) return;

    const deletedId = selectedTestimonial.id;

    // Optimistic update
    setTestimonials((prev) => prev.filter((item) => item.id !== deletedId));
    setShowDeleteModal(false);

    try {
      await axiosInstance.delete(
        `/api/candidates/v1/candidates/testimonials/${deletedId}/`,
      );
      toast.success("Testimonial deleted successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Delete failed");
      // You might want to refetch data here if delete fails
    } finally {
      setSelectedTestimonial(null);
    }
  };

  // Cancel modals
  const closeModals = () => {
    setShowDeleteModal(false);
    setShowPublishModal(false);
    setSelectedTestimonial(null);
    setPendingPublishState(null);
  };

  // // Show loading state
  // if (!testimonials.length && !isLoading) {
  //   return (
  //     <div className="space-y-6">
  //       <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
  //         <p className="text-gray-500">No testimonials found.</p>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="space-y-6">
      {/* Search and Filter Section */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between bg-white p-5 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-xl font-semibold text-gray-800">
          Candidate Testimonials
        </h2>
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          {/* Search */}
          <div className="relative flex-1 md:w-64">
            <input
              type="text"
              placeholder="Search by name, company, message..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            />
            <svg
              className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          {/* Filter Dropdown */}
          <select
            value={filterPublished}
            onChange={(e) => setFilterPublished(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
          >
            <option value="all">All Status</option>
            <option value="published">Published</option>
            <option value="unpublished">Unpublished</option>
          </select>
        </div>
      </div>

      {/* Testimonials Table with Horizontal Scroll */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                >
                  ID
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                >
                  Image
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                >
                  Name & Company
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                >
                  Message
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTestimonials.length > 0 ? (
                filteredTestimonials.map((testimonial) => (
                  <tr
                    key={testimonial.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">  
                    {testimonial.id}
                      </td>
                    {/* Image */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex-shrink-0 h-14 w-14 rounded-full overflow-hidden bg-gray-100 border border-gray-200">
                        {testimonial.image ? (
                          <Image
                            src={
                              `${process.env.NEXT_PUBLIC_BACKEND_API_URL}${testimonial.image}` ||
                              "/images/blog/blog1.jpg"
                            }
                            alt={testimonial.full_name}
                            className="h-14 w-14 object-cover"
                            width={56}
                            height={56}
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = `https://via.placeholder.com/56?text=${testimonial.full_name?.charAt(0)}`;
                            }}
                          />
                        ) : (
                          <div className="h-14 w-14 bg-blue-100 flex items-center justify-center text-blue-600 font-semibold text-lg">
                            {testimonial.full_name?.charAt(0) || "?"}
                          </div>
                        )}
                      </div>
                    </td>

                    {/* Name, Company, Designation */}
                    <td className="px-6 py-4 max-w-xs">
                      <div className="text-sm font-medium text-gray-900">
                        {testimonial.full_name}
                      </div>
                      <div className="text-sm text-blue-600 font-medium">
                        {testimonial.company_name}
                      </div>
                      <div className="text-xs text-gray-500">
                        {testimonial.designation}
                      </div>
                    </td>

                    {/* Full Message (no cut) */}
                    <td className="px-6 py-4 max-w-md">
                      <p className="text-sm text-gray-700 whitespace-normal break-words leading-relaxed">
                        {testimonial.message}
                      </p>
                    </td>

                    {/* Status Badge */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          testimonial.is_published
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {testimonial.is_published ? "Published" : "Unpublished"}
                      </span>
                    </td>

                    {/* Action Buttons */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      {testimonial.is_published ? (
                        <button
                          onClick={() => handlePublishToggle(testimonial)}
                          className="inline-flex items-center px-3 py-1.5 bg-amber-50 border border-amber-300 rounded-md text-xs font-medium text-amber-700 hover:bg-amber-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-colors"
                        >
                          <svg
                            className="h-4 w-4 mr-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                            />
                          </svg>
                          Unpublish
                        </button>
                      ) : (
                        <button
                          onClick={() => handlePublishToggle(testimonial)}
                          className="inline-flex items-center px-3 py-1.5 bg-blue-50 border border-blue-300 rounded-md text-xs font-medium text-blue-700 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                        >
                          <svg
                            className="h-4 w-4 mr-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-4.596a9 9 0 0114.14 0M12 8a4 4 0 100-8 4 4 0 000 8z"
                            />
                          </svg>
                          Publish
                        </button>
                      )}
                      <button
                        onClick={() => handleDeleteClick(testimonial)}
                        className="inline-flex items-center px-3 py-1.5 bg-red-50 border border-red-300 rounded-md text-xs font-medium text-red-700 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                      >
                        <svg
                          className="h-4 w-4 mr-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="px-6 py-12 text-center text-gray-500"
                  >
                    No testimonials found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {paginationData && Object.keys(paginationData).length > 0 && (
        <div className="mt-6">
          <AdminSmartPagination paginationData={paginationData} />
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedTestimonial && (
        <div className="fixed inset-0  bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-2xl transform transition-all">
            <div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full">
              <svg
                className="h-6 w-6 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </div>
            <h3 className="mt-4 text-lg font-medium text-gray-900 text-center">
              Delete Testimonial
            </h3>
            <p className="mt-2 text-sm text-gray-500 text-center">
              Are you sure you want to delete the testimonial by{" "}
              <span className="font-semibold">
                {selectedTestimonial.full_name}
              </span>
              ? This action cannot be undone.
            </p>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={closeModals}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Publish/Unpublish Confirmation Modal */}
      {showPublishModal && selectedTestimonial && (
        <div className="fixed inset-0  bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-2xl transform transition-all">
            <div className="flex items-center justify-center w-12 h-12 mx-auto bg-blue-100 rounded-full">
              <svg
                className="h-6 w-6 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-4.596a9 9 0 0114.14 0M12 8a4 4 0 100-8 4 4 0 000 8z"
                />
              </svg>
            </div>
            <h3 className="mt-4 text-lg font-medium text-gray-900 text-center">
              {pendingPublishState ? "Publish" : "Unpublish"} Testimonial
            </h3>
            <p className="mt-2 text-sm text-gray-500 text-center">
              Are you sure you want to{" "}
              {pendingPublishState ? "publish" : "unpublish"} the testimonial by{" "}
              <span className="font-semibold">
                {selectedTestimonial.full_name}
              </span>
              ?
            </p>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={closeModals}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmPublishToggle}
                className={`px-4 py-2 text-white rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                  pendingPublishState
                    ? "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500"
                    : "bg-amber-600 hover:bg-amber-700 focus:ring-amber-500"
                }`}
              >
                {pendingPublishState ? "Publish" : "Unpublish"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
