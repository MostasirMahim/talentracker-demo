"use client";

import React, { useState } from "react";
import axiosInstance from "@/lib/axiosIntance";
import Image from "next/image";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function GalleryImage({ gallery_images, gallery_id = null }) {
  const router = useRouter();
  const images = gallery_images?.data?.images || [];
  const [deleteId, setDeleteId] = useState(null);
  const [loading, setLoading] = useState(false);

  // ---------------------------
  // Delete Image
  // ---------------------------
  const handleDelete = async () => {
    if (!deleteId) return;

    setLoading(true);
    try {
      const response = await axiosInstance.delete(
        `/api/gallery/v1/gallery/${gallery_id}/images/${deleteId}/`
      );

      if (response.status === 204 || response.status === 200) {
        toast.success("Image deleted successfully");
        router.refresh();
        setDeleteId(null);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete image");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 min-h-screen ">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center mb-6">
        <h2 className="text-3xl font-semibold text-gray-800">Gallery Images</h2>

        <button
          onClick={() => router.push(`/dashboard/gallery/images/post/?gallery_id=${gallery_id}`)}
          className="px-4 py-2 bg-blue-600 cursor-pointer text-white rounded-md hover:bg-blue-700 transition"
        >
          + Add More Image
        </button>
      </div>

      {/* Empty State */}
      {images.length === 0 ? (
        <div className="bg-white p-10 rounded-xl shadow text-center text-gray-500 text-xl">
          No images found
        </div>
      ) : (
        <div
          className="
            grid 
            grid-cols-1
            sm:grid-cols-2
            md:grid-cols-3 
            gap-5
          "
        >
          {images.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow hover:shadow-lg transition p-3"
            >
              {/* Image Box */}
              <div className="relative w-full h-48 rounded-lg overflow-hidden group">
                <Image
                  src={`${process.env.NEXT_PUBLIC_BACKEND_API_URL}${item.image}`}
                  alt="Gallery Image"
                  fill
                  className="object-cover group-hover:scale-110 transition duration-300"
                />
              </div>

              {/* Metadata */}
              <div className="mt-3 text-sm text-gray-700">
                <p>
                  <span className="font-medium">ID:</span> {item.id}
                </p>
                <p>
                  <span className="font-medium">Created:</span>{" "}
                  {new Date(item.created_at).toLocaleString()}
                </p>
                <p>
                  <span className="font-medium">Updated:</span>{" "}
                  {new Date(item.updated_at).toLocaleString()}
                </p>
              </div>
              {/* Hover Actions */}
              <div className=" mt-4  transition flex items-center justify-center gap-3">
                

                <button
                  className="px-3 py-1 bg-red-500 text-white cursor-pointer rounded-sm text-sm shadow hover:bg-red-600"
                  onClick={() => setDeleteId(item.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Modal */}
      {deleteId && (
        <div className="fixed inset-0 bg-blue-700 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow w-96 text-center">
            <h3 className="text-lg font-semibold mb-4">
              Are you sure you want to delete this image?
            </h3>

            <div className="flex justify-center gap-4">
              <button
                onClick={handleDelete}
                disabled={loading}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                {loading ? "Deleting..." : "Yes, Delete"}
              </button>

              <button
                onClick={() => setDeleteId(null)}
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
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
