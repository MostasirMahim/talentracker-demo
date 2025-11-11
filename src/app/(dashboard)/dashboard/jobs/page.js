import axiosInstance from "@/lib/axiosIntance";
import React from "react";

async function page() {
  try {
    const response = await axiosInstance.get("/api/jobs/v1/jobs/?page_size=10");
    console.log(response.data);
  } catch (error) {}
  return <div>page</div>;
}

export default page;
