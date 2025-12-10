export const dynamic = "force-dynamic";

import TrainersTable from "@/components/Dashboard/Training_Solutions/Trainers/TrainersTable";
import axiosInstance from "@/lib/axiosIntance";
import React from "react";


async function page({ searchParams }) {
  const currentPage = searchParams?.page || 1;

  let trainers = [];

  try {
    // Pass page parameter to API
    const trainersResponse = await axiosInstance.get(`/api/training_solutions/v1/trainers/list/?page_size=10&page=${currentPage}`, {
     
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
