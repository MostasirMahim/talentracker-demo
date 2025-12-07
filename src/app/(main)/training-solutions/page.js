import TopHeaderStyleTwo from "@/components/Layouts/TopHeaderStyleTwo";
import NavbarStyleOne from "@/components/Layouts/NavbarStyleOne";
import PageBanner from "@/components/Common/PageBanner";
import ProjectsThreeColumn from "@/components/Projects/ProjectsThreeColumn";
import Footer from "@/components/Layouts/Footer";

export default function Page() {
  return (
    <>
      <TopHeaderStyleTwo />

      <NavbarStyleOne />
      <PageBanner
        pageTitle="Training Solutions"
        homePageUrl="/"
        homePageText="Home"
        activePageText="Training Solutions"
      />
      <ProjectsThreeColumn />

      <Footer />
    </>
  );
}
