export const dynamic = "force-dynamic";

import BlogTable from "@/components/Dashboard/Blogs/BlogTable/BlogTable";
import axiosInstance from "@/lib/axiosIntance";
import React from "react";
import { cookies } from "next/headers";



async function page({ searchParams }) {
  const currentPage = searchParams?.page || 1;
  const cookieStore = cookies();
  const authToken = cookieStore.get("access_token")?.value || "";

  let blogs = [];

  try {
    // Pass page parameter to API
    const blogResponse = await axiosInstance.get(`/api/blogs/v1/blogs/?page_size=10&page=${currentPage}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
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
