import DashboardHome from "@/components/Dashboard/home/DashboardHome";
import DashboardRecentActivity from "@/components/Dashboard/home/DashboardRecentActivity/DashboardRecentActivity";
import { Suspense } from "react";

function DashboardPage() {
  const quickStats = ["Performance", "Conversion", "Retention"];
  return (
    <div>
      <div className="mb-8 bg-linear-to-r from-blue-500 to-blue-600 rounded-2xl p-8 text-white shadow-lg">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2">Welcome Back!</h1>
        <p className="text-blue-100 text-lg">
          Here what happening with your dashboard today.
        </p>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <DashboardHome />
      </Suspense>
      <div>
        <Suspense fallback={<div>Loading...</div>}>
          <DashboardRecentActivity />
        </Suspense>
        <div className="bg-white rounded-xl shadow-sm border border-blue-100 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Stats</h2>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
