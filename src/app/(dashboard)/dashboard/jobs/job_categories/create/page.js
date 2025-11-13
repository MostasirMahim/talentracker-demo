export const dynamic = "force-dynamic";
import JobCategoryForm from "@/components/Dashboard/jobs/JobCategoryForm/JobCategoryForm";
import React, { Suspense } from "react";

function Page() {
  return (
    <>
      <Suspense fallback={<h5>Loading...</h5>}>
        <JobCategoryForm />
      </Suspense>
    </>
  );
}

export default Page;
