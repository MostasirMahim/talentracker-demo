export const dynamic = "force-dynamic";
import JobCategoryForm from "@/components/Dashboard/jobs/JobCategoryForm/JobCategoryForm";
import React, { Suspense } from "react";
import LoaderComponent from "../../../loading";

function Page() {
  return (
    <>
      <Suspense fallback={<LoaderComponent />}>
        <JobCategoryForm />
      </Suspense>
    </>
  );
}

export default Page;
