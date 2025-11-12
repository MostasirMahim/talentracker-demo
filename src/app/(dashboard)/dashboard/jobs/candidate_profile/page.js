import CandidateProfileForApplication from "@/components/Dashboard/jobs/CandidateProfileForApplication/CandidateProfileForApplication";
import axiosInstance from "@/lib/axiosIntance";
import { cookies } from "next/headers";
import React from "react";

async function page({ searchParams }) {
  const { candidate, job_application } = await searchParams;
  const cookieStore = cookies();
  const authToken = cookieStore.get("access_token")?.value || "";
  let candidateData;
  try {
    const response = await axiosInstance.get(
      `/api/candidates/v1/candidates/${candidate}/?job_application=${job_application}`,
      {
        headers: {
          Cookie: `access_token=${authToken}`,
        },
      }
    );
    candidateData = response.data;
  } catch (error) {
    console.log(error);
  }
  return (
    <div>
      <CandidateProfileForApplication candidateData={candidateData} />
    </div>
  );
}

export default page;
