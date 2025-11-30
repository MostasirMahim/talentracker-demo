import GalleryTable from "@/components/Dashboard/Gallery/GalleryTable";
import axiosInstance from "@/lib/axiosIntance";
import React from "react";
import { cookies } from "next/headers";

async function page({ searchParams }) {
  const currentPage = searchParams?.page || 1;

  let gallery = [];
  const cookieStore = cookies();
  const authToken = cookieStore.get("access_token")?.value || "";

  try {
    // Pass page parameter to API
    const galleryResponse = await axiosInstance.get(
      `api/gallery/v1/gallery/?page_size=10&page=${currentPage}`,
      {
        headers: {
          Cookie: `access_token=${authToken}`,
        },
      }
    );

    gallery = galleryResponse.data || [];
  } catch (error) {
    console.error(error);
  }
  return (
    <div>
      <GalleryTable gallery={gallery} />
    </div>
  );
}

export default page;
