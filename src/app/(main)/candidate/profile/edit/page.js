import { get_candidate_profile_data } from "@/actions/candidate";
import EditProfileForm from "@/components/Candidate/edit_profile/EditProfile";
import React from "react";

async function page() {
  let sampleData = null;
  let error = null;

  try {
    const res = await get_candidate_profile_data();
    if (res?.error) {
      error = res?.message || "Something went wrong.";
    } else {
      sampleData = res?.data;
    }
  } catch (err) {
    error = err?.message || "Unexpected error while fetching profile.";
  }

  if (error) {
    return (
      <div className="p-10 text-center text-red-500 text-lg">
        <p>⚠️ Failed to load profile.</p>
        <p>{error}</p>
      </div>
    );
  }
  return (
    <div>
      <EditProfileForm initialData={sampleData} />
    </div>
  );
}

export default page;
