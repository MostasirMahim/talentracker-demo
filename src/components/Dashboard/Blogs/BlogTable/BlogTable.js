"use client";

import React from "react";
import Image from "next/image";
import AdminBlogSmartPagination from "@/components/SmartPagination/AdminBlogSmartPagination";

export default function BlogTable({ blogs }) {
  if (!blogs || !blogs.data)
    return <p className="text-center py-10">No blogs found</p>;

  const blogList = blogs.data;
  const paginationData = blogs.pagination;

  return (
    <>
      <div className="w-full px-4 md:px-8 py-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">All Blogs</h2>

        {/* Table container */}
        <div className="overflow-x-auto rounded-2xl shadow-md border border-gray-200 bg-white">
          <table className="w-full text-sm text-left text-gray-700">
            <thead className="text-xs uppercase bg-gray-100 text-gray-700">
              <tr>
                <th className="px-4 py-3">Id</th>
                <th className="px-4 py-3">Image</th>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Author</th>
                <th className="px-4 py-3 hidden md:table-cell">Summary</th>
                <th className="px-4 py-3">Created At</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {blogList.map((blog, index) => (
                <tr
                  key={blog.id}
                  className="border-b hover:bg-gray-50 transition duration-150"
                >
                  <td className="px-4 py-3 font-medium text-gray-900">
                    {index + 1}
                  </td>

                  <td className="px-4 py-3">
                    {blog.featured_image ? (
                      <Image
                        src={blog.featured_image}
                        alt={blog.title}
                        width={60}
                        height={40}
                        className="rounded-md object-cover border"
                      />
                    ) : (
                      <div className="w-[60px] h-[40px] bg-gray-200 flex items-center justify-center text-gray-400 text-xs rounded-md">
                        N/A
                      </div>
                    )}
                  </td>

                  <td className="px-4 py-3 font-semibold">{blog.title}</td>
                  <td className="px-4 py-3">{blog.author}</td>
                  <td className="px-4 py-3 hidden md:table-cell text-gray-600">
                    {blog.summary.length > 50
                      ? `${blog.summary.slice(0, 50)}...`
                      : blog.summary}
                  </td>
                  <td className="px-4 py-3 text-gray-500">
                    {new Date(blog.created_at).toLocaleDateString()}
                  </td>

                  <td className="px-4 py-3 flex justify-center gap-2">
                    {/* View Button */}
                    <button
                      className="px-3 py-1.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                      title="View"
                      onClick={() => alert(`View blog: ${blog.id}`)}
                    >
                      View
                    </button>

                    {/* Edit Button */}
                    <button
                      className="px-3 py-1.5 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                      title="Edit"
                      onClick={() => alert(`Edit blog: ${blog.id}`)}
                    >
                      Edit
                    </button>

                    {/* Delete Button */}
                    <button
                      className="px-3 py-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                      title="Delete"
                      onClick={() => alert(`Delete blog: ${blog.id}`)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="mt-6 flex justify-center">
          <AdminBlogSmartPagination paginationData={paginationData} />
        </div>
      </div>
      
    </>
  );
}
