export const dynamic = "force-dynamic";
import ExpertProfileList from "@/components/Dashboard/ExpertTrainerProfile/ExpertProfileCard/ExpertProfileCard";
import axiosInstance from "@/lib/axiosIntance";
import React from "react";

async function page() {
  let data = [];
  try {
    const response = await axiosInstance.get(
      "/api/expert_trainer_profiles/v1/expert_trainer_profiles/"
    );
    data = response?.data?.data || [];
  } catch (error) {
    console.error("Error fetching expert profiles:", error);
  }

  return (
    <div>
      <ExpertProfileList data={data} />
    </div>
  );
}

export default page;
