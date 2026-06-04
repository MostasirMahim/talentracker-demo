import NavbarStyleOne from "@/components/Layouts/NavbarStyleOne";
import MainBannerNew from "@/components/HomeDemo1/MainBannerNew";
import ServicesCard from "@/components/HomeDemo1/ServicesCard";
import Funfacts from "@/components/Common/Funfacts";
import TestimonialUpdated from "@/components/Common/TestimonialUpdated";
import WhyChooseUs from "@/components/HomeDemo1/WhyChooseUs";
import Footer from "@/components/Layouts/Footer";
import FreeQuoteFormStyle2 from "@/components/FreeQuoteForm/FreeQuoteFormStyle2";
import CompanyOverview2 from "@/components/HomeDemo1/CompanyOverview2";
import CandidateOverview from "@/components/HomeDemo1/CandidateOverview";
import CandidateTestimonialCarousel from "@/components/HomeDemo1/CandidateTestimonials";
import FloatingSocialIcons from "@/components/HomeDemo1/FloatingSocialIcons";
import { get_me } from "@/actions/auth";
import fetchTestimonials from "@/actions/candidate_testimonial";
import TopHeaderStyleOne from "@/components/Layouts/TopHeaderStyleOne";

export default async function Home() {
  const data = await get_me();
  const testimonials = await fetchTestimonials();

  return (
    <>
      <TopHeaderStyleOne />
      <NavbarStyleOne />
      <MainBannerNew />
      <FloatingSocialIcons />
      <CompanyOverview2 />
      <ServicesCard />
      <Funfacts />
      <WhyChooseUs />
      <FreeQuoteFormStyle2 />
      <TestimonialUpdated />
      <CandidateOverview />
      <CandidateTestimonialCarousel testimonials={testimonials} />
      <Footer />
    </>
  );
}

