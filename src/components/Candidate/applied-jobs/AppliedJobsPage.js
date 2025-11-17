import JobsList from "./JobList";
import "./style.css";

export const AppliedJobsPage = (sampleData) => {
  return (
    <div className="applied-jobs-container">
      <JobsList jobs={sampleData} />
    </div>
  );
};
