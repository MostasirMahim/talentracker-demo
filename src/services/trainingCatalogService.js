// services/trainingCatalogService.js
import axiosInstance from "@/lib/axiosIntance";

// GET Catalog With Pagination
export const getTrainingCatalog = (page = 1, token = "") => {
  return axiosInstance.get(
    `/api/training_solutions/v1/training_catalog/?page_size=10&page=${page}`,
    {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    }
  );
};

// CREATE
export const createTrainingCatalog = (payload) => {
  return axiosInstance.post(
    "/api/training_solutions/v1/training_catalog/",
    payload,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};

// UPDATE
export const updateTrainingCatalog = (id, payload) => {
  return axiosInstance.patch(
    `/api/training_solutions/v1/training_catalog/${id}/`,
    payload,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }

  );
};

// DELETE
export const deleteTrainingCatalog = (id) => {
  return axiosInstance.delete(
    `/api/training_solutions/v1/training_catalog/${id}/`
  );
};
