// app/blog/page.js
import TopHeaderStyleTwo from "@/components/Layouts/TopHeaderStyleTwo";
import NavbarStyleOne from "@/components/Layouts/NavbarStyleOne";
import PageBanner from "@/components/Common/PageBanner";
import Footer from "@/components/Layouts/Footer";
import axiosInstance from "@/lib/axiosIntance";
import { cookies } from "next/headers";
import AllBlogPost from "@/components/Blog/AllBlogPost";

export default async function AllBlogsPage({ searchParams }) {
  const cookieStore = cookies();
  const authToken = cookieStore.get("access_token")?.value || "";

  // Get current page from searchParams, default to 1
  const currentPage = searchParams?.page || 1;

  let blogs = [];

  try {
    // Pass page parameter to API
    const blogResponse = await axiosInstance.get(`/api/blogs/v1/blogs/?page_size=6&page=${currentPage}`, {
     
    });

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

      <AllBlogPost blogs={blogs} />

      <Footer />
    </>
  );
}