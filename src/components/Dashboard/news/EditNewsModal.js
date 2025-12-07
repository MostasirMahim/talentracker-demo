"use client";

import { useState, useEffect } from "react";
import { X, Loader } from "lucide-react";
import dynamic from "next/dynamic";
import { toast } from "react-toastify";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import axiosInstance from "@/lib/axiosIntance";

export default function EditNewsModal({
  open,
  onOpenChange,
  news,
  categories,
  onNewsUpdated,
}) {
  const [title, setTitle] = useState("");
  const [source, setSource] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (news) {
      setTitle(news.title);
      setSource(news.source);
      setDescription(news.description);
      setCategoryId(news.category?.id.toString());
    }
  }, [news, open]);

  const handleUpdate = async () => {
    if (!title.trim() || !source.trim() || !description.trim() || !categoryId) {
      toast.error("All fields are required");
      return;
    }

    setIsLoading(true);
    try {
      const result = await axiosInstance.patch(
        `/api/news/v1/news/update/${news.id}/`,
        {
          title,
          source,
          description,
          category_id: categoryId,
        }
      );
      if (result.data.code === 200) {
        toast.success(result.data.message);
        onOpenChange(false);
        onNewsUpdated?.();
      } else {
        console.log(result);
        toast.error(result.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error updating news");
    } finally {
      setIsLoading(false);
    }
  };

  // ReactQuill toolbar setup
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ color: [] }, { background: [] }],
      [{ script: "sub" }, { script: "super" }],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      [{ align: [] }],
      ["link", "image"],
      ["code-block"],
      ["clean"],
    ],
  };
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="relative w-full max-w-2xl rounded-lg border border-border bg-card p-6 shadow-lg my-2">
        <button
          onClick={() => onOpenChange(false)}
          className="absolute right-4 top-4 rounded p-1 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </button>

        <h2 className="text-lg font-bold text-foreground">Edit News Article</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Update the news article details
        </p>

        <div className="mt-2 space-y-4 max-h-[60vh] overflow-y-auto">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={isLoading}
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Source
            </label>
            <input
              type="text"
              value={source}
              onChange={(e) => setSource(e.target.value)}
              disabled={isLoading}
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Category
            </label>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              disabled={isLoading}
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Description
            </label>
            <ReactQuill
              theme="snow"
              value={description}
              onChange={setDescription}
              modules={modules}
              className="bg-background"
              s
              style={{ height: "300px" }}
            />
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <button
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
            className="flex-1 rounded-lg border border-border bg-card px-4 py-2 font-medium text-foreground transition-colors hover:bg-secondary disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleUpdate}
            disabled={isLoading}
            className="flex-1 rounded-lg bg-primary px-4 py-2 font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isLoading && <Loader className="h-4 w-4 animate-spin" />}
            {isLoading ? "Updating..." : "Update"}
          </button>
        </div>
      </div>
    </div>
  );
}
