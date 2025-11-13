export const dynamic = "force-dynamic";

import BlogTable from "@/components/Dashboard/Blogs/BlogTable/BlogTable";
import axiosInstance from "@/lib/axiosIntance";
import React from "react";


async function page({ searchParams }) {
  const currentPage = searchParams?.page || 1;

  let blogs = [];

  try {
    // Pass page parameter to API
    const blogResponse = await axiosInstance.get(`/api/blogs/v1/blogs/?page_size=10&page=${currentPage}`, {
     
    });

    blogs = blogResponse.data || [];
  } catch (error) {
    console.error(error);
  }
  return (
    <div>
      <BlogTable blogs={blogs} />
    </div>
  );
}

export default page;
