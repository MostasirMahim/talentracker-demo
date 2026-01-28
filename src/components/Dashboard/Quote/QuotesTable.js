"use client";
import React, { useRef, useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import axiosInstance from "@/lib/axiosIntance";
import AdminSmartPagination from "@/components/SmartPagination/AdminSmartPagination";
import { exportQuotes } from "@/actions/dashboard";

export default function QuotesTable({ quotes, currentPage }) {
  const router = useRouter();
  const [isExporting, setIsExporting] = React.useState(false);

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

  const handleExport = async () => {
    setIsExporting(true);
    try {
      const res = await exportQuotes(currentPage);
      if (res.success) {
        const link = document.createElement("a");
        link.href = `data:${res.contentType};base64,${res.data}`;
        link.download = `quotes_page_${currentPage}.xlsx`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        toast.success(res.message);
      } else {
        const errorMessage = res.message || "Export failed";
        toast.error(errorMessage);
        if (res.code === 401) {
          router.push("/login");
        }
      }
    } catch (error) {
      console.error("Export error:", error);
      toast.error("An error occurred while exporting");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="w-full px-2 md:px-4 py-2">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Quote Requests</h2>
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2">
            <span className="w-3 h-3 bg-green-500 rounded-full"></span>
            <span className="text-sm text-gray-600">Read</span>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
            <span className="text-sm text-gray-600">Unread</span>
          </div>
          <button
            onClick={handleExport}
            disabled={isExporting}
            className={`flex items-center gap-2 px-4 py-2 ${
              isExporting ? "bg-green-400" : "bg-green-600 hover:bg-green-700"
            } text-white rounded-md transition-colors font-medium shadow-sm cursor-pointer disabled:cursor-not-allowed`}
            title="Export to Excel"
          >
            {isExporting ? (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            )}
            {isExporting ? "Exporting..." : "Export"}
          </button>
        </div>
      </div>
      {/* Table */}
      <div className="overflow-x-auto overflow-y-auto rounded-xl max-h-[75vh] shadow-md border border-gray-200 bg-white font-sans">
        <table className="w-full text-sm text-left text-gray-700">
          <thead className="text-xs uppercase bg-blue-600 text-white font-bold sticky top-0 z-10">
            <tr>
              <th className="px-6 py-3">ID</th>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Phone</th>
              <th className="px-6 py-3">Service</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Designation</th>
              <th className="px-6 py-3">message</th>
              <th className="px-6 py-3">Date</th>
              <th className="px-6 py-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {quotes_data.map((quote) => (
              <tr
                key={quote.id}
                className={`hover:bg-gray-50 transition duration-150 ${
                  !quote.is_read ? "bg-yellow-50" : ""
                }`}
              >
                <td className="px-4 py-2 font-medium text-gray-900 min-w-[80px]">
                  {quote.id}
                </td>
                <td className="px-4 py-2 font-medium min-w-[150px] max-w-[200px]">
                  <div className="line-clamp-2">{quote.name}</div>
                </td>
                <td className="px-4 py-2 font-bold min-w-[200px] max-w-[250px]">
                  <div className="line-clamp-2">{quote.email}</div>
                </td>
                <td className="px-4 py-2 min-w-[120px]">
                  <div className="line-clamp-2">{quote.phone}</div>
                </td>
                <td className="px-4 py-2 font-bold min-w-[150px] max-w-[200px]">
                  <div className="line-clamp-2">{quote.service}</div>
                </td>
                <td className="px-4 py-2 min-w-[100px]">
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
                <td className="px-4 py-2 font-bold min-w-[150px] max-w-[200px]">
                  <div className="line-clamp-2">{quote.designation}</div>
                </td> 
                <td className="px-4 py-2 text-gray-600 min-w-[150px]">
                  <div className="line-clamp-2">{quote.message}</div>
                </td>
                <td className="px-4 py-2 text-gray-600 min-w-[150px]">
                  <div className="line-clamp-2">{formatDate(quote.created_at)}</div>
                </td>
                <td className="px-4 py-2 text-center">
                  <button
                    onClick={() => handleMarkAsRead(quote.id, quote.is_read)}
                    className={`px-4 py-2 cursor-pointer rounded-md transition-colors font-medium w-16 ${
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
        <AdminSmartPagination paginationData={paginationData} />
      </div>
    </div>
  );
}