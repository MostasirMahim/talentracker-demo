import React from "react";
import Link from "next/link";

const CompanyOverview2 = () => {
  return (
    <div>
      <div className="mt-5 section-title   text-center">
        <span className="sub-title">COMPANY OVERVIEW</span>
      </div>
      <div
        className=""
        style={{
          // minHeight: "100vh",
          // display: "flex",
          // alignItems: "center",
        }}
      >
        <div className="container-fluid">
          <div className="row g-0 justify-content-center">
            {/* Content Card */}
            <div className="col-12 col-lg-11 col-xl-11">
              <div
                className="card border-0 shadow-sm"
                style={{
                  borderRadius: "24px",
                  backdropFilter: "blur(10px)",
                }}
              >
                <div className="card-body p-0">
                  <div className="row g-0">
                    {/* Left Side - Decorative Panel */}
                    <div
                      className="col-md-5 d-none d-md-flex"
                      style={{
                        position: "relative",
                        overflow: "hidden",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundImage: "linear-gradient(to right, #1489bc, #0e4c89)",
                        borderRadius: "24px 0 0 24px", // Rounded corners for the left side
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center",
                          padding: "3rem",
                          textAlign: "center",
                        }}
                      >
                        <div
                          style={{
                            width: "120px",
                            height: "120px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            marginBottom: "2rem",
                          }}
                        >
                          <img
                            src="/images/company_overview/image2.svg"
                            alt="Overview Icon"
                            style={{ width: "100%", height: "100%" }}
                          />
                        </div>

                        <h3
                          className="text-white fw-bold mb-3"
                          style={{ fontSize: "1.5rem" }}
                        >
                          Building Tomorrow&apos;s Workforce
                        </h3>
                        <p
                          className="text-white "
                          style={{ opacity: 0.9, lineHeight: "1.6" }}
                        >
                          Strategic HR solutions that transform businesses
                          through exceptional talent acquisition and management.
                        </p>
                      </div>
                    </div>

                    {/* Right Side - Content */}
                    <div className="col-md-7">
                      <div
                        className="p-4 p-lg-5 d-flex flex-column justify-content-center"
                        style={{ minHeight: "100%" }}
                      >
                        
                        {/* Title Section */}
                        <div className="mb-4">
                          <h2
                            className="mb-2"
                            style={{
                              fontSize: "2rem",
                              fontWeight: "700",
                              color: "#1a202c",
                              lineHeight: "1.2",
                            }}
                          >
                            TalenTracker Limited
                          </h2>
                          <h4
                            style={{
                              fontSize: "1.1rem",
                              fontWeight: "600",
                              color: "rgb(20, 137, 188)",
                              letterSpacing: "0.5px",
                              marginBottom: "1.5rem",
                            }}
                          >
                            RIGHT PEOPLE, RIGHT FIT
                          </h4>
                        </div>

                        {/* Description */}
                        <p
                          style={{
                            fontSize: "1rem",
                            lineHeight: "1.8",
                            color: "#4a5568",
                            marginBottom: "2rem",
                            textAlign: "justify",
                          }}
                        >
                          TalenTracker is a strategic HR and talent solutions
                          partner helping organizations hire smarter, operate
                          compliantly, and build high-performing teams. We
                          deliver end-to-end workforce solutions including
                          Executive Search, RPO, Payroll, EOR/PEO, and HR
                          Consultancy for both local and multinational
                          businesses.
                        </p>

                        {/* Features Grid */}
                        <div className="row g-3 mb-4">
                          {[
                            "Executive Search",
                            "RPO Solutions",
                            "EOR/PEO",
                            "HR Consultancy",
                          ].map((feature, idx) => (
                            <div className="col-6" key={idx}>
                              <div className="d-flex align-items-center">
                                <div
                                  style={{
                                    width: "40px",
                                    height: "40px",
                                    background: "#f7fafc",
                                    borderRadius: "8px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    marginRight: "0.75rem",
                                  }}
                                >
                                  <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="#667eea"
                                    strokeWidth="2"
                                  >
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                  </svg>
                                </div>
                                <span
                                  style={{
                                    fontSize: "0.9rem",
                                    color: "#4a5568",
                                    fontWeight: "500",
                                  }}
                                >
                                  {feature}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* CTA Button */}
                        <div className="read-more-btn">
                          <Link href="/about-us/" className="default-btn">
                            About Us <i className="ri-arrow-right-line "></i>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyOverview2;
