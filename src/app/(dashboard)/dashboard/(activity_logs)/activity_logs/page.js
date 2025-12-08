export const dynamic = "force-dynamic";
import ActivityLogList from "@/components/Dashboard/ActivityLog/ActivityLogList/ActivityLogList";
import axiosInstance from "@/lib/axiosIntance";
import { cookies } from "next/headers";
import React from "react";

async function page({ searchParams }) {
  const currentPage = searchParams?.page || 1;
  const cookieStore = cookies();
  const authToken = cookieStore.get("access_token")?.value || "";
  let activity_logs = {};
  try {
    // Build query string with all search parameters
    const queryParams = new URLSearchParams();
    queryParams.append("page_size", "50");
    queryParams.append("page", currentPage);

    const response = await axiosInstance.get(
      `/api/activity_logs/v1/activity_logs/?${queryParams.toString()}`,
      {
        headers: {
          Cookie: `access_token=${authToken}`,
        },
      }
    );

    activity_logs = response.data;
  } catch (error) {
    console.error("Error fetching contacts:", error);
  }

  return (
    <div>
      <ActivityLogList activity_logs={activity_logs} />
    </div>
  );
}

export default page;
