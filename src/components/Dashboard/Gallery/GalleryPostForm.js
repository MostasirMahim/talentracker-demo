"use client";
import React, { useEffect, useState } from "react";
import { useGallery } from "@/stores/gallery_dependencied_store";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import axiosInstance from "@/lib/axiosIntance";
import Image from "next/image";

export default function GalleryPostForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const gallery_id = searchParams.get("gallery_id");

  // Access the gallery directly from store
  const gallery = useGallery((state) => state.gallery);
  const clearGallery = useGallery((state) => state.clearGallery);

  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const isUpdateMode = !!gallery_id;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm({
    defaultValues: {
      title: "",
      category_id: "",
      description: "",
      cover_image: null,
    },
  });

  const coverImageFile = watch("cover_image");

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosInstance.get(
          "/api/gallery/v1/gallery/categories/"
        );
        if (response.data && response.data.data) {
          setCategories(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    if (!isUpdateMode) return;

    if (!gallery || !gallery.id) return; // gallery ready check
    if (loadingCategories) return; // category loading wait

    // Populate form
    setValue("title", gallery.title || "");
    setValue("category_id", gallery.category?.id?.toString() || "");
    setValue("description", gallery.description || "");

    // Existing image
    if (gallery.cover_image) {
      const fullImg = gallery.cover_image.startsWith("http")
        ? gallery.cover_image
        : `${process.env.NEXT_PUBLIC_BACKEND_API_URL}${gallery.cover_image}`;

      setImagePreview(fullImg);
    }
  }, [gallery, loadingCategories, isUpdateMode]);

  // Handle image preview for new uploads
  useEffect(() => {
    if (coverImageFile && coverImageFile[0]) {
      const file = coverImageFile[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }, [coverImageFile]);

  // Handle form submission
  const onSubmit = async (data) => {
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("category_id", parseInt(data.category_id));

      if (data.description) {
        formData.append("description", data.description);
      }

      // Only append image if a new one is selected
      if (data.cover_image && data.cover_image[0]) {
        formData.append("cover_image", data.cover_image[0]);
      }

      let response;

      if (isUpdateMode) {
        // PATCH request for update
        response = await axiosInstance.patch(
          `/api/gallery/v1/gallery/update/${gallery_id}/`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        toast.success("Gallery updated successfully!");
      } else {
        // POST request for create
        response = await axiosInstance.post(
          `/api/gallery/v1/gallery/`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        toast.success("Gallery created successfully!");
      }

      reset();
      setImagePreview(null);
      clearGallery();
      router.push("/dashboard/gallery");
      router.refresh();
    } catch (error) {
      console.error("Error:", error);
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        `Failed to ${isUpdateMode ? "update" : "create"} gallery`;
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => {
              clearGallery();
              router.push("/dashboard/gallery");
            }}
            className="text-blue-600 cursor-pointer font-bold hover:text-blue-800 flex items-center gap-2 mb-4 transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Gallery
          </button>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            {isUpdateMode ? "Update Gallery" : "Create New Gallery"}
          </h1>
          <p className="text-gray-600">
            {isUpdateMode
              ? "Update your gallery item with new information"
              : "Add a new item to your gallery collection"}
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Title Field */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                {...register("title", {
                  required: "Title is required",
                  minLength: {
                    value: 3,
                    message: "Title must be at least 3 characters",
                  },
                })}
                className={`w-full px-4 py-3 rounded-lg border-2 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.title
                    ? "border-red-500"
                    : "border-gray-300 hover:border-blue-400"
                }`}
                placeholder="Enter gallery title"
              />
              {errors.title && (
                <p className="text-red-500 text-sm flex items-center gap-1">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {errors.title.message}
                </p>
              )}
            </div>

            {/* Category Dropdown */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Category <span className="text-red-500">*</span>
              </label>
              {loadingCategories ? (
                <div className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 bg-gray-50 flex items-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  <span className="text-gray-500">Loading categories...</span>
                </div>
              ) : (
                <select
                  {...register("category_id", {
                    required: "Category is required",
                  })}
                  className={`w-full px-4 py-3 rounded-lg border-2 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white ${
                    errors.category_id
                      ? "border-red-500"
                      : "border-gray-300 hover:border-blue-400"
                  }`}
                >
                  <option value="">Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              )}
              {errors.category_id && (
                <p className="text-red-500 text-sm flex items-center gap-1">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {errors.category_id.message}
                </p>
              )}
            </div>

            {/* Description Field */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Description{" "}
                <span className="text-gray-400 text-xs">(Optional)</span>
              </label>
              <textarea
                {...register("description")}
                rows={4}
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 hover:border-blue-400 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                placeholder="Describe your gallery item..."
              />
            </div>

            {/* Cover Image Field */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Cover Image <span className="text-red-500">*</span>
              </label>

              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  id="cover_image"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      setValue("cover_image", e.target.files);
                      const reader = new FileReader();
                      reader.onloadend = () => setImagePreview(reader.result);
                      reader.readAsDataURL(file);
                    }
                  }}
                />

                <label
                  htmlFor="cover_image"
                  className={`flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer transition-all hover:bg-gray-50 ${
                    errors.cover_image
                      ? "border-red-500"
                      : "border-gray-300 hover:border-blue-400"
                  }`}
                >
                  {imagePreview ? (
                    <div className="relative w-full h-48 rounded-b-md p-2">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-full object-contain rounded-lg"
                      />
                      <div className="absolute inset-0  bg-opacity-0 hover:bg-opacity-30 transition-all rounded-lg flex items-center justify-center">
                        <span className="text-white text-1xl opacity-0 hover:opacity-100 hover:bg-blue-600 hover:px-2 hover:py-1 rounded-md transition-opacity font-semibold">
                          Click to change
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg
                        className="w-12 h-12 mb-3 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                      </svg>
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">Click to upload</span>{" "}
                        or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                  )}
                </label>
              </div>

              {errors.cover_image && (
                <p className="text-red-500 text-sm flex items-center gap-1">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {errors.cover_image.message}
                </p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <button
                type="submit"
                disabled={loading || loadingCategories}
                className={`flex-1 py-3 px-6 rounded-lg font-semibold text-white transition-all transform hover:scale-105 ${
                  loading || loadingCategories
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-600 to-blue-600 hover:from-blue-700 hover:to-blue-700 shadow-lg hover:shadow-xl"
                }`}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg
                      className="animate-spin h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    {isUpdateMode ? "Updating..." : "Creating..."}
                  </span>
                ) : (
                  <span className="flex items-center  justify-center gap-2">
                    {isUpdateMode ? (
                      <>
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                          />
                        </svg>
                        Update Gallery
                      </>
                    ) : (
                      <>
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 4v16m8-8H4"
                          />
                        </svg>
                        Create Gallery
                      </>
                    )}
                  </span>
                )}
              </button>

              <button
                type="button"
                onClick={() => {
                  clearGallery();
                  router.push("/dashboard/gallery");
                }}
                className="flex-1 sm:flex-none px-6 py-3 rounded-lg font-semibold text-gray-700 bg-gray-200 hover:bg-gray-300 transition-all"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>

        {/* Info Card */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex gap-3">
            <svg
              className="w-6 h-6 text-blue-600 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
            <div className="text-sm text-blue-800">
              <p className="font-semibold mb-1">Tips:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Use high-quality images for best results</li>
                <li>Choose descriptive titles and categories</li>
                <li>Description helps users understand your gallery better</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
