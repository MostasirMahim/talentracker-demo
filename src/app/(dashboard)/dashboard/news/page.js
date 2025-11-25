"use client"

import { useState, useEffect } from "react"
import { get_all_news, get_all_categories } from "@/actions/news"
import { toast } from "react-toastify"
import NewsHeader from "@/components/Dashboard/news/NewsHeader"
import NewsTable from "@/components/Dashboard/news/NewsTable"
import CreateNewsModal from "@/components/Dashboard/news/CreateNewsModal"
import EditNewsModal from "@/components/Dashboard/news/EditNewsModal"
import DeleteNewsModal from "@/components/Dashboard/news/DeleteNewsModal"
import "../../../../../styles/role.css"

export default function NewsPage() {
  const [news, setNews] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [createModalOpen, setCreateModalOpen] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [selectedNews, setSelectedNews] = useState(null)

  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    setLoading(true)
    try {
      const [newsRes, catRes] = await Promise.all([get_all_news(), get_all_categories()])

      if (!newsRes.error && newsRes.data) {
        setNews(newsRes.data)
      } else {
        toast.error(newsRes.message || "Failed to fetch news")
      }

      if (!catRes.error && catRes.data) {
        setCategories(catRes.data)
      }
    } catch (error) {
      toast.error("Error fetching data")
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (item) => {
    setSelectedNews(item)
    setEditModalOpen(true)
  }

  const handleDelete = (item) => {
    setSelectedNews(item)
    setDeleteModalOpen(true)
  }

  const handleNewsCreated = () => {
    setCreateModalOpen(false)
    fetchData()
  }

  const handleNewsUpdated = () => {
    setEditModalOpen(false)
    fetchData()
  }

  const handleNewsDeleted = () => {
    setDeleteModalOpen(false)
    fetchData()
  }

  return (
    <div>
      <NewsHeader onCreateClick={() => setCreateModalOpen(true)} />

      <div className="mx-auto max-w-7xl px-2 py-8 sm:px-6 lg:px-6">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="h-12 w-12 rounded-full border-4 border-border border-t-primary animate-spin mx-auto mb-4" />
              <p className="text-muted-foreground">Loading news...</p>
            </div>
          </div>
        ) : (
          <NewsTable news={news} onEdit={handleEdit} onDelete={handleDelete} />
        )}
      </div>

      <CreateNewsModal
        open={createModalOpen}
        onOpenChange={setCreateModalOpen}
        categories={categories}
        onNewsCreated={handleNewsCreated}
      />

      {selectedNews && (
        <>
          <EditNewsModal
            open={editModalOpen}
            onOpenChange={setEditModalOpen}
            news={selectedNews}
            categories={categories}
            onNewsUpdated={handleNewsUpdated}
          />

          <DeleteNewsModal
            open={deleteModalOpen}
            onOpenChange={setDeleteModalOpen}
            news={selectedNews}
            onNewsDeleted={handleNewsDeleted}
          />
        </>
      )}
    </div>
  )
}
