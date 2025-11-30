import { cookies } from "next/headers";

export async function get_gallery_images(currentPage = 1) {
  const accessToken = cookies().get("access_token")?.value;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/gallery/v1/gallery/?page_size=12&page=${currentPage}`,
      {
        next: { tags: ["gallery"] },
      }
    );
    const response = await res.json();
    if (response.code === 200 && response.status === "success") {
      return {
        error: false,
        data: response,
      };
    } else {
      return {
        error: true,
        message: data.message || "Verification failed",
        data: response.data,
      };
    }
  } catch (err) {
    return {
      error: true,
      message: err?.response?.data?.message || err?.message || "Network Error",
      data: err?.response?.data || null,
    };
  }
}
export async function get_gallery_details(id) {
  const accessToken = cookies().get("access_token")?.value;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/gallery/v1/gallery/${id}/images/`,
      {
        next: { tags: ["gallery-details"] },
      }
    );
    const response = await res.json();
    if (response.code === 200 && response.status === "success") {
      console.log(response);
      return {
        error: false,
        data: response.data,
      };
    } else {
      return {
        error: true,
        message: data.message || "Verification failed",
        data: response.data,
      };
    }
  } catch (err) {
    return {
      error: true,
      message: err?.response?.data?.message || err?.message || "Network Error",
      data: err?.response?.data || null,
    };
  }
}
