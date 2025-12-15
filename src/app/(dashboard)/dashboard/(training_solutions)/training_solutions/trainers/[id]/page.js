
import axiosInstance from "@/lib/axiosIntance";
import TrainersDetails from "@/components/Dashboard/Training_Solutions/Trainers/TrainersDetails";
import React from "react";
import { cookies } from "next/headers";


export default async function Page({ params }) {
  const { id } = params;

  let trainer = null;
  let errorMessage = null;
  const cookieStore = cookies();
  const authToken = cookieStore.get("access_token")?.value || "";


  try {
    // Fetch Trainer Details
    const response = await axiosInstance.get(
      `/api/training_solutions/v1/trainers/list/${id}/`
      , {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );

    if (response?.data?.status === "success") {
      trainer = response.data.data;
    } else {
      errorMessage = "Failed to fetch trainer information.";
    }
  } catch (error) {
    console.error("Error fetching trainer details:", error);

    errorMessage =
      error?.response?.data?.message ||
      "Something went wrong while loading trainer details.";
  }

  return (
    <div className="p-6">

    
      {/* Error UI */}
      {!trainer && (
        <div className="bg-red-50 border text-2xl border-red-200 text-red-700 p-6 rounded-lg shadow">
          <p className="font-medium">Error Loading Trainer Data</p>
          <p className="text-sm mt-1">{errorMessage}</p>
        </div>
      )}

      {/* Details UI */}
      {trainer && <TrainersDetails trainer={trainer} />}
    </div>
  );
}
