"use client";
export default function DashboardHome() {
  const cardItems = [
    { label: "Total Users", value: "12,453", change: "+12%" },
    { label: "Jobs", value: "2,123", change: "+5%" },
    { label: "Employers", value: "2,123", change: "+8%" },
    { label: "Applications", value: "1,234", change: "+2%" },
  ];
  const activityItems = [
    "Applied to a job",
    "Interviewed for a job",
    "Accepted for a job",
    "Rejected for a job",
  ];
  const quickStats = ["Performance", "Conversion", "Retention"];
  return (
    <div>
      <div className="mb-8 bg-linear-to-r from-blue-500 to-blue-600 rounded-2xl p-8 text-white shadow-lg">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2">Welcome Back!</h1>
        <p className="text-blue-100 text-lg">
          Here what happening with your dashboard today.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
        {cardItems.map((stat, i) => (
          <div
            key={i}
            className="bg-white rounded-xl p-6 shadow-sm border border-blue-100 hover:shadow-md transition-shadow"
          >
            <p className="text-gray-600 text-sm font-medium mb-2">
              {stat.label}
            </p>
            <div className="flex items-end justify-between">
              <p className="text-2xl sm:text-3xl font-bold text-gray-900">
                {stat.value}
              </p>
              <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded">
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-blue-100 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Recent Activity
          </h2>
          <div className="space-y-4">
            {activityItems.map((i) => (
              <div
                key={i}
                className="flex items-center justify-between p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-linear-to-br from-blue-400 to-blue-600" />
                  <div>
                    <p className="font-medium text-gray-900">{i}</p>
                    <p className="text-sm text-gray-500">2 hours ago</p>
                  </div>
                </div>
                <span className="text-sm font-medium text-blue-600">
                  Completed
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-blue-100 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Stats</h2>
          <div className="space-y-4">
            {quickStats.map((label, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-gray-700">{label}</span>
                  <span className="text-blue-600 font-bold">{75 + i * 5}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-linear-to-r from-blue-400 to-blue-600 h-2 rounded-full"
                    style={{ width: `${75 + i * 5}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
