export const dynamic = "force-dynamic";
import JobListTable from "@/components/Dashboard/jobs/JobListTable/JobListTable";
import axiosInstance from "@/lib/axiosIntance";
import React from "react";

async function page({ searchParams }) {
  let { page } = await searchParams;
  page = page || "1";
  let jobs;
  try {
    const response = await axiosInstance.get(
      `/api/jobs/v1/jobs/?page_size=1&page=${page}`
    );
    jobs = response.data;
  } catch (error) {
    console.log(error);
  }
  return (
    <>
      <JobListTable jobs={jobs} />
    </>
  );
}

export default page;
