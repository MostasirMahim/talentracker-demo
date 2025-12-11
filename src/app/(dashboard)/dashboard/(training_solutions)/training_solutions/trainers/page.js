
import TrainersTable from "@/components/Dashboard/Training_Solutions/Trainers/TrainersTable";
import axiosInstance from "@/lib/axiosIntance";
import React from "react";
import { cookies } from "next/headers";



async function page({ searchParams }) {
  const currentPage = searchParams?.page || 1;
  const cookieStore = cookies();
  const authToken = cookieStore.get("access_token")?.value || "";
  let trainers = [];

  try {
    // Pass page parameter to API
    const trainersResponse = await axiosInstance.get(`/api/training_solutions/v1/trainers/list/?page_size=10&page=${currentPage}`, {
     
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    trainers = trainersResponse.data || [];
  } catch (error) {
    console.error(error);
  }
  return (
    <div>
      <TrainersTable trainers={trainers} />
    </div>
  );
}

export default page;
