import JobDetails from "@/components/career_components/JobDetails/JobDetails";
import Footer from "@/components/Layouts/Footer";
import NavbarStyleOne from "@/components/Layouts/NavbarStyleOne";
import TopHeaderStyleTwo from "@/components/Layouts/TopHeaderStyleTwo";
import React from "react";

function page() {
  const jobData = {
    id: 8,
    title: "PHP Developer",
    body: "<p><strong>Responsibilities:</strong></p><ul><li>Develop APIs</li><li>Maintain legacy systems</li></ul>",
    salary: "30",
    deadline: "2020-02-05",
    job_type: { name: "Hybrid" },
    job_category: { name: "Freelance" },
    job_location: { city: "Dhaka 2", country: "Bangladesh" },
    created_at: "2025-10-30T09:56:38.510807+06:00",
  };
  return (
    <>
      <TopHeaderStyleTwo />
      <NavbarStyleOne />
      <JobDetails job={jobData} />
      <Footer />
    </>
  );
}

export default page;
