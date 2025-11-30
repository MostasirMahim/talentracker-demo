import axiosInstance from "@/lib/axiosIntance";
import { cookies } from "next/headers";
import GalleryImage from '@/components/Dashboard/Gallery/Images/GalleryImage';

async function fetchCategories(authToken, id) {
  try {
    const response = await axiosInstance.get(
      `/api/gallery/v1/gallery/${id}/images/`,
      {
        headers: {
          Cookie: `access_token=${authToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Gallery images fetch failed:", error.message);

    if (error.response) {
      console.error("Status:", error.response.status);
      console.error("Data:", error.response.data);
    }

    return [];
  }
}

export default async function Page({ searchParams }) {

  const gallery_id = searchParams?.gallery_id;

  const cookieStore = cookies();
  const authToken = cookieStore.get("access_token")?.value || "";

  const gallery_images = await fetchCategories(authToken, gallery_id);
  return (
    <div>
      <GalleryImage gallery_images={gallery_images} gallery_id={gallery_id} />
    </div>
  );
}
