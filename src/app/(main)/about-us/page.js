import TopHeaderStyleTwo from "@/components/Layouts/TopHeaderStyleTwo";
import NavbarStyleOne from "@/components/Layouts/NavbarStyleOne";
import PageBanner from "@/components/Common/PageBanner";
import AboutContentOne from "@/components/About/AboutContentOne";
import FunfactsTwo from "@/components/Common/FunfactsTwo";
import TeamMember from "@/components/Common/TeamMember";
import AboutContentTwo from "@/components/About/AboutContentTwo";
import TestimonialStyleOne from "@/components/Common/TestimonialStyleOne";
import FreeQuoteFormStyle1 from "@/components/FreeQuoteForm/FreeQuoteFormStyle1";
import Footer from "@/components/Layouts/Footer";
import NavbarStyleTwo from "@/components/Layouts/NavbarStyleTwo";
import MissionAndVision from "@/components/About/MissonAndVision/MissionAndVision";
import IndustriesWeServe from "@/components/About/IndustriesWeServer/IndustriesWebServe";
import StrategicPartners from "@/components/About/StrategicPartner/StrategicPartner";

export default function Page() {
  return (
    <>
      <TopHeaderStyleTwo />
      <NavbarStyleOne />
      <PageBanner
        pageTitle="About Us"
        homePageUrl="/"
        homePageText="Home"
        activePageText="About Us"
      />

      <AboutContentOne />
      <MissionAndVision />

      <AboutContentTwo />
      <IndustriesWeServe />

      <TestimonialStyleOne />
      <StrategicPartners />

      <Footer />
    </>
  );
}
