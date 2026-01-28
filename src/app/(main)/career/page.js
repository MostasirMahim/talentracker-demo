import TopHeaderStyleTwo from "@/components/Layouts/TopHeaderStyleTwo";
import NavbarStyleOne from "@/components/Layouts/NavbarStyleOne";
import PageBanner from "@/components/Common/PageBanner";

import Footer from "@/components/Layouts/Footer";
import JobList from "@/components/JobList/JobList";
import axiosInstance from "@/lib/axiosIntance";

export default async function Page({ searchParams }) {
  let { page, job_category, job_type, job_location, keyword } =
    await searchParams;
  page = page || "1";

  let jobs, job_types, job_categories, job_locations;
  let query = "";
  if (job_category) {
    query += `&job_category=${job_category}`;
  }
  if (job_type) {
    query += `&job_type=${job_type}`;
  }
  if (job_location) {
    query += `&job_location=${job_location}`;
  }
  if (keyword) {
    query += `&keyword=${keyword}`;
  }
  if (query.startsWith("&")) {
    query = query.slice(1);
  }
  try {
    const jobURL = `/api/jobs/v1/jobs/?deadline_filter=true&page_size=10&page=${page}&${query}`;
    const job_req = axiosInstance.get(jobURL);
    const job_type_req = axiosInstance.get("/api/jobs/v1/job_types/");
    const job_category_req = axiosInstance.get("/api/jobs/v1/job_categories/");
    const job_location_req = axiosInstance.get("/api/jobs/v1/job_locations/");

    const [
      job_response,
      job_type_response,
      job_category_response,
      job_location_response,
    ] = await Promise.all([
      job_req,
      job_type_req,
      job_category_req,
      job_location_req,
    ]);
    jobs = job_response.data;
    job_types = job_type_response.data;
    job_categories = job_category_response.data;
    job_locations = job_location_response.data;
  } catch (error) {
    console.error(error);
  }
  return (
    <>
      <TopHeaderStyleTwo />

      <NavbarStyleOne />

      <PageBanner
        pageTitle="Careers"
        homePageUrl="/"
        homePageText="Home"
        activePageText="Careers"
      />

      <JobList
        jobs={jobs}
        job_categories={job_categories}
        job_locations={job_locations}
        job_types={job_types}
      />

      <Footer />
    </>
  );
}
