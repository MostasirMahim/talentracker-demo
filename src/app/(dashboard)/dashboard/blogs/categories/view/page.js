import BlogsCategoriesListTable from "@/components/Dashboard/Blogs/BlogCategoryListTable/BlogsCategoriesListTable";
import axiosInstance from "@/lib/axiosIntance";
import React from "react";

async function page() {
  let blog_category;
  try {
    const response = await axiosInstance.get("/api/blogs/v1/categories/");
    blog_category = response.data;
  } catch (error) {
    console.error(error);
  }
  return (
    <div>
      <BlogsCategoriesListTable categories={blog_category} />
    </div>
  );
}

export default page;
