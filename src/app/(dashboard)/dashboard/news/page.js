import { get_all_categories, get_all_news } from "@/actions/news";
import NewsPage from "@/components/Dashboard/news/NewsPage";
import React from "react";
import "../../../../../styles/role.css";

async function NewsAllPage({ searchParams }) {
  const currentPage = searchParams?.page || 1;
  let newsData = null;
  let category_data = null;
  let error = null;

  try {
    const res = await get_all_news(currentPage);
    if (res?.error) {
      error = res?.message || "Something went wrong.";
    } else {
      newsData = res?.data;
    }
  } catch (err) {
    error = err?.message || "Unexpected error while fetching roles.";
  }
  try {
    const res = await get_all_categories();
    if (res?.error) {
      error = res?.message || "Something went wrong.";
    } else {
      category_data = res?.data;
    }
  } catch (err) {
    error = err?.message || "Unexpected error while fetching roles.";
  }

  if (error) {
    return (
      <div className="p-10 text-center text-red-500 text-lg">
        <p className="text-lg">Failed to load news data. Please try again.</p>
        <p>{error}</p>
      </div>
    );
  }
  return <NewsPage news={newsData} categories={category_data} />;
}

export default NewsAllPage;
