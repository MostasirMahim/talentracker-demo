"use client";

import axiosInstance from "@/lib/axiosIntance";
import { useJobCategory } from "@/stores/job_dependencies_update_store";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "react-toastify";

const JobCategoriesListTable = ({ categories = {} }) => {
  const router = useRouter();
  const setCategory = useJobCategory((state) => state.setCategory);

  const handleDelete = async (id) => {
    // alert confirmation dialog
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this job category?"
    );
    if (!confirmDelete) {
      toast.info("Job category deletion cancelled");
      return;
    }
    try {
      const response = await axiosInstance.delete(
        `/api/jobs/v1/job_categories/${id}/`
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
    const cat = categories?.data?.find((type) => type.id === id);
    setCategory(cat);
    router.push("/dashboard/jobs/job_categories/create/?category_id=" + id);
  };

  return (
    <div className="overflow-x-auto bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-700">
        Job Categories
      </h2>
      {categories?.data.length === 0 ? (
        <p className="text-gray-500 text-center py-4">No job Category found.</p>
      ) : (
        <table className="min-w-full border border-gray-200 text-sm ">
          <thead className="bg-blue-600 text-white uppercase text-sm font-semibold">
            <tr>
              <th className="text-left py-3 px-4 border-b">ID</th>
              <th className="text-left py-3 px-4 border-b">Name</th>
              <th className="text-left py-3 px-4 border-b">Created At</th>
              <th className="text-left py-3 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories?.data?.map((type) => (
              <tr
                key={type.id}
                className="hover:bg-gray-50 transition-colors duration-150"
              >
                <td className="py-3 px-4 border-b">{type.id}</td>
                <td className="py-3 px-4 border-b capitalize">{type.name}</td>
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

export default JobCategoriesListTable;
