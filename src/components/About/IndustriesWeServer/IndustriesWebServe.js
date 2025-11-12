import React from "react";
import {
  Cpu,
  Headphones,
  Factory,
  Building2,
  Wrench,
  Pill,
  Rocket,
  Globe,
} from "lucide-react";
import "./IndustriesWeServe.css";

export default function IndustriesWeServe() {
  const industries = [
    {
      icon: <Cpu size={32} className="text-primary" />,
      title: "IT & Technology",
    },
    {
      icon: <Headphones size={32} className="text-info" />,
      title: "BPO, Shared Services & Remote Teams",
    },
    {
      icon: <Factory size={32} className="text-warning" />,
      title: "Manufacturing, Garments & Supply Chain",
    },
    {
      icon: <Building2 size={32} className="text-success" />,
      title: "Development Sector / NGOs / INGO",
    },
    {
      icon: <Wrench size={32} className="text-danger" />,
      title: "Engineering & Infrastructure",
    },
    {
      icon: <Pill size={32} className="text-purple" />,
      title: "Pharma & Healthcare",
    },
    {
      icon: <Rocket size={32} className="text-orange" />,
      title: "Startup and SME Segment",
    },
    {
      icon: <Globe size={32} className="text-secondary" />,
      title: "Trading & International Business Entities",
    },
  ];

  return (
    <section className="industries-section py-5">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="fw-bold text-primary mb-2">Industries We Serve</h2>
          <p className="text-muted mb-0 industries-subtitle">
            We partner with diverse industries across Bangladesh delivering HR
            solutions tailored to each sector’s workforce challenges and
            business needs.
          </p>
        </div>

        <div className="row g-4">
          {industries.map((industry, idx) => (
            <div key={idx} className="col-md-6 col-lg-3">
              <div className="card border-0 shadow-sm text-center p-4 industry-card h-100">
                <div className="icon-wrapper mx-auto mb-3">{industry.icon}</div>
                <h6 className="fw-semibold text-dark">{industry.title}</h6>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
