"use client";

import { useState } from "react";
import { User, ChevronRight, Slack } from "lucide-react";

import "./style.css";
import PersonalDetailsForm from "./components/PersonalDetailsForm";
import EmploymentHistoryForm from "./components/PortfolioForm";
import { toast } from "react-toastify";

const STEPS = [
  {
    id: "personal",
    title: "Personal",
    icon: User,
    description: "Personal Details",
  },
  {
    id: "portfolio",
    title: "Portfolio",
    icon: Slack,
    description: "Portfolio Details",
  },
];

export default function EditTrainerProfileForm({ initialData }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [submitStatus, setSubmitStatus] = useState({ type: null, message: "" });

  const step = STEPS[currentStep];
  const handleStepClick = (stepIndex) => {
    if (
      !initialData?.profile ||
      Object.keys(initialData.profile).length === 0
    ) {
      toast.error("Please save your personal details first");
    } else {
      setCurrentStep(stepIndex);
      setSubmitStatus({ type: null, message: "" });
    }
  };

  const personalDetails = {
    id: initialData?.profile?.id,
    full_name: initialData?.profile?.full_name,
    field_of_specialization: initialData?.profile?.field_of_specialization,
    linked_profile: initialData?.profile?.linked_profile,
  };
  const portfolioData = initialData?.portfolios?.map((emp) => ({
    id: emp?.id,
    title: emp?.title,
    url: emp?.url,
  }));

  return (
    <div className="edit-profile-wrapper">
      <div className="edit-profile-stepper">
        <div className="stepper-container">
          {STEPS.map((item, index) => {
            const ItemIcon = item.icon;
            const isActive = index === currentStep;
            const isCompleted = index < currentStep;

            return (
              <div key={item.id} className="stepper-item-wrapper">
                <button
                  onClick={() => handleStepClick(index)}
                  className={`stepper-item ${isActive ? "active" : ""} ${
                    isCompleted ? "completed" : ""
                  }`}
                  type="button"
                >
                  <div className="stepper-icon-wrapper">
                    <ItemIcon size={20} />
                  </div>
                  <div className="stepper-text">
                    <div className="stepper-title">{item.title}</div>
                    <div className="stepper-description">
                      {item.description}
                    </div>
                  </div>
                </button>

                {index < STEPS.length - 1 && (
                  <div className="stepper-divider"></div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <div className="edit-profile-content">
        <h2 className="form-title">{step?.description}</h2>
        <div className="form-container">
          {submitStatus.type && (
            <div className={`form-status-message ${submitStatus.type}`}>
              {submitStatus.message}
            </div>
          )}
          {step.id === "personal" && (
            <PersonalDetailsForm initialData={personalDetails} />
          )}

          {step.id === "portfolio" && (
            <EmploymentHistoryForm initialData={portfolioData} />
          )}

          <div className="form-navigation">
            <button
              onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
              disabled={currentStep === 0}
              className="btn btn-secondary2"
              type="button"
            >
              Previous
            </button>

            <button
              onClick={() => {
                if (
                  !initialData?.profile ||
                  Object.keys(initialData.profile).length === 0
                ) {
                  toast.error("Please save your personal details first");
                } else {
                  setCurrentStep(Math.min(STEPS.length - 1, currentStep + 1));
                }
              }}
              disabled={currentStep === STEPS.length - 1}
              className="btn btn-secondary"
              type="button"
            >
              Skip
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
