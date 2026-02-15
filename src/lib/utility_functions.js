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

export const navigationPermissions = {
  Home: null,
  "Expert Trainer profile": "training_solutions_management",
  "Learning segment": "training_solutions_management",
  "Activity logs": "activity_log_management",
  "Roles Management": "roles_management",
  Jobs: "job_management",
  Blogs: "blog_management",
  "News Management": "news_management",
  Onboarding: "employee_management",
  "View all Hooks": "hooks_management",
  "View all Contacts": "contact_management",
  "View all Quotes": "quote_management",
  "Registered candidates": "job_management",
  "View all Users": "view_all_users",
  Gallery: "gallery_management",
  "Training Solutions": "training_solutions_management",
  "Registered trainers": "trainer_management",
  "Candidate Testimonials": "candidate_testimonial_management",
};

export const filterNavigationByPermissions = (navArray, userPermissions) => {
  return navArray.filter((item) => {
    const requiredPermission = navigationPermissions[item.label];
    const hasPermissionForItem =
      requiredPermission === null ||
      userPermissions.includes(requiredPermission);

    if (item.children && item.children.length > 0) {
      const filteredSubItems = filterNavigationByPermissions(
        item.children,
        userPermissions
      );
      if (hasPermissionForItem || filteredSubItems.length > 0) {
        return { ...item, children: filteredSubItems };
      }
      return false;
    }
    return hasPermissionForItem;
  });
};
