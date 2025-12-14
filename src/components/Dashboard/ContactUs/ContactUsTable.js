"use client";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import axiosInstance from "@/lib/axiosIntance";
import AdminSmartPagination from "@/components/SmartPagination/AdminSmartPagination";
import Link from "next/link";
import ContactFilterPage from "./ContactFilter";

export default function ContactUsTable({ contacts }) {
  const router = useRouter();
  const [showFilter, setShowFilter] = useState(false);
  const [openActionMenu, setOpenActionMenu] = useState(null);

  // Close menu when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".action-menu-container")) {
        setOpenActionMenu(null);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  if (!contacts || !contacts.data || contacts.data.length === 0) {
    return (
      <div className="w-full px-4 md:px-8 py-6">
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Contact Submissions
          </h2>
          <p className="text-center py-10 text-gray-500">
            No contact submissions found.
          </p>
        </div>
      </div>
    );
  }

  const contacts_data = contacts.data;
  const paginationData = contacts.pagination;

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this contact submission?"
    );
    if (!confirmDelete) {
      toast.info("Deletion cancelled");
      return;
    }
    try {
      const response = await axiosInstance.delete(
        `/api/contacts/v1/contacts/${id}/`
      );
      if (response.status === 204) {
        toast.success("Contact submission deleted successfully");
        router.refresh();
      }
    } catch (error) {
      console.log(error);
      // Backend returns structured validation errors
      if (error.response?.data?.errors) {
        const backendErrors = error.response?.data?.errors;

        // Dynamically set errors for each invalid field
        Object.keys(backendErrors).forEach((field) => {
          setError(field, {
            type: "server",
            message: backendErrors[field][0],
          });
          // Optional toast for each field
          toast.error(`${field}: ${backendErrors[field][0]}`);
        });
      } else {
        // Fallback if no detailed error
        toast.error(
          error.response?.data?.message ||
            "Something went wrong. Please try again."
        );
      }
    }
  };

  const toggleActionMenu = (id) => {
    setOpenActionMenu(openActionMenu === id ? null : id);
  };

  return (
    <div className="w-full px-4 md:px-8 py-6">
      {/* Header with Filter Toggle Button */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Contact Submissions
        </h2>
        <button
          onClick={() => setShowFilter(!showFilter)}
          className="flex items-center cursor-pointer gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          <svg
            className="w-5 h-5 "
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
            />
          </svg>
          {showFilter ? "Hide Filter" : "Filter"}
        </button>
      </div>

      {/* Filter Component */}
      {showFilter && (
        <div className="mb-6">
          <ContactFilterPage />
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto rounded-2xl shadow-md border border-gray-200 bg-white">
        <table className="w-full ">
          <thead className="text-xs uppercase bg-blue-600 text-white">
            <tr>
              <th className="px-6 py-3">ID</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Phone Number</th>
              <th className="px-6 py-3">Company</th>
              <th className="px-6 py-3">Subject</th>
              <th className="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody >
            {contacts_data.map((contact) => (
              <tr
                key={contact.id}
                className="border-b hover:bg-gray-50 transition duration-150"
              >
                <td className="px-6 py-4 font-medium text-gray-900">
                  {contact.id}
                </td>
                <td className="px-6 py-4 font-bold ">{contact.email}</td>
                <td className="px-6 py-4">{contact.phone_number}</td>
                <td className="px-6 py-4 font-bold ">{contact.company}</td>
                <td className="px-6 py-4">{contact.subject}</td>
                <td className="px-6 py-4 text-center">
                  <div className="action-menu-container relative inline-block">
                    <button
                      onClick={() => toggleActionMenu(contact.id)}
                      className="p-2 hover:bg-gray-200 rounded-md cursor-pointer transition-colors"
                      title="Actions"
                    >
                      <svg
                        className="w-5 h-5 text-gray-600"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <circle cx="12" cy="5" r="2" />
                        <circle cx="12" cy="12" r="2" />
                        <circle cx="12" cy="19" r="2" />
                      </svg>
                    </button>

                    {/* Dropdown Menu */}
                    {openActionMenu === contact.id && (
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-40 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                        <Link
                          href={`/dashboard/contacts/${contact.id}/`}
                          className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-green-50 transition-colors"
                          onClick={() => setOpenActionMenu(null)}
                        >
                          <svg
                            className="w-4 h-4 text-green-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                          </svg>
                          View
                        </Link>
                        <Link
                          href={`/dashboard/contacts/edit/${contact.id}/`}
                          className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 transition-colors"
                          onClick={() => setOpenActionMenu(null)}
                        >
                          <svg
                            className="w-4 h-4 text-blue-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            />
                          </svg>
                          Edit
                        </Link>
                        <button
                          onClick={() => {
                            setOpenActionMenu(null);
                            handleDelete(contact.id);
                          }}
                          className="flex items-center cursor-pointer gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-red-50 transition-colors rounded-b-lg"
                        >
                          <svg
                            className="w-4 h-4 text-red-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-6  justify-center">
        <AdminSmartPagination paginationData={paginationData} />
      </div>
    </div>
  );
}
