"use client";

import { useForm, useFieldArray, useWatch } from "react-hook-form";
import { Trash2, Plus } from "lucide-react";
import "../style.css";
import { useEffect } from "react";

export default function EmploymentHistoryForm({
  initialData,
  onSubmit,
  isLoading,
}) {
  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      employment:
        initialData && Array.isArray(initialData) && initialData.length > 0
          ? initialData
          : [
              {
                id: "",
                company_name: "",
                designation: "",
                joining_date: "",
                end_date: "",
                is_current: false,
                employment_type: "",
              },
            ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "employment",
  });

  const employmentData = useWatch({
    control,
    name: "employment",
  });

  useEffect(() => {
    const currentIndex = employmentData?.findIndex(
      (item) => item.is_current === true
    );

    if (currentIndex !== -1) {
      employmentData.forEach((item, index) => {
        if (index !== currentIndex && item.is_current === true) {
          setValue(`employment.${index}.is_current`, false);
        }
      });
    }
  }, [employmentData, setValue]);

  const handleCheckboxChange = (checkedIndex) => {
    employmentData.forEach((item, index) => {
      if (index !== checkedIndex) {
        setValue(`employment.${index}.is_current`, false);
      }
    });
  };
  const handleFormSubmit = (data) => {
    onSubmit(data.employment);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="profile-form">
      {fields.map((field, index) => (
        <div key={field.id} className="employment-form-group">
          <div className="employment-form-header">
            <h3 className="employment-form-title">Employment {index + 1}</h3>
            {fields.length > 1 && (
              <button
                type="button"
                onClick={() => remove(index)}
                className="btn btn-icon btn-danger"
                title="Remove employment"
              >
                <Trash2 className="icon-md" />
              </button>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">Company Name *</label>
            <input
              {...register(`employment.${index}.company_name`, {
                required: "Company name is required",
              })}
              type="text"
              className="form-input"
              placeholder="Enter company name"
            />
            {errors.employment?.[index]?.company_name && (
              <span className="form-error">
                {errors.employment[index]?.company_name?.message}
              </span>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">Designation *</label>
            <input
              {...register(`employment.${index}.designation`, {
                required: "Designation is required",
              })}
              type="text"
              className="form-input"
              placeholder="Enter designation"
            />
            {errors.employment?.[index]?.designation && (
              <span className="form-error">
                {errors.employment[index]?.designation?.message}
              </span>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">Joining Date *</label>
            <input
              {...register(`employment.${index}.joining_date`, {
                required: "Joining date is required",
              })}
              type="date"
              className="form-input"
            />
            {errors.employment?.[index]?.joining_date && (
              <span className="form-error">
                {errors.employment[index]?.joining_date?.message}
              </span>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">End Date</label>
            <input
              {...register(`employment.${index}.end_date`)}
              type="date"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Employment Type</label>
            <select
              {...register(`employment.${index}.employment_type`)}
              className="form-input"
            >
              <option value="">Select employment type</option>
              <option value="full_time">Full Time</option>
              <option value="part_time">Part Time</option>
              <option value="contract">Contract</option>
              <option value="freelance">Freelance</option>
            </select>
          </div>

          <div className="form-group checkbox-group">
            <label className="checkbox-label">
              <input
                {...register(`employment.${index}.is_current`)}
                type="checkbox"
                onChange={(e) => {
                  if (e.target.checked) {
                    handleCheckboxChange(index);
                  }
                }}
              />
              <span>Currently working here</span>
            </label>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={() =>
          append({
            company_name: "",
            designation: "",
            joining_date: "",
            end_date: "",
            employment_type: "",
            is_current: false,
          })
        }
        className="btn btn-secondary gap-2"
      >
        <Plus className="icon-md" />
        Add Employment
      </button>

      <button type="submit" disabled={isLoading} className="btn btn-primary">
        {isLoading ? "Saving..." : "Save & Continue"}
      </button>
    </form>
  );
}
