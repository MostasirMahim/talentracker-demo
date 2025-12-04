"use client";

import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import dynamic from "next/dynamic";
import axiosInstance from "@/lib/axiosIntance";
import { toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";
import "react-quill/dist/quill.snow.css";

// Dynamic import with SSR disabled
const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading editor...</p>,
});

export default function LearningSegmentPostForm({ blogCategories }) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors, isSubmitting },
    setError,
  } = useForm({
    defaultValues: {
      learning_id: "",
      program_title: "",
      thumbnail: null,
      enroll_now_link: "",
      status: "",
      category_id: "",
    },
  });

  const router = useRouter();
  const searchParams = useSearchParams();
  const segment_id = searchParams.get("segment_id");
  const [categories, setCategories] = useState(blogCategories || []);
  const [imagePreview, setImagePreview] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const featuredImageFile = watch("thumbnail");

  // Load blog data from API if blog_id exists
  useEffect(() => {
    if (segment_id) {
      setIsEditMode(true);
      setIsLoading(true);

      const loadBlogData = async () => {
        try {
          const response = await axiosInstance.get(
            `/api/learning_segments/v1/learning_segments/${segment_id}/`
          );
          const blogData = response.data.data;

          // Populate form with complete blog data
          reset({
            learning_id: blogData.learning_id || "",
            program_title: blogData.program_title || "",
            description: blogData.description || "",
            enroll_now_link: blogData.enroll_now_link || "",
            status: blogData.status || "",
            category_id: blogData.category_id || "",
            thumbnail: null, // Don't set file input
          });

          // Set image preview if exists
          if (blogData.thumbnail) {
            const imageUrl = blogData.thumbnail.startsWith("http")
              ? blogData.thumbnail
              : `${process.env.NEXT_PUBLIC_BACKEND_API_URL}${blogData.thumbnail}`;
            setImagePreview(imageUrl);
          }
        } catch (error) {
          console.error("Failed to load blog data:", error);
          toast.error("Failed to load blog data");
          // Redirect back to blog list on error
          router.push("/dashboard/learning_segment/");
        } finally {
          setIsLoading(false);
        }
      };

      loadBlogData();
    } else {
      // Create mode - reset form
      setIsEditMode(false);
      setIsLoading(false);
      reset({
        learning_id: "",
        program_title: "",
        thumbnail: null,
        enroll_now_link: "",
        status: "",
        category_id: "",
      });
      setImagePreview(null);
    }
  }, [segment_id, reset, router]);

  // Handle new image upload preview
  useEffect(() => {
    if (featuredImageFile && featuredImageFile[0]) {
      const file = featuredImageFile[0];
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  }, [featuredImageFile]);

  // ReactQuill toolbar setup
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ font: [] }], // Font family selector
      [{ size: [] }], // Font size selector
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ color: [] }, { background: [] }], // Font & background color
      [{ script: "sub" }, { script: "super" }], // Subscript / Superscript
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ], // Indent controls
      [{ align: [] }], // Alignment: left, center, right, justify
      ["link", "image"], // Media (add video too)
      ["code-block"], // Code block (useful for tech blogs)
      ["clean"], // Clear formatting
    ],
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("learning_id", data.learning_id);
      formData.append("program_title", data.program_title);
      formData.append("description", data.description);
      formData.append("enroll_now_link", data.enroll_now_link);
      formData.append("status", data.status);

      if (data.category_id) {
        formData.append("category_id", data.category_id);
      }

      // Only append image if a new file is selected
      if (data.thumbnail && data.thumbnail[0]) {
        formData.append("thumbnail", data.thumbnail[0]);
      }
      console.log("form data", formData);
      let response;
      if (isEditMode && segment_id) {
        // Update existing blog
        response = await axiosInstance.patch(
          `/api/learning_segments/v1/learning_segments/${segment_id}/`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );

        if (response.status === 200) {
          toast.success("Segment updated successfully!");
          router.push("/dashboard/learning_segment/");
          router.refresh();
        }
      } else {
        // Create new blog

        response = await axiosInstance.post(
          "/api/learning_segments/v1/learning_segments/",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );

        if (response.status === 201) {
          toast.success("Segment created successfully!");
          reset();
          setImagePreview(null);
          // Optionally redirect to blog list
          router.push("/dashboard/learning_segment/");
        }
      }
    } catch (error) {
      console.error("submission error:", error);
      const errorMessage =
        error.response?.data?.message || "Failed to submit blog";
      toast.error(errorMessage);
      if (error.response?.data?.errors) {
        const backendErrors = error.response?.data?.errors;

        // Dynamically set errors for each invalid field
        Object.keys(backendErrors).forEach((field) => {
          setError(field, {
            type: "server",
            message: backendErrors[field][0],
          });
          // Optional toast for each field
          toast.error(`${field}: ${backendErrors[field][0]}`);
        });
      }
    }
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="max-w-5xl mx-auto py-10">
        <div className="bg-white rounded-xl shadow p-8">
          <div className="flex flex-col items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-gray-600">Loading data...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-10">
      <div className="bg-white rounded-xl shadow p-8">
        <h2 className="text-2xl font-bold mb-6">
          {isEditMode ? "Edit Blog Post" : "Create New Blog"}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Title */}
          <div>
            <label className="font-semibold">Learning ID</label>
            <input
              type="text"
              {...register("learning_id", {
                required: "Learning Id is required",
              })}
              className="w-full mt-2 border border-gray-300 p-3 rounded-md"
              placeholder="Enter id"
            />
            {errors.learning_id && (
              <p className="text-red-500 text-sm">
                {errors.learning_id.message}
              </p>
            )}
          </div>

          {/* Category */}
          <div>
            <label className="font-semibold">Category</label>
            <select
              {...register("category_id", { required: "Category is required" })}
              className="w-full mt-2 border border-gray-300 p-3 rounded-md"
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
            {errors.category_id && (
              <p className="text-red-500 text-sm">
                {errors.category_id.message}
              </p>
            )}
          </div>

          {/* Summary */}
          <div>
            <label className="font-semibold">Program Title</label>
            <textarea
              {...register("program_title", {
                required: "program_title is required",
              })}
              className="w-full mt-2 border border-gray-300 p-3 rounded-md"
              rows="3"
              placeholder="Write a program title..."
            />
            {errors.program_title && (
              <p className="text-red-500 text-sm">
                {errors.program_title.message}
              </p>
            )}
          </div>
          <div>
            <label className="font-semibold">Enroll now Link</label>
            <input
              type="url"
              {...register("enroll_now_link", {
                required: "enroll_now_link is required",
                pattern: {
                  // A robust, yet reasonable, regex for checking URL format
                  value:
                    /^(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})$/,
                  message:
                    "Must be a valid URL (e.g., starts with http:// or https://).",
                },
              })}
              className="w-full mt-2 border border-gray-300 p-3 rounded-md"
              rows="3"
              placeholder="Write a program title..."
            />
            {errors.enroll_now_link && (
              <p className="text-red-500 text-sm">
                {errors.enroll_now_link.message}
              </p>
            )}
          </div>

          <div>
            <label className="font-semibold">Status</label>
            <select
              {...register("status", { required: "status is required" })}
              className="w-full mt-2 border border-gray-300 p-3 rounded-md"
            >
              <option value="">Select status</option>
              <option value={"active"}>Active</option>
              <option value={"inactive"}>Inactive</option>
            </select>
            {errors.status && (
              <p className="text-red-500 text-sm">{errors.status.message}</p>
            )}
          </div>

          {/* ReactQuill Editor */}
          <div>
            <label className="font-semibold">Description</label>
            <div className="mt-2 border border-gray-300 rounded-md overflow-hidden">
              <Controller
                name="description"
                control={control}
                defaultValue=""
                rules={{ required: "Content is required" }}
                render={({ field }) => (
                  <ReactQuill
                    theme="snow"
                    value={field.value}
                    onChange={field.onChange}
                    modules={modules}
                    placeholder="Write your description here..."
                  />
                )}
              />
            </div>
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Featured Image */}
          <div>
            <label className="font-semibold">Thumbnail</label>
            <input
              type="file"
              accept="image/*"
              {...register("thumbnail", {
                required: !isEditMode && "thumbnail is required",
              })}
              className="w-full mt-2 border border-gray-300 p-2 rounded-md"
            />
            {errors.thumbnail && (
              <p className="text-red-500 text-sm mt-1">
                {errors.thumbnail.message}
              </p>
            )}
            {imagePreview && (
              <div className="mt-3">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-40 h-32 object-cover rounded-md border"
                />
                <p className="text-xs text-gray-500 mt-1">
                  {isEditMode && !featuredImageFile?.[0]
                    ? "Current image (upload new to replace)"
                    : "Image preview"}
                </p>
              </div>
            )}
          </div>

          {/* Submit */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              className="border cursor-pointer border-gray-500 px-6 py-2 rounded-md text-gray-700 hover:bg-gray-50"
              onClick={() => {
                router.push("/dashboard/learning_segment/");
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-600 text-white px-6 py-2 cursor-pointer rounded-md hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed"
            >
              {isSubmitting
                ? "Submitting..."
                : isEditMode
                ? "Update segment"
                : "Publish segment"}
            </button>
          </div>
        </form>
      </div>

      {/* CSS fix for invisible editor */}
      <style jsx global>{`
        .ql-container {
          min-height: 300px !important;
          background-color: #fff !important;
          color: #000 !important;
        }
        .ql-editor {
          min-height: 300px !important;
        }
      `}</style>
    </div>
  );
}
