export const dynamic = "force-dynamic";
import JobTypeListTable from "@/components/Dashboard/jobs/JobTypeListTable/jobTypeListTable";
import axiosInstance from "@/lib/axiosIntance";
import React from "react";

async function page() {
  let job_type;
  try {
    const response = await axiosInstance.get("/api/jobs/v1/job_types/");
    job_type = response.data;
  } catch (error) {
    console.error(error);
  }
  return (
    <div>
      <JobTypeListTable jobTypes={job_type} />
    </div>
  );
}

export default page;
