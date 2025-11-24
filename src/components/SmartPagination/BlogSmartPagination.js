"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function BlogSmartPagination({ paginationData, className = "" }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  if (!paginationData || paginationData.total_pages <= 1) return null;

  const { current_page, total_pages, next, previous } = paginationData;

  const goToPage = (page) => {
    if (page !== current_page && page >= 1 && page <= total_pages) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", page);
      const newUrl = `?${params.toString()}`;
      
      window.scrollTo({ top: 0, behavior: 'smooth' });
      router.push(newUrl);
    }
  };

  const generatePageLinks = () => {
    const rangeWithDots = [];
    if (current_page > 2) {
      rangeWithDots.push(1);
      if (current_page > 3) rangeWithDots.push("...");
    }
    const delta = 1;
    for (let i = Math.max(1, current_page - delta); i <= Math.min(total_pages, current_page + delta); i++) {
      rangeWithDots.push(i);
    }
    if (current_page < total_pages - 1) {
      if (current_page < total_pages - 2) rangeWithDots.push("...");
      rangeWithDots.push(total_pages);
    }
    return rangeWithDots;
  };

  return (
    <div className={`py-12 ${className}`}>
      <nav aria-label="Blog pagination">
        <ul className="flex flex-wrap justify-center items-center gap-2 mb-4">
          {/* Previous Button */}
          <li>
            <button
              className="inline-flex items-center gap-2 px-6 py-2 border-2 border-blue-600 rounded-xl font-semibold text-blue-600 transition-transform duration-300 hover:bg-blue-600 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed"
              onClick={() => previous && goToPage(current_page - 1)}
              disabled={!previous}
              aria-label="Previous page"
            >
              <svg 
                width="20" 
                height="20" 
                viewBox="0 0 20 20" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className="transition-transform duration-300"
              >
                <path 
                  d="M12.5 15L7.5 10L12.5 5" 
                  stroke="currentColor" 
                  strokeWidth="2.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
              <span className="hidden sm:inline">Previous</span>
            </button>
          </li>

          {/* Page Numbers */}
          {generatePageLinks().map((page, i) =>
            page === "..." ? (
              <li key={`ellipsis-${i}`} className="w-10 h-10 flex items-center justify-center text-gray-400 font-semibold text-lg">
                ···
              </li>
            ) : (
              <li key={page}>
                <button
                  className={`w-11 h-11 flex items-center justify-center rounded-lg border-2 border-gray-200 font-semibold text-gray-700 transition-transform duration-300 hover:border-blue-600 hover:text-blue-600 ${page === current_page ? "bg-gradient-to-tr from-blue-500 to-blue-700 text-white shadow-lg scale-105" : ""}`}
                  onClick={() => goToPage(page)}
                  aria-label={`Go to page ${page}`}
                  aria-current={page === current_page ? "page" : undefined}
                >
                  {page}
                </button>
              </li>
            )
          )}

          {/* Next Button */}
          <li>
            <button
              className="inline-flex items-center gap-2 px-6 py-2 border-2 border-blue-600 rounded-xl font-semibold text-blue-600 transition-transform duration-300 hover:bg-blue-600 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed"
              onClick={() => next && goToPage(current_page + 1)}
              disabled={!next}
              aria-label="Next page"
            >
              <span className="hidden sm:inline">Next</span>
              <svg 
                width="20" 
                height="20" 
                viewBox="0 0 20 20" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className="transition-transform duration-300"
              >
                <path 
                  d="M7.5 15L12.5 10L7.5 5" 
                  stroke="currentColor" 
                  strokeWidth="2.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </li>
        </ul>

        {/* Page Info */}
        <div className="flex justify-center">
          <div className="px-6 py-3 bg-gray-100 rounded-lg border-2 border-gray-200 text-gray-700 font-medium shadow-sm">
            Page <span className="text-blue-600 font-bold">{current_page}</span> of <span className="text-blue-600 font-bold">{total_pages}</span>
          </div>
        </div>
      </nav>
    </div>
  );
}
