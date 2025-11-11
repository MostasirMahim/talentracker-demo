"use client";

import SmartPagination from "@/components/SmartPagination/SmartPagination";
import axiosInstance from "@/lib/axiosIntance";

import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "react-toastify";

const JobApplicationsListTable = ({ data = {} }) => {
  const router = useRouter();

  return (
    <div className="overflow-x-auto bg-white shadow-md rounded-lg p-4">
      <h2 className="text-xl font-semibold mb-4 text-gray-700">
        Job applications
      </h2>
      {data?.data.length === 0 ? (
        <p className="text-gray-500 text-center py-4">
          No job applications found.
        </p>
      ) : (
        <>
          <table className="min-w-full border border-gray-200 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left py-3 px-4 border-b">ID</th>
                <th className="text-left py-3 px-4 border-b">Candidate name</th>
                <th className="text-left py-3 px-4 border-b">
                  Career Start Date
                </th>
                <th className="text-left py-3 px-4 border-b">
                  field_of_specialization
                </th>
                <th className="text-left py-3 px-4 border-b">email</th>
                <th className="text-left py-3 px-4 border-b">status</th>
                <th className="text-left py-3 px-4 border-b">is read</th>
                <th className="text-left py-3 px-4 border-b">Applied at</th>
                <th className="text-left py-3 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data?.data?.map((app) => (
                <tr
                  key={app.id}
                  className="hover:bg-gray-50 transition-colors duration-150"
                >
                  <td className="py-3 px-4 border-b">{app.id}</td>
                  <td className="py-3 px-4 border-b capitalize">
                    {app?.candidate?.full_name}
                  </td>
                  <td className="py-3 px-4 border-b">
                    {app?.candidate?.career_start_date}
                  </td>
                  <td className="py-3 px-4 border-b">
                    {app?.candidate?.field_of_specialization}
                  </td>
                  <td className="py-3 px-4 border-b">
                    {app?.candidate?.email}
                  </td>
                  <td
                    className={`py-3 px-4 border-b font-medium text-center
    ${
      app?.status === "pending"
        ? "text-yellow-600 bg-yellow-50"
        : app?.status === "accepted"
        ? "text-green-600 bg-green-50"
        : app?.status === "rejected"
        ? "text-red-600 bg-red-50"
        : app?.status === "reached"
        ? "text-blue-600 bg-blue-50"
        : ""
    }`}
                  >
                    {app?.status}
                  </td>

                  <td
                    className={`py-3 px-4 border-b text-center font-semibold
    ${
      app?.is_read
        ? "text-gray-600 bg-gray-50"
        : "text-indigo-600 bg-indigo-50 border-l-4 border-indigo-400"
    }`}
                  >
                    {app?.is_read ? "Read" : "Unread"}
                  </td>

                  <td className="py-3 px-4 border-b">
                    {new Date(app?.applied_at).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4 border-b">
                    <div className="flex gap-2">
                      <button className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                        Profile
                      </button>
                      <button
                        onClick={() => handleDelete(type.id)}
                        className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                      >
                        Resume
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <SmartPagination paginationData={data?.pagination} />
        </>
      )}
    </div>
  );
};

export default JobApplicationsListTable;
