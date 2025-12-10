"use client";

import { useState } from "react";
import Image from "next/image";
import "./trainer_detail.css";

export default function TrainerDetailPage({ trainer: TRAINER_DATA }) {
  const [activeTab, setActiveTab] = useState("bio");

  return (
    <div className="trainer-detail-container">
      <div className="detail-hero">
        <div className="hero-gradient"></div>
        <div className="hero-content">
          <div className="profile-image-wrapper">
            <Image
              src={`${process.env.NEXT_PUBLIC_BACKEND_API_URL}${
                TRAINER_DATA.profile_picture || ""
              }`}
              alt={TRAINER_DATA.name}
              className="profile-image"
              width={120}
              height={120}
            />
            <div className="status-badge">{TRAINER_DATA.status}</div>
          </div>

          <div className="hero-info">
            <h1 className="trainer-detail-name">{TRAINER_DATA.name}</h1>
            <p className="trainer-detail-expertise">{TRAINER_DATA.expertise}</p>
            <div className="info-badges">
              <span className="badge badge-blue">
                {TRAINER_DATA.specializations}
              </span>
              <span className="badge badge-gray">
                {TRAINER_DATA.certifications}
              </span>
            </div>
            <div className="social-links">
              <a
                href={TRAINER_DATA.linkedin_profile}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link linkedin"
              >
                LinkedIn
              </a>
              <a
                href={TRAINER_DATA.portfolio_link}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link portfolio"
              >
                Portfolio
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="tab-navigation">
        <button
          className={`tab-button ${activeTab === "bio" ? "active" : ""}`}
          onClick={() => setActiveTab("bio")}
        >
          Biography
        </button>
        <button
          className={`tab-button ${activeTab === "details" ? "active" : ""}`}
          onClick={() => setActiveTab("details")}
        >
          Details
        </button>
      </div>
      <div className="content-section">
        {activeTab === "bio" && (
          <div className="tab-content fade-in">
            <h2>About</h2>
            <p>{TRAINER_DATA.biography}</p>
          </div>
        )}

        {activeTab === "details" && (
          <div className="tab-content fade-in">
            <h2>Professional Information</h2>
            <div className="details-grid">
              <div className="detail-item">
                <span className="detail-label">Specializations</span>
                <span className="detail-value">
                  {TRAINER_DATA.specializations}
                </span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Certifications</span>
                <span className="detail-value">
                  {TRAINER_DATA.certifications}
                </span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Member Since</span>
                <span className="detail-value">
                  {new Date(TRAINER_DATA.created_at).toLocaleDateString()}
                </span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Status</span>
                <span className="detail-value status-active">
                  {TRAINER_DATA.status}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
