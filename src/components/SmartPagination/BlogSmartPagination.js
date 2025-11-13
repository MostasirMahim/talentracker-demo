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
      
      // Smooth scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
      router.push(newUrl);
    }
  };

  const generatePageLinks = () => {
    const rangeWithDots = [];

    // Always show first page
    if (current_page > 2) {
      rangeWithDots.push(1);
      if (current_page > 3) {
        rangeWithDots.push("...");
      }
    }

    // Show pages around current page
    const delta = 1;
    for (
      let i = Math.max(1, current_page - delta);
      i <= Math.min(total_pages, current_page + delta);
      i++
    ) {
      rangeWithDots.push(i);
    }

    // Always show last page
    if (current_page < total_pages - 1) {
      if (current_page < total_pages - 2) {
        rangeWithDots.push("...");
      }
      rangeWithDots.push(total_pages);
    }

    return rangeWithDots;
  };

  return (
    <>
      <style jsx>{`
        .modern-pagination-wrapper {
          padding: 3rem 0;
        }
        
        .pagination-nav-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.625rem 1.5rem;
          background: transparent;
          border: 2px solid var(--mainColor, #0d6efd);
          border-radius: 12px;
          color: var(--mainColor, #0d6efd);
          font-weight: 600;
          font-size: 0.9rem;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }
        
        .pagination-nav-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: var(--mainColor, #0d6efd);
          transition: left 0.3s ease;
          z-index: 0;
        }
        
        .pagination-nav-btn:hover:not(:disabled)::before {
          left: 0;
        }
        
        .pagination-nav-btn:hover:not(:disabled) {
          color: white;
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(13, 110, 253, 0.25);
        }
        
        .pagination-nav-btn:hover:not(:disabled) svg {
          transform: translateX(4px);
        }
        
        .pagination-nav-btn.prev-btn:hover:not(:disabled) svg {
          transform: translateX(-4px);
        }
        
        .pagination-nav-btn:disabled {
          opacity: 0.4;
          cursor: not-allowed;
          border-color: #dee2e6;
          color: #adb5bd;
        }
        
        .pagination-nav-btn svg {
          transition: transform 0.3s ease;
          position: relative;
          z-index: 1;
        }
        
        .pagination-nav-btn span {
          position: relative;
          z-index: 1;
        }
        
        .modern-page-item {
          margin: 0 0.25rem;
        }
        
        .modern-page-link {
          min-width: 2.75rem;
          height: 2.75rem;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 10px !important;
          border: 2px solid #e9ecef !important;
          color: #495057;
          font-weight: 600;
          font-size: 0.9rem;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
          background: white;
        }
        
        .modern-page-link::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          border-radius: 50%;
          background: var(--mainColor, #0d6efd);
          transition: all 0.4s ease;
          transform: translate(-50%, -50%);
          opacity: 0.1;
        }
        
        .modern-page-link:hover:not(.active) {
          border-color: var(--mainColor, #0d6efd) !important;
          color: var(--mainColor, #0d6efd);
          transform: translateY(-3px);
          box-shadow: 0 6px 16px rgba(13, 110, 253, 0.2);
        }
        
        .modern-page-link:hover:not(.active)::before {
          width: 120%;
          height: 120%;
        }
        
        .modern-page-link.active {
          background: linear-gradient(135deg, var(--mainColor, #0d6efd) 0%, #0b5ed7 100%) !important;
          border-color: var(--mainColor, #0d6efd) !important;
          color: white !important;
          transform: translateY(-3px);
          box-shadow: 0 10px 25px rgba(13, 110, 253, 0.35);
          animation: pageActive 0.4s ease;
        }
        
        @keyframes pageActive {
          0% {
            transform: scale(0.9) translateY(0);
            opacity: 0.7;
          }
          50% {
            transform: scale(1.08) translateY(-3px);
          }
          100% {
            transform: scale(1) translateY(-3px);
          }
        }
        
        .pagination-ellipsis {
          min-width: 2.5rem;
          height: 2.75rem;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #adb5bd;
          font-weight: 600;
          font-size: 1.1rem;
          letter-spacing: 3px;
          margin: 0 0.25rem;
        }
        
        .pagination-info-box {
          padding: 0.75rem 1.5rem;
          background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
          border-radius: 10px;
          border: 2px solid #dee2e6;
          font-size: 0.9rem;
          color: #495057;
          font-weight: 500;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        }
        
        .info-highlight {
          color: var(--mainColor, #0d6efd);
          font-weight: 700;
          font-size: 1.05rem;
        }
        
        @media (max-width: 768px) {
          .pagination-nav-btn {
            padding: 0.5rem 1rem;
            font-size: 0.85rem;
          }
          
          .btn-text-mobile {
            display: none;
          }
          
          .modern-page-link {
            min-width: 2.5rem;
            height: 2.5rem;
            font-size: 0.85rem;
          }
          
          .pagination-info-box {
            padding: 0.625rem 1.25rem;
            font-size: 0.85rem;
          }
        }
        
        @media (max-width: 576px) {
          .modern-page-link {
            min-width: 2.25rem;
            height: 2.25rem;
            font-size: 0.8rem;
          }
          
          .pagination-nav-btn {
            padding: 0.5rem;
          }
          
          .pagination-nav-btn svg {
            width: 18px;
            height: 18px;
          }
        }
      `}</style>

      <div className={`modern-pagination-wrapper ${className}`}>
        <nav aria-label="Blog pagination">
          <ul className="pagination justify-content-center align-items-center mb-4">
            {/* Previous Button */}
            <li className="page-item me-2">
              <button
                className="pagination-nav-btn prev-btn"
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
                >
                  <path 
                    d="M12.5 15L7.5 10L12.5 5" 
                    stroke="currentColor" 
                    strokeWidth="2.5" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="btn-text-mobile">Previous</span>
              </button>
            </li>

            {/* Page Numbers */}
            {generatePageLinks().map((page, i) =>
              page === "..." ? (
                <li key={`ellipsis-${i}`} className="pagination-ellipsis">
                  ···
                </li>
              ) : (
                <li key={page} className="modern-page-item">
                  <button
                    className={`modern-page-link ${page === current_page ? "active" : ""}`}
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
            <li className="page-item ms-2">
              <button
                className="pagination-nav-btn next-btn"
                onClick={() => next && goToPage(current_page + 1)}
                disabled={!next}
                aria-label="Next page"
              >
                <span className="btn-text-mobile">Next</span>
                <svg 
                  width="20" 
                  height="20" 
                  viewBox="0 0 20 20" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
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
          <div className="d-flex justify-content-center">
            <div className="pagination-info-box">
              Page <span className="info-highlight">{current_page}</span> of{" "}
              <span className="info-highlight">{total_pages}</span>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}