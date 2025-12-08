import axiosInstance from "@/lib/axiosIntance";
import { cookies } from "next/headers";
import React from "react";

async function DashboardRecentActivity() {
  let data = {};
  try {
    const cookieStore = cookies();
    const authToken = cookieStore.get("access_token")?.value || "";
    const response = await axiosInstance.get(
      "/api/dashboard/v1/dashboard/recent_activities/",
      {
        headers: {
          Cookie: `access_token=${authToken}`,
        },
      }
    );
    data = response.data;
  } catch (error) {
    console.log(error);
  }
  return (
    <div>
      <div className=" bg-white rounded-xl shadow-sm border border-blue-100 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Recent Activity
        </h2>
        <div className="space-y-4">
          {data?.data?.map((i) => (
            <div
              key={i.id}
              className="flex items-center justify-between p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-linear-to-br from-blue-400 to-blue-600" />
                <div>
                  <p className="font-medium text-gray-900">{i.verb}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(i.timestamp).toLocaleString()}
                  </p>
                </div>
              </div>
              <span className="text-sm font-medium text-blue-600">
                {i.device}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DashboardRecentActivity;
