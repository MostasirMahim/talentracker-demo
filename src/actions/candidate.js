"use server";

import { cookies } from "next/headers";
import axiosInstance from "@/lib/axiosIntance";
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

async function axiosHandler(method, url, data) {
  try {
    const cookieStore = cookies();
    const accessToken = cookieStore.get("access_token")?.value;
    const res = await axiosInstance[method](url, data, {
      headers: {
        Cookie: accessToken ? `access_token=${accessToken}` : "",
      },
    });
    return res.data;
  } catch (err) {
    return {
      error: true,
      message: err?.response?.data?.message || err?.message || "Network Error",
      data: err?.response?.data || null,
    };
  }
}
const API_ENDPOINTS = {
  personal: "/api/candidates/v1/candidates/",
  employment: "/api/candidates/v1/employmenthistories/",
  compensation: "/api/candidates/v1/compenstations/",
  document: "/api/candidates/v1/document_and_socials/",
  location: "/api/candidates/v1/locations/",
  skills: "/api/candidates/v1/skills/",
};