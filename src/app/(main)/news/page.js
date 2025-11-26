import TopHeaderStyleTwo from "@/components/Layouts/TopHeaderStyleTwo";
import NavbarStyleOne from "@/components/Layouts/NavbarStyleOne";
import PageBanner from "@/components/Common/PageBanner";
import Footer from "@/components/Layouts/Footer";
import axiosInstance from "@/lib/axiosIntance";
import NewsGridPost from "@/components/News/NewsGridPost";

export default async function NewsPage() {
  let blogs = [];
  let gallery = [];
  try {
    const blogResponse = await axiosInstance.get("/api/news/v1/news/");
    blogs = blogResponse.data.data?.slice(0, 6) || [];
  } catch (err) {
    console.error(err);
    blogs = [];
    gallery = [];
  }

  return (
    <>
      <TopHeaderStyleTwo />
      <NavbarStyleOne />
      <PageBanner
        pageTitle="Gallery & Blog"
        homePageUrl="/"
        homePageText="Home"
        activePageText="Gallery & Blog"
      />
      <NewsGridPost blogs={blogs} />
      <Footer />
    </>
  );
}
