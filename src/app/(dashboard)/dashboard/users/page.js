export const dynamic = "force-dynamic";

import UsersTable from "@/components/Dashboard/Users/UsersTable";
import axiosInstance from "@/lib/axiosIntance";
import React from "react";
import { cookies } from "next/headers";

async function page({ searchParams }) {
  const currentPage = searchParams?.page || 1;

  const cookieStore = cookies();
  const authToken = cookieStore.get("access_token")?.value || "";
  let users = [];

  try {
    // Pass page parameter to API
    const userResponse = await axiosInstance.get(
      `/api/authorization/v1/view_all_users/?page_size=10&page=${currentPage}`,
      {
        headers: {
        Cookie: `access_token=${authToken}`,
      },
      }
      
    );

    users = userResponse.data || [];
  } catch (error) {
    console.error(error);
  }
  return (
    <div>
      <UsersTable users={users} />
    </div>
  );
}

export default page;
