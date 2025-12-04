export const dynamic = "force-dynamic";
import LearningSegmentCategoryList from "@/components/Dashboard/LearningSegment/LearningSegmentCategoryList/LearningSegmentCategoryList";
import axiosInstance from "@/lib/axiosIntance";
import React from "react";

async function page() {
  let data = {};
  try {
    const response = await axiosInstance.get(
      "/api/learning_segments/v1/learning_segment_categories/"
    );
    data = response.data;
  } catch (error) {
    console.log(error);
  }
  return (
    <div>
      <LearningSegmentCategoryList categories={data} />
    </div>
  );
}

export default page;
