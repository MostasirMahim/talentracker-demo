import axiosInstance from "@/lib/axiosIntance";
import { cookies } from "next/headers";
import { User, FileBox, Dock, GraduationCap } from "lucide-react";
export default async function DashboardHome() {
  let data = {};
  try {
    const cookieStore = cookies();
    const authToken = cookieStore.get("access_token")?.value || "";
    const response = await axiosInstance.get(
      "/api/dashboard/v1/dashboard/counts/",
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-blue-100 hover:shadow-md transition-shadow">
          <p className="text-gray-600 text-sm font-medium mb-2">Total users</p>
          <div className="flex items-end justify-between">
            <p className="text-2xl sm:text-3xl font-bold text-gray-900">
              {data?.data?.user_cnt}
            </p>
            <User />
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-blue-100 hover:shadow-md transition-shadow">
          <p className="text-gray-600 text-sm font-medium mb-2">Total Jobs</p>
          <div className="flex items-end justify-between">
            <p className="text-2xl sm:text-3xl font-bold text-gray-900">
              {data?.data?.job_cnt}
            </p>
            <FileBox />
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-blue-100 hover:shadow-md transition-shadow">
          <p className="text-gray-600 text-sm font-medium mb-2">
            Total Job Applications
          </p>
          <div className="flex items-end justify-between">
            <p className="text-2xl sm:text-3xl font-bold text-gray-900">
              {data?.data?.job_application_cnt}
            </p>
            <Dock />
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-blue-100 hover:shadow-md transition-shadow">
          <p className="text-gray-600 text-sm font-medium mb-2">
            Total Candidate
          </p>
          <div className="flex items-end justify-between">
            <p className="text-2xl sm:text-3xl font-bold text-gray-900">
              {data?.data?.candidate_cnt}
            </p>
            <GraduationCap />
          </div>
        </div>
      </div>
    </div>
  );
}
