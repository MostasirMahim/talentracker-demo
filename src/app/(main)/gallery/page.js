import { get_gallery_images } from "@/actions/gallery";
import PageBanner from "@/components/Common/PageBanner";
import MasonryGallery from "@/components/Gallery/MasonryGallery";
import Footer from "@/components/Layouts/Footer";
import NavbarStyleOne from "@/components/Layouts/NavbarStyleOne";
import TopHeaderStyleTwo from "@/components/Layouts/TopHeaderStyleTwo";
import React from "react";

async function page() {
  let sampleData = null;
  let error = null;

  try {
    const res = await get_gallery_images();
    if (res?.error) {
      error = res?.message || "Something went wrong.";
      console.log(error);
    } else {
      sampleData = res?.data;
    }
  } catch (err) {
    error = err?.message || "Unexpected error while fetching profile.";
    console.log(error);
  }

  if (error) {
    return (
      <div className="p-10 text-center text-red-500 text-lg">
        <p className="text-lg"> 🚩 Failed to load gallery. Try once again!</p>
        <p>{error}</p>
      </div>
    );
  }
  return (
    <div>
      <TopHeaderStyleTwo />
      <NavbarStyleOne />
      <PageBanner
        pageTitle="Gallery"
        homePageUrl="/"
        homePageText="Home"
        activePageText="Gallery"
      />
      <MasonryGallery data={sampleData} />
      <Footer />
    </div>
  );
}

export default page;
