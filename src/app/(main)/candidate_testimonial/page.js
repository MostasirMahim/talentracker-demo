export const dynamic = "force-dynamic";
import TopHeaderStyleTwo from "@/components/Layouts/TopHeaderStyleTwo";
import NavbarStyleOne from "@/components/Layouts/NavbarStyleOne";
import PageBanner from "@/components/Common/PageBanner";
import Footer from "@/components/Layouts/Footer";
import axiosInstance from "@/lib/axiosIntance";
import AllPublishedTestimonial from "@/components/candidate_testimonial/AllPublishedTestimonial";

export default async function Page({ searchParams }) {
  let testimonials = [];
  const currentPage = searchParams?.page || 1;
  try {
    const testimonialResponse = await axiosInstance.get(`/api/candidates/v1/candidates/testimonials/?page_size=12&page=${currentPage}`, {});
    testimonials = testimonialResponse.data || [];
    // console.log("Fetched testimonials:", testimonials);
  } catch (err) {
    console.error(err);
    testimonials = [];
  }

  return (
    <>
      <TopHeaderStyleTwo />
      <NavbarStyleOne />
      <PageBanner
        pageTitle="Candidate Testimonials"
        homePageUrl="/"
        homePageText="Home"
        activePageText="Candidate Testimonials"
      />
      <AllPublishedTestimonial testimonials={testimonials} />
      <Footer />
    </>
  );
}
