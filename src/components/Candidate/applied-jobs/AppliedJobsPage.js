import JobsList from "./JobList";
import RefreshButton from "./RefreshButton";
import "./style.css";

export const AppliedJobsPage = (sampleData) => {
  return (
    <div className="applied-jobs-container">
      <div className="applied-jobs-header">
        <div>
          <h1>Applied Jobs</h1>
        <p>Track all your job applications in one place</p>
        </div>
        <RefreshButton />
      </div>
      <JobsList jobs={sampleData} />
    </div>
  );
};
