import {
  get_learning_segments,
  get_trainer_profile,
} from "@/actions/training_solutions";
import Footer from "@/components/Layouts/Footer";
import NavbarStyleOne from "@/components/Layouts/NavbarStyleOne";
import TopHeaderStyleTwo from "@/components/Layouts/TopHeaderStyleTwo";
import CoursesPage from "@/components/Training_Solutions/learning_segment/CoursesGrid";
import TrainerDetailPage from "@/components/Training_Solutions/trainer_details/TrainerDetails";
import React from "react";

async function TrainerProfile({ params }) {
  const id = params.id;
  let trainerData = null;
  let courseData = null;
  let error = null;

  try {
    const res = await get_trainer_profile(id);
    if (res?.error) {
      error = res?.message || "Something went wrong.";
    } else {
      trainerData = res?.data;
    }
  } catch (err) {
    error = err?.message || "Unexpected error while fetching profile.";
  }
  try {
    const res = await get_learning_segments();
    if (res?.error) {
      error = res?.message || "Something went wrong.";
    } else {
      courseData = res?.data;
    }
  } catch (err) {
    error = err?.message || "Unexpected error while fetching profile.";
  }
  if (error) {
  return (
    <div
      style={{
        padding: '2.5rem',
        textAlign: 'center',
        color: '#ef4444',
        fontSize: '1.125rem',
      }}
    >
      <p style={{ marginBottom: '0.5rem' }}>🚩 Failed to load data. Try once again!</p>
      <p>{error}</p>
    </div>
  );
}
  return (
    <div>
      <TopHeaderStyleTwo />
      <NavbarStyleOne />
      <TrainerDetailPage trainer={trainerData} />
      <CoursesPage courses={courseData} />
      <Footer />
    </div>
  );
}

export default TrainerProfile;
