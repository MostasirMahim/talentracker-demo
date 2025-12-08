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

  if (loading) return <div className="text-center py-10">Loading...</div>;

  return (
    <TrainingDetailTable
      trainingDetail={{ data: training_detail, pagination }}
      onDelete={handleDelete}
      onUpdate={handleUpdate}
    />
  );
}
