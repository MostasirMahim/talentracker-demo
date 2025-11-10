import JobLocationListTable from "@/components/Dashboard/jobs/JobLocationListTable/JobLocationListTable";
import JobTypeListTable from "@/components/Dashboard/jobs/JobTypeListTable/jobTypeListTable";
import axiosInstance from "@/lib/axiosIntance";
import React from "react";

async function page() {
  let job_location;
  try {
    const response = await axiosInstance.get("/api/jobs/v1/job_locations/");
    job_location = response.data;
  } catch (error) {
    console.error(error);
  }
  return (
    <div>
      <JobLocationListTable jobLocation={job_location} />
    </div>
  );
}

export default page;
