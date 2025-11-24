export const dynamic = "force-dynamic";

import ContactUsTable from "@/components/Dashboard/ContactUs/ContactUsTable";
import axiosInstance from "@/lib/axiosIntance";
import React from "react";
import { cookies } from "next/headers";

async function page({ searchParams }) {
  const currentPage = searchParams?.page || 1;
  const cookieStore = cookies();
  const authToken = cookieStore.get("access_token")?.value || "";
  let contact_us = [];

  try {
    // Build query string with all search parameters
    const queryParams = new URLSearchParams();
    queryParams.append('page_size', '1');
    queryParams.append('page', currentPage);
    
    // Add filter parameters if they exist
    if (searchParams?.start_date) {
      queryParams.append('start_date', searchParams.start_date);
    }
    if (searchParams?.end_date) {
      queryParams.append('end_date', searchParams.end_date);
    }
    if (searchParams?.status) {
      queryParams.append('status', searchParams.status);
    }
    if (searchParams?.is_active) {
      queryParams.append('is_active', searchParams.is_active);
    }

    const contact_us_response = await axiosInstance.get(
      `/api/contacts/v1/contacts/?${queryParams.toString()}`,
      {
        headers: {
          Cookie: `access_token=${authToken}`,
        },
      }
    );

    contact_us = contact_us_response.data || [];
  } catch (error) {
    console.error("Error fetching contacts:", error);
  }
  
  return (
    <div>
      <ContactUsTable contacts={contact_us} />
    </div>
  );
}

export default page;