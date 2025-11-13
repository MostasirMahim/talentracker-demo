import JobTypeForm from "@/components/Dashboard/JobTypeForm/JobTypeForm";
import React, { Suspense } from "react";

function Page() {
  return (
    <>
      <Suspense fallback={<h5>Loading...</h5>}>
        <JobTypeForm />
      </Suspense>
    </>
  );
}

export default Page;
