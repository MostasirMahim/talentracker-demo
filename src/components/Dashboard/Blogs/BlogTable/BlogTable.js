"use client";

import React from "react";
import Image from "next/image";
import BlogSmartPagination from "@/components/SmartPagination/BlogSmartPagination";
import Link from "next/link";
import axiosInstance from "@/lib/axiosIntance";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function BlogTable({ blogs }) {
  const router = useRouter();

  if (!blogs || !blogs.data) {
    return <p className="text-center py-10">No blogs found</p>;
  }

  const blogList = blogs.data;
  const paginationData = blogs.pagination;

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this blog?"
    );
    
    if (!confirmDelete) {
      toast.info("Blog deletion cancelled");
      return;
    }

    // Convert id to integer
    const blogId = parseInt(id);
    
    try {
      const response = await axiosInstance.delete(
        `/api/blogs/v1/blogs/${blogId}/`
      );
      
      if (response.status === 204) {
        toast.success("Blog deleted successfully");
        router.refresh();
      }
    } catch (error) {
      console.error("Delete error:", error);
      const errorMessage = error.response?.data?.message || "Failed to delete blog";
      toast.error(errorMessage);
    }
  };

  const handleUpdate = (id) => {
    const blogId = parseInt(id);
    const blog = blogList.find((blog) => blog.id === blogId);
    
    if (blog) {
      router.push(`/dashboard/blogs/post/?blog_id=${blogId}`);
    } else {
      toast.error("Blog not found");
    }
  };

  return (
    <>
      <div className="w-full px-4 md:px-8 py-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">All Blogs</h2>
          
          {/* Add New Blog Button */}
          <Link href="/dashboard/blogs/post/">
            <button 
              className="px-4 py-2 cursor-pointer bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              + Create New Blog
            </button>
          </Link>
        </div>

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
              {blogList.map((blog) => (
                <tr
                  key={blog.id}
                  className="border-b hover:bg-gray-50 transition duration-150"
                >
                  <td className="px-4 py-3 font-medium text-gray-900">
                    {blog.id}
                  </td>

                  <td className="px-4 py-3">
                    {blog.featured_image ? (
                      <Image
                        className="rounded-md"
                        src={`${process.env.NEXT_PUBLIC_BACKEND_API_URL}${blog.featured_image}`}
                        alt={blog.altText || blog.title}
                        width={260}
                        height={250}
                        style={{
                          width: "160px",
                          height: "80px",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      <div className="w-[60px] h-10 bg-gray-200 flex items-center justify-center text-gray-400 text-xs rounded-md">
                        N/A
                      </div>
                    )}
                  </td>

                  <td className="px-4 py-3 font-semibold">
                    {blog.title.length > 40
                      ? `${blog.title.slice(0, 40)}...`
                      : blog.title}
                  </td>
                  
                  <td className="px-4 py-3">{blog.author || "Anonymous"}</td>
                  
                  <td className="px-4 py-3 hidden md:table-cell text-gray-600">
                    {blog.summary.length > 50
                      ? `${blog.summary.slice(0, 50)}...`
                      : blog.summary}
                  </td>
                  
                  <td className="px-4 py-3 text-gray-500">
                    {new Date(blog.created_at).toLocaleDateString()}
                  </td>

                  <td className="px-4 py-3">
                    <div className="flex justify-center gap-2">
                      {/* View Button */}
                      <Link href={`/blog/${blog.id}`}>
                        <button
                          className="px-3 py-1.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition cursor-pointer"
                          title="View"
                        >
                          View
                        </button>
                      </Link>

                      {/* Edit Button */}
                      <button
                        className="px-3 py-1.5 cursor-pointer bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                        title="Edit"
                        onClick={() => handleUpdate(blog.id)}
                      >
                        Edit
                      </button>

                      {/* Delete Button */}
                      <button
                        className="px-3 py-1.5 cursor-pointer bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                        title="Delete"
                        onClick={() => handleDelete(blog.id)}
                      >
                        Delete
                      </button>
                    </div>
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
    </>
  );
}