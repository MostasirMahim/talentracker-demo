"use client"

import { useState } from "react"
import { X, Loader } from "lucide-react"
import dynamic from "next/dynamic"
import { create_news } from "@/actions/news"
import { toast } from "react-toastify"

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false })
import "react-quill/dist/quill.snow.css"

export default function CreateNewsModal({ open, onOpenChange, categories, onNewsCreated }) {
  const [title, setTitle] = useState("")
  const [source, setSource] = useState("")
  const [description, setDescription] = useState("")
  const [categoryId, setCategoryId] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleCreate = async () => {
    if (!title.trim() || !source.trim() || !description.trim() || !categoryId) {
      toast.error("All fields are required")
      return
    }
    setIsLoading(true)
    try {
      const result = await create_news({
        title,
        source,
        description,
        category_id: categoryId,
      })

      if (result.success) {
        toast.success(result.message)
        setTitle("")
        setSource("")
        setDescription("")
        setCategoryId("")
        onOpenChange(false)
        onNewsCreated?.()
      } else {
        toast.error(result.message)
      }
    } catch (error) {
      toast.error("Error creating news")
    } finally {
      setIsLoading(false)
    }
  }
  // ReactQuill toolbar setup
  const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }], 
    [{ font: [] }], // Font family selector
    [{ size: [] }], // Font size selector
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ color: [] }, { background: [] }], // Font & background color
    [{ script: "sub" }, { script: "super" }], // Subscript / Superscript
    [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }], // Indent controls
    [{ align: [] }], // Alignment: left, center, right, justify
    ["link", "image"], // Media (add video too)
    ["code-block"], // Code block (useful for tech blogs)
    ["clean"], // Clear formatting
  ],
};
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="relative w-full max-w-2xl rounded-lg border border-border bg-card p-6 shadow-lg my-2 ">
        <button
          onClick={() => {
            onOpenChange(false)
            setTitle("")
            setSource("")
            setDescription("")
            setCategoryId("")
          }}
          className="absolute right-4 top-4 rounded p-1 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </button>

        <h2 className="text-lg font-bold text-foreground">Create News Article</h2>
        <p className="mt-2 text-sm text-muted-foreground">Add a new news article to your system</p>

        <div className="mt-2 space-y-4 max-h-[60vh] overflow-y-auto px-2">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Title</label>
            <input
              type="text"
              placeholder="Enter news title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={isLoading}
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Source</label>
            <input
              type="text"
              placeholder="Enter news source"
              value={source}
              onChange={(e) => setSource(e.target.value)}
              disabled={isLoading}
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Category</label>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              disabled={isLoading}
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Description</label>
            <ReactQuill
              theme="snow"
              value={description}
              onChange={setDescription}
              placeholder="Enter news description"
              modules={modules}
              className="bg-background"
              style={{ height: "300px" }}
            />
          </div>

        </div>

        <div className="mt-2 flex gap-3">
          <button
            onClick={() => {
              onOpenChange(false)
              setTitle("")
              setSource("")
              setDescription("")
              setCategoryId("")
            }}
            disabled={isLoading}
            className="flex-1 rounded-lg border border-border bg-card px-4 py-2 font-medium text-foreground transition-colors hover:bg-secondary disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleCreate}
            disabled={isLoading}
            className="flex-1 rounded-lg bg-primary px-4 py-2 font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isLoading && <Loader className="h-4 w-4 animate-spin" />}
            {isLoading ? "Creating..." : "Create"}
          </button>
        </div>
      </div>
    </div>
  )
}
