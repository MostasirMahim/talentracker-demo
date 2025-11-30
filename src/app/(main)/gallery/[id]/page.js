import { get_gallery_details } from "@/actions/gallery";
import GalleryDetails from "@/components/Gallery/GalleryDetails";
import Footer from "@/components/Layouts/Footer";
import NavbarStyleOne from "@/components/Layouts/NavbarStyleOne";
import TopHeaderStyleTwo from "@/components/Layouts/TopHeaderStyleTwo";

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
      <div className="p-10 text-center text-red-500 text-lg">
        <p className="text-lg"> 🚩 Failed to load gallery. Try once again!</p>
        <p>{error}</p>
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
