import CandidateList from "@/components/Dashboard/Candidate/CandidateList/CandidateList";
import CandidateFiltersWrapper from "@/components/Dashboard/Candidate/CandidateFilters/CandidateFiltersWrapper";
import axiosInstance from "@/lib/axiosIntance";
import { cookies } from "next/headers";
import React from "react";
export const dynamic = 'force-dynamic';
export const revalidate = 0;

async function page({ searchParams }) {
  const allSearchParams = await searchParams;
  const cookieStore = cookies();
  const accessToken = cookieStore.get("access_token")?.value;
  const queryParams = new URLSearchParams();
  
  Object.keys(allSearchParams).forEach((key) => {
    queryParams.set(key, allSearchParams[key]);
  });
  
  if (!queryParams.has("page")) {
    queryParams.set("page", "1");
  }
  if (!queryParams.has("page_size")) {
    queryParams.set("page_size", "10");
  }

  let candidateData;
  try {
    const response = await axiosInstance(
      `/api/candidates/v1/candidates/view/all/?${queryParams.toString()}`,
      {
        headers: {
          Cookie: accessToken ? `access_token=${accessToken}` : "",
        },
      }
    );
    console.log("res", response);
    candidateData = response.data;
  } catch (error) {
    console.log(error);
  }

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      <CandidateFiltersWrapper />
      <CandidateList data={candidateData} />
    </div>
  );
}

export default page;
