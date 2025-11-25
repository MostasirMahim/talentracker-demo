import TopHeaderStyleTwo from "@/components/Layouts/TopHeaderStyleTwo";
import NavbarStyleOne from "@/components/Layouts/NavbarStyleOne";
import PageBanner from "@/components/Common/PageBanner";
import Footer from "@/components/Layouts/Footer";
import axiosInstance from "@/lib/axiosIntance";
import AllNewsPost from "@/components/News/AllNewsPost";

export default async function AllNewsPage({ searchParams }) {
  let blogs = [];

  try {
    const blogResponse = await axiosInstance.get(`/api/news/v1/news/`, {});
    blogs = blogResponse.data || [];
  } catch (err) {
    console.error(err);
    blogs = [];
  }

  return (
    <>
      <TopHeaderStyleTwo />
      <NavbarStyleOne />
      <PageBanner
        pageTitle="All Blogs"
        homePageUrl="/"
        homePageText="Home"
        activePageText="All Blogs"
      />
      <AllNewsPost blogs={blogs} />
      <Footer />
    </>
  );
}
