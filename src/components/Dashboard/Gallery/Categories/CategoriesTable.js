"use client";

import React, { useState } from "react";
import axiosInstance from "@/lib/axiosIntance";
import { useGalleryCategory } from "@/stores/gallery_dependencied_store";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function CategoriesTable({ categories }) {
  const data = categories?.data || [];
  const router = useRouter();
  const [deleteId, setDeleteId] = useState(null);
  const [loading, setLoading] = useState(false);
  const { setGalleryCategory } = useGalleryCategory();

  const handleUpdate = (id) => {
    id = parseInt(id);

    const cat = categories?.data?.find((type) => type.id === id);

    setGalleryCategory(cat);
    router.push("/dashboard/gallery/categories/post/?category_id=" + id);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setLoading(true);
    try {
      await axiosInstance.delete(
        `/api/gallery/v1/gallery/categories/${deleteId}/`
      );
      toast.success("Category deleted successfully");
      router.refresh();
      setDeleteId(null);
      // optionally, refetch categories or update state to remove deleted category
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete category");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6  min-h-screen ">
      <h2 className="text-2xl font-semibold mb-2 text-gray-800 text-center">
        Gallery Categories
      </h2>
      <Link href="/dashboard/gallery/categories/post/">
        <button className="px-4 py-2 mb-3  cursor-pointer bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
          + Create New Category
        </button>
      </Link>

      {data.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md py-6 pt-16 pb-16 text-2xl text-center text-gray-500">
          Gallery categories not found
        </div>
      ) : (
        <div>
          <div className="overflow-x-auto bg-white rounded-lg shadow-md">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium uppercase">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium uppercase">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium uppercase">
                    Created At
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium uppercase">
                    Updated At
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {data.map((category) => (
                  <tr
                    key={category.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      {category.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {category.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {new Date(category.created_at).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {new Date(category.updated_at).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap flex gap-2">
                      <button
                        onClick={() => handleUpdate(category.id)}
                        className="bg-blue-500 cursor-pointer  hover:bg-blue-600 text-white px-3 py-1 rounded"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => setDeleteId(category.id)}
                        className="bg-red-500 hover:bg-red-600 cursor-pointer text-white px-3 py-1 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Delete confirmation modal */}
      {deleteId && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-96 text-center">
            <h3 className="text-lg font-semibold mb-4">
              Are you sure you want to delete this category?
            </h3>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleDelete}
                disabled={loading}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
              >
                {loading ? "Deleting..." : "Yes, Delete"}
              </button>
              <button
                onClick={() => setDeleteId(null)}
                className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
