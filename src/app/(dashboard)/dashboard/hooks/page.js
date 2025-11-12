import HooksTableList from "@/components/Dashboard/Hooks/HooksTableList/HooksTableList";
import axiosInstance from "@/lib/axiosIntance";
import React from "react";

async function page() {
  let hooks;
  try {
    const response = await axiosInstance.get("/api/hooks/v1/hooks/");
    hooks = response.data;
  } catch (error) {
    console.error(error);
  }
  return (
    <div>
      <HooksTableList hooks={hooks} />
    </div>
  );
}

export default page;
