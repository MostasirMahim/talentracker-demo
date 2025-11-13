"use server";
import axiosInstance from "@/lib/axiosIntance";
import { cookies } from "next/headers";

export async function job_Apply(formData) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("access_token")?.value;
  try {
    const res = await axiosInstance.post(`/api/jobs/v1/job_applications/`,
      formData,
      {
        headers: {
          Cookie: accessToken ? `access_token=${accessToken}` : "",
        },
      }
    );

    const data = res.data;

    if (data.code === 201 && data.status === "success") {
      return {
        success: true,
        message: `Job applied successfully done`,
        data: data.data,
      };
    } else {
      return {
        success: false,
        message: data.message || "Job application failed",
        data,
      };
    }
  } catch (err) {
    return {
      success: false,
      message: err?.response?.data?.message || err?.message || "Network Error",
      data: err?.response?.data || null,
    };
  }
}
