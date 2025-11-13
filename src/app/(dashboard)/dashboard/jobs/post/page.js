export const dynamic = "force-dynamic";
import JobPostForm from "@/components/Dashboard/jobs/JobPostForm/JobPostForm";
import axiosInstance from "@/lib/axiosIntance";
import React, { Suspense } from "react";

async function page() {
  let job_type, job_categories, job_locations;
  try {
    const job_type_req = axiosInstance.get("/api/jobs/v1/job_types/");
    const job_category_req = axiosInstance.get("/api/jobs/v1/job_categories/");
    const job_location_req = axiosInstance.get("/api/jobs/v1/job_locations/");
    const [job_type_res, job_category_res, job_location_res] =
      await Promise.all([job_type_req, job_category_req, job_location_req]);

    job_type = job_type_res.data;
    job_categories = job_category_res.data;
    job_locations = job_location_res.data;
    console.log(job_type, job_categories, job_locations);
  } catch (error) {
    console.log(error);
  }
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <JobPostForm
          jobTypes={job_type}
          jobCategories={job_categories}
          jobLocations={job_locations}
        />
      </Suspense>
    </>
  );
}

export default page;
