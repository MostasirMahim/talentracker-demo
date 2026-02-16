"use client";

import { useForm } from "react-hook-form";

export default function CompensationForm({ initialData, onSubmit, isLoading }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: initialData || {},
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="profile-form">
      <div className="form-group">
        <label className="form-label">
          Current Salary <span className="text-danger">*</span>{" "}
        </label>
        <input
          {...register("current_salary", {
            required: "Current salary is required",
          })}
          type="number"
          className="form-input"
          placeholder="Enter current salary"
        />
        {errors.current_salary && (
          <span className="form-error">{errors.current_salary?.message}</span>
        )}
      </div>
      <div className="form-group">
        <label className="form-label">Other Benefits</label>
        <input
          {...register("other_benefits")}
          type="text"
          className="form-input"
          placeholder="write other benefits.."
        />
        {errors.other_benefits && (
          <span className="form-error">{errors.other_benefits?.message}</span>
        )}
      </div>

      <div className="form-group">
        <label className="form-label">
          Expected Salary <span className="text-danger">*</span>
        </label>
        <input
          {...register("expected_salary", {
            required: "Expected salary is required",
          })}
          type="number"
          className="form-input"
          placeholder="Enter expected salary"
        />
        {errors.expected_salary && (
          <span className="form-error">{errors.expected_salary?.message}</span>
        )}
      </div>

      <div className="form-group">
        <label className="form-label">
          Currency <span className="text-danger">*</span>
        </label>
        <select
          {...register("currency", {
            required: "Currency salary is required",
          })}
          className="form-input"
        >
          <option value="">Select currency</option>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="GBP">GBP</option>
          <option value="BDT">BDT</option>
          <option value="INR">INR</option>
        </select>
        {errors.currency && (
          <span className="form-error">{errors.currency?.message}</span>
        )}
      </div>

      <div className="form-group">
        <label className="form-label">
          Notice Period <span className="text-danger">*</span>
        </label>
        <input
          {...register("notice_period", {
            required: "Notice period is required",
          })}
          type="text"
          className="form-input"
          placeholder="e.g., 30 days, 2 weeks"
        />
        {errors.notice_period && (
          <span className="form-error">{errors.notice_period?.message}</span>
        )}
      </div>

      <button type="submit" disabled={isLoading} className="btn btn-primary">
        {isLoading ? "Saving..." : "Save & Continue"}
      </button>
    </form>
  );
}
