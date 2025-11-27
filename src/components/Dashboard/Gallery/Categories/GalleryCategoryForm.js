"use client";

import axiosInstance from "@/lib/axiosIntance";
import { useGalleryCategory } from "@/stores/gallery_dependencied_store";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function GalleryCategoryForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    setError,
  } = useForm();

  const router = useRouter();
  const searchParams = useSearchParams();
  const category_id = searchParams.get("category_id");
  const getCategory = useGalleryCategory((state) => state.getGalleryCategory);
  const clearCategory = useGalleryCategory((state) => state.clearGalleryCategory);

  useEffect(() => {
    if (category_id) {
      const category = getCategory();
      const name = category?.name || "";
      reset({ name });
    } else {
      reset({ name: "" });
    }

    return () => reset();
  }, [category_id, getCategory, reset]);

  const onSubmit = async (data) => {
    try {
      if (category_id) {
        // Update existing Gallery category
        const response = await axiosInstance.put(
          `/api/gallery/v1/gallery/categories/${category_id}/`,
          data
        );
        if (response.status === 200) {
          toast.success("Gallery category updated successfully");
          reset();
          clearCategory();
          router.push("/dashboard/gallery/categories");
          router.refresh();
          return;
        }
      } else {
        // Create new Gallery category
        const response = await axiosInstance.post(
          "/api/gallery/v1/gallery/categories/",
          data
        );
        if (response.status === 201) {
          toast.success("Gallery category created successfully");
          router.push("/dashboard/gallery/categories");
          router.refresh();
          reset();
        }
      }
    } catch (error) {
      console.error(error);

      const backendErrors = error.response?.data?.errors;
      if (backendErrors) {
        Object.keys(backendErrors).forEach((field) => {
          setError(field, {
            type: "server",
            message: backendErrors[field][0],
          });
          toast.error(`${field}: ${backendErrors[field][0]}`);
        });
      } else {
        toast.error(
          error.response?.data?.message ||
            "Something went wrong. Please try again."
        );
      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow-md rounded-xl p-6 border border-gray-200">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
        {category_id ? "Update Gallery Category" : "Create Gallery Category"}
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Category Name
          </label>
          <input
            type="text"
            id="name"
            placeholder="Enter gallery category name"
            className={`w-full px-4 py-2 rounded-lg border text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.name ? "border-red-500" : "border-gray-300"
            }`}
            {...register("name", {
              required: "Category name is required",
              minLength: {
                value: 2,
                message: "Must be at least 2 characters",
              },
            })}
          />
          {errors.name && (
            <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white font-medium py-2.5 rounded-lg hover:bg-blue-700 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
