import { get_candidate_applications } from "@/actions/candidate";
import { AppliedJobsPage } from "@/components/Candidate/applied-jobs/AppliedJobsPage";

async function page() {
  let sampleData = null;
  let error = null;

  try {
    const res = await get_candidate_applications();
    if (res?.error) {
      error = res?.message || "Something went wrong.";
    } else {
      sampleData = res?.data;
    }
  } catch (err) {
    error = err?.message || "Unexpected error while fetching profile.";
  }

  if (error) {
    return (
      <div className="p-10 text-center text-red-500 text-lg">
        <p className="text-lg">
          {" "}
           Failed to load your applications. Try once again!
        </p>
        <p>{error}</p>
      </div>
    );
  }
  return (
    <div>
      <AppliedJobsPage data={sampleData} />
    </div>
  );
}

export default page;
