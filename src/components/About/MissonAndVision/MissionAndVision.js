import React from "react";
import { Users, Target, Eye } from "lucide-react";
import "./mission.css";

export default function MissionAndVision() {
  return (
    <section className="about-us-section py-5">
      <div className="container">
        {/* Title Section */}
        <div className="text-center mb-5">
          <h2 className="fw-bold text-primary mb-2">Who We Are</h2>
          <p className="text-muted mx-auto about-subtitle">
            We are a people and performance–focused HR partner helping employers
            manage the full employee lifecycle — from hiring and onboarding to
            capability building and workforce compliance. Our services cover
            both national and expatriate employment, making us a trusted partner
            for companies navigating cross-border HR requirements in Bangladesh.
          </p>
        </div>

        {/* Mission & Vision Cards */}
        <div className="row g-4 justify-content-center">
          {/* Mission */}
          <div className="col-md-6">
            <div className="card border shadow-sm h-100 p-4 about-card">
              <div className="d-flex align-items-center mb-3">
                <Target size={32} className="text-primary me-3" />
                <h4 className="mb-0 text-dark fw-semibold">Our Mission</h4>
              </div>
              <p className="text-secondary mb-0">
                To empower organizations in Bangladesh with compliant, reliable
                and future-ready HR solutions that make hiring smarter, HR
                operations simpler and workplaces more human-centered.
              </p>
            </div>
          </div>

          {/* Vision */}
          <div className="col-md-6">
            <div className="card border shadow-sm h-100 p-4 about-card">
              <div className="d-flex align-items-center mb-3">
                <Eye size={32} className="text-success me-3" />
                <h4 className="mb-0 text-dark fw-semibold">Our Vision</h4>
              </div>
              <p className="text-secondary mb-0">
                To become Bangladesh’s most trusted HR partner for world-class
                talent solutions, enabling companies to grow sustainably while
                maintaining legal integrity and employee wellbeing.
              </p>
            </div>
          </div>
        </div>

        {/* Footer Line */}
        <div className="text-center mt-5">
          <div className="d-inline-flex align-items-center gap-2 text-muted small">
            <Users size={18} />
            <span>
              Empowering people • Building trust • Driving performance
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
