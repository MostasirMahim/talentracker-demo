import BlogCategoryForm from "@/components/Dashboard/Blogs/BlogCategoryForm/BlogCategoryForm";
import React, { Suspense } from "react";

function Page() {
  return (
    <>
      <Suspense fallback={<h5>Loading...</h5>}>
        <BlogCategoryForm />
      </Suspense>
    </>
  );
}

export default Page;
