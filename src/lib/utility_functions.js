function format_date(data) {
  const readableDate = new Date(data).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  return readableDate;
}

function filterActiveJobs(jobs) {
  const today = new Date();

  return jobs.filter((job) => {
    if (!job.deadline) return false; // skip if no deadline
    const deadlineDate = new Date(job.deadline);
    return deadlineDate >= today; // keep only if deadline not passed
  });
}

export { format_date, filterActiveJobs };
