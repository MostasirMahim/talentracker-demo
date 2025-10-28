import TopHeaderStyleTwo from "@/components/Layouts/TopHeaderStyleTwo";
import NavbarStyleOne from "@/components/Layouts/NavbarStyleOne";
import PageBanner from "@/components/Common/PageBanner";
import Footer from "@/components/Layouts/Footer";
import BlogWithRightSidebar from "@/components/Blog/BlogWithRightSidebar";

export default function Page() {
  return (
    <>
      <TopHeaderStyleTwo />

      <NavbarStyleOne />

      <PageBanner
        pageTitle="Gellary & Blog"
        homePageUrl="/"
        homePageText="Home"
        activePageText="Gellary & Blog"
      />

      <BlogWithRightSidebar />

      <Footer />
    </>
  );
}
