import NavbarStyleTwo from "@/components/Layouts/NavbarStyleTwo";
import MainBanner from "@/components/HomeDemo1/MainBanner";
import ServicesCard from "@/components/HomeDemo1/ServicesCard";
import Funfacts from "@/components/Common/Funfacts";
import TestimonialStyleOne from "@/components/Common/TestimonialStyleOne";
import WhyChooseUs from "@/components/HomeDemo1/WhyChooseUs";
import Footer from "@/components/Layouts/Footer";
import FreeQuoteFormStyle2 from "@/components/FreeQuoteForm/FreeQuoteFormStyle2";
import CompanyOverview2 from "@/components/HomeDemo1/CompanyOverview2";

export default function Home() {
  
  return (
    <>
      <NavbarStyleTwo />
      <MainBanner />
      <CompanyOverview2 />
      <ServicesCard />
      <Funfacts />
      <WhyChooseUs />
      <FreeQuoteFormStyle2 />
      <TestimonialStyleOne />
      <Footer />
    </>
  );
}
