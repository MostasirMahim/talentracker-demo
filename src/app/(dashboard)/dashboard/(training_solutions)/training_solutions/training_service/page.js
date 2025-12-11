
import TrainingServiceRequestTable from "@/components/Dashboard/Training_Solutions/TrainingService/TrainingServiceRequestTable";
import axiosInstance from "@/lib/axiosIntance";
import React from "react";
import { cookies } from "next/headers";


async function page({ searchParams }) {
  const currentPage = searchParams?.page || 1;

  let requests = [];
  const cookieStore = cookies();
  const authToken = cookieStore.get("access_token")?.value || "";


  try {
    // Pass page parameter to API
    const requestsResponse = await axiosInstance.get(`/api/training_solutions/v1/training_service_requests/?page_size=10&page=${currentPage}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    requests = requestsResponse.data || [];
  } catch (error) {
    console.error(error);
  }
  return (
    <div>
      <TrainingServiceRequestTable requests={requests} />
    </div>
  );
}

export default page;
