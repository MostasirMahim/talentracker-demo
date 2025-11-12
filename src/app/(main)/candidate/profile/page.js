import { get_candidate_profile_data } from "@/actions/candidate";
import ViewProfile from "@/components/Candidate/profile/pages/ProfileHome";
import React from "react";

async function page() {
  let sampleData = null;
  let error = null;

  try {
    const res = await get_candidate_profile_data();
    console.log(res);
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
        <p className="text-lg">
          {" "}
          🚩 Failed to load profile. Please Register & Set Your Profile First
        </p>
        <p>{error}</p>
      </div>
    );
  }
  return (
    <div>
      <ViewProfile profileData={sampleData} />
    </div>
  );
}

export default page;
