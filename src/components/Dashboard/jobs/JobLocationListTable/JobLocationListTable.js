"use client";

import axiosInstance from "@/lib/axiosIntance";
import { useJobLocation } from "@/stores/job_dependencies_update_store";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "react-toastify";

const JobLocationListTable = ({ jobLocation = {} }) => {
  const router = useRouter();
  const setLocation = useJobLocation((state) => state.setLocation);

  const handleDelete = async (id) => {
    try {
      const response = await axiosInstance.delete(
        `/api/jobs/v1/job_locations/${id}/`
      );
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
    const location = jobLocation?.data?.find((type) => type.id === id);
    setLocation(location);
    router.push("/dashboard/jobs/job_locations/create/?location_id=" + id);
  };

  return (
    <div className="overflow-x-auto bg-white shadow-md rounded-lg p-4">
      <h2 className="text-xl font-semibold mb-4 text-gray-700">
        Job locations
      </h2>
      {jobLocation?.data.length === 0 ? (
        <p className="text-gray-500 text-center py-4">No locations found.</p>
      ) : (
        <table className="min-w-full border border-gray-200 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left py-3 px-4 border-b">ID</th>
              <th className="text-left py-3 px-4 border-b">City</th>
              <th className="text-left py-3 px-4 border-b">Country</th>
              <th className="text-left py-3 px-4 border-b">Created At</th>
              <th className="text-left py-3 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobLocation?.data?.map((type) => (
              <tr
                key={type.id}
                className="hover:bg-gray-50 transition-colors duration-150"
              >
                <td className="py-3 px-4 border-b">{type.id}</td>
                <td className="py-3 px-4 border-b capitalize">{type.city}</td>
                <td className="py-3 px-4 border-b capitalize">
                  {type.country}
                </td>
                <td className="py-3 px-4 border-b">
                  {new Date(type.created_at).toLocaleDateString()}
                </td>
                <td className="py-3 px-4 border-b">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleUpdate(type.id)}
                      className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(type.id)}
                      className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default JobLocationListTable;
