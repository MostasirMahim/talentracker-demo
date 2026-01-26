import axiosInstance from "@/lib/axiosIntance";
import { cookies } from "next/headers";
import Link from "next/link";
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

        {/* Total Users */}
        <Link href="/dashboard/users">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-blue-500 hover:shadow-md transition-shadow cursor-pointer">
            <p className="text-gray-600 text-sm font-medium mb-2">Total users</p>
            <div className="flex items-end justify-between">
              <p className="text-2xl sm:text-3xl font-bold text-blue-600">
                {data?.data?.user_cnt}
              </p>
              <User className="text-blue-400" />
            </div>
          </div>
        </Link>

        {/* Total Jobs */}
        <Link href="/dashboard/jobs">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-blue-500 hover:shadow-md transition-shadow cursor-pointer">
            <p className="text-gray-600 text-sm font-medium mb-2">Total Jobs</p>
            <div className="flex items-end justify-between">
              <p className="text-2xl sm:text-3xl font-bold text-blue-600">
                {data?.data?.job_cnt}
              </p>
              <FileBox className="text-blue-400" />
            </div>
          </div>
        </Link>

        {/* Job Applications */}
        <Link href="/dashboard/jobs">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-blue-500 hover:shadow-md transition-shadow cursor-pointer">
            <p className="text-gray-600 text-sm font-medium mb-2">
              Total Job Applications
            </p>
            <div className="flex items-end justify-between">
              <p className="text-2xl sm:text-3xl font-bold text-blue-600">
                {data?.data?.job_application_cnt}
              </p>
              <Dock className="text-blue-400" />
            </div>
          </div>
        </Link>

        {/* Candidates */}
        <Link href="/dashboard/candidates">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-blue-500 hover:shadow-md transition-shadow cursor-pointer">
            <p className="text-gray-600 text-sm font-medium mb-2">
              Total Candidate
            </p>
            <div className="flex items-end justify-between">
              <p className="text-2xl sm:text-3xl font-bold text-blue-600">
                {data?.data?.candidate_cnt}
              </p>
              <GraduationCap className="text-blue-400" />
            </div>
          </div>
        </Link>

      </div>
    </div>
  );
}
