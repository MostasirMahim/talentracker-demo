"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import AdminSmartPagination from "@/components/SmartPagination/AdminSmartPagination";
import axiosInstance from "@/lib/axiosIntance";
import { toast } from "react-toastify";

export default function TrainingServiceRequestTable({ requests }) {
  const router = useRouter();

  const data = requests?.data || [];
  const paginationData = requests?.pagination || null;
  const errorMessage = requests?.error || null;

  // STATE for Modal
  const [deleteId, setDeleteId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // MARK AS READ API CALL
  const handleMarkAsRead = async (id) => {
    try {
      if (!id) return;

      await axiosInstance.patch(
        `/api/training_solutions/v1/training_service_requests/${id}/`
      );

      toast.success("Marked as read successfully");
      setShowModal(false);
      setDeleteId(null);
      router.refresh();
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to mark as read");
    }
  };

  // OPEN DELETE MODAL
  const openDeleteModal = (id) => {
    setDeleteId(id);
    setShowModal(true);
  };

  // DELETE API CALL
  const handleDelete = async () => {
    try {
      await axiosInstance.delete(
        `/api/training_solutions/v1/training_service_requests/${deleteId}/`
      );

      toast.success("Deleted successfully");
      setShowModal(false);
      setDeleteId(null);
      router.refresh();
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Failed to delete");
    }
  };

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Training Service Request List
      </h2>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {errorMessage && (
          <div className="p-4 bg-red-100 text-red-700 font-medium">
            ⚠ {errorMessage}
          </div>
        )}

        {!errorMessage && data.length === 0 && (
          <div className="p-6 text-center text-2xl text-gray-600 font-medium">
            No service requests found.
          </div>
        )}

        {data.length > 0 && (
          <div className="overflow-x-auto whitespace-nowrap">
            <table className="w-full">
              <thead className="bg-blue-600 text-white uppercase text-sm font-semibold">
                <tr>
                  <th className="px-6 py-4 text-left">ID</th>
                  <th className="px-6 py-4 text-left">Category</th>
                  <th className="px-6 py-4 text-left">Full Name</th>
                  <th className="px-6 py-4 text-left">Designation</th>
                  <th className="px-6 py-4 text-left">Company</th>
                  <th className="px-6 py-4 text-left">Email</th>
                  <th className="px-6 py-4 text-left">Cell Number</th>
                  <th className="px-6 py-4 text-left">Created At</th>
                  <th className="px-6 py-4 text-left">Is Read</th>
                  <th className="px-6 py-4 text-center">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {data.map((item, index) => (
                  <tr
                    key={item.id}
                    className={`${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    } hover:bg-blue-50`}
                  >
                    <td className="px-6 py-4">{item.id}</td>
                    <td className="px-6 py-4 font-bold text-sm">
                      {item?.category?.name}
                    </td>
                    <td className="px-6 py-4 text-sm">{item.full_name}</td>
                    <td className="px-6 py-4 text-sm">{item.designation}</td>
                    <td className="px-6 py-4 text-sm font-bold">{item.company_name}</td>
                    <td className="px-6 py-4 text-sm">{item.email}</td>
                    <td className="px-6 py-4 text-sm">{item.cell_number}</td>
                    <td className="px-6 py-4 text-sm">
                      {new Date(item.created_at).toLocaleString()}
                    </td>

                    {/* SHOW is_read STATUS */}
                    <td className="px-6 py-4">
                      {item.is_read ? (
                        <span className="px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700">
                          Read
                        </span>
                      ) : (
                        <span className="px-3 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-700">
                          Unread
                        </span>
                      )}
                    </td>

                    <td className="px-6 py-4 text-center space-x-2">
                      {/* MARK AS READ BTN */}
                      {!item.is_read && (
                        <button
                          onClick={() => handleMarkAsRead(item.id)}
                          className="px-4 py-2 font-bold text-sm cursor-pointer bg-green-600 text-white rounded-lg hover:bg-green-700"
                        >
                          Mark as Read
                        </button>
                      )}

                      {item.is_read && (
                        <button
                          disabled
                          className="px-4 py-2 font-bold text-sm bg-blue-500 text-white rounded-lg cursor-not-allowed"
                        >
                          Already Read
                        </button>
                      )}

                      {/* DELETE BUTTON */}
                      <button
                        onClick={() => openDeleteModal(item.id)}
                        className="px-4 py-2 font-bold cursor-pointer text-sm bg-red-600 text-white rounded-lg hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="mt-4">
          {paginationData && (
            <AdminSmartPagination paginationData={paginationData} />
          )}
        </div>
      </div>

      {/* DELETE CONFIRMATION MODAL */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center ">
          <div className="bg-white p-6 rounded-lg shadow-xl/20 w-96">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Are you sure?
            </h3>
            <p className="text-black mb-6">
              Do you really want to delete this service request?
            </p>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 cursor-pointer rounded-lg bg-gray-300 text-gray-800 font-medium"
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                className="px-4 py-2 cursor-pointer rounded-lg bg-red-600 text-white font-bold hover:bg-red-700"
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
