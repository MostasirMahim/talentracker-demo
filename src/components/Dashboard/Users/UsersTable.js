"use client";

import { useState } from "react";

const UserTypeCard = ({ type, count, isActive, onClick, icon, color }) => (
  <button
    onClick={onClick}
    className={`flex-1 min-w-[140px] cursor-pointer p-4 rounded-xl border-2 transition-all duration-300 ${
      isActive
        ? `${color} border-transparent shadow-lg scale-105`
        : "bg-white border-gray-200 hover:border-gray-300 hover:shadow-md"
    }`}
  >
    <div className="flex flex-col items-center gap-2">
      <div
        className={`text-3xl ${
          isActive ? "transform scale-110" : ""
        } transition-transform duration-300`}
      >
        {icon}
      </div>
      <div
        className={`text-sm font-semibold uppercase tracking-wide ${
          isActive ? "text-white" : "text-gray-600"
        }`}
      >
        {type || "Empty"}
      </div>
      <div
        className={`text-2xl font-bold ${
          isActive ? "text-white" : "text-gray-800"
        }`}
      >
        {count}
      </div>
    </div>
  </button>
);

const UserRow = ({ user, index }) => {
  const getUserTypeStyle = (type) => {
    switch (type?.toLowerCase()) {
      case "admin":
        return "bg-purple-100 text-purple-700 border-purple-200";
      case "candidate":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "trainer":
        return "bg-green-100 text-green-700 border-green-200";
      default:
        return "bg-gray-100 text-gray-600 border-gray-200";
    }
  };

  const getStatusStyle = (isActive) => {
    return isActive
      ? "bg-green-100 text-green-700 border-green-200"
      : "bg-red-100 text-red-700 border-red-200";
  };

  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200">
      <td className="px-6 py-4 text-sm text-gray-600 font-medium">{index + 1}</td>
      <td className="px-6 py-4">
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-gray-800">
            {user.first_name && user.last_name
              ? `${user.first_name} ${user.last_name}`
              : "—"}
          </span>
          <span className="text-xs text-gray-500 mt-0.5">{user.email}</span>
        </div>
      </td>
      <td className="px-6 py-4">
        <span
          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${getUserTypeStyle(
            user.user_type
          )}`}
        >
          {user.user_type || "Empty"}
        </span>
      </td>
      <td className="px-6 py-4">
        <span
          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${getStatusStyle(
            user.is_active
          )}`}
        >
          {user.is_active ? "Active" : "Inactive"}
        </span>
      </td>
      <td className="px-6 py-4">
        <span
          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${
            user.is_staff
              ? "bg-orange-100 text-orange-700 border-orange-200"
              : "bg-gray-100 text-gray-600 border-gray-200"
          }`}
        >
          {user.is_staff ? "Staff" : "User"}
        </span>
      </td>
      <td className="px-6 py-4 text-sm text-gray-600">
        {new Date(user.date_joined).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </td>
    </tr>
  );
};

const Pagination = ({ paginationData }) => {
  if (!paginationData || paginationData.total_pages <= 1) return null;

  const { current_page, total_pages, next, previous } = paginationData;

  const goToPage = (page) => {
    if (page !== current_page && page >= 1 && page <= total_pages) {
      const params = new URLSearchParams(window.location.search);
      params.set("page", page);
      window.location.href = `?${params.toString()}`;
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const generatePageLinks = () => {
    const rangeWithDots = [];

    if (current_page > 2) {
      rangeWithDots.push(1);
      if (current_page > 3) {
        rangeWithDots.push("...");
      }
    }

    const delta = 1;
    for (
      let i = Math.max(1, current_page - delta);
      i <= Math.min(total_pages, current_page + delta);
      i++
    ) {
      rangeWithDots.push(i);
    }

    if (current_page < total_pages - 1) {
      if (current_page < total_pages - 2) {
        rangeWithDots.push("...");
      }
      rangeWithDots.push(total_pages);
    }

    return rangeWithDots;
  };

  return (
    <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 bg-gray-50">
      <button
        onClick={() => previous && goToPage(current_page - 1)}
        disabled={!previous}
        className="inline-flex cursor-pointer items-center gap-2 px-4 py-2 rounded-lg border-2 border-blue-500 text-blue-600 font-semibold text-sm transition-all duration-300 hover:bg-blue-500 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed disabled:border-gray-300 disabled:text-gray-400 disabled:hover:bg-transparent disabled:hover:text-gray-400"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Previous
      </button>

      <div className="flex items-center gap-2">
        {generatePageLinks().map((page, i) =>
          page === "..." ? (
            <span key={`ellipsis-${i}`} className="px-2 text-gray-400 font-semibold">
              ···
            </span>
          ) : (
            <button
              key={page}
              onClick={() => goToPage(page)}
              className={`min-w-[40px] cursor-pointer h-[40px] flex items-center justify-center rounded-lg font-semibold text-sm transition-all duration-300 ${
                page === current_page
                  ? "bg-blue-500 text-white shadow-lg scale-105 border-2 border-blue-500"
                  : "border-2 border-gray-200 text-gray-700 hover:border-blue-500 hover:text-blue-500 hover:shadow-md"
              }`}
            >
              {page}
            </button>
          )
        )}
      </div>

      <button
        onClick={() => next && goToPage(current_page + 1)}
        disabled={!next}
        className="inline-flex items-center cursor-pointer gap-2 px-4 py-2 rounded-lg border-2 border-blue-500 text-blue-600 font-semibold text-sm transition-all duration-300 hover:bg-blue-500 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed disabled:border-gray-300 disabled:text-gray-400 disabled:hover:bg-transparent disabled:hover:text-gray-400"
      >
        Next
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
};

export default function UsersTable({ users = {} }) {
  const [selectedType, setSelectedType] = useState("all");

  const userTypes = {
    all: { count: 0, icon: "👥", color: "bg-gradient-to-br from-gray-500 to-gray-600" },
    admin: { count: 0, icon: "👑", color: "bg-gradient-to-br from-purple-500 to-purple-600" },
    candidate: { count: 0, icon: "🎯", color: "bg-gradient-to-br from-blue-500 to-blue-600" },
    trainer: { count: 0, icon: "📚", color: "bg-gradient-to-br from-green-500 to-green-600" },
    "": { count: 0, icon: "❓", color: "bg-gradient-to-br from-gray-400 to-gray-500" },
  };

  // Count users by type
  users.data?.forEach((user) => {
    const type = user.user_type || "";
    if (userTypes[type]) {
      userTypes[type].count++;
    }
    userTypes.all.count++;
  });

  // Filter users based on selected type
  const filteredUsers =
    selectedType === "all"
      ? users.data || []
      : users.data?.filter((user) => (user.user_type || "") === selectedType) || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">User Management</h1>
          <p className="text-gray-600">Manage and view all users by their roles</p>
          {/* total user count */}
          <div className="mt-4 text-gray-700 text-[20px]">
            Total Users:{" "}
            <span className="font-semibold text-gray-900">
              {users.pagination?.count || 0}
            </span>
          </div>
        </div>

        {/* Type Filter Cards */}
        <div className="flex flex-wrap gap-4 mb-8">
          <UserTypeCard
            type="All Users"
            count={userTypes.all.count}
            icon={userTypes.all.icon}
            color={userTypes.all.color}
            isActive={selectedType === "all"}
            onClick={() => setSelectedType("all")}
          />
          <UserTypeCard
            type="Admin"
            count={userTypes.admin.count}
            icon={userTypes.admin.icon}
            color={userTypes.admin.color}
            isActive={selectedType === "admin"}
            onClick={() => setSelectedType("admin")}
          />
          <UserTypeCard
            type="Candidate"
            count={userTypes.candidate.count}
            icon={userTypes.candidate.icon}
            color={userTypes.candidate.color}
            isActive={selectedType === "candidate"}
            onClick={() => setSelectedType("candidate")}
          />
          <UserTypeCard
            type="Trainer"
            count={userTypes.trainer.count}
            icon={userTypes.trainer.icon}
            color={userTypes.trainer.color}
            isActive={selectedType === "trainer"}
            onClick={() => setSelectedType("trainer")}
          />
          <UserTypeCard
            type="Empty"
            count={userTypes[""].count}
            icon={userTypes[""].icon}
            color={userTypes[""].color}
            isActive={selectedType === ""}
            onClick={() => setSelectedType("")}
          />
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">
                    #
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">
                    User Info
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">
                    Joined
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredUsers && filteredUsers.length > 0 ? (
                  filteredUsers.map((user, index) => (
                    <UserRow
                      key={user.id}
                      user={user}
                      index={((users.pagination?.current_page || 1) - 1) * 10 + index}
                    />
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <div className="text-5xl">🔍</div>
                        <p className="text-gray-500 font-medium">No users found</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <Pagination paginationData={users.pagination || null} />
        </div>

        {/* Footer Info */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Showing{" "}
            <span className="font-semibold text-gray-800">
              {filteredUsers?.length || 0}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-gray-800">
              {selectedType === "all" ? (users.pagination?.count || 0) : userTypes[selectedType]?.count || 0}
            </span>{" "}
            users
          </p>
        </div>
      </div>
    </div>
  );
}