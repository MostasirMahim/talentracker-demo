"use client";
import SmartPagination from "@/components/SmartPagination/SmartPagination";
import axiosInstance from "@/lib/axiosIntance";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "react-toastify";

function CandidateList({ data }) {
  const candidates = data?.data;
  const router = useRouter();

  const handleDownloadResume = async (id) => {
    try {
      const response = await axiosInstance.get(
        `/api/candidates/v1/candidates/download_resume/${id}/`,
        {
          responseType: "blob",
        }
      );
      if (response.status === 200) {
        // Extract filename if provided by the backend
        const contentDisposition = response.headers["content-disposition"];

        let fileName = "resume.pdf";
        if (contentDisposition) {
          const fileNameMatch =
            contentDisposition.match(/filename="?([^"]+)"?/);
          if (fileNameMatch && fileNameMatch[1]) {
            fileName = fileNameMatch[1];
          }
        }

        // Create a blob URL and trigger the download
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
      // If the request itself failed (network/server)
      if (error?.response && error?.response?.data instanceof Blob) {
        try {
          // Try to parse blob to JSON
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
          error.response?.data?.message || "Network error. Please try again."
        );
      }
    }
  };
  const handleViewProfile = (candidate_id) => {
    router.push(
      `/dashboard/candidates/view_profile/?candidate=${candidate_id}`
    );
  };

  const handleRefresh = () => {
    router.refresh();
  };
  return (
    <div>
      <div className="overflow-x-auto bg-white shadow-md rounded-lg p-4">
        <div className="flex justify-between mb-3 align-baseline">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Candidates
          </h2>
          <button
            onClick={() => handleRefresh()}
            className="px-3  bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
          >
            Refresh
          </button>
        </div>
        {data?.data?.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No candidates found.</p>
        ) : (
          <>
            <table className="min-w-full border border-gray-200 text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left py-3 px-4 border-b">ID</th>
                  <th className="text-left py-3 px-4 border-b">
                    Candidate name
                  </th>
                  <th className="text-left py-3 px-4 border-b">
                    Career Start Date
                  </th>
                  <th className="text-left py-3 px-4 border-b">
                    field_of_specialization
                  </th>
                  <th className="text-left py-3 px-4 border-b">email</th>

                  <th className="text-left py-3 px-4 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {candidates?.map((app) => (
                  <tr
                    key={app.id}
                    className="hover:bg-gray-50 transition-colors duration-150"
                  >
                    <td className="py-3 px-4 border-b">{app.id}</td>
                    <td className="py-3 px-4 border-b capitalize">
                      {app?.full_name}
                    </td>
                    <td className="py-3 px-4 border-b">
                      {app?.career_start_date}
                    </td>
                    <td className="py-3 px-4 border-b">
                      {app?.field_of_specialization}
                    </td>
                    <td className="py-3 px-4 border-b">{app?.email}</td>

                    <td className="py-3 px-4 border-b">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleViewProfile(app?.id)}
                          className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                        >
                          Profile
                        </button>
                        <button
                          onClick={() => handleDownloadResume(app?.id)}
                          className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                        >
                          Resume
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <SmartPagination paginationData={data?.pagination} />
          </>
        )}
      </div>
    </div>
  );
}

export default CandidateList;
