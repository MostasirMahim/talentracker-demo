"use client";

import { ArrowRight, Calendar, CheckCircle, Clock, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import styled from "styled-components";

function CatalogCard({ catalog }) {
  const router = useRouter();
  
  // Get values from catalog object
  const registrationStatus = catalog?.registration_status || "Registration Open";
  const startDate = catalog?.start_date || "";
  const endDate = catalog?.end_date || "";
  
  // Format date function
  const formatDate = (dateString) => {
    if (!dateString) return "TBA";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { 
      month: "short", 
      day: "numeric", 
      year: "numeric" 
    });
  };
  
  // Get status icon and color based on registration status
  const getStatusConfig = (status) => {
    switch(status) {
      case "Registration Open":
        return {
          icon: <CheckCircle size={12} />,
          color: "#10b981",
          bgColor: "rgba(16, 185, 129, 0.1)"
        };
      case "Live Now":
        return {
          icon: <Clock size={12} />,
          color: "#f59e0b",
          bgColor: "rgba(245, 158, 11, 0.1)"
        };
      case "Ended":
        return {
          icon: <XCircle size={12} />,
          color: "#ef4444",
          bgColor: "rgba(239, 68, 68, 0.1)"
        };
      default:
        return {
          icon: <CheckCircle size={12} />,
          color: "#10b981",
          bgColor: "rgba(16, 185, 129, 0.1)"
        };
    }
  };
  
  const statusConfig = getStatusConfig(registrationStatus);
  
  return (
    <StyledWrapper>
      <div
        className="card-x"
        onClick={() => router.push(`/training-solutions/${catalog.slug}`)}
      >
        <div className="card__shine-x" />
        <div className="card__glow-x" />
        <div className="card__content-x">

          <div
            style={{
              backgroundImage: `url(${process.env.NEXT_PUBLIC_BACKEND_API_URL}${catalog.thumbnail_image})`,
            }}
            className="card__image"
          />

          <div className="card__text">
            <p className="card__title">{catalog.title}</p>
            <p className="card__description">{catalog.short_description}</p>
          </div>

          <div className="card__footer">
            <div className="card__price">{catalog?.category?.name}</div>
            <div className="card__button">
              <ArrowRight />
            </div>
          </div>
          
          {/* Added fields section */}
          <div className="card__fields">
            {/* Row for Status and Start Date */}
            <div className="card__fields-row">
              <div className="card__field" style={{ backgroundColor: statusConfig.bgColor }}>
                <div className="field-icon" style={{ color: statusConfig.color }}>
                  {statusConfig.icon}
                </div>
                <span className="field-value" style={{ color: statusConfig.color }}>
                  {registrationStatus}
                </span>
              </div>
              
              <div className="card__field">
                <div className="field-icon">
                  <Calendar size={12} />
                </div>
                <span className="field-label">Start:</span>
                <span className="field-value">{formatDate(startDate)}</span>
              </div>
            </div>
            
            {/* End Date - Centered below */}
            <div className="card__field-end-wrapper">
              <div className="card__field-end">
                <div className="field-icon">
                  <Calendar size={12} />
                </div>
                <span className="field-label">End:</span>
                <span className="field-value">{formatDate(endDate)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .card-x {
    --card-bg: #ffffff;
    --card-accent: #1489bc;
    --card-text: #1e293b;
    --card-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05);

    min-width: 280px;
    min-height: 420px;
    background: var(--card-bg);
    border-radius: 20px;
    position: relative;
    overflow: hidden;
    transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
    box-shadow: var(--card-shadow);
    border: 1px solid #1489bc;
    font-family:
      -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu,
      Cantarell, sans-serif;
    cursor: pointer;
  }

  .card__shine-x {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      120deg,
      rgba(255, 255, 255, 0) 40%,
      rgba(255, 255, 255, 0.7) 50%,
      rgba(255, 255, 255, 0) 60%
    );
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .card__glow-x {
    position: absolute;
    inset: -10px;
    background: radial-gradient(
      circle at 50% 0%,
      rgba(59, 130, 246, 0.35) 0%,
      rgba(59, 130, 246, 0) 70%
    );
    opacity: 0;
    transition: opacity 0.5s ease;
  }

  .card__content-x {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.75em;
    position: relative;
    z-index: 2;
    justify-content: flex-start;
    padding: 1.25rem;
  }

  .card__badge-x {
    position: absolute;
    top: 12px;
    right: 12px;
    background: #10b981;
    color: white;
    padding: 0.25em 0.5em;
    border-radius: 999px;
    font-size: 0.7em;
    font-weight: 600;
    transform: scale(0.8);
    opacity: 0;
    transition: all 0.4s ease 0.1s;
  }

  .card__image {
    width: 100%;
    height: 150px;
    border-radius: 12px;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
    position: relative;
    overflow: hidden;
  }

  .card__image::after {
    content: "";
    position: absolute;
    inset: 0;
    background:
      radial-gradient(
        circle at 30% 30%,
        rgba(255, 255, 255, 0.1) 0%,
        transparent 30%
      ),
      repeating-linear-gradient(
        45deg,
        rgba(139, 92, 246, 0.1) 0px,
        rgba(139, 92, 246, 0.1) 2px,
        transparent 2px,
        transparent 4px
      );
    opacity: 0.5;
  }

  .card__text {
    display: flex;
    flex-direction: column;
    gap: 0.25em;
  }

  .card__title {
    color: var(--card-text);
    font-size: 24px;
    margin: 0;
    font-weight: 700;
    transition: all 0.3s ease;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .card__description {
    color: var(--card-text);
    font-size: 15px;
    margin: 0;
    opacity: 0.7;
    transition: all 0.3s ease;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .card__footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: auto;
  }

  .card__price {
    color: var(--card-text);
    font-weight: 600;
    font-size: 1em;
    transition: all 0.3s ease;
  }

  .card__button {
    width: 40px;
    height: 40px;
    background: #1489bc;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    cursor: pointer;
    transition: all 0.3s ease;
    transform: scale(0.9);
  }

  /* Updated styles for the added fields */
  .card__fields {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-top: 0.5rem;
    padding-top: 0.5rem;
    border-top: 1px solid rgba(0, 0, 0, 0.08);
  }

  .card__fields-row {
    display: flex;
    justify-content: space-between;
    gap: 0.75rem;
  }

  .card__field {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    font-size: 0.75rem;
    color: var(--card-text);
    background: rgba(20, 137, 188, 0.08);
    padding: 0.25rem 0.5rem;
    border-radius: 6px;
    flex: 1;
    transition: all 0.3s ease;
  }

  .card__field-end-wrapper {
    display: flex;
    justify-content: center;
    width: 100%;
  }

  .card__field-end {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.25rem;
    font-size: 0.75rem;
    color: var(--card-text);
    background: rgba(20, 137, 188, 0.08);
    padding: 0.25rem 1rem;
    border-radius: 6px;
    transition: all 0.3s ease;
    min-width: 120px;
  }

  .field-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #1489bc;
  }

  .field-label {
    font-weight: 600;
    opacity: 0.7;
  }

  .field-value {
    font-weight: 500;
    opacity: 0.9;
  }

  /* Hover Effects */
  .card-x:hover {
    transform: translateY(-10px);
    box-shadow:
      0 20px 25px -5px rgba(0, 0, 0, 0.1),
      0 10px 10px -5px rgba(0, 0, 0, 0.04);
    border-color: rgba(124, 58, 237, 0.2);
  }

  .card-x:hover .card__shine-x {
    opacity: 1;
    animation: shine 3s infinite;
  }

  .card-x:hover .card__glow-x {
    opacity: 1;
  }

  .card-x:hover .card__badge-x {
    transform: scale(1);
    opacity: 1;
    z-index: 1;
  }

  .card-x:hover .card__image {
    transform: translateY(-5px) scale(1.03);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  }

  .card-x:hover .card__title {
    color: var(--card-accent);
    transform: translateX(2px);
  }

  .card-x:hover .card__description {
    opacity: 1;
    transform: translateX(2px);
  }

  .card-x:hover .card__price {
    color: var(--card-accent);
    transform: translateX(2px);
  }

  .card-x:hover .card__button {
    transform: scale(1);
    box-shadow: 0 0 0 4px rgba(96, 165, 250, 0.25);
  }

  .card-x:hover .card__button svg {
    animation: pulse 1.5s infinite;
  }

  /* Hover effect for fields */
  .card-x:hover .card__fields {
    border-top-color: rgba(20, 137, 188, 0.2);
  }

  .card-x:hover .card__field,
  .card-x:hover .card__field-end {
    background: rgba(20, 137, 188, 0.15);
    transform: translateY(-1px);
  }

  /* Active */
  .card-x:active {
    transform: translateY(-5px) scale(0.98);
  }

  /* Animations */
  @keyframes shine {
    0% {
      background-position: -100% 0;
    }
    100% {
      background-position: 200% 0;
    }
  }

  @keyframes pulse {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.2);
    }
    100% {
      transform: scale(1);
    }
  }
`;

export default CatalogCard;