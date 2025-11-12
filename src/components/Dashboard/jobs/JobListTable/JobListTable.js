"use client";

import SmartPagination from "@/components/SmartPagination/SmartPagination";
import axiosInstance from "@/lib/axiosIntance";
import { useJob } from "@/stores/job_dependencies_update_store";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "react-toastify";

const JobListTable = ({ jobs = {} }) => {
  const router = useRouter();
  const setJob = useJob((state) => state.setJob);

  const handleDelete = async (id) => {
    try {
      const response = await axiosInstance.delete(`/api/jobs/v1/jobs/${id}/`);
      if (response.status == 200) {
        toast.success("Deleted successfully");
        router.refresh();
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  const handleUpdate = (id) => {
    const job = jobs?.data?.find((type) => type.id === id);
    setJob(job);
    router.push("/dashboard/jobs/post/?job_id=" + id);
  };

  const handleApplications = (id) => {
    router.push(`/dashboard/jobs/applications/${id}/`);
  };

  return (
    <div className="overflow-x-auto bg-white shadow-md rounded-lg p-4">
      <h2 className="text-xl font-semibold mb-4 text-gray-700">
        Published jobs
      </h2>
      {jobs?.data.length === 0 ? (
        <p className="text-gray-500 text-center py-4">No jobs found.</p>
      ) : (
        <>
          <table className="min-w-full border border-gray-200 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left py-3 px-4 border-b">ID</th>
                <th className="text-left py-3 px-4 border-b">Title</th>
                <th className="text-left py-3 px-4 border-b">Deadline</th>
                <th className="text-left py-3 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobs?.data?.map((job) => (
                <tr
                  key={job.id}
                  className="hover:bg-gray-50 transition-colors duration-150"
                >
                  <td className="py-3 px-4 border-b">{job.id}</td>
                  <td className="py-3 px-4 border-b capitalize">
                    <a href={`/career/jobs/${job.id}/`} target="_blank">
                      {job.title}
                    </a>
                  </td>
                  <td className="py-3 px-4 border-b capitalize">
                    {job.deadline}
                  </td>
                  <td className="py-3 px-4 border-b">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleUpdate(job.id)}
                        className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => handleDelete(job.id)}
                        className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => handleApplications(job.id)}
                        className="px-3 py-1 bg-blue-700 text-white rounded-md hover:bg-blue-800 transition-colors"
                      >
                        applications
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <SmartPagination paginationData={jobs?.pagination} />
        </>
      )}
    </div>
  );
};

export default JobListTable;
