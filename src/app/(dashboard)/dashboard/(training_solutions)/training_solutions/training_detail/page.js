"use client";
import React from "react";
import useTrainingDetail from "@/hooks/useTrainingDetail";
import TrainingDetailTable from "@/components/Dashboard/Training_Solutions/Training_Detail/TrainingDetailTable";

export default function TrainingDetailPage() {
  const {
    training_detail,
    pagination,
    loading,
    handleDelete,
    handleUpdate,
  } = useTrainingDetail();

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
    <TrainingDetailTable
      trainingDetail={{ data: training_detail, pagination }}
      onDelete={handleDelete}
      onUpdate={handleUpdate}
    />
  );
}
