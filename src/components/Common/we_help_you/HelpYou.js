import React from "react";
import Link from "next/link";
import "./style.css";

// Server Component (no 'use client' directive)
const HowCanWeHelpYou = () => {
  const features = [
    {
      id: 1,
      icon: (
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Person silhouette */}
          <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="1.5" />
          <path
            d="M4 21C4 17.134 7.134 14 11 14H13C16.866 14 20 17.134 20 21"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          {/* Upload arrow */}
          <path
            d="M12 18V21M10 19.5L12 17.5L14 19.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      audience: "For Candidates",
      title: "Submit Your Resume",
      cta: "Apply Now",
      href: "/career/",
      description:
        "Looking for your next opportunity? Share your profile with us and let our team connect you with top employers actively hiring for your skills.",
      gradient: "linear-gradient(135deg, #1489bc, #05b4ff)",
      lightGradient:
        "linear-gradient(135deg, rgba(20, 137, 188, 0.09), rgba(5, 180, 255, 0.03))",
      accentColor: "#1489bc",
    },
    {
      id: 2,
      icon: (
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Graduation cap */}
          <path
            d="M12 3L2 8L12 13L22 8L12 3Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M6 10.5V16C6 16 8.5 18.5 12 18.5C15.5 18.5 18 16 18 16V10.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M22 8V13"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      ),
      audience: "For Trainers",
      title: "Join as a Trainer",
      cta: "Register Profile",
      href: "/training-solutions/",
      description:
        "Are you an expert with knowledge to share? Submit your trainer profile and partner with us to deliver impactful training programs across industries.",
      gradient: "linear-gradient(135deg, #0e4c89, #1489bc)",
      lightGradient:
        "linear-gradient(135deg, rgba(14, 76, 137, 0.09), rgba(20, 137, 188, 0.03))",
      accentColor: "#0e4c89",
    },
    {
      id: 3,
      icon: (
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Building / office */}
          <rect
            x="3"
            y="3"
            width="18"
            height="18"
            rx="2"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M8 21V12H16V21"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <rect x="9" y="7" width="2" height="2" fill="currentColor" />
          <rect x="13" y="7" width="2" height="2" fill="currentColor" />
          <rect x="10" y="14" width="4" height="7" fill="currentColor" opacity="0.4" />
        </svg>
      ),
      audience: "For Employers",
      title: "Request a Service",
      cta: "Get in Touch",
      href: "/contact/",
      description:
        "Need top talent or a custom training program for your team? Let TalenTracker handle the heavy lifting — from sourcing to onboarding.",
      gradient: "linear-gradient(135deg, #05b4ff, #05ffff)",
      lightGradient:
        "linear-gradient(135deg, rgba(5, 180, 255, 0.09), rgba(5, 255, 255, 0.03))",
      accentColor: "#05b4ff",
    },
  ];

  return (
    <section className="ppk-why">
      <div className="section-title">
        <span className="sub-title">HOW CAN WE HELP YOU</span>
        <h2>Your Next Step Starts Here</h2>
      </div>

      {/* Soft Background Elements — TalenTracker branded */}
      <div className="ppk-why-bg ppk-why-bg-1"></div>
      <div className="ppk-why-bg ppk-why-bg-2"></div>
      <div className="ppk-why-bg ppk-why-bg-3"></div>

      {/* Floating Icons (Decorative) */}
      <div className="ppk-why-float ppk-why-float-1">
        <svg
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
        >
          <circle cx="12" cy="12" r="10" stroke="#1489bc" opacity="0.12" />
        </svg>
      </div>
      <div className="ppk-why-float ppk-why-float-2">
        <svg
          width="64"
          height="64"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
        >
          <rect
            x="3"
            y="3"
            width="18"
            height="18"
            rx="2"
            stroke="#0e4c89"
            opacity="0.1"
          />
        </svg>
      </div>
      <div className="ppk-why-float ppk-why-float-3">
        <svg
          width="56"
          height="56"
          viewBox="0 0 24 24"
          fill="none"
          strokeWidth="1"
        >
          <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="#05b4ff" opacity="0.12" />
        </svg>
      </div>

      <div className="ppk-why-container">
        <div className="ppk-why-grid">
          {features.map((feature, index) => (
            <div
              key={feature.id}
              className="ppk-why-card"
              style={{ "--card-index": index }}
            >
              <div className="ppk-why-card-inner">
                {/* Card Background Gradient */}
                <div
                  className="ppk-why-card-bg"
                  style={{ background: feature.lightGradient }}
                ></div>

                {/* Audience Badge */}
                <div
                  className="ppk-why-audience-badge"
                  style={{
                    background: `${feature.accentColor}14`,
                    color: feature.accentColor,
                    border: `1px solid ${feature.accentColor}28`,
                  }}
                >
                  {feature.audience}
                </div>

                {/* Icon Circle */}
                <div
                  className="ppk-why-icon-circle"
                  style={{ background: feature.gradient }}
                >
                  <span className="ppk-why-icon">{feature.icon}</span>
                </div>

                {/* Content */}
                <div className="ppk-why-content">
                  <h3 className="ppk-why-title">{feature.title}</h3>
                  <p className="ppk-why-description">{feature.description}</p>

                  {/* CTA Link */}
                  <Link
                    href={feature.href}
                    className="ppk-why-cta"
                    style={{
                      background: feature.gradient,
                    }}
                  >
                    {feature.cta}
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>

                {/* Decorative Dots */}
                <div className="ppk-why-dots">
                  <span style={{ background: feature.gradient }}></span>
                  <span style={{ background: feature.gradient }}></span>
                  <span style={{ background: feature.gradient }}></span>
                </div>

                {/* Hover Glow */}
                <div
                  className="ppk-why-glow"
                  style={{ background: feature.gradient }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowCanWeHelpYou;
