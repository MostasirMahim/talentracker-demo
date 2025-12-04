"use client";

import React from "react";
import useTrainingCategory from "@/hooks/useTrainingCategory";
import TrainingCategoryTable from "@/components/Dashboard/Training_Solutions/Training_Category/TrainingCategoryTable";

export default function TrainingCategoryPage() {
  const { categories, loading, handleCreate, handleUpdate, handleDelete } =
    useTrainingCategory();

  return (
    <div className="p-8">
      <h1 className="text-2xl ms-3 font-bold mb-6">Training Categories</h1>

      {loading ? (
        <p className="text-center shadow-2xl  text-2xl">Loading...</p>
      ) : (
        <TrainingCategoryTable
          categories={categories.data}
          onCreate={handleCreate}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}
