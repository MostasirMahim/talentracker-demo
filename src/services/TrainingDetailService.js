// services/trainingCatalogService.js
"use client"
import axiosInstance from "@/lib/axiosIntance";

// GET Catalog With Pagination
export const getTrainingDetail = (page = 1, token = "") => {
  return axiosInstance.get(
    `/api/training_solutions/v1/training_detail/?page_size=10&page=${page}`,
    {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    }
  );
};

// CREATE
export const createTrainingDetail = (payload) => {
  return axiosInstance.post(
    "/api/training_solutions/v1/training_detail/",
    payload
  );
};

// UPDATE
export const updateTrainingDetail = (id, payload) => {
  console.log("payload", payload);
  return axiosInstance.patch(
    `/api/training_solutions/v1/training_detail/${id}/`,
    payload

  );
};

// DELETE
export const deleteTrainingDetail = (id) => {
  return axiosInstance.delete(
    `/api/training_solutions/v1/training_detail/${id}/`
  );
};
