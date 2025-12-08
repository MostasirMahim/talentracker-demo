"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams, useParams } from "next/navigation";
import { useCatalogDetail } from "@/stores/training_solution_store";
import {
  createTrainingCatalogDetail,
  updateTrainingCatalogDetail,
} from "@/services/TrainingDetailService";
import { toast } from "react-toastify";
import Image from "next/image";

export default function TrainingCatalogDetailPost() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  
  const catalogId = params.catalogId; // from URL params
  const detailId = searchParams.get("detail_id");

  const { catalogDetail, clearCatalogDetail } = useCatalogDetail();

  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: null,
    status: "",
  });

  // Populate form if editing (detail_id exists)
  useEffect(() => {
    if (detailId && catalogDetail && Object.keys(catalogDetail).length > 0) {
      setFormData({
        title: catalogDetail.title || "",
        description: catalogDetail.description || "",
        image: null,
        status: catalogDetail.status || "",
      });

      // Set existing image preview
      if (catalogDetail.image) {
        setImagePreview(
          `${process.env.NEXT_PUBLIC_BACKEND_API_URL}${catalogDetail.image}`
        );
      }
    } else {
      // Reset form for create mode
      setFormData({
        title: "",
        description: "",
        image: null,
        status: "",
      });
      setImagePreview(null);
    }
  }, [detailId, catalogDetail]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle image upload with preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Remove image
  const handleRemoveImage = () => {
    setFormData((prev) => ({ ...prev, image: null }));
    setImagePreview(null);
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.title || !formData.description) {
      toast.error("Please fill all required fields");
      return;
    }

    if (!detailId && !formData.image) {
      toast.error("Please upload an image");
      return;
    }

    setLoading(true);

    try {
      // Prepare FormData for file upload
      const payload = new FormData();
      payload.append("title", formData.title);
      payload.append("description", formData.description);

      if (detailId && formData.status) {
        payload.append("status", formData.status);
      }

      // Only append image if new one is selected
      if (formData.image) {
        payload.append("image", formData.image);
      }

      if (detailId) {
        // Update existing detail
        await updateTrainingCatalogDetail(catalogId, detailId, payload);
        toast.success("Detail updated successfully");
      } else {
        // Create new detail
        await createTrainingCatalogDetail(catalogId, payload);
        toast.success("Detail created successfully");
      }

      // Clear store and redirect
      clearCatalogDetail();
      router.push(
        `/dashboard/training_solutions/training_catalog/${catalogId}/details/`
      );
    } catch (error) {
      console.error(error);
      toast.error(
        detailId ? "Failed to update detail" : "Failed to create detail"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          {detailId ? "Edit Catalog Detail" : "Create Catalog Detail"}
        </h1>
        <p className="text-gray-600 mt-2">
          {detailId
            ? "Update the details of your catalog item"
            : "Add a new detail to your catalog"}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter detail title"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter a description"
            rows="6"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        {/* Image Upload with Preview */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Image <span className="text-red-500">*</span>
          </label>

          {imagePreview ? (
            <div className="relative inline-block">
              <Image
                src={imagePreview}
                alt="Preview"
                width={300}
                height={200}
                className="rounded-lg border-2 border-gray-300"
                style={{ objectFit: "cover" }}
              />
              <button
                type="button"
                onClick={handleRemoveImage}
                className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-2 hover:bg-red-700 transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    className="w-10 h-10 mb-3 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-gray-500">
                    PNG, JPG or JPEG (MAX. 5MB)
                  </p>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>
          )}
        </div>

        {/* Status Dropdown (Show only on Update) */}
        {detailId && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        )}

        {/* Submit Buttons */}
        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading
              ? "Processing..."
              : detailId
              ? "Update Detail"
              : "Create Detail"}
          </button>
          <button
            type="button"
            onClick={() => {
              clearCatalogDetail();
              router.push(
                `/dashboard/training_solutions/training_catalog/${catalogId}/details/`
              );
            }}
            className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-100 transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}