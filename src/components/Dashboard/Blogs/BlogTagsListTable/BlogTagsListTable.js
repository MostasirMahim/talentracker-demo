"use client";

import axiosInstance from "@/lib/axiosIntance";
import { useBlogTag } from "@/stores/blogs_dependencied_update_store";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "react-toastify";

const BlogTagsListTable = ({ tags = {} }) => {
  console.log(tags);
  const router = useRouter();
  const setTag = useBlogTag((state) => state.setTag);

  const handleDelete = async (id) => {
    // convert id to integer
    id = parseInt(id);
    try {
      const response = await axiosInstance.delete(
        `/api/blogs/v1/tags/${id}/`
      );
      if (response.status == 204) {
        toast.success("Deleted successfully");
        router.refresh();
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  const handleUpdate = (id) => {
    id = parseInt(id);
    const tag = tags?.data?.find((type) => type.id === id);
    setTag(tag);
    router.push("/dashboard/blogs/tags/create/?tag_id=" + id);
  };
  const formatBDTime = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleString("en-BD", {
      timeZone: "Asia/Dhaka",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };
  return (
    <div className="overflow-x-auto bg-white shadow-md rounded-lg p-4">
      <h2 className="text-xl font-semibold mb-4 text-gray-700">
        Blog Tags
      </h2>
      {tags?.data.length === 0 ? (
        <p className="text-gray-500 text-center py-4">No blog Tag found.</p>
      ) : (
        <table className="min-w-full border border-gray-200 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left py-3 px-4 border-b">ID</th>
              <th className="text-left py-3 px-4 border-b">Name</th>
              <th className="text-left py-3 px-4 border-b">Created At</th>
              <th className="text-left py-3 px-4 border-b">Updated At</th>
              <th className="text-left py-3 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tags?.data?.map((type) => (
              <tr
                key={type.id}
                className="hover:bg-gray-50 transition-colors duration-150"
              >
                <td className="py-3 px-4 border-b">{type.id}</td>
                <td className="py-3 px-4 border-b capitalize">{type.name}</td>
                <td className="py-3 px-4 border-b">
                  {formatBDTime(type.created_at)}
                </td>
                <td className="py-3 px-4 border-b">
                  {formatBDTime(type.updated_at)}
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

export default BlogTagsListTable;