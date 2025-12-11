"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ExternalLink } from "lucide-react";
import AdminSmartPagination from "@/components/SmartPagination/AdminSmartPagination";

export default function TrainersTable({ trainers }) {
  const router = useRouter();

  // Defensive Handling
  const data = trainers?.data || [];
  const paginationData = trainers?.pagination || null;
  const errorMessage = trainers?.error || null;

  // Details navigate
  const handleDetailsClick = (id) => {
    if (!id) return console.error("Invalid Trainer ID");
    router.push(`/dashboard/training_solutions/trainers/${id}/`);
  };

  return (
    <div className="w-full">
      {/* Header */}
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        All Trainers List
      </h2>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">

        {/* ERROR MESSAGE */}
        {errorMessage && (
          <div className="p-4 bg-red-100 text-red-700 font-medium">
            ⚠ {errorMessage}
          </div>
        )}

        {/* EMPTY STATE */}
        {!errorMessage && data.length === 0 && (
          <div className="p-6 text-center text-2xl text-gray-600 font-medium">
            No trainers found.
          </div>
        )}

        {/* TABLE */}
        {data.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold">ID</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Full Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Specialization</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Email</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">LinkedIn</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {data.map((trainer, index) => {
                  const isValidLink =
                    trainer.linked_profile &&
                    (trainer.linked_profile.startsWith("http://") ||
                      trainer.linked_profile.startsWith("https://"));

                  return (
                    <tr
                      key={trainer.id}
                      className={`${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50"
                      } hover:bg-blue-50`}
                    >
                      <td className="px-6 py-4">{trainer.id}</td>
                      <td className="px-6 py-4 font-bold text-sm">{trainer.full_name}</td>
                      <td className="px-6 py-4">
                        {trainer.field_of_specialization || "—"}
                      </td>
                      <td className="px-6 py-4">{trainer.user || "—"}</td>

                      {/* LinkedIn */}
                      <td className="px-6 py-4">
                        {isValidLink ? (
                          <a
                            href={trainer.linked_profile}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                          >
                            <ExternalLink size={16} />
                            <span className="font-bold text-sm">Profile</span>
                          </a>
                        ) : (
                          <span className="text-gray-400 italic">N/A</span>
                        )}
                      </td>

                      {/* Action */}
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() =>
                            trainer?.id && handleDetailsClick(trainer.id)
                          }
                          className="px-4 py-2 cursor-pointer font-bold text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                          Details
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* PAGINATION */}
        <div className="mt-4">
          {paginationData && (
            <AdminSmartPagination paginationData={paginationData} />
          )}
        </div>
      </div>
    </div>
  );
}
