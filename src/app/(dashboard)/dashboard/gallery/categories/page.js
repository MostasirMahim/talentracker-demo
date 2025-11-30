import CategoriesTable from "@/components/Dashboard/Gallery/Categories/CategoriesTable";
import axiosInstance from "@/lib/axiosIntance";
import { cookies } from "next/headers";

async function fetchCategories(authToken) {
  try {
    const response = await axiosInstance.get(
      "/api/gallery/v1/gallery/categories/",
      {
        headers: {
          Cookie: `access_token=${authToken}`,
        },
      }
    );
    return response.data; 
  } catch (error) {
    console.error("Categories fetch failed:", error.message);

    if (error.response) {
      console.error("Status:", error.response.status);
      console.error("Data:", error.response.data);
    }

    return [];
  }
}

export default async function Page() {
  const cookieStore = cookies();
  const authToken = cookieStore.get("access_token")?.value || "";

  const categories = await fetchCategories(authToken);

  return (
    <div>
      <CategoriesTable categories={categories} />
    </div>
  );
}
