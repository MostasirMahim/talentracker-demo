"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function SmartPagination({ paginationData, className = "" }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  if (!paginationData || paginationData.total_pages <= 1) return null;

  const { current_page, total_pages, next, previous } = paginationData;

  const goToPage = (page) => {
    if (page !== current_page && page >= 1 && page <= total_pages) {
      // Clone current search params
      const params = new URLSearchParams(searchParams.toString());

      // Update or add the 'page' parameter
      params.set("page", page);

      // Build new URL with all query params
      const newUrl = `?${params.toString()}`;

      router.push(newUrl);
      router.refresh();
    }
  };

  const generatePageLinks = () => {
    const delta = 1;
    const range = [];
    const rangeWithDots = [];

    for (
      let i = Math.max(2, current_page - delta);
      i <= Math.min(total_pages - 1, current_page + delta);
      i++
    ) {
      range.push(i);
    }

    if (current_page - delta > 2) {
      rangeWithDots.push(1);
      rangeWithDots.push("...");
    } else if (current_page - delta === 2) {
      rangeWithDots.push(1);
    }

    range.forEach((i) => rangeWithDots.push(i));

    if (current_page + delta < total_pages - 1) {
      rangeWithDots.push("...");
      rangeWithDots.push(total_pages);
    } else if (current_page + delta === total_pages - 1) {
      rangeWithDots.push(total_pages);
    }

    return rangeWithDots;
  };

  return (
    <nav
      aria-label="Job pagination"
      className={`d-flex justify-content-center my-4 ${className}`}
    >
      <ul className="pagination m-0">
        {previous && (
          <li className="page-item">
            <button
              className="page-link text-main border-0 fw-bold"
              style={{ color: "var(--mainColor)" }}
              onClick={() => goToPage(current_page - 1)}
            >
              « Prev
            </button>
          </li>
        )}

        {generatePageLinks().map((page, i) =>
          page === "..." ? (
            <li key={i} className="page-item disabled">
              <span className="page-link bg-transparent border-0 text-secondary fw-bold">
                ...
              </span>
            </li>
          ) : (
            <li
              key={i}
              className={`page-item ${page === current_page ? "active" : ""}`}
            >
              <button
                className="page-link fw-bold border-0"
                style={{
                  backgroundColor:
                    page === current_page ? "var(--mainColor)" : "transparent",
                  color:
                    page === current_page
                      ? "var(--whiteColor)"
                      : "var(--mainColor2)",
                }}
                onClick={() => goToPage(page)}
              >
                {page}
              </button>
            </li>
          )
        )}

        {next && (
          <li className="page-item">
            <button
              className="page-link text-main border-0 fw-bold"
              style={{ color: "var(--mainColor)" }}
              onClick={() => goToPage(current_page + 1)}
            >
              Next »
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}
