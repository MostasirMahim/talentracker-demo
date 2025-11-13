import BlogTagsForm from "@/components/Dashboard/Blogs/BlogTagsForm/BlogTagsForm";
import React, { Suspense } from "react";

function Page() {
  return (
    <>
      <Suspense fallback={<h5>Loading...</h5>}>
        <BlogTagsForm />
      </Suspense>
    </>
  );
}

export default Page;
