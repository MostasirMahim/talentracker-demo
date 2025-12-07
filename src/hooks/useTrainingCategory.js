// hooks/useTrainingCategory.js
"use client";

import { useEffect, useState } from "react";
import {
  getTrainingCategories,
  createTrainingCategory,
  updateTrainingCategory,
  deleteTrainingCategory,
} from "../services/trainingCategoryService";
import { toast } from "react-toastify";

export default function useTrainingCategory() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load Data
  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await getTrainingCategories();
      setCategories(res.data);
    } catch (error) {
      toast.error("Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  // Create
  const handleCreate = async (name) => {
    try {
      await createTrainingCategory({ name });
      toast.success("Category created");
      fetchData();
    } catch {
      toast.error("Create failed");
    }
  };

  // Update
  const handleUpdate = async (id, title) => {
    try {
      await updateTrainingCategory(id, { title });
      toast.success("Updated successfully");
      fetchData();
    } catch {
      toast.error("Update failed");
    }
  };

  // Delete
  const handleDelete = async (id) => {
    try {
      await deleteTrainingCategory(id);
      toast.success("Deleted successfully");
      fetchData();
    } catch {
      toast.error("Delete failed");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    categories,
    loading,
    handleCreate,
    handleUpdate,
    handleDelete,
  };
}
