// app/blog/page.js
import TopHeaderStyleTwo from "@/components/Layouts/TopHeaderStyleTwo";
import NavbarStyleOne from "@/components/Layouts/NavbarStyleOne";
import PageBanner from "@/components/Common/PageBanner";
import Footer from "@/components/Layouts/Footer";
import BlogGridPost from "@/components/Blog/BlogGridPost";
import GalleryPost from "@/components/Blog/Gallery";
import axiosInstance from "@/lib/axiosIntance";
import { cookies } from "next/headers";

export default async function BlogPage() {
  const cookieStore = cookies();
  const authToken = cookieStore.get("access_token")?.value || "";

  let blogs = [];
  let gallery = [];

  try {
    // fetch blogs and gallery at the same time
    const [blogResponse, galleryResponse] = await Promise.all([
      axiosInstance.get("/api/blogs/v1/blogs/", {
        headers: { Cookie: `access_token=${authToken}` },
      }),
      // axiosInstance.get("/api/blogs/v1/gallery/", {
      //   headers: { Cookie: `access_token=${authToken}` },
      // }),
    ]);

    // slice first 6 blogs for homepage
    blogs = blogResponse.data.data?.slice(0, 6) || [];
    // gallery = galleryResponse.data.data?.slice(0, 6) || [];
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

      {/* Pass blogs and gallery as props */}
      <BlogGridPost blogs={blogs} />
      {/* <GalleryPost gallery={gallery} /> */}

      <Footer />
    </>
  );
}
