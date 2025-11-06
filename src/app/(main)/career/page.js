import TopHeaderStyleTwo from "@/components/Layouts/TopHeaderStyleTwo";
import NavbarStyleOne from "@/components/Layouts/NavbarStyleOne";
import PageBanner from "@/components/Common/PageBanner";
import ProjectsThreeColumn from "@/components/Projects/ProjectsThreeColumn";
import Footer from "@/components/Layouts/Footer";
import JobList from "@/components/JobList/JobList";
import axiosInstance from "@/lib/axiosIntance";

export default async function Page() {
  let jobs, job_types, job_categories, job_locations;
  try {
    const job_req = axiosInstance.get("/api/jobs/v1/jobs/?page_size=10");
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
