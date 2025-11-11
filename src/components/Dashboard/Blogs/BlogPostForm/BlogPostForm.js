"use client";

import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import dynamic from "next/dynamic";
import axiosInstance from "@/lib/axiosIntance";
import { toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";
import "react-quill/dist/quill.snow.css"; // ✅ must import here

//  Dynamic import with SSR disabled
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

  //  use props directly
  const [categories, setCategories] = useState(blogCategories || []);
  const [tags, setTags] = useState(blogTags || []);
  const [imagePreview, setImagePreview] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const featuredImageFile = watch("featured_image");

  // Load blog if editing
  useEffect(() => {
    if (blog_id) {
      setIsEditMode(true);
      const fetchBlog = async () => {
        try {
          const response = await axiosInstance.get(`/api/blogs/v1/blogs/${blog_id}/`);
          const blog = response.data;

          reset({
            title: blog.title || "",
            summary: blog.summary || "",
            content: blog.content || "",
            category: blog.category?.id || "",
            tags: blog.tags?.map((t) => t.id) || [],
          });

          if (blog.featured_image) {
            setImagePreview(blog.featured_image);
          }
        } catch (error) {
          toast.error("Failed to load blog data");
        }
      };
      fetchBlog();
    }
  }, [blog_id, reset]);

  // Handle image preview
  useEffect(() => {
    if (featuredImageFile && featuredImageFile[0]) {
      const file = featuredImageFile[0];
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  }, [featuredImageFile]);

  //  ReactQuill toolbar setup
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image", "video"],
      ["clean"],
    ],
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("summary", data.summary);
      formData.append("content", data.content);
      if (data.category) formData.append("category", data.category);
      if (data.tags && data.tags.length > 0)
        data.tags.forEach((tag) => formData.append("tags", tag));
      if (data.featured_image && data.featured_image[0])
        formData.append("featured_image", data.featured_image[0]);

      let response;
      if (isEditMode && blog_id) {
        response = await axiosInstance.patch(`/api/blogs/v1/blogs/${blog_id}/`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        if (response.status === 200) {
          toast.success("Blog updated successfully!");
          router.push("/dashboard/blogs/view");
        }
      } else {
        response = await axiosInstance.post("/api/blogs/v1/blogs/", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        if (response.status === 201) {
          toast.success("Blog created successfully!");
          reset();
          setImagePreview(null);
        }
      }
    } catch (error) {
      toast.error("Failed to submit blog");
    }
  };

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
            {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
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

          {/*  ReactQuill Editor */}
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
              <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>
            )}
          </div>

          {/* Featured Image */}
          <div>
            <label className="font-semibold">Featured Image</label>
            <input
              type="file"
              accept="image/*"
              {...register("featured_image")}
              className="w-full mt-2 border border-gray-300 p-2 rounded-md"
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="mt-3 w-40 h-32 object-cover rounded-md border"
              />
            )}
          </div>

          {/* Submit */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              className="border px-6 py-2 rounded-md text-gray-700"
              onClick={() => router.back()}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
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

      {/*  CSS fix for invisible editor */}
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
