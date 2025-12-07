import { get_trainer_profile_data } from "@/actions/trainer";
import EditTrainerProfileForm from "@/components/Trainer/components/edit_profile/EditTrainerProfile";
import React from "react";

async function page() {
  let sampleData = null;
  let error = null;

  try {
    const res = await get_trainer_profile_data();
    if (res?.error) {
      error = res?.message || "Something went wrong.";
    } else {
      sampleData = res?.data;
    }
  } catch (err) {
    error = err?.message || "Unexpected error while fetching profile.";
  }

  return (
    <div>
      <EditTrainerProfileForm initialData={sampleData} />
    </div>
  );
}

export default page;
