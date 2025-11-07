"use client"

import { Eye, Edit2 } from "lucide-react"

export default function DashboardHome() {
  const stats = [
    { label: "Total Jobs", value: "12", color: "primary" },
    { label: "Active Applicants", value: "48", color: "secondary" },
    { label: "Pending Requests", value: "7", color: "warning" },
    { label: "Completed Projects", value: "24", color: "success" },
  ]

  const recentJobs = [
    { id: 1, title: "Senior Developer", department: "Engineering", posted: "2 days ago", applicants: 15 },
    { id: 2, title: "UI/UX Designer", department: "Design", posted: "1 week ago", applicants: 8 },
    { id: 3, title: "Product Manager", department: "Product", posted: "3 days ago", applicants: 12 },
  ]

  return (
    <div>
      <div style={{ marginBottom: "2rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
          {stats.map((stat, idx) => (
            <div key={idx} className="card">
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <span style={{ fontSize: "0.875rem", color: "var(--text-secondary)" }}>{stat.label}</span>
                <span
                  style={{
                    fontSize: "2rem",
                    fontWeight: "700",
                    background: "var(--gradient-primary)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {stat.value}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <div>
            <h2 className="card-title">Recent Job Postings</h2>
            <p className="card-subtitle">Latest jobs posted in the system</p>
          </div>
          <button className="btn btn-primary btn-sm">+ New Job</button>
        </div>

        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Job Title</th>
                <th>Department</th>
                <th>Posted</th>
                <th>Applicants</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="bg-amber-300">
              {recentJobs.map((job) => (
                <tr key={job.id}>
                  <td style={{ fontWeight: "500" }}>{job.title}</td>
                  <td>{job.department}</td>
                  <td>{job.posted}</td>
                  <td>
                    <span className="badge badge-info">{job.applicants}</span>
                  </td>
                  <td>
                    <button className="btn btn-secondary btn-sm" style={{ marginRight: "0.5rem" }}>
                      <Eye size={16} />
                    </button>
                    <button className="btn btn-secondary btn-sm">
                      <Edit2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            <p className="bg-yellow-200">Hello</p>
          </table>
        </div>
      </div>
    </div>
  )
}
