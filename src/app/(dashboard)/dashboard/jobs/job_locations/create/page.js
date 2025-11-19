export const dynamic = "force-dynamic";
import JobLocationForm from "@/components/Dashboard/jobs/JobLocationForm/JobLocation";
import React, { Suspense } from "react";
import LoaderComponent from "../../../loading";

function page() {
  return (
    <>
      <Suspense fallback={<LoaderComponent />}>
        <JobLocationForm />
      </Suspense>
    </>
  );
}

export default page;
