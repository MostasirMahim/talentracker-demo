import ImagePostForm from '@/components/Dashboard/Gallery/Images/ImagePostForm'

import axiosInstance from "@/lib/axiosIntance";
import React from "react";
import { cookies } from "next/headers";

async function page({ searchParams }) {
  const currentPage = searchParams?.page || 1;

  let gallery = [];
  const cookieStore = cookies();
  const authToken = cookieStore.get("access_token")?.value || "";

  try {
    const galleryResponse = await axiosInstance.get(
      `api/gallery/v1/gallery/?fields=id,title`,
      {
        headers: {
          Cookie: `access_token=${authToken}`,
        },
      }
    );

    gallery = galleryResponse.data || [];
    console.log(gallery);
  } catch (error) {
    console.error(error);
  }
  return (
    <div>
      <ImagePostForm  gallery={gallery} />
    </div>
  );
}

export default page;

