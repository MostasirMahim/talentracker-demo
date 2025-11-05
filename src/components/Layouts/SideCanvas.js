import Image from "next/image";
import Link from "next/link";
import React from "react";

function SideCanvas() {
  return (
    <div>
      <div className="offcanvas-header">
        <Link href="/" className="navbar-brand">
          <Image
            src="/images/ttl_logo.png"
            alt="logo"
            width={154}
            height={33}
          />
        </Link>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div className="offcanvas-body">
        {/* Summary Paragraph */}
        <p
          className="mb-4"
          style={{ fontSize: "15px", fontWeight: 600, color: "#0d0d0dff" }}
        >
          TalenTracker Limited is a HR solutions provider specializing in Talent
          Acquisition, HR Outsourcing, Global Mobility and People & Culture
          transformation.
        </p>

        {/* Contact Info */}
        <div className="contact-info">
          {/* Address */}
          <div className="contact-item">
            <i className="ri-map-pin-line contact-icon address"></i>
            <span className="contact-text">123 Main Street, City, Country</span>
          </div>

          {/* Phone */}
          <div className="contact-item">
            <i className="ri-phone-line contact-icon phone"></i>
            <span className="contact-text">+880 1847 293 000</span>
          </div>

          {/* Email */}
          <div className="contact-item">
            <i className="ri-mail-line contact-icon email"></i>
            <span className="contact-text">info@example.com</span>
          </div>
        </div>

        {/* Social Icons Row */}
        <div className="d-flex align-items-center justify-content-center gap-3">
          <a
            href="https://www.facebook.com/talentracker/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="ri-facebook-line social-icon facebook"></i>
          </a>
          <a
            href="https://www.instagram.com/talen_tracker?igsh=NXN2NWY3d2E1a3B4"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="ri-instagram-line social-icon instagram"></i>
          </a>
          <a
            href="https://www.linkedin.com/company/talentracker-limited/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="ri-linkedin-line social-icon linkedin"></i>
          </a>
        </div>
      </div>
    </div>
  );
}

export default SideCanvas;
