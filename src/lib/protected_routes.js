export const protected_routes = [
  { path: "/dashboard/roles/", permission_name: "roles_management" },
  { path: "/dashboard/registration/", permission_name: "member_management" },
  { path: "/dashboard/jobs/", permission_name: "job_management" },
  { path: "/dashboard/blogs/", permission_name: "blog_management" },
  { path: "/dashboard/news/", permission_name: "news_management" },
  { path: "/dashboard/hooks/", permission_name: "hooks_management" },
  { path: "/dashboard/contacts/", permission_name: "contact_management" },
  { path: "/dashboard/quotes/", permission_name: "quote_management" },
  { path: "/dashboard/candidates/", permission_name: null },
  { path: "/dashboard/users", permission_name: "view_all_users" },
  { path: "/dashboard/gallery/", permission_name: "gallery_management" },
];