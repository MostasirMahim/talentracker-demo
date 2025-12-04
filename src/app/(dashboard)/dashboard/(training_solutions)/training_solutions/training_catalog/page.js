import React from "react";
import { cookies } from "next/headers";
import TrainingCatalogTable from "@/components/Dashboard/Training_Solutions/Training_Catalog/TrainingCatalogTable";
import { getTrainingCatalog } from "@/services/trainingCatalogService";

async function Page({ searchParams }) {
  const currentPage = searchParams?.page || 1;

  const cookieStore = cookies();
  const authToken = cookieStore.get("access_token")?.value || "";

  let trainingCatalog = null;

  try {
    const response = await getTrainingCatalog(currentPage, authToken);
    trainingCatalog = response.data;
  } catch (error) {
    console.error("Training catalog fetch error:", error);
  }

  return (
    <div className="p-8">
      <TrainingCatalogTable trainingCatalog={trainingCatalog} />
    </div>
  );
}

export default Page;
