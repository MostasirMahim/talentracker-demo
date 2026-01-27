"use server";

import { cookies } from "next/headers";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;

export async function exportQuotes(currentPage) {
  const accessToken = cookies().get("access_token")?.value;

  try {
    const res = await fetch(
      `${BASE_URL}/api/quotes/v1/quotes/?page_size=50&page=${currentPage}&download=true`,
      {
        method: "GET",
        headers: {
          Cookie: `access_token=${accessToken}`,
        },
      }
    );

    const contentType = res.headers.get("content-type");

    if (res.ok && contentType && !contentType.includes("application/json")) {
      const buffer = await res.arrayBuffer();
      const base64 = Buffer.from(buffer).toString("base64");
      return {
        success: true,
        data: base64,
        contentType: contentType,
        message: "Export successful",
      };
    } else {
      const response = await res.json();
      return {
        success: false,
        code: response.code,
        status: response.status,
        message: response.message || "Export failed",
        errors: response.errors,
      };
    }
  } catch (err) {
    return {
      success: false,
      message: err?.message || "Network error",
    };
  }
}
