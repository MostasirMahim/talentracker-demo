export const dynamic = "force-dynamic";
import BlogTagsListTable from "@/components/Dashboard/Blogs/BlogTagsListTable/BlogTagsListTable";  ;
import axiosInstance from "@/lib/axiosIntance";
import React from "react";

async function page() {
  let blog_tags;
  try {
    const response = await axiosInstance.get("/api/blogs/v1/tags/");
    blog_tags = response.data;
  } catch (error) {
    console.error(error);
  }
  return (
    <div>
      <BlogTagsListTable tags={blog_tags} />
    </div>
  );
}

export default page;
