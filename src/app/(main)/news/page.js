export const dynamic = "force-dynamic";
import TopHeaderStyleTwo from "@/components/Layouts/TopHeaderStyleTwo";
import NavbarStyleOne from "@/components/Layouts/NavbarStyleOne";
import PageBanner from "@/components/Common/PageBanner";
import Footer from "@/components/Layouts/Footer";
import axiosInstance from "@/lib/axiosIntance";
import AllNewsPost from "@/components/News/AllNewsPost";

export default async function AllNewsPage({ searchParams }) {
  let blogs = [];
  const currentPage = searchParams?.page || 1;
  try {
    const blogResponse = await axiosInstance.get(`/api/news/v1/news/?page_size=10&page=${currentPage}`, {});
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
        pageTitle="News"
        homePageUrl="/"
        homePageText="Home"
        activePageText="News"
      />
      <AllNewsPost blogs={blogs} />
      <Footer />
    </>
  );
}
