"use server";

import { cookies } from "next/headers";

export async function get_candidate_profile_data() {
  const accessToken = cookies().get("access_token")?.value;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/candidates/v1/candidates/`,
      {
        credentials: "include",
        headers: { Cookie: `access_token=${accessToken}` },
        next: { tags: ["candidate-profile"] },
      }
    );
    const response = await res.json();
    if (response.code === 200 && response.status === "success") {
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
