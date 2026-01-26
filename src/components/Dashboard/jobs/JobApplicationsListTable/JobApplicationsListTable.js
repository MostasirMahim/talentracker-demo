"use client";
import CandidateProfileForApplication from "../CandidateProfileForApplication/CandidateProfileForApplication";
import SmartPagination from "@/components/SmartPagination/SmartPagination";
import axiosInstance from "@/lib/axiosIntance";
import { useRouter } from "next/navigation";
import { LucideFileText, X } from "lucide-react";
import React, { useState } from "react";
import { toast } from "react-toastify";
import AdminSmartPagination from "@/components/SmartPagination/AdminSmartPagination";

const JobApplicationsListTable = ({ data = {} }) => {
  const router = useRouter();
  const [showResumeModal, setShowResumeModal] = useState(false);
  const [selectedResumeUrl, setSelectedResumeUrl] = useState("");
  const [isViewingResume, setIsViewingResume] = useState(false);

  const [showProfileModal, setShowProfileModal] = useState(false);
  const [candidateData, setCandidateData] = useState(null);
  const [isLoadingProfile, setIsLoadingProfile] = useState(false);
  const [selectedJobAppId, setSelectedJobAppId] = useState(null);

  const handleDownloadResume = async (id) => {
    try {
      const response = await axiosInstance.get(
        `/api/candidates/v1/candidates/download_resume/${id}/`,
        {
          responseType: "blob",
        },
      );
      if (response.status === 200) {
        const contentDisposition = response.headers["content-disposition"];

        let fileName = "resume.pdf";
        if (contentDisposition) {
          const fileNameMatch =
            contentDisposition.match(/filename="?([^"]+)"?/);
          if (fileNameMatch && fileNameMatch[1]) {
            fileName = fileNameMatch[1];
          }
        }
        const blob = new Blob([response.data]);
        const url = window.URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();

        // Cleanup
        a.remove();
        window.URL.revokeObjectURL(url);

        toast.success("Resume downloaded successfully");
      }
    } catch (error) {
      if (error?.response && error?.response?.data instanceof Blob) {
        try {
          const text = await error.response.data.text();
          const json = JSON.parse(text);

          if (json.errors) {
            Object.keys(json.errors).forEach((field) => {
              toast.error(`${field}: ${json.errors[field][0]}`);
            });
          } else {
            toast.error(json.message || "Error while downloading file.");
          }
        } catch {
          toast.error("Unexpected error while parsing server response.");
        }
      } else {
        toast.error(
          error.response?.data?.message || "Network error. Please try again.",
        );
      }
    }
  };

  const handleViewResume = async (id) => {
    try {
      setIsViewingResume(true);
      const response = await axiosInstance.get(
        `/api/candidates/v1/candidates/download_resume/${id}/`,
        {
          responseType: "blob",
        },
      );
      if (response.status === 200) {
        const blob = new Blob([response.data], { type: "application/pdf" });
        const url = window.URL.createObjectURL(blob);
        setSelectedResumeUrl(url);
        setShowResumeModal(true);
      }
    } catch (error) {
      toast.error("Failed to load resume. Please try again.");
    } finally {
      setIsViewingResume(false);
    }
  };

  const handleCloseModal = () => {
    setShowResumeModal(false);
    if (selectedResumeUrl) {
      window.URL.revokeObjectURL(selectedResumeUrl);
      setSelectedResumeUrl("");
    }
  };

  const handleViewProfile = async (job_application_id, candidate_id) => {
    try {
      setIsLoadingProfile(true);
      setSelectedJobAppId(job_application_id);
      const response = await axiosInstance.get(
        `/api/candidates/v1/candidates/${candidate_id}/?job_application=${job_application_id}`,
      );
      if (response.status === 200) {
        setCandidateData(response.data);
        setShowProfileModal(true);
      }
    } catch (error) {
      toast.error("Failed to load candidate profile.");
      console.error(error);
    } finally {
      setIsLoadingProfile(false);
    }
  };

  const handleCloseProfileModal = () => {
    setShowProfileModal(false);
    setCandidateData(null);
    setSelectedJobAppId(null);
  };

  const handleRefresh = () => {
    router.refresh();
  };

  return (
    <div className="overflow-x-auto bg-white shadow-md rounded-lg p-4">
      <div className="flex justify-between mb-3 align-baseline">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          Job applications
        </h2>
        <button
          onClick={() => handleRefresh()}
          className="px-3  bg-sky-600 text-white cursor-pointer rounded-md hover:bg-sky-700 transition-colors"
        >
          Refresh
        </button>
      </div>
      {data?.data?.length === 0 ? (
        <p className="text-gray-500 text-center py-4">
          No job applications found.
        </p>
      ) : (
        <>
          <table className="min-w-full border border-gray-200 text-sm">
            <thead className="bg-blue-600 text-white uppercase text-xs ">
              <tr>
                <th className="text-left py-3 px-4 border-b">ID</th>
                <th className="text-left py-3 px-4 border-b">Candidate name</th>
                <th className="text-left py-3 px-4 border-b">
                  Career Start Date
                </th>
                <th className="text-left py-3 px-4 border-b">
                  field of specialization
                </th>
                <th className="text-left py-3 px-4 border-b">email</th>
                <th className="text-left py-3 px-4 border-b">status</th>
                <th className="text-left py-3 px-4 border-b">is read</th>
                <th className="text-left py-3 px-4 border-b">Applied at</th>
                <th className="text-left py-3 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data?.data?.map((app) => (
                <tr
                  key={app.id}
                  className="hover:bg-gray-50 transition-colors duration-150"
                >
                  <td className="py-3 px-4 border-b">{app.id}</td>
                  <td className="py-3 px-4 border-b capitalize">
                    {app?.candidate?.full_name}
                  </td>
                  <td className="py-3 px-4 border-b">
                    {app?.candidate?.career_start_date}
                  </td>
                  <td className="py-3 px-4 border-b">
                    {app?.candidate?.field_of_specialization}
                  </td>
                  <td className="py-3 px-4 border-b">
                    {app?.candidate?.email}
                  </td>
                  <td
                    className={`py-3 px-4 border-b font-medium text-center
    ${
      app?.status === "pending"
        ? "text-yellow-600 bg-yellow-50"
        : app?.status === "accepted"
          ? "text-green-600 bg-green-50"
          : app?.status === "rejected"
            ? "text-red-600 bg-red-50"
            : app?.status === "reached"
              ? "text-blue-600 bg-blue-50"
              : ""
    }`}
                  >
                    {app?.status}
                  </td>

                  <td
                    className={`py-3 px-4 border-b text-center font-semibold
    ${
      app?.is_read
        ? "text-gray-600 bg-gray-50"
        : "text-indigo-600 bg-indigo-50 border-l-4 border-indigo-400"
    }`}
                  >
                    {app?.is_read ? "Read" : "Unread"}
                  </td>

                  <td className="py-3 px-4 border-b">
                    {new Date(app?.applied_at).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4 border-b">
                    <div className="flex gap-2">
                      <button
                        onClick={() =>
                          handleViewProfile(app?.id, app?.candidate?.id)
                        }
                        disabled={isLoadingProfile}
                        className="px-3 py-1 bg-blue-600 cursor-pointer text-white rounded-md hover:bg-blue-700 transition-colors"
                      >
                        {isLoadingProfile && selectedJobAppId === app.id
                          ? "..."
                          : "Profile"}
                      </button>
                      <button
                        onClick={() => handleViewResume(app?.candidate?.id)}
                        disabled={isViewingResume}
                        className="px-3 py-1 cursor-pointer bg-sky-600 text-white rounded-md hover:bg-sky-700 transition-colors flex items-center gap-1"
                      >
                        {isViewingResume ? "Loading..." : "View"}
                      </button>
                      <button
                        onClick={() => handleDownloadResume(app?.candidate?.id)}
                        className="px-3 py-1 cursor-pointer bg-gray-700 text-white rounded-md hover:bg-gray-800 transition-colors"
                      >
                        Download
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <AdminSmartPagination paginationData={data?.pagination} />

          {showResumeModal && (
            <div className="fixed inset-0 z-1050 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300">
              <div
                className="relative bg-white w-full max-w-4xl h-[90vh] rounded-xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between px-6 py-4 border-b bg-gray-50">
                  <div className="flex items-center gap-2 text-gray-800">
                    <LucideFileText className="w-5 h-5 text-blue-600" />
                    <h3 className="text-lg font-semibold">Resume Viewer</h3>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={handleCloseModal}
                      className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-500 hover:text-gray-700"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>
                </div>
                <div className="flex-1 bg-gray-100 relative overflow-hidden">
                  <iframe
                    src={`${selectedResumeUrl}#toolbar=0`}
                    className="w-full h-full border-none shadow-inner"
                    title="Resume Viewer"
                  />
                </div>
                <div className="px-6 py-3 border-t bg-gray-50 flex justify-end gap-3">
                  <button
                    onClick={handleCloseModal}
                    className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
          {showProfileModal && (
            <div className="fixed inset-0 z-1050 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300">
              <div
                className="relative bg-black w-full max-w-4xl h-[90vh] rounded-xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b bg-gray-50 shrink-0">
                  <h3 className="text-xl font-bold text-gray-800">
                    Candidate Details
                  </h3>
                  <button
                    onClick={handleCloseProfileModal}
                    className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-500 hover:text-gray-700"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Modal Content */}
                <div className="flex-1 overflow-y-auto p-2 sm:p-6 bg-gray-50">
                  <CandidateProfileForApplication
                    candidateData={candidateData}
                    job_application_id={selectedJobAppId}
                  />
                </div>

                {/* Modal Footer */}
                <div className="px-6 py-4 border-t bg-gray-50 flex justify-end shrink-0">
                  <button
                    onClick={handleCloseProfileModal}
                    className="px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors font-medium"
                  >
                    Done
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default JobApplicationsListTable;
