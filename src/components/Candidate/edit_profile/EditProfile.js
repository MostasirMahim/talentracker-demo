"use client";

import { useState } from "react";
import {
  User,
  Briefcase,
  FileText,
  MapPin,
  Code,
  ChevronRight,
  Wallet,
} from "lucide-react";

import "./style.css";
import PersonalDetailsForm from "./components/PersonalDetailsForm";
import EmploymentHistoryForm from "./components/EmploymentForm";
import CompensationForm from "./components/CompensationForm";
import DocumentsForm from "./components/DocumentsForm";
import LocationsForm from "./components/LocationForm";
import SkillsForm from "./components/SkillsForm";
import { updateCandidateProfile } from "@/actions/candidate";


const STEPS = [
  {
    id: "personal",
    title: "Personal",
    icon: User,
    description: "Personal Details",
  },
  {
    id: "employment",
    title: "Employment",
    icon: Briefcase,
    description: "Employment History",
  },
  {
    id: "compensation",
    title: "Compensation",
    icon: Wallet,
    description: "Salary & Benefits",
  },
  {
    id: "document",
    title: "Document",
    icon: FileText,
    description: "Documents & Links",
  },
  {
    id: "location",
    title: "Location",
    icon: MapPin,
    description: "Work Locations",
  },
  {
    id: "skills",
    title: "Skills",
    icon: Code,
    description: "Skills & Expertise",
  },
];

export default function EditProfileForm({ initialData }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: null, message: "" });

  const step = STEPS[currentStep];

  const handleStepClick = (stepIndex) => {
    setCurrentStep(stepIndex);
    setSubmitStatus({ type: null, message: "" });
  };

  const handleSubmit = async (formData) => {
  setIsLoading(true);
  setSubmitStatus({ type: null, message: "" });

  try {
    const sectionData = initialData[step.id]
    let isNew
    if(step.id === "personal"){
      isNew = initialData?.candidate?.id === null
    }else if (step.id === "skills") {
      isNew = initialData?.candidate?.skills?.length === 0
    } else {
      isNew = !sectionData || sectionData.length === 0
    }

    if (Array.isArray(formData)) {
      const results = await Promise.all(
        formData.map((item) => {
      const isItemNew = !item.id;
      return updateCandidateProfile(step.id, item, isItemNew);
    })
      );

    const hasError = results.some((res) => res.success === false);

      if (hasError) {
        setSubmitStatus({ type: "error", message: "Some employment entries failed to save." });
      } else {
        setSubmitStatus({ type: "success", message: "All employment entries saved successfully." });
      }
    } else {
      const result = await updateCandidateProfile(step.id, formData, isNew);

      if (result.success) {
        setSubmitStatus({ type: "success", message: "Saved successfully." });
      } else {
        setSubmitStatus({ type: "error", message: result.message || "Failed to save." });
      }
    }
  } catch (err) {
    setSubmitStatus({ type: "error", message: err?.message || "Network Error" });
  } finally {
    setIsLoading(false);
  }
};

  const personalDetails = {
    id: initialData?.candidate?.id,
    full_name: initialData?.candidate?.full_name,
    primary_phone_number: initialData?.candidate?.primary_phone_number,
    secondary_phone_number: initialData?.candidate?.secondary_phone_number,
    national_id: initialData?.candidate.national_id,
    career_start_date: initialData?.candidate?.career_start_date,
    field_of_specialization: initialData?.candidate?.field_of_specialization,
    other_specialization: initialData?.candidate?.other_specialization,
  };
  const employmentData = initialData?.employment?.map((emp) => ({
    id: emp?.id,
    company_name: emp?.company_name,
    designation: emp?.designation,
    joining_date: emp?.joining_date,
    end_date: emp?.end_date,
    is_current: emp?.is_current,
    employment_type: emp?.employment_type,
  }));

  const compensationData = {
    id: initialData?.compensation[0]?.id,
    current_salary: Number(initialData?.compensation[0]?.current_salary),
    expected_salary: Number(initialData?.compensation[0]?.expected_salary),
    currency: initialData?.compensation[0]?.currency,
    notice_period: initialData?.compensation[0]?.notice_period,
  };

  const skillsData = initialData?.candidate.skills?.map((skill) => {
    return {
      id: skill?.id,
      name: skill?.name,
    };
  });
  const documentData = {
      id: initialData?.document[0]?.id,
      linked_in_url: initialData?.document[0]?.linked_in_url,
      resume: initialData?.document[0]?.resume
    }
    const locationData =  {
      id: initialData?.location[0]?.id,
      current_job_location: initialData?.location[0]?.current_job_location
    }

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
        <div className="form-container">
          <h2 className="form-title">{step.description}</h2>

          {submitStatus.type && (
            <div className={`form-status-message ${submitStatus.type}`}>
              {submitStatus.message}
            </div>
          )}
          {step.id === "personal" && (
            <PersonalDetailsForm
              initialData={personalDetails}
              onSubmit={handleSubmit}
              isLoading={isLoading}
            />
          )}

          {step.id === "employment" && (
            <EmploymentHistoryForm
              initialData={employmentData}
              onSubmit={handleSubmit}
              isLoading={isLoading}
            />
          )}

          {step.id === "compensation" && (
            <CompensationForm
              initialData={compensationData}
              onSubmit={handleSubmit}
              isLoading={isLoading}
            />
          )}

          {step.id === "document" && (
            <DocumentsForm
              initialData={documentData}
              onSubmit={handleSubmit}
              isLoading={isLoading}
              setSubmitStatus={setSubmitStatus}
            />
          )}

          {step.id === "location" && (
            <LocationsForm
              initialData={locationData}
              onSubmit={handleSubmit}
              isLoading={isLoading}
            />
          )}

          {step.id === "skills" && (
            <SkillsForm
              initialData={skillsData}
              onSubmit={handleSubmit}
              isLoading={isLoading}
            />
          )}
          <div className="form-navigation">
            <button
              onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
              disabled={currentStep === 0 || isLoading}
              className="btn btn-secondary2"
              type="button"
            >
              Previous
            </button>

            <button
              onClick={() =>
                setCurrentStep(Math.min(STEPS.length - 1, currentStep + 1))
              }
              disabled={currentStep === STEPS.length - 1 || isLoading}
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
