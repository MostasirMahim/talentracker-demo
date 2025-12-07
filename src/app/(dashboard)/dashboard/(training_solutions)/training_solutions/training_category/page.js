"use client";

import React from "react";
import useTrainingCategory from "@/hooks/useTrainingCategory";
import TrainingCategoryTable from "@/components/Dashboard/Training_Solutions/Training_Category/TrainingCategoryTable";

export default function TrainingCategoryPage() {
  const { categories, loading, handleCreate, handleUpdate, handleDelete } =
    useTrainingCategory();

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Training Categories</h1>

      {loading ? (
        <p className="text-center">Loading...</p>
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
