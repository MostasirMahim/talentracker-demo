export const dynamic = "force-dynamic";

import QuotesTable from "@/components/Dashboard/Quote/QuotesTable";
import axiosInstance from "@/lib/axiosIntance";
import React from "react";
import { cookies } from "next/headers";



async function page({ searchParams }) {
  let quotes;
  const currentPage = searchParams?.page || 1;

  const cookieStore = cookies();
  const authToken = cookieStore.get("access_token")?.value || "";

  try {
    const response = await axiosInstance.get(`/api/quotes/v1/quotes/?page_size=50&page=${currentPage}`,
    {
      headers: {
        Cookie: `access_token=${authToken}`,
      },
    });
    quotes = response.data;
  } catch (error) {
    console.error(error);
  }
  return (
    <div>
      <QuotesTable quotes={quotes} currentPage={currentPage} />
    </div>
  );
}

export default page;
