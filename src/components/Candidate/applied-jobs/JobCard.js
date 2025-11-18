import { Eye } from "lucide-react";
import React from "react";

export default function JobCard({ id, job, status, applied_at, is_read }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const dateOnly = date.toDateString();
    const todayString = today.toDateString();
    const yesterdayString = yesterday.toDateString();

    if (dateOnly === todayString) {
      return `Today, ${date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      })}`;
    } else if (dateOnly === yesterdayString) {
      return `Yesterday, ${date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      })}`;
    }
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: date.getFullYear() !== today.getFullYear() ? "numeric" : undefined,
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <li className={`job-card ${!is_read ? "unread" : "read"}`}>
      <div className="job-card-header">
        <h3 className="job-title">{job}</h3>
        <span className={`job-status status-${status}`}>{status}</span>
      </div>

      <div className="job-details">
        <div className="job-detail-item">
          <span className="job-detail-label">Applied:</span>
          <span className="job-detail-value">{formatDate(applied_at)}</span>
        </div>
        <div className="job-detail-item">
          <div className="flex-d">
            <Eye size={16} />
            <span className="job-detail-label">Read Status:</span>
          </div>
          <span className="job-detail-value">{is_read ? "Read" : "Unread"}</span>
        </div>
      </div>
    </li>
  );
}
