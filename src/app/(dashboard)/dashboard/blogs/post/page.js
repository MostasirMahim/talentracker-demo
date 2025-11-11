import BlogPostForm from "@/components/Dashboard/Blogs/BlogPostForm/BlogPostForm";
import axiosInstance from "@/lib/axiosIntance";
import React from "react";

async function page() {
  let blog_tags, blog_categories;
  
  try {
    const tags_req = axiosInstance.get("/api/blogs/v1/tags/");
    const categories_req = axiosInstance.get("/api/blogs/v1/categories/");
    const [tags_res, categories_res] =
      await Promise.all([tags_req, categories_req]);
    blog_tags = tags_res.data.data;
    blog_categories = categories_res.data.data;
    console.log(blog_tags, blog_categories);
  } catch (error) {
    console.log(error);
  }
  return (
    <>
      <BlogPostForm
        blogTags={blog_tags}
        blogCategories={blog_categories}
      />
    </>
  );
}

export default page;
