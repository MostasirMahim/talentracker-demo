import React from "react";
import {
  ClockIcon,
  UserIcon,
  AlertTriangleIcon,
  CheckCircleIcon,
  XCircleIcon,
  InfoIcon,
  ServerCrashIcon,
} from "lucide-react";
import AdminSmartPagination from "@/components/SmartPagination/AdminSmartPagination";

// Mock API response structure provided by the user
const mockApiResponse = {
  code: 200,
  status: "success",
  message: "Activity log fetched successfully",
  data: [
    {
      id: 4226,
      user: "admin2@gmail.com",
      timestamp: "2025-12-07T11:36:00.007413+06:00",
      ip_address: "127.0.0.1",
      location: "BD",
      user_agent:
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36",
      request_method: "POST",
      referrer_url: "http://localhost:3000/",
      device: "LAPTOP-L0CRCIMB",
      path: "/api/blogs/v1/categories/",
      verb: "Category created",
      severity_level: "info",
      description: "Category 'raymond_pearson' created successfully",
      response_status_code: 201,
    },
    {
      id: 4225,
      user: "admin2@gmail.com",
      timestamp: "2025-12-07T11:32:00.012035+06:00",
      ip_address: "127.0.0.1",
      location: "BD",
      user_agent:
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36",
      request_method: "POST",
      referrer_url: "http://localhost:3000/",
      device: "LAPTOP-L0CRCIMB",
      path: "/api/blogs/v1/categories/",
      verb: "Category created",
      severity_level: "warning",
      description: "Category 'andrew_watson' already exists",
      response_status_code: 409,
    },
    {
      id: 4224,
      user: null,
      timestamp: "2025-12-07T11:29:49.133175+06:00",
      ip_address: "127.0.0.1",
      location: "BD",
      user_agent:
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36",
      request_method: "POST",
      referrer_url: "http://localhost:3000/",
      device: "LAPTOP-L0CRCIMB",
      path: "/api/internal/health/",
      verb: "Internal server error",
      severity_level: "error",
      description: "Database connection timeout during health check",
      response_status_code: 500,
    },
  ],
};

// --- Helper Components ---

/**
 * Renders a color-coded badge for the log severity level.
 */
const SeverityBadge = ({ level }) => {
  const lowerLevel = level ? level.toLowerCase() : "unknown";
  let colorClasses = "bg-gray-100 text-gray-800";
  let Icon = InfoIcon;

  if (lowerLevel === "info") {
    colorClasses = "bg-blue-100 text-blue-800";
    Icon = InfoIcon;
  } else if (lowerLevel === "warning") {
    colorClasses = "bg-yellow-100 text-yellow-800";
    Icon = AlertTriangleIcon;
  } else if (lowerLevel === "error") {
    colorClasses = "bg-red-100 text-red-800";
    Icon = ServerCrashIcon;
  }

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase ${colorClasses}`}
    >
      <Icon className="w-3 h-3 mr-1" />
      {lowerLevel}
    </span>
  );
};

/**
 * Renders a color-coded badge for the HTTP status code.
 */
const StatusCodeBadge = ({ code }) => {
  const codeStr = String(code);
  let colorClasses = "bg-gray-100 text-gray-800";

  if (codeStr.startsWith("2")) {
    colorClasses = "bg-emerald-100 text-emerald-800"; // Success (2xx)
  } else if (codeStr.startsWith("4")) {
    colorClasses = "bg-amber-100 text-amber-800"; // Client Error (4xx)
  } else if (codeStr.startsWith("5")) {
    colorClasses = "bg-red-100 text-red-800"; // Server Error (5xx)
  }

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${colorClasses}`}
    >
      {code}
    </span>
  );
};

// --- Main Component ---

const ActivityLogTable = ({ logs }) => {
  if (!logs || logs.length === 0) {
    return (
      <div className="p-8 text-center text-gray-500 bg-white rounded-xl shadow-lg">
        No activity logs found.
      </div>
    );
  }

  // Function to format timestamp for display
  const formatTimestamp = (isoString) => {
    const date = new Date(isoString);
    return {
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString(),
    };
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-6">
        System Activity Log
      </h1>

      {/* Table Container - Uses overflow-x-auto for responsiveness */}
      <div className="bg-white shadow-xl rounded-xl ring-1 ring-gray-200 overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50 sticky top-0">
            <tr>
              {["Time", "User", "Action", "API Path", "Severity", "Status"].map(
                (header) => (
                  <th
                    key={header}
                    className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider min-w-[100px]"
                  >
                    {header}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {logs.map((log) => {
              const { date, time } = formatTimestamp(log.timestamp);
              const userDisplay = log.user || "System/Unauthenticated";

              return (
                <tr
                  key={log.id}
                  className="hover:bg-indigo-50 transition duration-100"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    <div className="flex items-center">
                      <ClockIcon className="w-4 h-4 text-gray-400 mr-2" />
                      {time}
                    </div>
                    <div className="text-xs text-gray-500">{date}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                    <div className="flex items-center">
                      <UserIcon className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="truncate max-w-[150px]">
                        {userDisplay}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800 w-96 min-w-80">
                    <div className="font-semibold text-gray-900">
                      {log.verb}
                    </div>
                    <div
                      className="text-gray-500 text-xs truncate"
                      title={log.description}
                    >
                      {log.description}
                    </div>
                  </td>
                  <td
                    className="px-6 py-4 text-sm text-indigo-600 truncate max-w-xs min-w-48"
                    title={log.path}
                  >
                    {log.path}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <SeverityBadge level={log.severity_level} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <StatusCodeBadge code={log.response_status_code} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// The main App component to demonstrate usage
const ActivityLogList = ({ activity_logs }) => {
  return (
    <div className="font-sans antialiased">
      <ActivityLogTable logs={activity_logs?.data} />
      <AdminSmartPagination paginationData={activity_logs?.pagination} />
    </div>
  );
};

export default ActivityLogList;
