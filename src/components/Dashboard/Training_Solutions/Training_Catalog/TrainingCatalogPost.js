"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCatalog } from "@/stores/training_solution_store";
import axiosInstance from "@/lib/axiosIntance";
import {
  createTrainingCatalog,
  updateTrainingCatalog,
} from "@/services/trainingCatalogService";
import { toast } from "react-toastify";
import Image from "next/image";

export default function TrainingCatalogPost() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const catalogId = searchParams.get("catalog_id");

  const { catalog, setCatalog, clearCatalog } = useCatalog();

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const [formData, setFormData] = useState({
    training_id: "",
    title: "",
    category: "",
    short_description: "",
    thumbnail_image: null,
    status: "",
  });

  // Fetch categories on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axiosInstance.get(
          "/api/training_solutions/v1/training_categories/"
        );
        setCategories(res.data.data || res.data);
        console.log(res.data.data);
      } catch (error) {
        toast.error("Failed to load categories");
        console.error(error);
      }
    };
    fetchCategories();
  }, []);

  // Populate form if editing (catalog_id exists)
  useEffect(() => {
    if (catalogId && catalog && Object.keys(catalog).length > 0) {
      setFormData({
        training_id: catalog.training_id || "",
        title: catalog.title || "",
        category: catalog.category?.id || catalog.category || "",
        short_description: catalog.short_description || "",
        thumbnail_image: null,
        status: catalog.status || "",
      });

      // Set existing image preview
      if (catalog.thumbnail_image) {
        setImagePreview(
          `${process.env.NEXT_PUBLIC_BACKEND_API_URL}${catalog.thumbnail_image}`
        );
      }
    } else {
      // Reset form for create mode
      setFormData({
        training_id: "",
        title: "",
        category: "",
        short_description: "",
        thumbnail_image: null,
        status: "",
      });
      setImagePreview(null);
    }
  }, [catalogId, catalog]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle image upload with preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, thumbnail_image: file }));

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
    setFormData((prev) => ({ ...prev, thumbnail_image: null }));
    setImagePreview(null);
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (
      !formData.training_id ||
      !formData.title ||
      !formData.category ||
      !formData.short_description
    ) {
      toast.error("Please fill all required fields");
      return;
    }

    if (!catalogId && !formData.thumbnail_image) {
      toast.error("Please upload a thumbnail image");
      return;
    }

    setLoading(true);

    try {
      // Prepare FormData for file upload
      const payload = new FormData();
      payload.append("training_id", formData.training_id);
      payload.append("title", formData.title);
      payload.append("category", formData.category);
      payload.append("short_description", formData.short_description);
      if (catalogId) {
        payload.append("status", formData.status);
        }

      // Only append image if new one is selected
      if (formData.thumbnail_image) {
        payload.append("thumbnail_image", formData.thumbnail_image);
      }

      if (catalogId) {
        // Update existing catalog
        await updateTrainingCatalog(catalogId, payload);
        toast.success("Catalog updated successfully");
      } else {
        // Create new catalog
        await createTrainingCatalog(payload);
        toast.success("Catalog created successfully");
      }

      // Clear store and redirect
      clearCatalog();
      router.push("/dashboard/training_solutions/training_catalog/");
    } catch (error) {
      console.error(error);
      toast.error(
        catalogId ? "Failed to update catalog" : "Failed to create catalog"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          {catalogId ? "Edit Training Catalog" : "Create Training Catalog"}
        </h1>
        <p className="text-gray-600 mt-2">
          {catalogId
            ? "Update the details of your training catalog"
            : "Add a new training catalog to your system"}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Training ID */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Training ID <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="training_id"
            value={formData.training_id}
            onChange={handleChange}
            placeholder="e.g., TSC-24"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

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
            placeholder="Enter catalog title"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        {/* Category Dropdown */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category <span className="text-red-500">*</span>
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          >
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Short Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Short Description <span className="text-red-500">*</span>
          </label>
          <textarea
            name="short_description"
            value={formData.short_description}
            onChange={handleChange}
            placeholder="Enter a brief description"
            rows="4"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        {/* Thumbnail Image Upload with Preview */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Thumbnail Image <span className="text-red-500">*</span>
          </label>

          {imagePreview ? (
            <div className="relative inline-block">
              <Image
                src={imagePreview}
                alt="Preview"
                width={200}
                height={150}
                className="rounded-lg border-2 border-gray-300"
                style={{ objectFit: "cover" }}
              />
              <button
                type="button"
                onClick={handleRemoveImage}
                className="absolute top-2 right-2 cursor-pointer bg-red-600 text-white rounded-full p-2 hover:bg-red-700 transition"
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
        {/* Status Dropdown */}
        {/* Status Dropdown (Show only on Update) */}
        {catalogId && (
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
            className="flex-1 bg-blue-600 cursor-pointer text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading
              ? "Processing..."
              : catalogId
              ? "Update Catalog"
              : "Create Catalog"}
          </button>
          <button
            type="button"
            onClick={() => {
              clearCatalog();
              router.push("/dashboard/training_solutions/training_catalog/");
            }}
            className="px-6 py-3 border-2 cursor-pointer border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-100 transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
