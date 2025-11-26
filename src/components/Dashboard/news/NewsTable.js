"use client"

import { Trash2, Edit2 } from "lucide-react"

export default function NewsTable({ news, onEdit, onDelete }) {
  const stripHtml = (html) => {
    const tmp = document.createElement("DIV")
    tmp.innerHTML = html
    return tmp.textContent || tmp.innerText || ""
  }

  if (news.length === 0) {
    return (
      <div className="rounded-lg border border-border bg-card p-12 text-center">
        <p className="text-muted-foreground">No news articles yet</p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="w-full">
        <thead className="border-b border-border bg-secondary">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-bold text-foreground">ID</th>
            <th className="px-6 py-3 text-left text-sm font-bold text-foreground">Title</th>
            <th className="px-6 py-3 text-left text-sm font-bold text-foreground hidden md:table-cell">Source</th>
            <th className="px-6 py-3 text-left text-sm font-bold text-foreground hidden lg:table-cell">Category</th>
            <th className="px-6 py-3 text-left text-sm font-bold text-foreground hidden lg:table-cell">Created</th>
            <th className="px-6 py-3 text-left text-sm font-bold text-foreground hidden xl:table-cell">Updated</th>
            <th className="px-6 py-3 text-right text-sm font-bold text-foreground">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {news.map((item) => (
            <tr key={item.id} className="transition-colors hover:bg-secondary/50">
              <td className="px-6 py-4 text-sm text-muted-foreground font-medium">{item.id}</td>
              <td className="px-6 py-4 text-sm font-medium text-foreground max-w-xs truncate">{item.title}</td>
              <td className="px-6 py-4 text-sm text-muted-foreground hidden md:table-cell truncate max-w-xs">
                {item.source}
              </td>
              <td className="px-6 py-4 text-sm text-muted-foreground table-cell">
                <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
                  {item.category?.name || "Unknown"}
                </span>
              </td>
              <td className="px-6 py-4 text-sm text-muted-foreground hidden lg:table-cell">
                {new Date(item.created_at).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 text-sm text-muted-foreground hidden xl:table-cell">
                {new Date(item.updated_at).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 text-right">
                <div className="flex items-center justify-end gap-2">
                  <button
                    onClick={() => onEdit(item)}
                    className="rounded p-2 text-blue-600 transition-colors hover:bg-blue-50"
                    title="Edit"
                  >
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => onDelete(item)}
                    className="rounded p-2 text-red-600 transition-colors hover:bg-red-50"
                    title="Delete"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
