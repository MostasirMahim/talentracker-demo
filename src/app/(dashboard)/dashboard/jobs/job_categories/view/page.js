"use client";
export const dynamic = "force-dynamic";
import JobCategoriesListTable from "@/components/Dashboard/jobs/JobCategoriesListTable/JobCategoriesListTable";
import JobTypeListTable from "@/components/Dashboard/jobs/JobTypeListTable/jobTypeListTable";
import axiosInstance from "@/lib/axiosIntance";
import React from "react";

async function page() {
  let job_category;
  try {
    const response = await axiosInstance.get("/api/jobs/v1/job_categories/");
    job_category = response.data;
  } catch (error) {
    console.error(error);
  }
  return (
    <div>
      <JobCategoriesListTable categories={job_category} />
    </div>
  );
}

export default page;
