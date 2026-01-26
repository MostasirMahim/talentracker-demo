import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      {/* Header Skeleton */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4 mb-6 animate-pulse">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="h-8 bg-gray-200 rounded w-48 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-64 hidden md:block"></div>
          </div>
          <div className="h-10 w-32 bg-gray-200 rounded-lg"></div>
        </div>
      </div>

      {/* Table Skeleton */}
      <div className="bg-white shadow-md rounded-lg p-4">
        <div className="flex justify-between mb-4 items-center">
          <div className="h-6 bg-gray-200 rounded w-40 animate-pulse"></div>
          <div className="h-10 w-24 bg-gray-200 rounded animate-pulse"></div>
        </div>

        {/* Loading Spinner */}
        <div className="flex flex-col items-center justify-center py-16">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin mb-4" />
          <p className="text-gray-600 font-medium text-lg">Loading jobs...</p>
          <p className="text-gray-400 text-sm mt-1">Please wait while we fetch the data</p>
        </div>
      </div>
    </div>
  );
}
