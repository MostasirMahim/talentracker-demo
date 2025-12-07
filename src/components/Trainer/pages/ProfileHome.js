"use client";

import { Linkedin, LinkedinIcon, Slack } from "lucide-react";
import "./style.css";

export default function TrainerProfile({ profileData }) {
  const { full_name, field_of_specialization, linked_profile } =
    profileData?.profile;
const linkedinHandle = linked_profile?.split("/")[4] || ""
  return (
    <div className="view-profile-container">
     <section className="profile-section profile-intro">
      <div className="profile-intro-header-enhanced">
        <div className="profile-intro-content-enhanced">
          <div className="profile-intro-top">
            <h1 className="profile-name-enhanced">{full_name}</h1>
            <div className="profile-specialization">{field_of_specialization}</div>
          </div>

          <div className="profile-contact-info-enhanced">
            <div className="contact-item-enhanced">
              <Linkedin className="icon-md-enhanced" />
              <span className="contact-value contact-email">{linkedinHandle}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
      {profileData?.portfolios && profileData?.portfolios.length > 0 && (
        <section className="profile-section">
          <div className="profile-section-header">
            <Slack className="icon-md" />
            <h2 className="profile-section-title">Portfolios</h2>
          </div>

          <div className="employment-list">
            {profileData?.portfolios?.map((job, index) => (
              <div key={job.id || index} className="employment-item">
                <div className="employment-header">
                  <h3 className="employment-position">
                    {index + 1}. {job.title}
                  </h3>
                </div>
                <p className="employment-company">
                  <Slack className="icon-md inline" /> {job.url}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
