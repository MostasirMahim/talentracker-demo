import LearningSegmentList from "@/components/Dashboard/LearningSegment/LearningSegmentList/LearningSegmentList";
import axiosInstance from "@/lib/axiosIntance";
import React from "react";

async function page({ searchParams }) {
  let { page } = await searchParams;
  page = page || "1";
  let data = [];
  let pagination = {};
  try {
    const response = await axiosInstance(
      `/api/learning_segments/v1/learning_segments/?page=${page}&page_size=20`
    );
    data = response?.data?.data;
    pagination = response?.data?.pagination;
  } catch (error) {
    console.log(error);
  }
  return (
    <div>
      <LearningSegmentList data={data} pagination={pagination} />
    </div>
  );
}

export default page;
