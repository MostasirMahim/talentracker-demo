export const dynamic = "force-dynamic";
import TopHeaderStyleTwo from "@/components/Layouts/TopHeaderStyleTwo";
import NavbarStyleOne from "@/components/Layouts/NavbarStyleOne";
import PageBanner from "@/components/Common/PageBanner";
import Footer from "@/components/Layouts/Footer";
import axiosInstance from "@/lib/axiosIntance";
import CandidateTestimonialPublicForm from "@/components/candidate_testimonial/CandidateTestimonialPublicForm";

export default async function Page() {
  
  return (
    <>
      <TopHeaderStyleTwo />
      <NavbarStyleOne />
      <PageBanner
        pageTitle="Submit Your Story Of Success"
        homePageUrl="/"
        homePageText="Home"
        activePageText="Submit Story"
      />
      <CandidateTestimonialPublicForm />
      <Footer />
    </>
  );
}
