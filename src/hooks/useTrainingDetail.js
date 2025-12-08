"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  getTrainingDetail,
  createTrainingDetail,
  updateTrainingDetail,
  deleteTrainingDetail,
} from "@/services/TrainingDetailService";

import { toast } from "react-toastify";
import { get } from "http";

export default function useTrainingDetail() {
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  
  const [training_detail, setTrainingDetail] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(false);

  // Fetch Catalog List
  const fetchData = async (page = 1) => {
    try {
      setLoading(true);
      const res = await getTrainingDetail(page);
      setTrainingDetail(res.data.data);
      setPagination(res.data.pagination);
    } catch (error) {
      toast.error("Failed to load catalog");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Create
  const handleCreate = async (payload) => {
    try {
      await createTrainingDetail(payload);
      toast.success("Catalog created successfully");
      fetchData(currentPage);
    } catch {
      toast.error("Create failed");
    }
  };

  // Update
  const handleUpdate = async (id, payload) => {
    try {
      await updateTrainingDetail(id, payload);
      toast.success("Updated successfully");
      fetchData(currentPage);
    } catch {
      toast.error("Update failed");
    }
  };

  // Delete
  const handleDelete = async (id) => {
    try {
      await deleteTrainingDetail(id);
      toast.success("Deleted successfully");
      // If current page becomes empty after delete, go to previous page
      if (catalogs.length === 1 && currentPage > 1) {
        // This will be handled by the page component redirecting
        fetchData(currentPage - 1);
      } else {
        fetchData(currentPage);
      }
    } catch {
      toast.error("Delete failed");
    }
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  return {
    training_detail,
    pagination,
    loading,
    currentPage,
    fetchData,
    handleCreate,
    handleUpdate,
    handleDelete,
  };
}