import CandidateList from "@/components/Dashboard/Candidate/CandidateList/CandidateList";
import axiosInstance from "@/lib/axiosIntance";
import { cookies } from "next/headers";
import React from "react";

async function page({ searchParams }) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("access_token")?.value;
  let { page } = await searchParams;
  page = page || "1";
  let candidateData;
  try {
    const response = await axiosInstance(
      `/api/candidates/v1/candidates/view/all/?page_size=10&page=${page}`,
      {
        headers: {
          Cookie: accessToken ? `access_token=${accessToken}` : "",
        },
      }
    );
    candidateData = response.data;
  } catch (error) {
    console.log(error);
  }
  return (
    <div>
      <CandidateList data={candidateData} />
    </div>
  );
}

export default page;
