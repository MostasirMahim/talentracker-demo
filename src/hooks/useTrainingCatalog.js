"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  getTrainingCatalog,
  createTrainingCatalog,
  updateTrainingCatalog,
  deleteTrainingCatalog,
} from "@/services/trainingCatalogService";
import { toast } from "react-toastify";

export default function useTrainingCatalog() {
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  
  const [catalogs, setCatalogs] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(false);

  // Fetch Catalog List
  const fetchData = async (page = 1) => {
    try {
      setLoading(true);
      const res = await getTrainingCatalog(page);
      setCatalogs(res.data.data);
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
      await createTrainingCatalog(payload);
      toast.success("Catalog created successfully");
      fetchData(currentPage);
    } catch {
      toast.error("Create failed");
    }
  };

  // Update
  const handleUpdate = async (id, payload) => {
    try {
      await updateTrainingCatalog(id, payload);
      toast.success("Updated successfully");
      fetchData(currentPage);
    } catch {
      toast.error("Update failed");
    }
  };

  // Delete
  const handleDelete = async (id) => {
    try {
      await deleteTrainingCatalog(id);
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
    catalogs,
    pagination,
    loading,
    currentPage,
    fetchData,
    handleCreate,
    handleUpdate,
    handleDelete,
  };
}