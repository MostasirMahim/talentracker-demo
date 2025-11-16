export const dynamic = "force-dynamic";

import EditContactForm from "@/components/Dashboard/ContactUs/EditContactForm";
import axiosInstance from "@/lib/axiosIntance";
import React from "react";
import { cookies } from "next/headers";

export default async function Page({ params }) {
  const contact_id = parseInt(params.id);
  const cookieStore = cookies();
  const authToken = cookieStore.get("access_token")?.value || "";

  let contact = [];
  let id = [];
  let is_active = [];
  let status = [];


  try {
    const response = await axiosInstance.get(
      `/api/contacts/v1/contacts/${contact_id}/`,
      {
        headers: {
          Cookie: `access_token=${authToken}`,
        },
      }
    );

    contact = response.data.data || [];
    is_active = contact.is_active ;
    status = contact.status ;
    id = contact.id ;
  } catch (error) {
    console.error(error);
  }

  return (
    <div>
      <EditContactForm id={id} is_active={is_active} status={status} />
    </div>
  );
}
