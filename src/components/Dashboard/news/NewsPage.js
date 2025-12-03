"use client"

import { useState } from "react"
import NewsHeader from "@/components/Dashboard/news/NewsHeader"
import NewsTable from "@/components/Dashboard/news/NewsTable"
import CreateNewsModal from "@/components/Dashboard/news/CreateNewsModal"
import EditNewsModal from "@/components/Dashboard/news/EditNewsModal"
import DeleteNewsModal from "@/components/Dashboard/news/DeleteNewsModal"
import AdminSmartPagination from "@/components/SmartPagination/AdminSmartPagination"

export default function NewsPage({ news, categories }) {

  const [createModalOpen, setCreateModalOpen] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [selectedNews, setSelectedNews] = useState(null)

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
  console.log("news", news, categories);
  return (
    <div>
      <NewsHeader onCreateClick={() => setCreateModalOpen(true)} />

      <div className="mx-auto max-w-7xl px-2 py-8 sm:px-6 lg:px-6">
          <NewsTable news={news?.data} onEdit={handleEdit} onDelete={handleDelete} />
      </div>
          <div className="mt-6 flex justify-center">
    <AdminSmartPagination paginationData={news?.pagination} />
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
