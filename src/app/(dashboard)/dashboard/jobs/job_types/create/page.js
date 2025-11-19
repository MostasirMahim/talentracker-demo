export const dynamic = "force-dynamic";
import JobTypeForm from "@/components/Dashboard/JobTypeForm/JobTypeForm";
import React, { Suspense } from "react";
import LoaderComponent from "../../../loading";

function Page() {
  return (
    <>
      <Suspense fallback={<LoaderComponent />}>
        <JobTypeForm />
      </Suspense>
    </>
  );
}

export default Page;
