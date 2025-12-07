// services/trainingCategoryService.js
import axiosInstance from "@/lib/axiosIntance";

// Get All
export const getTrainingCategories = (config = {}) => {
  return axiosInstance.get("/api/training_solutions/v1/training_categories/", config);
};

// Create
export const createTrainingCategory = (payload) => {
  return axiosInstance.post("/api/training_solutions/v1/training_categories/", payload);
};

// Update / Patch
export const updateTrainingCategory = (id, payload) => {
  return axiosInstance.patch(`/api/training_solutions/v1/training_categories/${id}/`, payload);
};

// Delete
export const deleteTrainingCategory = (id) => {
  return axiosInstance.delete(`/api/training_solutions/v1/training_categories/${id}/`);
};
