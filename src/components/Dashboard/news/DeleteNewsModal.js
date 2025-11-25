"use client"

import { useState } from "react"
import { Loader } from "lucide-react"
import { toast } from "react-toastify"
import { delete_news } from "@/actions/news"


export default function DeleteNewsModal({ open, onOpenChange, news, onNewsDeleted }) {
  const [isLoading, setIsLoading] = useState(false)

  const handleDelete = async () => {
    setIsLoading(true)
    try {
      const result = await delete_news(news.id)

      if (result.success) {
        toast.success(result.message)
        onOpenChange(false)
        onNewsDeleted?.()
      } else {
        toast.error(result.message)
      }
    } catch (error) {
      toast.error("Error deleting news")
    } finally {
      setIsLoading(false)
    }
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="w-full max-w-sm rounded-lg border border-border bg-card p-6 shadow-lg">
        <h3 className="text-lg font-bold text-foreground">Delete News</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Are you sure you want to delete ID :{news.id} news ? This action cannot be undone.
        </p>

        <div className="mt-6 flex gap-3">
          <button
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
            className="flex-1 rounded-lg border border-border px-4 py-2 font-medium text-foreground transition-colors hover:bg-secondary disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            disabled={isLoading}
            className="flex-1 rounded-lg bg-red-600 px-4 py-2 font-medium text-white transition-colors hover:bg-red-700 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isLoading && <Loader className="h-4 w-4 animate-spin" />}
            {isLoading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  )
}
