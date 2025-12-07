import LearningSegmentPostForm from "@/components/Dashboard/LearningSegment/LearningSegmentPostForm/LearningSegmentPostForm";
import axiosInstance from "@/lib/axiosIntance";
import React from "react";

async function page() {
  let data = [];
  try {
    const response = await axiosInstance.get(
      `/api/learning_segments/v1/learning_segment_categories/`
    );
    data = response.data.data;
  } catch (error) {
    console.log(error);
  }
  return (
    <div>
      <LearningSegmentPostForm blogCategories={data} />
    </div>
  );
}

export default page;
