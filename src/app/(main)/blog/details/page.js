import TopHeaderStyleTwo from "@/components/Layouts/TopHeaderStyleTwo";
import NavbarStyleOne from "@/components/Layouts/NavbarStyleOne";
import PageBanner from "@/components/Common/PageBanner";
import BlogDetailsContent from "@/components/Blog/BlogDetailsContent";
import Footer from "@/components/Layouts/Footer";

export default function Page() {
  return (
    <>
      <TopHeaderStyleTwo />

      <NavbarStyleOne />

      <PageBanner
        pageTitle="Blog Details"
        homePageUrl="/"
        homePageText="Home"
        activePageText="Blog Details"
      />

      <BlogDetailsContent />

      <Footer />
    </>
  );
}
