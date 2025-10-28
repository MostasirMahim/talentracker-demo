import TopHeaderStyleTwo from "@/components/Layouts/TopHeaderStyleTwo";
import NavbarStyleOne from "@/components/Layouts/NavbarStyleOne";
import PageBanner from "@/components/Common/PageBanner";
import ContactInfo from "@/components/Contact/ContactInfo";
import ContactForm from "@/components/Contact/ContactForm";
import Footer from "@/components/Layouts/Footer";

export default function Page() {
  return (
    <>
      <TopHeaderStyleTwo />

      <NavbarStyleOne />

      <PageBanner
        pageTitle="Contact Us"
        homePageUrl="/"
        homePageText="Home"
        activePageText="Contact Us"
      />

      <ContactInfo />

      <ContactForm />

      <Footer />
    </>
  );
}
