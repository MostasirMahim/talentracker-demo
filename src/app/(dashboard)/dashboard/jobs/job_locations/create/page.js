export const dynamic = "force-dynamic";
import JobLocationForm from "@/components/Dashboard/jobs/JobLocationForm/JobLocation";
import React, { Suspense } from "react";

function page() {
  return (
    <>
      <Suspense fallback={<h5>Loading...</h5>}>
        <JobLocationForm />
      </Suspense>
    </>
  );
}

export default page;
