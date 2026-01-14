import { get_gallery_images } from "@/actions/gallery";
import PageBanner from "@/components/Common/PageBanner";
import MasonryGallery from "@/components/Gallery/MasonryGallery";
import Footer from "@/components/Layouts/Footer";
import NavbarStyleOne from "@/components/Layouts/NavbarStyleOne";
import TopHeaderStyleTwo from "@/components/Layouts/TopHeaderStyleTwo";
import { SearchX } from "lucide-react";
import React from "react";

async function page({ searchParams }) {
  let sampleData = null;
  let error = null;
  let pagination = null;
  const currentPage = searchParams?.page || 1;
  try {
    const res = await get_gallery_images(currentPage);
    if (res?.error) {
      error = res?.message || "Something went wrong.";
      console.log(error);
    } else {
      sampleData = res?.data?.data;
      pagination = res?.data?.pagination;
    }
  } catch (err) {
    error = err?.message || "Unexpected error while fetching profile.";
    console.log(error);
  }

  if (error) {
    return (
      <div
        style={{
          minHeight: "60vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f1f5f9",
          padding: "20px",
        }}
      >
        <div
          style={{
            textAlign: "center",
            maxWidth: "420px",
            backgroundColor: "#ffffff",
            padding: "42px 32px",
            borderRadius: "14px",
            boxShadow: "0 12px 30px rgba(15, 23, 42, 0.08)",
          }}
        >
          {/* Icon */}
          <div
            style={{
              width: "64px",
              height: "64px",
              margin: "0 auto 16px",
              borderRadius: "50%",
              backgroundColor: "#e0f2fe",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <SearchX size={30} color="#0284c7" />
          </div>

          {/* Title */}
          <h2
            style={{
              marginBottom: "10px",
              fontSize: "22px",
              fontWeight: 600,
              color: "#0f172a",
            }}
          >
            No Gallery Found
          </h2>

          {/* Description */}
          <p
            style={{
              margin: 0,
              fontSize: "15px",
              color: "#64748b",
              lineHeight: 1.6,
            }}
          >
            There are no gellery available right now. Please check back
            later for the latest updates.
          </p>
        </div>
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
      <MasonryGallery data={sampleData} pagination={pagination} />
      <Footer />
    </div>
  );
}

export default page;
