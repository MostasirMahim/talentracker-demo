// components/TrainingDetailApex.js
import Image from "next/image";
import React from "react";
import "./TrainingCatelog.css";

// NOTE: Assumes Bootstrap CSS is imported globally in your Next.js application.

const TrainingDetailApex = ({ data }) => {
  // Strategic validation and extraction
  if (!data || data?.status !== "success" || !data?.data) {
    return (
      <div className="apex-training-error">
        Data failed to load. Please check the backend payload structure.
      </div>
    );
  }

  const training = data?.data;
  const detail = training?.detail || {};
  const trainer = detail?.expert_trainer_profile || {};

  // Base URL for media assets (assuming your Next.js setup needs this)
  const BASE_MEDIA_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL; // Adjust this if your media assets are hosted on a different base path

  // Helper function to render HTML content safely (for full_description, full_curriculum)
  const renderHTML = (htmlString) => {
    return { __html: htmlString };
  };

  return (
    <div className="apex-training-container container my-5">
      {/* === 1. HEADER / HERO SECTION === */}
      <header className="apex-training-header bg-light p-4 rounded shadow-sm mb-4">
        <div className="row align-items-center">
          <div className="col-lg-8">
            <h1 className="apex-title">{training?.title}</h1>
            <p className="apex-short-desc lead text-muted">
              {training?.short_description}
            </p>

            <div className="apex-metadata-badges d-flex flex-wrap gap-3 mt-3">
              <span className="badge bg-primary apex-badge-primary">
                Category: {training?.category}
              </span>
              <span className="badge bg-info text-dark apex-badge-info">
                Mode: {detail?.delivery_mode}
              </span>
              <span className="badge bg-secondary apex-badge-secondary">
                Duration: {detail?.duration}
              </span>
              <span className="badge bg-success apex-badge-success">
                Status: {training?.status}
              </span>
            </div>
          </div>

          <div className="col-lg-4 text-center  mt-3 mt-lg-0">
            {/* High-Impact CTA Block */}
            <div className="apex-cta-block p-3 bg-white border rounded">
              <h5 className="mb-3">Ready for Elite Insight?</h5>
              {detail?.cta_enroll_link && (
                <a
                  href={detail?.cta_enroll_link}
                  className="btn btn-dark w-100 mb-2 apex-btn-enroll"
                  target="_blank"
                >
                  Enroll Now
                </a>
              )}
              {detail?.cta_request_link && (
                <a
                  className="btn btn-outline-dark w-100 apex-btn-request"
                  target="_blank"
                >
                  Request Custom Info
                </a>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="row">
        {/* === 2. MAIN CONTENT AREA (Description & Curriculum) === */}
        <main className="col-lg-8">
          {/* Training Thumbnail */}
          {training?.thumbnail_image && (
            <div className="apex-thumbnail-wrapper mb-4 rounded overflow-hidden">
              <Image
                width={500}
                height={300}
                src={`${BASE_MEDIA_URL}${training.thumbnail_image}`}
                alt={training?.title}
                className="img-fluid apex-thumbnail-img"
              />
            </div>
          )}

          {/* Full Description Section */}
          <section className="apex-section-description mb-5 p-4 bg-white rounded shadow-sm">
            <h2 className="apex-section-title border-bottom pb-2 mb-3">
              Overview
            </h2>
            <div
              className="apex-full-description"
              dangerouslySetInnerHTML={renderHTML(detail?.full_description)}
            />
          </section>

          {/* Curriculum Section */}
          <section className="apex-section-curriculum mb-5 p-4 bg-white rounded shadow-sm">
            <h2 className="apex-section-title border-bottom pb-2 mb-3">
              Curriculum Insight
            </h2>
            <div
              className="apex-full-curriculum"
              dangerouslySetInnerHTML={renderHTML(detail?.full_curriculum)}
            />
          </section>
        </main>

        {/* === 3. ASIDE/SIDEBAR AREA (Trainer Profile & Audience) === */}
        <aside className="col-lg-4">
          {/* Trainer Profile Card */}
          <div className="card apex-trainer-card mb-4 shadow">
            <div className="card-header apex-card-header  ">
              <h5 className="mb-2">Expert Trainer</h5>
            </div>
            <div className="card-body text-center">
              {trainer?.profile_picture && (
                <div className="apex-trainer-img-wrapper mb-3 mx-auto">
                  <Image
                    width={100}
                    height={100}
                    src={`${BASE_MEDIA_URL}${trainer?.profile_picture}`}
                    alt={trainer?.name}
                    className="apex-trainer-img rounded-circle border-5 border-light shadow-sm"
                  />
                </div>
              )}
              <h4 className="apex-trainer-name">{trainer?.name}</h4>
              <p className="apex-trainer-expertise text-muted mb-2">
                {trainer?.expertise}
              </p>

              <hr />
              <div className="d-flex justify-content-center gap-2">
                {trainer?.linkedin_profile && (
                  <a
                    href={trainer?.linkedin_profile}
                    className="btn btn-outline-primary btn-sm apex-trainer-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    LinkedIn
                  </a>
                )}
                {trainer?.portfolio_link && (
                  <a
                    href={trainer?.portfolio_link}
                    className="btn btn-outline-secondary btn-sm apex-trainer-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Portfolio
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Target Audience Card */}
          <div className="card apex-audience-card shadow-sm">
            <div className="card-header apex-card-header bg-light">
              <h5 className="mb-0">Target Audience</h5>
            </div>
            <div className="card-body">
              <p className="apex-target-audience mb-0">
                {detail?.target_audience}
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default TrainingDetailApex;
