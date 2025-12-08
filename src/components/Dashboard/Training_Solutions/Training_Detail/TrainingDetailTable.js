"use client";
import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import AdminSmartPagination from "@/components/SmartPagination/AdminSmartPagination";
import { useCatalogDetail } from "@/stores/training_solution_store";

export default function TrainingCatalogDetailTable({
  trainingDetail,
  onDelete,
}) {
  const router = useRouter();
  const { setCatalogDetail } = useCatalogDetail();

  const data = trainingDetail.data || [];
  const paginationData = trainingDetail.pagination;

  // Modal States
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  // Edit Handler
  const handleEdit = (item) => {
    setCatalogDetail(item);
    router.push(`/dashboard/training_solutions/training_catalog/${item.id}/edit/`);
  };

  // Show Confirm Delete Modal
  const confirmDelete = (id) => {
    setDeleteId(id);
    setShowModal(true);
  };

  // Handle Final Delete
  const handleDelete = () => {
    if (deleteId) {
      onDelete(deleteId);
    }
    setShowModal(false);
  };

  return (
    <div className="p-2">
      {/* Create Button */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Training Detail List</h2>
        <Link
          href="/dashboard/training_solutions/training_catalog/post/"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          + Create Detail
        </Link>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200 rounded-lg">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Training Catalog</th>
              <th className="px-4 py-2">Expert Trainer</th>
              <th className="px-4 py-2">Duration</th>
              <th className="px-4 py-2">Delivery Mode</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>

          <tbody>
            {data.length > 0 ? (
              data.map((item) => (
                <tr key={item.id} className="border-b hover:bg-gray-100">
                 
                  <td className="px-4 py-2">
                    {item.id}
                    </td>
                  <td className="px-4 py-2">
                    <span className="inline-block px-2 py-1 text-sm font-semibold rounded-full bg-sky-100">
                      {item.training_catalog}
                    </span>
                  </td>

                  <td className="px-4 py-2">{item.expert_trainer_profile}</td>
                  <td className="px-4 py-2">
                    {item.duration}
                  </td>

                  <td className="px-4 py-2 max-w-xs truncate">
                    {item.delivery_mode}
                  </td>

                  {/* <td className="px-4 py-2">
                    <span
                      className={`inline-block px-2 py-1 text-sm font-semibold rounded-full ${
                        item.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : item.status === "Inactive"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td> */}

                  <td className="px-4 py-2">
                    <div className="flex gap-2 flex-wrap">
                      <Link
                        href={`/dashboard/training_solutions/training_catalog/${item.id}/details/`}
                        className="px-3 py-1 bg-purple-500 text-white rounded hover:bg-purple-600 transition"
                      >
                        Details
                      </Link>

                      <button
                        onClick={() => handleEdit(item)}
                        className="px-3 py-1 bg-sky-500 text-white rounded hover:bg-sky-600 transition"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => confirmDelete(item.id)}
                        className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="text-center py-5" colSpan="7">
                  No Training Detail Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4">
        <AdminSmartPagination paginationData={paginationData} />
      </div>

      {/* Delete Confirm Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md shadow-lg w-80">
            <h3 className="text-lg font-semibold mb-4">Are you sure?</h3>
            <p className="text-sm mb-6">
              Do you really want to delete this catalog?
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
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
