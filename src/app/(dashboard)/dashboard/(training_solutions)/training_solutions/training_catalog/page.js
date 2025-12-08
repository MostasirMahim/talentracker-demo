


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
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <TrainingCatalogTable
      trainingCatalog={{ data: catalogs, pagination }}
      onUpdate={handleUpdate}
      onDelete={handleDelete}
    />
  );
}