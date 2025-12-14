"use client";

import React, { useState } from "react";
import AdminSmartPagination from "@/components/SmartPagination/AdminSmartPagination";
import axiosInstance from "@/lib/axiosIntance";
import { toast } from "react-toastify";
import Link from "next/link";
import { useGallery } from "@/stores/gallery_dependencied_store";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function GalleryTable({ gallery }) {
  const router = useRouter();
  const { setGallery } = useGallery();
  const data = gallery?.data || [];
  const paginationData = gallery?.pagination;
  const [deleteId, setDeleteId] = useState(null);
  const [loading, setLoading] = useState(false);

  // -----------------------
  // Handle Update
  // -----------------------
  const handleUpdate = (item) => {
    setGallery(item); // store selected gallery object
    router.push(`/dashboard/gallery/post/?gallery_id=${item.id}`);
  };
  const handleView = (id) => {
    router.push(`/dashboard/gallery/images/?gallery_id=${id}`);
  };

  // -----------------------
  // Handle Delete
  // -----------------------
  const handleDelete = async () => {
    if (!deleteId) return;
    setLoading(true);

    try {
      const response = await axiosInstance.delete(
        `/api/gallery/v1/gallery/update/${deleteId}/`
      );

      if (response.status === 204 || response.status === 200) {
        toast.success("Gallery deleted successfully");
        router.refresh();
        setDeleteId(null);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete gallery");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header Section */}
      <div className="flex flex-wrap justify-between items-center mb-5">
        <h2 className="text-3xl font-semibold text-gray-800 p-1">
          All Gallery
        </h2>

        <Link href="/dashboard/gallery/post/">
          <button className="px-4  py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition cursor-pointer">
            + Create Gallery
          </button>
        </Link>
      </div>

      {/* If empty */}
      {data.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md py-12 text-2xl text-center text-gray-500">
          Gallery not found
        </div>
      ) : (
        <>
          <div className="overflow-x-auto bg-white rounded-lg shadow-md">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium uppercase">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium uppercase">
                    Image
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium uppercase">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium uppercase">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium uppercase">
                    Created
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium uppercase">
                    Updated
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium uppercase">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {data.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4">{item.id}</td>

                    <td className="px-4 py-3">
                      {item.cover_image ? (
                        <Image
                          className="rounded-md"
                          src={`${process.env.NEXT_PUBLIC_BACKEND_API_URL}${item.cover_image}`}
                          alt={item.altText || item.title}
                          width={260}
                          height={250}
                          style={{
                            width: "160px",
                            height: "80px",
                            objectFit: "cover",
                          }}
                        />
                      ) : (
                        <div className="w-[60px] h-10 bg-gray-200 flex items-center justify-center text-gray-400 text-xs rounded-md">
                          N/A
                        </div>
                      )}
                    </td>

                    <td className="px-6 py-4">{item.title}</td>
                    <td className="px-6 py-4">
                      {item.category?.name || "No category"}
                    </td>

                    <td className="px-6 py-4">
                      {new Date(item.created_at).toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      {new Date(item.updated_at).toLocaleString()}
                    </td>

                    {/* ACTION BUTTONS */}
                    <td className="px-6 py-4 flex gap-2">
                      <button
                        onClick={() => handleView(item.id)}
                        className="bg-blue-500 text-white px-3 py-1 rounded-sm hover:bg-blue-600 cursor-pointer"
                      >
                        Images
                      </button>
                      <button
                        onClick={() => handleUpdate(item)}
                        className="bg-blue-500 text-white px-3 py-1 rounded-sm hover:bg-blue-600 cursor-pointer"
                      >
                        Update
                      </button>

                      <button
                        onClick={() => setDeleteId(item.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded-sm hover:bg-red-600 cursor-pointer"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="mt-6 flex justify-center">
            <AdminSmartPagination paginationData={paginationData} />
          </div>
        </>
      )}

      {/* Delete Confirmation Modal */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-96 text-center">
            <h3 className="text-lg font-semibold mb-4">
              Are you sure you want to delete this gallery?
            </h3>

            <div className="flex justify-center gap-4">
              <button
                onClick={handleDelete}
                disabled={loading}
                className="bg-red-500 cursor-pointer hover:bg-red-600 text-white px-4 py-2 rounded"
              >
                {loading ? "Deleting..." : "Yes, Delete"}
              </button>

              <button
                onClick={() => setDeleteId(null)}
                className="bg-gray-300 cursor-pointer hover:bg-gray-400 px-4 py-2 rounded"
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
