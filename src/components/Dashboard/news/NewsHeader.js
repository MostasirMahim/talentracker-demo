"use client"

import { Plus } from "lucide-react"


export default function NewsHeader({ onCreateClick }) {
  return (
    <div className="border-b border-border ">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">News Management</h1>
            <p className="mt-1 text-sm text-muted-foreground">Create, edit, and manage news articles</p>
          </div>
          <button
            onClick={onCreateClick}
            className="flex items-center gap-2 rounded-lg bg-blue-600 cursor-pointer  px-4 py-2 text-sm font-medium text-white transition-all hover:bg-blue-700"
          >
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Create News</span>
          </button>
        </div>
      </div>
    </div>
  )
}
