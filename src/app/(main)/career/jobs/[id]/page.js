import JobDetails from "@/components/career_components/JobDetails/JobDetails";
import Footer from "@/components/Layouts/Footer";
import NavbarStyleOne from "@/components/Layouts/NavbarStyleOne";
import TopHeaderStyleTwo from "@/components/Layouts/TopHeaderStyleTwo";
import axiosInstance from "@/lib/axiosIntance";
import React from "react";

async function page({ params }) {
  const { id } = await params;
  let jobDetails = {};
  try {
    const response = await axiosInstance.get(`/api/jobs/v1/jobs/${id}/`);
    jobDetails = response?.data?.data;
  } catch (error) {
    console.error(error);
  }

  return (
    <>
      <TopHeaderStyleTwo />
      <NavbarStyleOne />
      <JobDetails job={jobDetails} />
      <Footer />
    </>
  );
}

export default page;
