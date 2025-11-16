"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function ContactFilterPage() {
  const router = useRouter();
  const [filters, setFilters] = useState({
    start_date: "",
    end_date: "",
    status: "",
    is_active: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleApplyFilters = () => {
    setLoading(true);
    try {
      const query = new URLSearchParams(window.location.search);
      
      // Add or update filter parameters
      Object.entries(filters).forEach(([key, value]) => {
        if (value) {
          query.set(key, value);
        } else {
          query.delete(key);
        }
      });

      // Reset to page 1 when applying filters
      query.set('page', '1');

      // Navigate to the filtered URL
      router.push(`?${query.toString()}`);
      toast.success("Filters applied successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to apply filters");
    } finally {
      setLoading(false);
    }
  };

  const handleClearFilters = () => {
    setFilters({
      start_date: "",
      end_date: "",
      status: "",
      is_active: "",
    });
    router.push(window.location.pathname);
    toast.info("Filters cleared");
  };

  return (
    <div className="bg-white shadow-md rounded-2xl p-6">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Filter Contacts</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block mb-1 text-gray-600">Start Date</label>
          <input
            type="date"
            name="start_date"
            value={filters.start_date}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          />
        </div>
        <div>
          <label className="block mb-1 text-gray-600">End Date</label>
          <input
            type="date"
            name="end_date"
            value={filters.end_date}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          />
        </div>
        <div>
          <label className="block mb-1 text-gray-600">Status</label>
          <select
            name="status"
            value={filters.status}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          >
            <option value="">All</option>
            <option value="pending">Pending</option>
            <option value="contacted">Contacted</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
        <div>
          <label className="block mb-1 text-gray-600">Is Active</label>
          <select
            name="is_active"
            value={filters.is_active}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          >
            <option value="">All</option>
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
        </div>
      </div>
      <div className="mt-4 flex gap-3">
        <button
          onClick={handleApplyFilters}
          disabled={loading}
          className="bg-blue-600 cursor-pointer text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          {loading ? "Applying..." : "Apply Filters"}
        </button>
        <button
          onClick={handleClearFilters}
          className="bg-gray-200 cursor-pointer text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors"
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
}