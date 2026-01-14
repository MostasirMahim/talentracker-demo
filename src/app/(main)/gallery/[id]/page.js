import { get_gallery_details } from "@/actions/gallery";
import GalleryDetails from "@/components/Gallery/GalleryDetails";
import Footer from "@/components/Layouts/Footer";
import NavbarStyleOne from "@/components/Layouts/NavbarStyleOne";
import TopHeaderStyleTwo from "@/components/Layouts/TopHeaderStyleTwo";
import { SearchX } from "lucide-react";

export default async function GalleryPage({ params }) {
  let sampleData = null;
  let error = null;
  try {
    const res = await get_gallery_details(params.id);
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
            There are no gellery available right now. Please check back later
            for the latest updates.
          </p>
        </div>
      </div>
    );
  }
  const { gallery, images } = sampleData;
  return (
    <div>
      <TopHeaderStyleTwo />
      <NavbarStyleOne />
      <GalleryDetails gallery={gallery} images={images} />
      <Footer />
    </div>
  );
}
