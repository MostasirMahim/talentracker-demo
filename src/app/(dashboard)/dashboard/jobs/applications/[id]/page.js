import JobApplicationsListTable from "@/components/Dashboard/jobs/JobApplicationsListTable/JobApplicationsListTable";
import axiosInstance from "@/lib/axiosIntance";
import { cookies } from "next/headers";
import React from "react";

async function page({ params, searchParams }) {
  let { page } = await searchParams;
  page = page || "1";
  const { id } = await params;
  const cookieStore = cookies();
  const authToken = cookieStore.get("access_token")?.value || "";
  let applications;
  try {
    const response = await axiosInstance.get(
      `/api/jobs/v1/job_applications/?job=${id}&page_size=25&page=${page}`,
      {
        headers: {
          Cookie: `access_token=${authToken}`,
        },
      }
    );
    applications = response.data;
  } catch (error) {
    console.log(error.data);
  }

  return (
    <div>
      <JobApplicationsListTable data={applications} />
    </div>
  );
}

export default page;
