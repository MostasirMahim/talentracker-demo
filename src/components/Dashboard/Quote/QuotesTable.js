"use client";
import React from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import axiosInstance from "@/lib/axiosIntance";
import BlogSmartPagination from "@/components/SmartPagination/BlogSmartPagination";

export default function QuotesTable({ quotes }) {
  const router = useRouter();

  if (!quotes || !quotes.data || quotes.data.length === 0) {
    return (
      <div className="w-full px-4 md:px-8 py-6">
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Quote Requests
          </h2>
          <p className="text-center py-10 text-gray-500">
            No quote requests found.
          </p>
        </div>
      </div>
    );
  }

  const quotes_data = quotes.data;
  const paginationData = quotes.pagination;

  const handleMarkAsRead = async (id, currentStatus) => {
    const action = currentStatus ? "mark as unread" : "mark as read";
    const confirmUpdate = window.confirm(
      `Are you sure you want to ${action} this quote request?`
    );
    
    if (!confirmUpdate) {
      toast.info("Action cancelled");
      return;
    }

    try {
      const response = await axiosInstance.patch(
        `/api/quotes/v1/quotes/${id}/`
      );
      
      if (response.status === 200) {
        toast.success(`Quote ${action === "mark as read" ? "marked as read" : "marked as unread"} successfully`);
        router.refresh();
      }
    } catch (error) {
      console.error("Update error:", error);
      const errorMessage =
        error.response?.data?.message || "Failed to update quote status";
      toast.error(errorMessage);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="w-full px-4 md:px-8 py-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Quote Requests</h2>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-green-500 rounded-full"></span>
            <span className="text-sm text-gray-600">Read</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
            <span className="text-sm text-gray-600">Unread</span>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-2xl shadow-md border border-gray-200 bg-white">
        <table className="w-full text-sm text-left text-gray-700">
          <thead className="text-xs uppercase bg-gray-100 text-gray-700">
            <tr>
              <th className="px-6 py-3">ID</th>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Phone</th>
              <th className="px-6 py-3">Service</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Created At</th>
              <th className="px-6 py-3">Updated At</th>
              <th className="px-6 py-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {quotes_data.map((quote) => (
              <tr
                key={quote.id}
                className={`border-b hover:bg-gray-50 transition duration-150 ${
                  !quote.is_read ? "bg-yellow-50" : ""
                }`}
              >
                <td className="px-6 py-4 font-medium text-gray-900">
                  {quote.id}
                </td>
                <td className="px-6 py-4 font-medium">{quote.name}</td>
                <td className="px-6 py-4">{quote.email}</td>
                <td className="px-6 py-4">{quote.phone}</td>
                <td className="px-6 py-4">{quote.service}</td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
                      quote.is_read
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full ${
                        quote.is_read ? "bg-green-500" : "bg-yellow-500"
                      }`}
                    ></span>
                    {quote.is_read ? "Read" : "Unread"}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-600">
                  {formatDate(quote.created_at)}
                </td>
                <td className="px-6 py-4 text-gray-600">
                  {formatDate(quote.updated_at)}
                </td>
                <td className="px-6 py-4 text-center">
                  <button
                    onClick={() => handleMarkAsRead(quote.id, quote.is_read)}
                    className={`px-4 py-2 rounded-md transition-colors font-medium ${
                      quote.is_read
                        ? "bg-yellow-600 hover:bg-yellow-700 text-white"
                        : "bg-green-600 hover:bg-green-700 text-white"
                    }`}
                    title={quote.is_read ? "Mark as Unread" : "Mark as Read"}
                  >
                    {quote.is_read ? "Mark Unread" : "Mark Read"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-6 flex justify-center">
        <BlogSmartPagination paginationData={paginationData} />
      </div>
    </div>
  );
}