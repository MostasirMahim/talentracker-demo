"use client";

import React from "react";
import { useHook } from "@/stores/hooks_dependencied_update_store";
import { useRouter } from "next/navigation";

export default function HooksTableList({ hooks }) {
  const router = useRouter();
  const setHook = useHook((state) => state.setHook);
  const clearHook = useHook((state) => state.clearHook);

  if (!hooks || !hooks.data || Object.keys(hooks.data).length === 0) {
    return (
      <div className="overflow-x-auto bg-white shadow-md rounded-lg p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-700">
            Statistics Hooks
          </h2>
          <button
            onClick={() => router.push("/dashboard/hooks/post/")} 
            className="px-4 py-2 cursor-pointer bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Create Hook
          </button>
          
          
        </div>
        <p className="text-gray-500 text-center py-4">No hooks data found.</p>
      </div>
    );
  }

  const hooksData = hooks.data;

  // Convert hooks object to array for table display
  const hookEntries = Object.entries(hooksData).map(([key, value]) => ({
    key,
    label: key
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" "),
    value,
  }));

  const handleEdit = () => {
    // Set entire hooks data in Zustand store
    setHook(hooksData);
    router.push("/dashboard/hooks/post/");
  };

  return (
    <div className="overflow-x-auto bg-white shadow-md rounded-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-700">
          Statistics Hooks
        </h2>
        <button
          onClick={handleEdit}
          className="px-4 py-2 cursor-pointer bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Edit Hook
        </button>
      </div>

      <table className="min-w-full border border-gray-200 text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="text-left py-3 px-4 border-b">Statistic Name</th>
            <th className="text-left py-3 px-4 border-b">Value</th>
            <th className="text-left py-3 px-4 border-b">Key</th>
          </tr>
        </thead>
        <tbody>
          {hookEntries.map((hook) => (
            <tr
              key={hook.key}
              className="hover:bg-gray-50 transition-colors duration-150"
            >
              <td className="py-3 px-4 border-b font-medium">{hook.label}</td>
              <td className="py-3 px-4 border-b">
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${
                    hook.value >= 0
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {hook.value.toLocaleString()}
                </span>
              </td>
              <td className="py-3 px-4 border-b text-gray-500 text-xs">
                {hook.key}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
