"use client";
import React, { useState, useEffect } from "react";
import SmartPagination from "../SmartPagination/SmartPagination";
import "bootstrap/dist/css/bootstrap.min.css";
import Image from "next/image";

export default function AllPublishedTestimonial({ testimonials }) {
  const [testimonialData, setTestimonialData] = useState([]);
  const [paginationInfo, setPaginationInfo] = useState({});
  const [isClient, setIsClient] = useState(false);
  const [expandedMessages, setExpandedMessages] = useState({});

  useEffect(() => {
    setIsClient(true);

    if (testimonials) {
      setTestimonialData(testimonials.data || []);
      setPaginationInfo(testimonials.pagination || {});
    }
  }, [testimonials]);

  const toggleMessage = (id) => {
    setExpandedMessages(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Don't render anything on server, wait for client
  if (!isClient) {
    return (
      <section className="testimonial-section py-5">
        <div className="container">
          <div className="row g-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="col-lg-4 col-md-6">
                <div className="card h-100 border-0 shadow-sm p-4">
                  <div className="placeholder-glow">
                    <div
                      className="placeholder col-12 mb-4"
                      style={{ height: "40px" }}
                    ></div>
                    <div
                      className="placeholder col-12 mb-2"
                      style={{ height: "20px" }}
                    ></div>
                    <div
                      className="placeholder col-12 mb-2"
                      style={{ height: "20px" }}
                    ></div>
                    <div
                      className="placeholder col-8 mb-4"
                      style={{ height: "20px" }}
                    ></div>
                    <div className="d-flex align-items-center">
                      <div
                        className="placeholder rounded-circle me-3"
                        style={{ width: "60px", height: "60px" }}
                      ></div>
                      <div>
                        <div
                          className="placeholder col-8 mb-2"
                          style={{ height: "20px" }}
                        ></div>
                        <div
                          className="placeholder col-6"
                          style={{ height: "16px" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .testimonial-card {
          opacity: 1;
          position: relative;
          overflow: hidden;
          background: white;
          border-radius: 16px !important;
          transition: all 0.3s ease;
          height: 100%;
          display: flex;
          flex-direction: column;
          /* Subtle border for non-hover state */
          border: 1px solid rgba(13, 110, 253, 0.1) !important;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03) !important;
        }

        /* Alternative subtle outline using box-shadow */
        .testimonial-card {
          box-shadow: 0 4px 12px rgba(13, 110, 253, 0.05) !important;
        }

        /* Subtle gradient border */
        .testimonial-card::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border-radius: 16px;
          padding: 1px;
          background: linear-gradient(135deg, rgba(13, 110, 253, 0.2), rgba(13, 110, 253, 0.05));
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
        }

        /* Hover state - your existing hover styles */
        .testimonial-card:hover {
          transform: translateY(-8px) !important;
          box-shadow: 0 20px 30px -10px rgba(13, 110, 253, 0.2) !important;
          border-color: transparent !important;
        }

        .testimonial-card:hover .testimonial-accent {
          width: 100% !important;
        }

        .testimonial-card:hover::after {
          opacity: 0;
        }

        .testimonial-card img {
          transition: transform 0.3s ease, border-color 0.3s ease;
        }

        .testimonial-card:hover img {
          transform: scale(1.05);
          border-color: #0d6efd !important;
        }

        .testimonial-message {
          position: relative;
          font-size: 0.95rem;
          line-height: 1.8;
          color: #4a5568;
          margin-bottom: 1.5rem;
          flex-grow: 1;
          white-space: pre-line;
          word-wrap: break-word;
        }

        .testimonial-message.expanded {
          max-height: none;
        }

        /* Border glow effect for non-hover */
        .testimonial-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border-radius: 16px;
          padding: 2px;
          background: linear-gradient(45deg, #0d6efd, transparent);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          opacity: 0.3; /* Slightly visible in non-hover state */
          transition: opacity 0.3s ease;
        }

        .testimonial-card:hover::before {
          opacity: 1;
        }

        .testimonial-card .card-body {
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        @media (max-width: 768px) {
          .testimonial-card {
            margin-bottom: 1rem;
          }
        }

        .testimonial-card svg {
          transition: transform 0.3s ease;
        }

        .testimonial-card:hover svg {
          transform: scale(1.1);
        }

        .testimonial-card h6 {
          transition: color 0.3s ease;
        }

        .testimonial-card:hover h6 {
          color: #0a58ca !important;
        }

        .testimonial-accent {
          position: relative;
          z-index: 2;
          border-radius: 0 0 16px 16px;
          margin-top: auto;
        }

        .testimonial-section svg {
          transition: transform 0.3s ease;
        }

        .testimonial-section svg:hover {
          transform: scale(1.05);
        }

        /* Client-side only animations */
        .animate-on-client {
          animation: fadeInUp 0.6s ease forwards;
        }

        /* Message toggle button */
        .message-toggle {
          color: #0d6efd;
          cursor: pointer;
          font-size: 0.9rem;
          font-weight: 500;
          display: inline-block;
          margin-top: 0.5rem;
          transition: color 0.3s ease;
        }

        .message-toggle:hover {
          color: #0a58ca;
          text-decoration: underline;
        }

        /* Card content spacing */
        .author-info {
          margin-top: auto;
          padding-top: 1rem;
          border-top: 1px solid rgba(0,0,0,0.05);
        }

        /* Optional: Different border styles you can try */
        .border-style-1 {
          border: 1px solid rgba(13, 110, 253, 0.2) !important;
        }
        
        .border-style-2 {
          box-shadow: 0 0 0 1px rgba(13, 110, 253, 0.1) !important;
        }
        
        .border-style-3 {
          outline: 1px solid rgba(13, 110, 253, 0.1);
          outline-offset: -1px;
        }
      `}</style>

      <section className="testimonial-section py-5">
        <div className="container">
          {/* Testimonial Grid */}
          <div className="row g-4">
            {testimonialData?.map((testimonial, index) => (
              <div key={testimonial.id || index} className="col-lg-4 col-md-6">
                <div
                  className="testimonial-card card shadow-sm animate-on-client"
                  style={{
                    animationDelay: `${index * 0.1}s`,
                  }}
                >
                  <div className="card-body p-4">
                    {/* Quote Icon */}
                    <div className="mb-4">
                      <svg
                        width="40"
                        height="40"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M10 11H6V7H10V11ZM18 11H14V7H18V11Z"
                          fill="#0d6efd"
                          opacity="0.2"
                        />
                        <path
                          d="M10 11H6V7H10V11ZM18 11H14V7H18V11Z"
                          fill="#0d6efd"
                          fillOpacity="0.1"
                        />
                      </svg>
                    </div>

                    {/* Message - Full text always visible */}
                    <div
                      className="testimonial-message"
                    >
                      "{testimonial.message}"
                    </div>

                    {/* Author Info */}
                    <div className="d-flex align-items-center author-info">
                      <div className="flex-shrink-0">
                        {testimonial.image ? (
                          <Image
                            src={`${process.env.NEXT_PUBLIC_BACKEND_API_URL}${testimonial.image}`}
                            alt={testimonial.full_name}
                            className="rounded-circle object-fit-cover border border-2"
                            style={{
                              width: "70px",
                              height: "70px",
                              borderColor: "#0d6efd",
                            }}
                            width={70}
                            height={70}
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src =
                                "https://via.placeholder.com/70x70?text=User";
                            }}
                          />
                        ) : (
                          <div
                            className="rounded-circle d-flex align-items-center justify-content-center"
                            style={{
                              width: "70px",
                              height: "70px",
                              backgroundColor: "#e7f1ff",
                              color: "#0d6efd",
                            }}
                          >
                            <span className="fw-bold fs-4">
                              {testimonial.full_name?.charAt(0).toUpperCase() ||
                                "U"}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="flex-grow-1 ms-3">
                        <h6
                          className="fw-bold mb-1"
                          style={{ color: "#0d6efd", fontSize: "1.1rem" }}
                        >
                          {testimonial.full_name || "Anonymous"}
                        </h6>
                        <p className="mb-0 small text-muted">
                          {testimonial.designation || "Software Developer"}
                          {testimonial.company_name && (
                            <>
                              {" "}
                              at{" "}
                              <span className="fw-medium">
                                {testimonial.company_name}
                              </span>
                            </>
                          )}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Accent */}
                  <div
                    className="testimonial-accent"
                    style={{
                      height: "4px",
                      background:
                        "linear-gradient(90deg, #0d6efd 0%, #0a58ca 100%)",
                      width: "0%",
                      transition: "width 0.3s ease",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {(!testimonialData || testimonialData.length === 0) && (
            <div className="text-center py-5">
              <div className="mb-3">
                <svg
                  width="80"
                  height="80"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                    stroke="#0d6efd"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 16V12"
                    stroke="#0d6efd"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 8H12.01"
                    stroke="#0d6efd"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h4 className="fw-bold mb-2" style={{ color: "#0d6efd" }}>
                No Testimonials Yet
              </h4>
              <p className="text-muted">
                Check back soon for success stories from our graduates.
              </p>
            </div>
          )}

          {/* Pagination */}
          {paginationInfo && paginationInfo.total_pages > 1 && (
            <div className="mt-5">
              <SmartPagination paginationData={paginationInfo} />
            </div>
          )}
        </div>
      </section>
    </>
  );
}