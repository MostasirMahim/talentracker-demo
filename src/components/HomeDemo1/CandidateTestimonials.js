"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// Client Component - Auto-sliding testimonial carousel
const CandidateTestimonialCarousel = ({ testimonials }) => {
  const primaryColor = "rgb(20, 138, 188)";

  // Filter only published testimonials
  const publishedTestimonials =
    testimonials?.data?.filter((t) => t.is_published) || [];

  if (!publishedTestimonials.length) {
    return null;
  }

  // Duplicate testimonials for seamless infinite scroll
  const duplicatedTestimonials = [
    ...publishedTestimonials,
    ...publishedTestimonials,
  ];

  // Helper function to get initials
  const getInitials = (name) => {
    return (
      name
        ?.split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase() || "?"
    );
  };

  // Helper function to format message with proper styling
  const formatMessage = (message) => {
    if (!message) return "";
    if (message.length > 150) {
      return message.substring(0, 150) + "...";
    }
    return message;
  };

  // Rating Stars Component
  const RatingStars = ({ rating }) => {
    // Ensure rating is between 0-5
    const validRating = Math.min(5, Math.max(0, rating || 0));

    return (
      <div className="tc-rating mb-3 d-flex align-items-center">
        <span
          className="me-2 small fw-semibold tc-rating-value"
          style={{ color: primaryColor }}
        >
          {validRating}.0
        </span>
        <div className="d-flex tc-stars-wrapper">
          {[...Array(5)].map((_, i) => {
            // For filled stars
            if (i < Math.floor(validRating)) {
              return (
                <svg
                  key={i}
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill={primaryColor}
                  stroke={primaryColor}
                  strokeWidth="1.5"
                  className="me-1 tc-star-filled"
                >
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2z" />
                </svg>
              );
            }
            // For half star (if rating has decimal and this is the position)
            else if (i === Math.floor(validRating) && validRating % 1 !== 0) {
              return (
                <div
                  key={i}
                  className="position-relative me-1 tc-half-star"
                  style={{ width: "16px", height: "16px" }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={primaryColor}
                    strokeWidth="1.5"
                    style={{ position: "absolute", top: 0, left: 0 }}
                    className="tc-star-outline"
                  >
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2z" />
                  </svg>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill={primaryColor}
                    stroke={primaryColor}
                    strokeWidth="1.5"
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      clipPath: "inset(0 50% 0 0)",
                    }}
                    className="tc-star-half"
                  >
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2z" />
                  </svg>
                </div>
              );
            }
            // For empty stars
            else {
              return (
                <svg
                  key={i}
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={primaryColor}
                  strokeWidth="1.5"
                  className="me-1 tc-star-empty"
                >
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2z" />
                </svg>
              );
            }
          })}
        </div>
      </div>
    );
  };

  // Image fallback component
  const AvatarImage = ({ testimonial }) => {
    const [imageError, setImageError] = useState(false);

    if (!testimonial.image || imageError) {
      return (
        <div
          className="tc-avatar-fallback d-flex align-items-center justify-content-center fw-bold"
          style={{
            width: "100%",
            height: "100%",
            background: "rgba(20, 138, 188, 0.1)",
            color: primaryColor,
            fontSize: "1.2rem",
          }}
        >
          {getInitials(testimonial.full_name)}
        </div>
      );
    }

    return (
      <Image
        src={`${process.env.NEXT_PUBLIC_BACKEND_API_URL}${testimonial.image}`}
        alt={testimonial.full_name}
        width={100}
        height={100}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
        className="tc-avatar-image"
        onError={() => setImageError(true)}
      />
    );
  };

  return (
    <section className="py-5 py-lg-6 overflow-hidden tc-section">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-5 tc-header">
          <span
            className="badge px-4 py-2 rounded-pill fw-semibold mb-3 d-inline-flex align-items-center tc-badge"
            style={{
              backgroundColor: "rgba(20, 138, 188, 0.1)",
              color: primaryColor,
              border: "none",
            }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="me-2 tc-badge-icon"
            >
              <path d="M4 4v16h16V4H4zm2 4h12v2H6V8zm0 4h12v2H6v-2zm0 4h8v2H6v-2z" />
            </svg>
            SUCCESS STORIES
          </span>

          <h2 className="display-6 fw-bold mb-3 tc-title">
            What Our{" "}
            <span style={{ color: primaryColor }} className="tc-highlight">
              Candidates Say
            </span>
          </h2>

          <p
            className="text-secondary fs-5 mx-auto tc-description"
            style={{ maxWidth: "600px", color: "#6c757d" }}
          >
            Real experiences from candidates who transformed their careers
            through our platform
          </p>
        </div>

        {/* Auto-sliding Carousel */}
        <div className="tc-carousel-container">
          <div className="tc-track">
            {duplicatedTestimonials.map((testimonial, index) => (
              <div
                key={`${testimonial.id}-${index}`}
                className="tc-card-wrapper"
              >
                <div className="card tc-card h-100 border-0">
                  {/* Card Top Gradient Bar */}
                  <div
                    className="tc-card-top-bar"
                    style={{
                      background: `linear-gradient(90deg, ${primaryColor}, ${primaryColor}80)`,
                    }}
                  />

                  <div className="card-body p-4 tc-card-body">
                    {/* Quote Icon */}
                    <div className="tc-quote-icon mb-3">
                      <svg
                        width="40"
                        height="40"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke={primaryColor}
                        strokeWidth="1.5"
                      >
                        <path
                          d="M10 11h-4v-4h4v4zm8 0h-4v-4h4v4z"
                          fill={primaryColor}
                          fillOpacity="0.2"
                          className="tc-quote-fill"
                        />
                        <path
                          d="M10 11h-4v-4h4v4zm8 0h-4v-4h4v4z"
                          stroke={primaryColor}
                          className="tc-quote-stroke"
                        />
                        <path
                          d="M10 11v6l-4-2v-4h4zm8 0v6l-4-2v-4h4z"
                          fill={primaryColor}
                          fillOpacity="0.1"
                          className="tc-quote-bg"
                        />
                      </svg>
                    </div>

                    {/* Testimonial Message */}
                    <div className="tc-message mb-4">
                      <p
                        className="card-text tc-message-text"
                        style={{
                          fontSize: "0.95rem",
                          lineHeight: "1.6",
                          color: "#2c3e50",
                          fontStyle: "italic",
                          minHeight: "100px",
                        }}
                      >
                        "{formatMessage(testimonial.message)}"
                      </p>
                    </div>

                    {/* Rating Stars */}
                    <RatingStars rating={testimonial.rating} />

                    {/* Author Info */}
                    <div className="d-flex align-items-center mt-auto tc-author-info">
                      {/* Avatar with gradient border */}
                      <div
                        className="tc-avatar-wrapper me-3"
                        style={{
                          position: "relative",
                          width: "56px",
                          height: "56px",
                          borderRadius: "50%",
                          padding: "2px",
                          background: `linear-gradient(135deg, ${primaryColor}, ${primaryColor}80)`,
                        }}
                      >
                        <div
                          className="tc-avatar-inner rounded-circle bg-white overflow-hidden"
                          style={{
                            width: "100%",
                            height: "100%",
                            border: "2px solid white",
                          }}
                        >
                          <AvatarImage testimonial={testimonial} />
                        </div>
                      </div>

                      {/* Name and Company */}
                      <div className="tc-author-details">
                        <h6
                          className="fw-bold mb-1 tc-author-name"
                          style={{ color: "#1a2634" }}
                        >
                          {testimonial.full_name}
                        </h6>
                        <p
                          className="mb-0 small tc-author-designation"
                          style={{ color: primaryColor }}
                        >
                          {testimonial.designation}
                        </p>
                        <p className="mb-0 small text-muted tc-author-company">
                          {testimonial.company_name}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Card Footer Decoration */}
                  <div
                    className="tc-card-footer"
                    style={{
                      height: "4px",
                      background: `linear-gradient(90deg, ${primaryColor}20, transparent)`,
                      borderRadius: "0 0 12px 12px",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Gradient Overlays for Smooth Edges */}
        <div className="tc-gradient-left" />
        <div className="tc-gradient-right" />

        {/* See More Button */}
        <div className="about-btn text-center">
          <Link href="/candidate_testimonial" className="default-btn">
            Read More <i className="ri-arrow-right-line"></i>
          </Link>
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        /* Testimonial Carousel Specific Styles - All prefixed with tc- */
        .tc-section {
          position: relative;
          background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
        }

        /* Carousel Container */
        .tc-carousel-container {
          position: relative;
          width: 100%;
          overflow: hidden;
          padding: 20px 0;
        }

        /* Testimonial Track */
        .tc-track {
          display: flex;
          gap: 24px;
          animation: tcScroll 40s linear infinite;
          width: fit-content;
        }

        .tc-track:hover {
          animation-play-state: paused;
        }

        /* Testimonial Card Wrapper */
        .tc-card-wrapper {
          flex: 0 0 350px;
          transition: transform 0.3s ease;
        }

        .tc-card-wrapper:hover {
          transform: translateY(-10px);
        }

        /* Testimonial Card */
        .tc-card {
          background: white;
          border-radius: 16px !important;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
          transition: box-shadow 0.3s ease;
          position: relative;
          overflow: hidden;
          border: 1px solid rgba(20, 138, 188, 0.1) !important;
        }

        .tc-card:hover {
          box-shadow: 0 20px 40px rgba(20, 138, 188, 0.15);
        }

        /* Card Top Bar */
        .tc-card-top-bar {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          z-index: 1;
        }

        /* Quote Icon Animation */
        .tc-quote-icon svg {
          opacity: 0.5;
          transition: opacity 0.3s ease, transform 0.3s ease;
        }

        .tc-card:hover .tc-quote-icon svg {
          opacity: 1;
          transform: scale(1.1);
        }

        /* Avatar Wrapper */
        .tc-avatar-wrapper {
          transition: transform 0.3s ease;
        }

        .tc-card:hover .tc-avatar-wrapper {
          transform: scale(1.05);
        }

        /* Gradient Overlays */
        .tc-gradient-left {
          position: absolute;
          top: 0;
          left: 0;
          width: 100px;
          height: 100%;
          background: linear-gradient(90deg, #f8f9fa 0%, transparent 100%);
          pointer-events: none;
          z-index: 2;
        }

        .tc-gradient-right {
          position: absolute;
          top: 0;
          right: 0;
          width: 100px;
          height: 100%;
          background: linear-gradient(90deg, transparent 0%, #f8f9fa 100%);
          pointer-events: none;
          z-index: 2;
        }

        /* See More Button */
        .tc-see-more-btn {
          transition: all 0.3s ease !important;
        }

        .tc-see-more-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(20, 138, 188, 0.3);
        }

        .tc-see-more-btn i {
          transition: transform 0.3s ease;
        }

        .tc-see-more-btn:hover i {
          transform: translateX(5px);
        }

        /* Animations */
        @keyframes tcScroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-350px * ${publishedTestimonials.length} - 24px * ${publishedTestimonials.length}));
          }
        }

        /* Responsive Adjustments */
        @media (max-width: 768px) {
          .tc-card-wrapper {
            flex: 0 0 300px;
          }
          
          @keyframes tcScroll {
            100% {
              transform: translateX(calc(-300px * ${publishedTestimonials.length} - 24px * ${publishedTestimonials.length}));
            }
          }
          
          .tc-gradient-left,
          .tc-gradient-right {
            width: 50px;
          }
        }

        /* Loading Animation for Avatar */
        .tc-avatar-fallback {
          animation: tcPulse 2s infinite;
        }

        @keyframes tcPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }

        /* Custom Scrollbar (hidden but functional) */
        .tc-carousel-container {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        .tc-carousel-container::-webkit-scrollbar {
          display: none;
        }

        /* Rating Stars */
        .tc-star-filled,
        .tc-star-half,
        .tc-star-empty {
          transition: transform 0.2s ease;
        }

        .tc-card:hover .tc-star-filled,
        .tc-card:hover .tc-star-half,
        .tc-card:hover .tc-star-empty {
          transform: scale(1.1);
        }

        /* Message Text */
        .tc-message-text {
          transition: color 0.3s ease;
        }

        .tc-card:hover .tc-message-text {
          color: #1a2634 !important;
        }
      `,
        }}
      />
    </section>
  );
};

export default CandidateTestimonialCarousel;
