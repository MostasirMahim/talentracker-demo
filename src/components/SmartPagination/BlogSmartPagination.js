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

      window.scrollTo({ top: 0, behavior: "smooth" });
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
    <div className={`py-4 ${className}`}>
      <nav aria-label="Page navigation">
        <ul className="pagination justify-content-center flex-wrap gap-1">
          {/* Previous Button */}
          <li className={`page-item ${!previous ? "disabled" : ""}`}>
            <button
              className="page-link bg-light border-0 text-primary fw-bold px-3 py-2 shadow-sm"
              onClick={() => previous && goToPage(current_page - 1)}
              aria-label="Previous"
            >
              &laquo; Previous
            </button>
          </li>

          {/* Page Numbers */}
          {generatePageLinks().map((page, idx) =>
            page === "..." ? (
              <li key={`ellipsis-${idx}`} className="page-item disabled">
                <span className="page-link bg-transparent border-0 text-secondary">…</span>
              </li>
            ) : (
              <li
                key={page}
                className={`page-item ${page === current_page ? "active" : ""}`}
              >
                <button
                  className={`page-link px-3 py-2 ${page === current_page ? "bg-primary text-white border-primary shadow-sm" : "bg-white text-primary border-primary"}`}
                  onClick={() => goToPage(page)}
                >
                  {page}
                </button>
              </li>
            )
          )}

          {/* Next Button */}
          <li className={`page-item ${!next ? "disabled" : ""}`}>
            <button
              className="page-link bg-light border-0 text-primary fw-bold px-3 py-2 shadow-sm"
              onClick={() => next && goToPage(current_page + 1)}
              aria-label="Next"
            >
              Next &raquo;
            </button>
          </li>
        </ul>

        {/* Page Info */}
        <div className="text-center mt-3">
          <span className="badge bg-primary fs-6 px-3 py-2 shadow-sm">
            Page <strong>{current_page}</strong> of <strong>{total_pages}</strong>
          </span>
        </div>
      </nav>
    </div>
  );
}
