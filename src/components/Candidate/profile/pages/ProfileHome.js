"use client";

import {
  MapPin,
  Phone,
  Mail,
  Building2,
  Briefcase,
  FileText,
  Linkedin,
  CheckCircle2,
  PhoneCall,
  Wallet,
  SquareUser,
  User2,
} from "lucide-react";
import Image from "next/image";
import "./style.css";
import ResumeButton from "./ResumeButton";

export default function ViewProfile({ profileData }) {
  const { candidate, employment, compensation, document, location } =
    profileData;
  const formatDate = (dateString) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const currentLocation =
    location && location.length > 0 ? location[0].current_job_location : "";

  if (
    !profileData?.candidate ||
    Object.keys(profileData?.candidate).length === 0
  ) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
            marginTop: "50px",
          }}
        >
          <User2 size={50} style={{ color: "#1489bc" }} />
          <h3 style={{ color: "#0e4c89" }}>Please Edit Your Profile First</h3>
        </div>
      </div>
    );
  }
  return (
    <div className="view-profile-container">
      <section className="profile-section profile-intro">
        <div className="profile-intro-header">
          <div className="profile-intro-content">
            <h1 className="profile-name">{candidate.full_name}</h1>
            <div className="profile-contact-info">
              <div className="contact-item">
                <Phone className="icon-md" />
                <span className="contact-value">
                  {candidate.primary_phone_number}
                </span>
              </div>
              {candidate.secondary_phone_number && (
                <div className="contact-item">
                  <PhoneCall className="icon-md" />
                  <span className="contact-value">
                    {candidate.secondary_phone_number}
                  </span>
                </div>
              )}
              <div className="contact-item">
                <Mail className="icon-md" />
                <span className="contact-value contact-email">
                  {candidate.email}
                </span>
              </div>
              {currentLocation && (
                <div className="contact-item">
                  <MapPin className="icon-md" />
                  <span className="contact-value">{currentLocation}</span>
                </div>
              )}
            </div>
          </div>
          {candidate?.profile_img && (
            <div className="profile-image-container">
              <Image
                src={
                  candidate.profile_img ||
                  "/placeholder.svg?height=120&width=120&query=profile"
                }
                alt={candidate.full_name}
                className="profile-image"
                width={120}
                height={120}
              />
            </div>
          )}
        </div>
      </section>

      {employment && employment.length > 0 && (
        <section className="profile-section">
          <div className="profile-section-header">
            <Briefcase className="icon-md" />
            <h2 className="profile-section-title">Employment History</h2>
          </div>

          <div className="employment-list">
            {employment.map((job, index) => (
              <div key={job.id || index} className="employment-item">
                <div className="employment-header">
                  <h3 className="employment-position">
                    {index + 1}. {job.designation} (
                    {job.employment_type || "Employment"})
                  </h3>
                  <span className="employment-date">
                    ({formatDate(job.joining_date)} -{" "}
                    {job.is_current ? "Continuing" : formatDate(job.end_date)})
                  </span>
                </div>
                <p className="employment-company">
                  <Building2 className="icon-md inline" /> {job.company_name}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {compensation && compensation.length > 0 && (
        <section className="profile-section">
          <div className="profile-section-header">
            <Wallet className="icon-md" />
            <h2 className="profile-section-title">Compensation</h2>
          </div>
          <div className="compensation-grid">
            {compensation.map((comp, index) => (
              <div key={comp.id || index} className="compensation-item">
                <div className="compensation-row">
                  <span className="compensation-label">Present Salary</span>
                  <span className="compensation-value">
                    : {comp.currency} {comp.current_salary || "-"}
                  </span>
                </div>
                <div className="compensation-row">
                  <span className="compensation-label">Expected Salary</span>
                  <span className="compensation-value">
                    : {comp.currency} {comp.expected_salary || "-"}
                  </span>
                </div>
                <div className="compensation-row">
                  <span className="compensation-label">Notice Period</span>
                  <span className="compensation-value">
                    : {comp.notice_period || "-"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
      {candidate?.skills && candidate?.skills.length > 0 && (
        <section className="profile-section">
          <div className="profile-section-header">
            <CheckCircle2 className="icon-md" />
            <h2 className="profile-section-title">Skills</h2>
          </div>
          <div className="skills-container">
            <div className="skills-box">
              <h3 className="skills-subtitle">Fields of Skill</h3>
              <ul className="skills-list">
                {candidate?.skills.map((skill) => (
                  <li key={skill.id} className="skill-item">
                    {skill.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      <section className="profile-section">
        <div className="profile-section-header">
          <SquareUser className="icon-md" />
          <h2 className="profile-section-title">Personal Details</h2>
        </div>
        <div className="personal-details-grid">
          <div className="detail-row">
            <span className="detail-label">National ID</span>
            <span className="detail-value">{candidate.national_id || "-"}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Career Start Date</span>
            <span className="detail-value">
              {formatDate(candidate.career_start_date)}
            </span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Field of Specialization</span>
            <span className="detail-value">
              {candidate.field_of_specialization || "-"}
            </span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Other Specialization</span>
            <span className="detail-value">
              {candidate.other_specialization || "-"}
            </span>
          </div>
        </div>
      </section>

      {document && document.length > 0 && (
        <section className="profile-section">
          <div className="profile-section-header">
            <FileText className="icon-md" />
            <h2 className="profile-section-title">Documents & Links</h2>
          </div>
          <div className="document-container">
            {document.map((doc, index) => (
              <div key={doc.id || index} className="document-item">
                {doc.linked_in_url && (
                  <div className="document-row">
                    <div className="document-label-with-icon">
                      <Linkedin className="icon-md" />
                      <span>LinkedIn Profile</span>
                    </div>
                    <a
                      href={doc.linked_in_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="document-link"
                    >
                      {doc.linked_in_url}
                    </a>
                  </div>
                )}
                {doc.resume && (
                <ResumeButton id={candidate?.id} doc={doc}/>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
