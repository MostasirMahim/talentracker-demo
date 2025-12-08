"use client";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import AdminSmartPagination from "@/components/SmartPagination/AdminSmartPagination";
import { useCatalog } from "@/stores/training_solution_store";

export default function TrainingCatalogTable({ trainingCatalog, onDelete }) {
  const router = useRouter();
  const { setCatalog } = useCatalog();
  const data = trainingCatalog.data || [];
  const paginationData = trainingCatalog.pagination;

   //  MODAL STATE
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const handleEdit = (item) => {
    // Store catalog data in zustand
    setCatalog(item);
    // Navigate to edit page with catalog_id
    router.push(
      `/dashboard/training_solutions/training_catalog/post/?catalog_id=${item.id}`
    );
  };

   // Delete → Open Modal
  const confirmDelete = (id) => {
    setDeleteId(id);
    setShowModal(true);
  };

  // Yes → Delete Item
  const handleDeleteConfirm = () => {
    if (deleteId) {
      onDelete(deleteId); // parent function
    }
    setShowModal(false);
    setDeleteId(null);
  };

  return (
    <div className="  p-2 ">
      {/* Create Button */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Training Catalog List</h2>
        <Link
          href="/dashboard/training_solutions/training_catalog/post/"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          + Create Catalog
        </Link>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200 rounded-lg">
          <thead className="bg-blue-600 text-white ">
            <tr>
              <th className="px-4 py-2">Image</th>
              <th className="px-4 py-2">Training ID</th>
              <th className="px-4 py-2">Title</th>
              <th className="px-4 py-2">Category</th>
              <th className="px-4 py-2">Short Description</th>
              <th className="px-4 py-2">Status</th>

              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((item) => (
                <tr key={item.id} className="border-b hover:bg-gray-100">
                  <td className="px-4 py-2">
                    {item.thumbnail_image ? (
                      <Image
                        className="rounded-md"
                        src={`${process.env.NEXT_PUBLIC_BACKEND_API_URL}${item.thumbnail_image}`}
                        alt={item.title}
                        width={160}
                        height={80}
                        style={{
                          width: "160px",
                          height: "80px",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      <div className="w-40 h-20 bg-gray-200 flex items-center justify-center text-gray-400 text-xs rounded-md">
                        N/A
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-2">
                    <span
                      className="
                      inline-block 
                      px-2 py-1 
                      text-sm 
                      font-semibold 
                      rounded-full 
                      bg-sky-100 
                    "
                    >
                      {item.training_id}
                    </span>
                  </td>

                  <td className="px-4 py-2">{item.title}</td>
                  <td className="px-4 py-2">
                    {item.category?.title || item.category}
                  </td>

                  <td className="px-4 py-2 max-w-xs truncate">
                    {item.short_description}
                  </td>
                  <td className="px-4 py-2 max-w-xs truncate">
                    <span
                      className={`
                      inline-block px-2 py-1 text-sm font-semibold rounded-full
                      ${
                        item.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : item.status === "Inactive"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }
                    `}
                    >
                      {item.status}
                    </span>
                  </td>

                  <td className="px-4 py-2">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(item)}
                        className="px-3 py-1 bg-sky-500 cursor-pointer text-white rounded hover:bg-sky-600 transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => confirmDelete(item.id)}
                        className="px-3 py-1 cursor-pointer bg-red-600 text-white rounded hover:bg-red-700 transition"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="text-center py-5" colSpan="6">
                  No Catalog Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4">
        <AdminSmartPagination paginationData={paginationData} />
      </div>

      {/* Delete Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-blue-600 bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-80">
            <h2 className="text-lg font-semibold mb-4">
              Are you sure you want to delete?
            </h2>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                No
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
