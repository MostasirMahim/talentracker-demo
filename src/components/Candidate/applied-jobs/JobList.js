import React from "react";
import JobCard from "./JobCard";
import CarrerButton from "./CarrerButton";

export default function JobsList({ jobs, loading = false, error = null }) {
  if (loading) {
    return (
      <div className="empty-state">
        <p>Loading your applications...</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="empty-state">
        <h2>Error Loading Applications</h2>
        <p>{error}</p>
      </div>
    );
  }

  if (!jobs?.data || jobs?.data?.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">📋</div>
        <h2>No Applications Yet</h2>
        <p>Start applying to jobs to see your applications here</p>
        <div className="flex-d">
          <CarrerButton />
        </div>
      </div>
    );
  }

  const sortedJobs = [...jobs?.data].sort(
    (a, b) =>
      new Date(b.applied_at).getTime() - new Date(a.applied_at).getTime()
  );

  return (
    <ul className="jobs-list">
      {sortedJobs.map((job) => (
        <JobCard key={job.id} {...job} />
      ))}
    </ul>
  );
}
