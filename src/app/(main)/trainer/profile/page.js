
import { get_trainer_profile_data } from "@/actions/trainer";
import TrainerProfile from "@/components/Trainer/pages/ProfileHome";
import { User2 } from "lucide-react";
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

  if (error) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
            marginTop: "50px",
          }}
        >
          <User2 size={50} style={{ color: "#1489bc" }} />
          <h3 style={{ color: "#0e4c89" }}>Please Edit Your Profile First</h3>
        </div>
      </div>
    );
  }
  return (
    <div>
      <TrainerProfile profileData={sampleData} />
    </div>
  );
}

export default page;
