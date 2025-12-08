import axiosInstance from "@/lib/axiosIntance";
import { cookies } from "next/headers";
import React from "react";

const DashBoardHealth = async () => {
  let healthData = {};
  try {
    const cookieStore = cookies();
    const authToken = cookieStore.get("access_token")?.value || "";
    const response = await axiosInstance.get(
      "/api/dashboard/v1/dashboard/health/",
      {
        headers: {
          Cookie: `access_token=${authToken}`,
        },
      }
    );
    healthData = response.data;
  } catch (error) {
    console.log(error);
  }

  // Validate input data structure
  if (!healthData || typeof healthData?.data === "undefined") {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-lg shadow-md">
        <p className="font-bold">Health Data Error</p>
        <p>Invalid or missing server health data structure.</p>
      </div>
    );
  }

  const { status, data } = healthData;
  const components = data;

  // Determine card style based on overall status
  const isHealthy =
    status === "success" &&
    components.database === "OK" &&
    components.cache === "OK" &&
    components.smtp === "OK";
  const bgColor = isHealthy ? "bg-green-500" : "bg-red-500";
  const ringColor = isHealthy ? "ring-green-400" : "ring-red-400";

  /**
   * Helper function to render component status with appropriate color/icon
   */
  const renderStatusItem = (name, componentStatus) => {
    const isOK = componentStatus === "OK";
    const textColor = isOK ? "text-green-400" : "text-red-400";
    const icon = isOK ? "✅" : "❌";

    return (
      <li
        key={name}
        className="flex items-center justify-between py-1 border-b border-gray-700 last:border-b-0"
      >
        <span className="font-medium text-gray-200">{name}</span>
        <span className={`text-sm font-semibold ${textColor}`}>
          {icon} {componentStatus}
        </span>
      </li>
    );
  };

  return (
    <div
      className={`p-6 rounded-xl shadow-2xl transition duration-300 transform hover:scale-[1.02] ${bgColor} text-white border-4 ${ringColor} ring-offset-4 ring-offset-gray-900`}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-2xl font-extrabold tracking-tight">
          Server Health Status
        </h3>
        <div
          className={`px-3 py-1 text-sm font-bold rounded-full ${
            isHealthy ? "bg-white text-green-700" : "bg-white text-red-700"
          }`}
        >
          {status.toUpperCase()}
        </div>
      </div>

      <div className="bg-gray-800 p-4 rounded-lg mb-4">
        <ul className="space-y-1">
          {Object.entries(components).map(([key, value]) => {
            // Exclude disk_space as it's handled separately
            if (key !== "disk_space") {
              return renderStatusItem(
                key.replace(/_/g, " ").toUpperCase(),
                value
              );
            }
            return null;
          })}
        </ul>
      </div>

      {/* Disk Space Meter - Visualized Metric */}
      <div className="mt-6">
        <h4 className="text-lg font-semibold mb-2">
          Disk Space ({components?.disk_space?.total_gb}GB)
        </h4>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className={`h-3 rounded-full transition-all duration-500 
                        ${
                          components?.disk_space?.percent_used < 80
                            ? "bg-blue-400"
                            : "bg-yellow-400"
                        } 
                        ${
                          components?.disk_space?.percent_used > 90
                            ? "bg-red-500"
                            : ""
                        }`}
            style={{ width: `${components?.disk_space?.percent_used}%` }}
            role="progressbar"
            aria-valuenow={components?.disk_space?.percent_used}
            aria-valuemin="0"
            aria-valuemax="100"
          ></div>
        </div>
        <p className="mt-2 text-sm text-gray-300">
          {components?.disk_space?.percent_used.toFixed(1)}% Used (Approx.{" "}
          {components?.disk_space?.used_gb.toFixed(2)} GB /{" "}
          {components?.disk_space?.total_gb} GB)
        </p>
      </div>
    </div>
  );
};

export default DashBoardHealth;
