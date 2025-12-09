"use client";

import React from "react";
import useTrainingCategory from "@/hooks/useTrainingCategory";
import TrainingCategoryTable from "@/components/Dashboard/Training_Solutions/Training_Category/TrainingCategoryTable";

export default function TrainingCategoryPage() {
  const { categories, loading, handleCreate, handleUpdate, handleDelete } =
    useTrainingCategory();

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
    <div className="p-8">
      <h1 className="text-2xl ms-3 font-bold mb-6">Training Categories</h1>

      <TrainingCategoryTable
        categories={categories?.data}
        onCreate={handleCreate}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
      />
    </div>
  );
}
