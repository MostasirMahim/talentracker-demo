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

  // MODAL STATE
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
    <div className="p-2">
      {/* Create Button */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
        <h2 className="text-xl font-semibold">Training Catalog List</h2>
        <Link
          href="/dashboard/training_solutions/training_catalog/post/"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 w-full sm:w-auto text-center"
        >
          + Create Catalog
        </Link>
      </div>

      {/* Table Container with Horizontal Scroll */}
      <div className="relative overflow-x-auto rounded-lg border border-gray-200">
        <div className="min-w-[1100px] overflow-x-auto">
          {/* Table */}
          <table className="w-full">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="px-4 py-2 text-left whitespace-nowrap">ID</th>
                <th className="px-4 py-2 text-left whitespace-nowrap">Image</th>
                <th className="px-4 py-2 text-left whitespace-nowrap">Training ID</th>
                <th className="px-4 py-2 text-left whitespace-nowrap">Title</th>
                <th className="px-4 py-2 text-left whitespace-nowrap">Category</th>
                <th className="px-4 py-2 text-left whitespace-nowrap">Short Description</th>
                <th className="px-4 py-2 text-left whitespace-nowrap">Status</th>
                <th className="px-4 py-2 text-left whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data.map((item) => (
                  <tr key={item.id} className="border-b hover:bg-gray-50 even:bg-gray-50/50">
                    <td className="px-4 py-2 whitespace-nowrap">{item.id}</td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      {item.thumbnail_image ? (
                        <div className="flex justify-center">
                          <Image
                            className="rounded-md"
                            src={`${process.env.NEXT_PUBLIC_BACKEND_API_URL}${item.thumbnail_image}`}
                            alt={item.title}
                            width={190}
                            height={80}
                            style={{
                              width: "190px",
                              height: "80px",
                              objectFit: "cover",
                            }}
                          />
                        </div>
                      ) : (
                        <div className="w-40 h-20 bg-gray-200 flex items-center justify-center text-gray-400 text-xs rounded-md">
                          N/A
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">
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
                    <td className="px-4 py-2 whitespace-nowrap max-w-xs truncate">
                      {item.title}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      {item.category?.name}
                    </td>
                    <td className="px-4 py-2 max-w-xs truncate">
                      {item.short_description}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">
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
                    <td className="px-4 py-2 whitespace-nowrap">
                      <div className="flex flex-col sm:flex-row gap-2">
                        <Link
                          href={`/training-solutions/${item.id}`}
                          target="_blank"
                          className="px-3 py-1 bg-blue-500 text-white rounded-sm hover:bg-blue-600 cursor-pointer transition text-center text-sm"
                        >
                          Catalog Detail
                        </Link>
                        <button
                          onClick={() => handleEdit(item)}
                          className="px-3 py-1 bg-sky-500 cursor-pointer text-white rounded hover:bg-sky-600 transition text-center text-sm"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => confirmDelete(item.id)}
                          className="px-3 py-1 cursor-pointer bg-red-600 text-white rounded hover:bg-red-700 transition text-center text-sm"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="text-center py-5" colSpan="8">
                    No Catalog Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
       
      </div>

      {/* Pagination */}
      <div className="mt-4 overflow-x-auto">
        <AdminSmartPagination paginationData={paginationData} />
      </div>

      {/* Delete Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/40 backdrop-blur-sm">
          <div className="bg-white shadow-xl/30 rounded-lg p-6 w-[90%] max-w-md mx-4">
            <h2 className="text-lg font-semibold mb-4">
              Are you sure you want to delete?
            </h2>
            <div className="flex flex-col sm:flex-row justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-200 cursor-pointer rounded hover:bg-gray-300 flex-1 sm:flex-none"
              >
                No
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="px-4 py-2 cursor-pointer bg-red-600 text-white rounded hover:bg-red-700 flex-1 sm:flex-none"
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