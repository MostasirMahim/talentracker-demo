


"use client";
import useTrainingCatalog from "@/hooks/useTrainingCatalog";
import TrainingCatalogTable from "@/components/Dashboard/Training_Solutions/Training_Catalog/TrainingCatalogTable";

export default function TrainingCatalogPage() {
  const {
    catalogs,
    pagination,
    loading,
    handleUpdate,
    handleDelete,
  } = useTrainingCatalog();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 font-medium">Loading ...</p>
        </div>
      </div>
    );
  }

  return (
    <TrainingCatalogTable
      trainingCatalog={{ data: catalogs, pagination }}
      onUpdate={handleUpdate}
      onDelete={handleDelete}
    />
  );
}
