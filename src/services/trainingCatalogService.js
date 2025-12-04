// services/trainingCategoryService.js
import axiosInstance from "@/lib/axiosIntance";

export const getTrainingCatalog = (current_page = 1, token = "") => {
  return axiosInstance.get(
    `/api/training_solutions/v1/training_catalog/?page_size=10&page=${current_page}`,
    {
      headers: {
        Cookie: `access_token=${token}`,
      },
    }
  );
};

// Create
export const createTrainingCatalog = (payload) => {
  return axiosInstance.post("/api/training_solutions/v1/training_catalog/", payload);
};

// Update / Patch
export const updateTrainingCatalog = (id, payload) => {
  return axiosInstance.patch(`/api/training_solutions/v1/training_catalog/${id}/`, payload);
};

// Delete
export const deleteTrainingCatalog = (id) => {
  return axiosInstance.delete(`/api/training_solutions/v1/training_catalog/${id}/`);
};
