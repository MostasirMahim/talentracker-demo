export const dynamic = "force-dynamic";

import ContactDetails from "@/components/Dashboard/ContactUs/ContactDetails";
import axiosInstance from "@/lib/axiosIntance";
import React from "react";
import { cookies } from "next/headers";

export default async function Page({ params }) {
  const contact_id = parseInt(params.id);
  const cookieStore = cookies();
  const authToken = cookieStore.get("access_token")?.value || "";

  let contact = [];

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
    console.log(contact);
  } catch (error) {
    console.error(error);
  }

  return (
    <div>
      <ContactDetails contact={contact} />
    </div>
  );
}
