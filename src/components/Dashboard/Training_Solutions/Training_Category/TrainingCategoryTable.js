"use client";
import React, { useState } from "react";
import { toast } from "react-toastify";

export default function TrainingCategoryTable({ categories, onCreate, onUpdate, onDelete }) {
  const [newTitle, setNewTitle] = useState("");
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const formatBDTime = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleString("en-BD", {
      timeZone: "Asia/Dhaka",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className=" mx-auto p-6">
      {/* Create Section */}
      <div className="flex items-center gap-3 mb-5">
        <input
          className="border p-2 rounded w-full"
          placeholder="Create new category..."
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <button
          onClick={() => {
            if (!newTitle.trim()) return toast.error("Category name is required");
            onCreate(newTitle);
            setNewTitle("");
          }}
          className="bg-blue-600 cursor-pointer text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Create
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="w-full text-left">
          <thead className="bg-blue-600 text-white border-b">
            <tr>
              <th className="p-3">SL</th>
              <th className="p-3">Name</th>
              <th className="p-3">Created At</th>
              <th className="p-3">Updated At</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {categories?.map((item, index) => (
              <tr key={item.id} className="border-b hover:bg-gray-100">
                <td className="p-3">{index + 1}</td>

                {/* Editable cell */}
                <td className="p-3">
                  {editId === item.id ? (
                    <input
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      className="border p-2 rounded w-full"
                    />
                  ) : (
                    item.name
                  )}
                </td>
                <td className="p-3">{formatBDTime(item.created_at)}</td>
                <td className="p-3">{formatBDTime(item.updated_at)}</td>


                <td className="p-3 flex gap-2 justify-end">
                  {editId === item.id ? (
                    <button
                      className="bg-green-500 cursor-pointer text-white px-3 py-1 rounded"
                      onClick={() => {
                        onUpdate(item.id, editTitle);
                        setEditId(null);
                      }}
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      className="bg-sky-600 hover:bg-sky-700 cursor-pointer text-white px-3 py-1 rounded"
                      onClick={() => {
                        setEditId(item.id);
                        setEditTitle(item.name);
                      }}
                    >
                      Update
                    </button>
                  )}

                  <button
                    className="bg-red-600 cursor-pointer hover:bg-red-700 text-white px-3 py-1 rounded"
                    onClick={() => onDelete(item.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {categories?.length === 0 && (
              <tr>
                <td colSpan="3" className="p-4 text-center text-gray-500">
                  No categories found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
