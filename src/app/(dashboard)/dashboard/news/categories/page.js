"use client";

import { useState, useEffect } from "react";
import { Trash2, Edit2, Plus } from "lucide-react";
import {
  get_all_categories,
  create_category,
  update_category,
  delete_category,
} from "@/actions/news";
import { toast } from "react-toastify";
import "../../../../../../styles/role.css";

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [editingCategory, setEditingCategory] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    setLoading(true);
    try {
      const res = await get_all_categories();
      if (!res.error && res.data) {
        setCategories(res.data);
      } else {
        toast.error(res.message || "Failed to fetch categories");
      }
    } catch (error) {
      toast.error("Error fetching categories");
    } finally {
      setLoading(false);
    }
  }

  const handleCreateCategory = async () => {
    if (!newCategoryName.trim()) {
      toast.error("Category name is required");
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await create_category({ name: newCategoryName });
      if (result.success) {
        toast.success(result.message);
        setNewCategoryName("");
        setShowCreateForm(false);
        fetchCategories();
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("Error creating category");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateCategory = async () => {
    if (!editingCategory || !newCategoryName.trim()) {
      toast.error("Category name is required");
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await update_category(editingCategory.id, {
        name: newCategoryName,
      });
      if (result.success) {
        toast.success(result.message);
        setNewCategoryName("");
        setShowEditForm(false);
        setEditingCategory(null);
        fetchCategories();
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("Error updating category");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    try {
      const result = await delete_category(categoryId);
      if (result.success) {
        toast.success(result.message);
        setDeleteConfirm(null);
        fetchCategories();
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("Error deleting category");
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-2 py-4 sm:px-6 lg:px-6">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            News Categories
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage news categories for your system
          </p>
        </div>
        <button
          onClick={() => {
            setShowCreateForm(true);
            setShowEditForm(false);
            setNewCategoryName("");
          }}
          className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90"
        >
          <Plus className="h-4 w-4" />
          Create Category
        </button>
      </div>
      {showCreateForm && (
        <div className="mb-8 rounded-lg border border-border bg-card p-6">
          <h2 className="mb-4 text-lg font-bold text-foreground">
            Create New Category
          </h2>
          <div className="flex flex-col gap-4 sm:flex-row">
            <input
              type="text"
              placeholder="Enter category name"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              disabled={isSubmitting}
              className="flex-1 rounded-lg border border-border bg-background px-4 py-2 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
            />
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowCreateForm(false);
                  setNewCategoryName("");
                }}
                disabled={isSubmitting}
                className="rounded-lg border border-border px-4 py-2 font-medium text-foreground transition-colors hover:bg-secondary disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateCategory}
                disabled={isSubmitting}
                className="rounded-lg bg-primary px-4 py-2 font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
              >
                {isSubmitting ? "Creating..." : "Create"}
              </button>
            </div>
          </div>
        </div>
      )}

      {showEditForm && editingCategory && (
        <div className="mb-8 rounded-lg border border-border bg-card p-6">
          <h2 className="mb-4 text-lg font-bold text-foreground">
            Edit Category
          </h2>
          <div className="flex flex-col gap-4 sm:flex-row">
            <input
              type="text"
              placeholder="Enter category name"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              disabled={isSubmitting}
              className="flex-1 rounded-lg border border-border bg-background px-4 py-2 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
            />
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowEditForm(false);
                  setEditingCategory(null);
                  setNewCategoryName("");
                }}
                disabled={isSubmitting}
                className="rounded-lg border border-border px-4 py-2 font-medium text-foreground transition-colors hover:bg-secondary disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateCategory}
                disabled={isSubmitting}
                className="rounded-lg bg-primary px-4 py-2 font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
              >
                {isSubmitting ? "Updating..." : "Update"}
              </button>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="h-12 w-12 rounded-full border-4 border-border border-t-primary animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground">Loading categories...</p>
          </div>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full">
            <thead className="border-b border-border bg-secondary">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-bold text-foreground">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-sm font-bold text-foreground">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-sm font-bold text-foreground">
                  Created
                </th>
                <th className="px-6 py-3 text-left text-sm font-bold text-foreground">
                  Updated
                </th>
                <th className="px-6 py-3 text-right text-sm font-bold text-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {categories.length > 0 ? (
                categories.map((category) => (
                  <tr
                    key={category.id}
                    className="transition-colors hover:bg-secondary/50"
                  >
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {category.id}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-foreground">
                      {category.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {new Date(category.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {new Date(category.updated_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => {
                            setEditingCategory(category);
                            setNewCategoryName(category.name);
                            setShowEditForm(true);
                            setShowCreateForm(false);
                          }}
                          className="rounded p-2 text-blue-600 transition-colors hover:bg-blue-50"
                          title="Edit"
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(category.id)}
                          className="rounded p-2 text-red-600 transition-colors hover:bg-red-50"
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      {deleteConfirm === category.id && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                          <div className="w-full max-w-sm rounded-lg border border-border bg-card p-6 shadow-lg">
                            <h3 className="mb-2 text-lg text-left font-bold text-foreground">
                              Delete Category
                            </h3>
                            <p className="mb-6 text-sm text-left text-muted-foreground">
                              Are you sure you want to delete category : {category.name} 
                              ? This action cannot be undone.
                            </p>
                            <div className="flex gap-3">
                              <button
                                onClick={() => setDeleteConfirm(null)}
                                className="flex-1 rounded-lg border border-border px-4 py-2 font-medium text-foreground transition-colors hover:bg-secondary"
                              >
                                Cancel
                              </button>
                              <button
                                onClick={() => {
                                  handleDeleteCategory(category.id);
                                }}
                                className="flex-1 rounded-lg bg-red-600 px-4 py-2 font-medium text-white transition-colors hover:bg-red-700"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-8 text-center text-sm text-muted-foreground"
                  >
                    No categories found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
