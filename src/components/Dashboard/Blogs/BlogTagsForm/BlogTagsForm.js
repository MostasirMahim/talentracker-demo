"use client";

import axiosInstance from "@/lib/axiosIntance";
import { useBlogTag } from "@/stores/blogs_dependencied_update_store";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function BlogTagsForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    setError,
  } = useForm();

  const router = useRouter();
  const searchParams = useSearchParams();
  const tag_id = searchParams.get("tag_id");

  const getTag = useBlogTag((state) => state.getTag);
  const clearTag = useBlogTag((state) => state.clearTag);

  useEffect(() => {
    if (tag_id) {
      const tag = getTag();
      const name = tag?.name || "";
      reset({ name });
    } else {
      reset({ name: "" });
    }

    return () => reset();
  }, [tag_id, getTag, reset]);

  const onSubmit = async (data) => {
    try {
      if (tag_id) {
        // Update existing tag
        const response = await axiosInstance.patch(
          `/api/blogs/v1/tags/${tag_id}/`,
          data
        );
        if (response.status === 200) {
          toast.success("Blog tag updated successfully");
          reset();
          clearTag();
          router.push("/dashboard/blogs/tags/view/");
          router.refresh();
          return;
        }
      } else {
        // Create new tag
        const response = await axiosInstance.post(
          "/api/blogs/v1/tags/",
          data
        );
        if (response.status === 201) {
          toast.success("Blog tag created successfully");
          reset();
        }
      }
    } catch (error) {
      console.error(error);

      // Handle backend validation errors
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
          error.response?.data?.message || "Something went wrong. Please try again."
        );
      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow-md rounded-xl p-6 border border-gray-200">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
        Set Blog Tag
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Input Field */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Tag Name
          </label>
          <input
            type="text"
            id="name"
            placeholder="Enter blog tag name (e.g., IT)"
            className={`w-full px-4 py-2 rounded-lg border text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.name ? "border-red-500" : "border-gray-300"
            }`}
            {...register("name", {
              required: "Tag name is required",
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

        {/* Submit Button */}
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
