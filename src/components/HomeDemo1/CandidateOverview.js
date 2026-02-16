import React from "react";
import Link from "next/link";

// Server Component - No client-side code
const CandidateTestimonialCTA = () => {
  // Your primary color with variations
  const primaryColor = "rgb(20, 138, 188)";
  const primaryColorWithOpacity = "rgba(20, 138, 188, 0.146)";
  const primaryColorLight = "rgba(20, 138, 188, 0.1)";
  const primaryColorMedium = "rgba(20, 138, 188, 0.3)";
  const primaryColorDark = "rgb(15, 105, 143)";

  return (
    <section
      className="py-5 py-lg-6 overflow-hidden"
      style={{ position: "relative" }}
    >
      {/* Floating decorative elements - using primary color with low opacity */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          right: "5%",
          width: "200px",
          height: "200px",
          background: `radial-gradient(circle, ${primaryColorWithOpacity} 0%, rgba(20,138,188,0) 70%)`,
          borderRadius: "50%",
          zIndex: -1,
          animation: "floatEffect 20s infinite alternate",
        }}
      />

      <div
        style={{
          position: "absolute",
          bottom: "5%",
          left: "2%",
          width: "300px",
          height: "300px",
          background: `radial-gradient(circle, ${primaryColorLight} 0%, rgba(20,138,188,0) 70%)`,
          borderRadius: "50%",
          zIndex: -1,
          animation: "floatEffectReverse 15s infinite alternate",
        }}
      />

      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-5 header-animation">
          <span
            className="badge px-4 py-2 rounded-pill fw-semibold mb-3 d-inline-flex align-items-center"
            style={{
              backgroundColor: primaryColorLight,
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
              className="me-2"
              style={{ marginRight: "6px" }}
            >
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2z" />
            </svg>
            SHARE YOUR JOURNEY
          </span>

          <h2 className="display-6 fw-bold mb-3">
            Your Success Story{" "}
            <span style={{ color: primaryColor }}>Inspires Others</span>
          </h2>

          <p
            className="text-secondary fs-5 mx-auto"
            style={{ maxWidth: "600px", color: "#6c757d" }}
          >
            Did our platform help you land an opportunity or solve a challenge?
            Share your experience with the community.
          </p>
        </div>
       

        {/* Main CTA Card */}
        <div className="row justify-content-center">
          <div className="col-12 col-lg-10">
            <div
              className="card border-0 text-white overflow-hidden position-relative cta-card"
              style={{
                background: `linear-gradient(135deg, ${primaryColor} 0%, ${primaryColorDark} 100%)`,
                boxShadow: `0 20px 40px ${primaryColorMedium}`,
                borderRadius: "32px",
              }}
            >
              {/* Animated background circles */}
              <div
                className="bg-circle-1"
                style={{
                  position: "absolute",
                  top: "-10%",
                  right: "-5%",
                  width: "300px",
                  height: "300px",
                  background:
                    "radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)",
                  borderRadius: "50%",
                  animation: "floatBg 20s infinite",
                }}
              />

              <div
                className="bg-circle-2"
                style={{
                  position: "absolute",
                  bottom: "-20%",
                  left: "-10%",
                  width: "400px",
                  height: "400px",
                  background:
                    "radial-gradient(circle, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 70%)",
                  borderRadius: "50%",
                  animation: "floatBgReverse 15s infinite",
                }}
              />

              <div className="card-body p-4 p-lg-5 position-relative">
                <div className="row g-4 align-items-center">
                  {/* Left Side - Icon and Text */}
                  <div className="col-md-7 left-content">
                    <div className="d-flex align-items-center gap-4 mb-4">
                      {/* Professional Handshake Icon */}
                      <div
                        className="icon-wrapper"
                        style={{
                          background: "rgba(255, 255, 255, 0.15)",
                          backdropFilter: "blur(10px)",
                          borderRadius: "24px",
                          padding: "1rem",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          border: "1px solid rgba(255, 255, 255, 0.2)",
                          animation: "floatIcon 3s ease-in-out infinite",
                        }}
                      >
                        <svg
                          width="80"
                          height="80"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          {/* Main handshake icon */}
                          <path
                            d="M6 14L4 12L2 15L4 18L7 16L6 14Z"
                            fill="white"
                            fillOpacity="0.9"
                          />
                          <path
                            d="M18 14L20 12L22 15L20 18L17 16L18 14Z"
                            fill="white"
                            fillOpacity="0.9"
                          />
                          <path
                            d="M8 13L12 9L16 13"
                            stroke="white"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            fill="none"
                          />
                          <path
                            d="M7 15L12 11L17 15"
                            stroke="white"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            fill="none"
                          />
                          <circle
                            cx="12"
                            cy="10"
                            r="1.5"
                            fill="white"
                            fillOpacity="0.8"
                          />
                          <circle
                            cx="9"
                            cy="13"
                            r="1"
                            fill="white"
                            fillOpacity="0.6"
                          />
                          <circle
                            cx="15"
                            cy="13"
                            r="1"
                            fill="white"
                            fillOpacity="0.6"
                          />
                        </svg>
                      </div>

                      <div>
                        <h3
                          className="h2 fw-bold mb-2"
                          style={{ color: "white" }}
                        >
                          Got Help or an Opportunity?
                        </h3>
                        <p
                          className="mb-0 fs-5"
                          style={{ color: "rgba(255, 255, 255, 0.9)" }}
                        >
                          We'd love to hear about your experience! Share your
                          testimonial and help others on their journey.
                        </p>
                      </div>
                    </div>

                    {/* Benefits Pills */}
                    <div className="d-flex flex-wrap gap-2 mt-4">
                      <span
                        className="badge rounded-pill px-3 py-2 d-inline-flex align-items-center benefit-pill"
                        style={{
                          background: "rgba(255, 255, 255, 0.15)",
                          color: "white",
                          backdropFilter: "blur(5px)",
                          transition:
                            "transform 0.3s ease, background 0.3s ease",
                        }}
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          className="me-1"
                          style={{ marginRight: "4px" }}
                        >
                          <circle cx="12" cy="12" r="10" />
                          <polyline points="12 6 12 12 16 14" />
                        </svg>
                        2 min read
                      </span>

                      <span
                        className="badge rounded-pill px-3 py-2 d-inline-flex align-items-center benefit-pill"
                        style={{
                          background: "rgba(255, 255, 255, 0.15)",
                          color: "white",
                          backdropFilter: "blur(5px)",
                          transition:
                            "transform 0.3s ease, background 0.3s ease",
                        }}
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          className="me-1"
                          style={{ marginRight: "4px" }}
                        >
                          <rect
                            x="3"
                            y="11"
                            width="18"
                            height="11"
                            rx="2"
                            ry="2"
                          />
                          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                        </svg>
                        No login required
                      </span>

                      <span
                        className="badge rounded-pill px-3 py-2 d-inline-flex align-items-center benefit-pill"
                        style={{
                          background: "rgba(255, 255, 255, 0.15)",
                          color: "white",
                          backdropFilter: "blur(5px)",
                          transition:
                            "transform 0.3s ease, background 0.3s ease",
                        }}
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          className="me-1"
                          style={{ marginRight: "4px" }}
                        >
                          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                        </svg>
                        Inspire others
                      </span>
                    </div>
                  </div>

                  {/* Right Side - CTA Button */}
                  <div className="col-md-5 text-md-end right-content">
                    <Link
                      href="/candidate_testimonial"
                      className="btn btn-light btn-lg rounded-pill px-5 py-3 fw-semibold d-inline-flex align-items-center gap-2 cta-button"
                      style={{
                        background: "white",
                        color: primaryColor,
                        border: "none",
                        fontSize: "1.1rem",
                        transition: "transform 0.3s ease, box-shadow 0.3s ease",
                        boxShadow: `0 10px 20px ${primaryColorMedium}`,
                        position: "relative",
                        overflow: "hidden",
                      }}
                    >
                      <span>Share Your Story</span>
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M4.16666 10H15.8333M15.8333 10L11.6667 5.83333M15.8333 10L11.6667 14.1667"
                          stroke={primaryColor}
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </Link>

                    <p
                      className="mt-3 mb-0 small d-flex align-items-center justify-content-md-end justify-content-center gap-1"
                      style={{ color: "rgba(255, 255, 255, 0.75)" }}
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      </svg>
                      No account needed • Takes only 2 minutes
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Global styles for animations */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes floatEffect {
          0% { transform: translate(0, 0) scale(1); }
          100% { transform: translate(-20px, -20px) scale(1.1); }
        }
        
        @keyframes floatEffectReverse {
          0% { transform: translate(0, 0) scale(1); }
          100% { transform: translate(20px, 20px) scale(1.1); }
        }
        
        @keyframes floatBg {
          0% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-20px, -20px) scale(1.1); }
          100% { transform: translate(0, 0) scale(1); }
        }
        
        @keyframes floatBgReverse {
          0% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(20px, 20px) scale(1.1); }
          100% { transform: translate(0, 0) scale(1); }
        }
        
        @keyframes floatIcon {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        .header-animation {
          animation: fadeInUp 0.8s ease-out;
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .left-content {
          animation: slideInLeft 0.8s ease-out;
        }
        
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .right-content {
          animation: slideInRight 0.8s ease-out;
        }
        
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .cta-card {
          animation: scaleIn 0.6s ease-out;
          transition: transform 0.3s ease;
        }
        
        .cta-card:hover {
          transform: scale(1.01);
        }
        
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        /* Hover effects using CSS pseudo-classes */
        .benefit-pill {
          cursor: default;
        }
        
        .benefit-pill:hover {
          transform: translateY(-2px) scale(1.05) !important;
          background: rgba(255, 255, 255, 0.25) !important;
        }
        
        .cta-button {
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease !important;
        }
        
        .cta-button:hover {
          transform: translateY(-2px) scale(1.05) !important;
          box-shadow: 0 20px 30px rgba(20, 138, 188, 0.3) !important;
        }
        
        .cta-button::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          border-radius: 50%;
          background: rgba(20, 138, 188, 0.1);
          transform: translate(-50%, -50%);
          transition: width 0.6s, height 0.6s;
          pointer-events: none;
          z-index: 0;
        }
        
        .cta-button:hover::after {
          width: 300px;
          height: 300px;
        }
        
        .cta-button span, .cta-button svg {
          position: relative;
          z-index: 1;
        }
        
        .cta-button svg path {
          animation: arrowMove 1.5s ease-in-out infinite;
        }
        
        @keyframes arrowMove {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(5px); }
        }
      `,
        }}
      />
    </section>
  );
};

export default CandidateTestimonialCTA;
