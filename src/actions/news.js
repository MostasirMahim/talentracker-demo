"use server"

import { cookies } from "next/headers"
const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL

export async function get_all_news(currentPage=1) {
  const accessToken = cookies().get("access_token")?.value

  try {
    const res = await fetch(`${BASE_URL}/api/news/v1/news/?page_size=1&page=${currentPage}`, {
      method: "GET",
      credentials: "include",
      headers: {
        Cookie: `access_token=${accessToken}`,
      },
      next: { tags: ["all-news"] },
    })

    const response = await res.json()
    if (response.code === 200 && response.status === "success") {
      return {
        error: false,
        data: response,
      }
    } else {
      return {
        error: true,
        message: response.message || "Failed to fetch news",
        data: response.data,
      }
    }
  } catch (err) {
    return {
      error: true,
      message: err?.message || "Network error",
      data: err?.data,
    }
  }
}


export async function get_news(newsId) {
  const accessToken = cookies().get("access_token")?.value

  try {
    const res = await fetch(`${BASE_URL}/api/news/v1/news/${newsId}/`, {
      method: "GET",
      credentials: "include",
      headers: {
        Cookie: `access_token=${accessToken}`,
      },
      next: { tags: [`news-${newsId}`] },
    })

    const response= await res.json()

    if (response.code === 200 && response.status === "success") {
      return {
        error: false,
        data: response.data,
      }
    } else {
      return {
        error: true,
        message: response.message || "Failed to fetch news",
        data: response.data,
      }
    }
  } catch (err) {
    return {
      error: true,
      message: err?.message || "Network error",
      data: err?.data,
    }
  }
}

export async function create_news(newsData) {
  const accessToken = cookies().get("access_token")?.value

  try {
    const res = await fetch(`${BASE_URL}/api/news/v1/news/`, {
      method: "POST",
      credentials: "include",
      headers: {
        Cookie: `access_token=${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newsData),
    })

    const response = await res.json()

    if ((response.code === 200 || response.code === 201) && response.status === "success") {
      return {
        success: true,
        message: "News created successfully",
        data: response.data,
      }
    } else {
      return {
        success: false,
        message: response.message || "Failed to create news",
        data: response.data,
      }
    }
  } catch (err) {
    return {
      success: false,
      message: err?.message || "Network error",
      data: err?.data,
    }
  }
}

export async function update_news(
  newsId,
  newsData
) {
  const accessToken = cookies().get("access_token")?.value

  try {
    const res = await fetch(`${BASE_URL}/api/news/v1/news/update/${newsId}/`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        Cookie: `access_token=${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newsData),
    })

    const response = await res.json()

    if ((response.code === 200 || response.code === 201) && response.status === "success") {
      return {
        success: true,
        message: "News updated successfully",
        data: response.data,
      }
    } else {
      return {
        success: false,
        message: response.message || "Failed to update news",
        data: response.data,
      }
    }
  } catch (err) {
    return {
      success: false,
      message: err?.message || "Network error",
      data: err?.data,
    }
  }
}


export async function delete_news(newsId) {
  const accessToken = cookies().get("access_token")?.value

  try {
    const res = await fetch(`${BASE_URL}/api/news/v1/news/update/${newsId}/`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        Cookie: `access_token=${accessToken}`,
        "Content-Type": "application/json",
      },
    })

    const response = await res.json()

    if (response.code === 200 && response.status === "success") {
      return {
        success: true,
        message: "News deleted successfully",
        data: null,
      }
    } else {
      return {
        success: false,
        message: response.message || "Failed to delete news",
        data: response.data,
      }
    }
  } catch (err) {
    return {
      success: false,
      message: err?.message || "Network error",
      data: err?.data,
    }
  }
}


export async function get_all_categories() {
  const accessToken = cookies().get("access_token")?.value

  try {
    const res = await fetch(`${BASE_URL}/api/news/v1/news/categories/`, {
      method: "GET",
      credentials: "include",
      headers: {
        Cookie: `access_token=${accessToken}`,
      },
      next: { tags: ["all-categories"] },
    })

    const response = await res.json()

    if (response.code === 200 && response.status === "success") {
      return {
        error: false,
        data: response.data,
      }
    } else {
      return {
        error: true,
        message: response.message || "Failed to fetch categories",
        data: response.data,
      }
    }
  } catch (err) {
    return {
      error: true,
      message: err?.message || "Network error",
      data: err?.data,
    }
  }
}


export async function create_category(categoryData) {
  const accessToken = cookies().get("access_token")?.value

  try {
    const res = await fetch(`${BASE_URL}/api/news/v1/news/categories/`, {
      method: "POST",
      credentials: "include",
      headers: {
        Cookie: `access_token=${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(categoryData),
    })

    const response = await res.json()

    if ((response.code === 200 || response.code === 201) && response.status === "success") {
      return {
        success: true,
        message: "Category created successfully",
        data: response.data,
      }
    } else {
      return {
        success: false,
        message: response.message || "Failed to create category",
        data: response.data,
      }
    }
  } catch (err) {
    return {
      success: false,
      message: err?.message || "Network error",
      data: err?.data,
    }
  }
}


export async function update_category(categoryId, categoryData) {
  const accessToken = cookies().get("access_token")?.value

  try {
    const res = await fetch(`${BASE_URL}/api/news/v1/news/categories/${categoryId}/`, {
      method: "PUT",
      credentials: "include",
      headers: {
        Cookie: `access_token=${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(categoryData),
    })

    const response = await res.json()

    if ((response.code === 200 || response.code === 201) && response.status === "success") {
      return {
        success: true,
        message: "Category updated successfully",
        data: response.data,
      }
    } else {
      return {
        success: false,
        message: response.message || "Failed to update category",
        data: response.data,
      }
    }
  } catch (err) {
    return {
      success: false,
      message: err?.message || "Network error",
      data: err?.data,
    }
  }
}


export async function delete_category(categoryId) {
  const accessToken = cookies().get("access_token")?.value

  try {
    const res = await fetch(`${BASE_URL}/api/news/v1/news/categories/${categoryId}/`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        Cookie: `access_token=${accessToken}`,
        "Content-Type": "application/json",
      },
    })

    const response = await res.json()

    if (response.code === 200 && response.status === "success") {
      return {
        success: true,
        message: "Category deleted successfully",
        data: null,
      }
    } else {
      return {
        success: false,
        message: response.message || "Failed to delete category",
        data: null,
      }
    }
  } catch (err) {
    return {
      success: false,
      message: err?.message || "Network error",
      data: null,
    }
  }
}
