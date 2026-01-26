import JobApplicationsListTable from "@/components/Dashboard/jobs/JobApplicationsListTable/JobApplicationsListTable";
import ApplicationFiltersWrapper from "@/components/Dashboard/jobs/ApplicationFilters/ApplicationFiltersWrapper";
import axiosInstance from "@/lib/axiosIntance";
import { cookies } from "next/headers";
import React from "react";

async function page({ params, searchParams }) {
  const allSearchParams = await searchParams;
  const { id } = await params;

  const queryParams = new URLSearchParams();
  queryParams.set("job", id);

  Object.keys(allSearchParams).forEach((key) => {
    if (key !== "job") {
      queryParams.set(key, allSearchParams[key]);
    }
  });

  // Ensure defaults
  if (!queryParams.has("page")) {
    queryParams.set("page", "1");
  }
  if (!queryParams.has("page_size")) {
    queryParams.set("page_size", "25");
  }

  const cookieStore = cookies();
  const authToken = cookieStore.get("access_token")?.value || "";
  let applications;

  try {
    const response = await axiosInstance.get(
      `/api/jobs/v1/job_applications/?${queryParams.toString()}`,
      {
        headers: {
          Cookie: `access_token=${authToken}`,
        },
      },
    );
    applications = response.data;
  } catch (error) {
    console.log(error.data);
  }

  return (
    <div className="min-h-screen">
      <ApplicationFiltersWrapper jobId={id} />
      <JobApplicationsListTable data={applications} />
    </div>
  );
}

export default page;
