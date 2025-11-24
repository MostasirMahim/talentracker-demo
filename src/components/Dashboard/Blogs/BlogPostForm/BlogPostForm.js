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

export default function BlogPostForm({ blogTags, blogCategories }) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      title: "",
      summary: "",
      content: "",
      category: "",
      tags: [],
      featured_image: null,
    },
  });

  const router = useRouter();
  const searchParams = useSearchParams();
  const blog_id = searchParams.get("blog_id");
  const [categories, setCategories] = useState(blogCategories || []);
  const [tags, setTags] = useState(blogTags || []);
  const [imagePreview, setImagePreview] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const featuredImageFile = watch("featured_image");

  // Load blog data from API if blog_id exists
  useEffect(() => {
    if (blog_id) {
      setIsEditMode(true);
      setIsLoading(true);

      const loadBlogData = async () => {
        try {
          const response = await axiosInstance.get(
            `/api/blogs/v1/blogs/${blog_id}/`
          );
          const blogData = response.data.data;

          // Populate form with complete blog data
          reset({
            title: blogData.title || "",
            summary: blogData.summary || "",
            content: blogData.content || "",
            category: blogData.category?.id || "",
            tags: blogData.tags?.map((t) => t.id) || [],
            featured_image: null, // Don't set file input
          });

          // Set image preview if exists
          if (blogData.featured_image) {
            const imageUrl = blogData.featured_image.startsWith("http")
              ? blogData.featured_image
              : `${process.env.NEXT_PUBLIC_BACKEND_API_URL}${blogData.featured_image}`;
            setImagePreview(imageUrl);
          }
        } catch (error) {
          console.error("Failed to load blog data:", error);
          toast.error("Failed to load blog data");
          // Redirect back to blog list on error
          router.push("/dashboard/blogs/");
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
        title: "",
        summary: "",
        content: "",
        category: "",
        tags: [],
        featured_image: null,
      });
      setImagePreview(null);
    }
  }, [blog_id, reset, router]);

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
      formData.append("title", data.title);
      formData.append("summary", data.summary);
      formData.append("content", data.content);

      if (data.category) {
        formData.append("category", data.category);
      }

      if (data.tags && data.tags.length > 0) {
        formData.append("tags", data.tags.join(","));
      }

      // Only append image if a new file is selected
      if (data.featured_image && data.featured_image[0]) {
        formData.append("featured_image", data.featured_image[0]);
      }
      console.log("form data", formData);
      let response;
      if (isEditMode && blog_id) {
        // Update existing blog
        response = await axiosInstance.patch(
          `/api/blogs/v1/blogs/${blog_id}/`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );

        if (response.status === 200) {
          toast.success("Blog updated successfully!");
          router.push("/dashboard/blogs/");
        }
      } else {
        // Create new blog

        response = await axiosInstance.post("/api/blogs/v1/blogs/", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        if (response.status === 201) {
          toast.success("Blog created successfully!");
          reset();
          setImagePreview(null);
          // Optionally redirect to blog list
          router.push("/dashboard/blogs/");
        }
      }
    } catch (error) {
      console.error("Blog submission error:", error);
      const errorMessage =
        error.response?.data?.message || "Failed to submit blog";
      toast.error(errorMessage);
    }
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="max-w-5xl mx-auto py-10">
        <div className="bg-white rounded-xl shadow p-8">
          <div className="flex flex-col items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-gray-600">Loading blog data...</p>
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
            <label className="font-semibold">Title</label>
            <input
              type="text"
              {...register("title", { required: "Title is required" })}
              className="w-full mt-2 border border-gray-300 p-3 rounded-md"
              placeholder="Enter blog title"
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
            )}
          </div>

          {/* Category */}
          <div>
            <label className="font-semibold">Category</label>
            <select
              {...register("category", { required: "Category is required" })}
              className="w-full mt-2 border border-gray-300 p-3 rounded-md"
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="text-red-500 text-sm">{errors.category.message}</p>
            )}
          </div>

          {/* Tags */}
          <div>
            <label className="font-semibold">Tags</label>
            <div className="flex flex-wrap gap-3 mt-2">
              {tags.map((tag) => (
                <label key={tag.id} className="flex items-center gap-1">
                  <input type="checkbox" value={tag.id} {...register("tags")} />
                  <span>{tag.name}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Summary */}
          <div>
            <label className="font-semibold">Summary</label>
            <textarea
              {...register("summary", { required: "Summary is required" })}
              className="w-full mt-2 border border-gray-300 p-3 rounded-md"
              rows="3"
              placeholder="Write a short summary..."
            />
            {errors.summary && (
              <p className="text-red-500 text-sm">{errors.summary.message}</p>
            )}
          </div>

          {/* ReactQuill Editor */}
          <div>
            <label className="font-semibold">Blog Content</label>
            <div className="mt-2 border border-gray-300 rounded-md overflow-hidden">
              <Controller
                name="content"
                control={control}
                defaultValue=""
                rules={{ required: "Content is required" }}
                render={({ field }) => (
                  <ReactQuill
                    theme="snow"
                    value={field.value}
                    onChange={field.onChange}
                    modules={modules}
                    placeholder="Write your blog content here..."
                  />
                )}
              />
            </div>
            {errors.content && (
              <p className="text-red-500 text-sm mt-1">
                {errors.content.message}
              </p>
            )}
          </div>

          {/* Featured Image */}
          <div>
            <label className="font-semibold">Featured Image</label>
            <input
              type="file"
              accept="image/*"
              {...register("featured_image", {
                required: !isEditMode && "Featured image is required",
              })}
              className="w-full mt-2 border border-gray-300 p-2 rounded-md"
            />
            {errors.featured_image && (
              <p className="text-red-500 text-sm mt-1">
                {errors.featured_image.message}
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
                router.push("/dashboard/blogs/");
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
                ? "Update Blog"
                : "Publish Blog"}
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
