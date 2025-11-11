"use client";
import { useRouter, useSearchParams } from "next/navigation";

export default function AdminBlogSmartPagination({ paginationData, className = "" }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  if (!paginationData || paginationData.total_pages <= 1) return null;

  const { current_page, total_pages, next, previous } = paginationData;

  const goToPage = (page) => {
    if (page !== current_page && page >= 1 && page <= total_pages) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", page);
      const newUrl = `?${params.toString()}`;

      // Smooth scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
      router.push(newUrl);
    }
  };

  // Generate simple page links without ellipsis
  const generatePageLinks = () => {
    const pages = [];
    for (let i = 1; i <= total_pages; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <>
      <style jsx>{`
        .pagination-container {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 8px;
          margin-top: 20px;
        }

        .pagination-button {
          padding: 8px 16px;
          border: 1px solid #ddd;
          background: #fff;
          color: #333;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .pagination-button:hover:not(:disabled) {
          background: #f0f0f0;
        }

        .pagination-button.active {
          background: #007bff;
          color: #fff;
          border-color: #007bff;
        }

        .pagination-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      `}</style>

      <div className={`pagination-container ${className}`}>
        {/* Previous Button */}
        <button
          className="pagination-button"
          onClick={() => previous && goToPage(current_page - 1)}
          disabled={!previous}
        >
          Previous
        </button>

        {/* Page Numbers */}
        {generatePageLinks().map((page) => (
          <button
            key={page}
            className={`pagination-button ${page === current_page ? 'active' : ''}`}
            onClick={() => goToPage(page)}
          >
            {page}
          </button>
        ))}

        {/* Next Button */}
        <button
          className="pagination-button"
          onClick={() => next && goToPage(current_page + 1)}
          disabled={!next}
        >
          Next
        </button>
      </div>
    </>
  );
}
