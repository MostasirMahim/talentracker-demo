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
        pageTitle="Our Services"
        homePageUrl="/"
        homePageText="Home"
        activePageText="Services"
      />
      <ProjectsThreeColumn />
      <Footer />
    </>
  );
}
