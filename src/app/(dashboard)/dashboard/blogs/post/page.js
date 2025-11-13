import BlogPostForm from "@/components/Dashboard/Blogs/BlogPostForm/BlogPostForm";
import axiosInstance from "@/lib/axiosIntance";
import React from "react";

async function BlogPostPage() {
  let blog_tags = [];
  let blog_categories = [];
  let error = null;

  try {
    // Fetch tags and categories in parallel
    const [tags_res, categories_res] = await Promise.all([
      axiosInstance.get("/api/blogs/v1/tags/"),
      axiosInstance.get("/api/blogs/v1/categories/")
    ]);

    // Extract data safely
    blog_tags = tags_res?.data?.data || [];
    blog_categories = categories_res?.data?.data || [];

  } catch (err) {
    console.error("Error fetching blog data:", err);
    error = err.message;
  }

  // If there's an error fetching required data, show error message
  if (error) {
    return (
      <div className="max-w-5xl mx-auto py-10">
        <div className="bg-red-50 border border-red-200 rounded-xl p-8 text-center">
          <h2 className="text-xl font-bold text-red-600 mb-2">
            Failed to Load Blog Form
          </h2>
          <p className="text-red-500 mb-4">
            Could not fetch tags and categories. Please try again later.
          </p>
          <p className="text-sm text-gray-600">Error: {error}</p>
        </div>
      </div>
    );
  }

  // If no tags or categories found, show warning but still render form
  if (blog_tags.length === 0 || blog_categories.length === 0) {
    console.warn("No tags or categories found");
  }

  return (
    <>
      <BlogPostForm
        blogTags={blog_tags}
        blogCategories={blog_categories}
      />
    </>
  );
}

export default BlogPostPage;