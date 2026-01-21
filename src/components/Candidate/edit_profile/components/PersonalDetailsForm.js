"use client";

import { useForm } from "react-hook-form";

export default function PersonalDetailsForm({
  initialData,
  onSubmit,
  isLoading,
}) {
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
        <label className="form-label">Full Name </label>
        <input
          {...register("full_name", { required: "Full name is required" })}
          type="text"
          className="form-input"
          placeholder="Enter your full name"
        />
        {errors.full_name && (
          <span className="form-error">{errors.full_name.message}</span>
        )}
      </div>

      <div className="form-group">
        <label className="form-label">Primary Phone Number </label>
        <input
          {...register("primary_phone_number", {
            required: "Phone number is required",
          })}
          type="tel"
          className="form-input"
          placeholder="Enter primary phone number"
        />
        {errors.primary_phone_number && (
          <span className="form-error">
            {errors.primary_phone_number.message}
          </span>
        )}
      </div>

      <div className="form-group">
        <label className="form-label">Secondary Phone Number</label>
        <input
          {...register("secondary_phone_number")}
          type="tel"
          className="form-input"
          placeholder="Enter secondary phone number"
        />
      </div>

      <div className="form-group">
        <label className="form-label">National ID</label>
        <input
          {...register("national_id")}
          type="text"
          className="form-input"
          placeholder="Enter national ID"
        />
      </div>

      <div className="form-group">
        <label className="form-label">Career Start Date</label>
        <input
          {...register("career_start_date")}
          type="date"
          className="form-input"
        />
      </div>

      <div className="form-group">
        <label className="form-label">Field of Specialization</label>
        <input
          {...register("field_of_specialization")}
          type="text"
          className="form-input"
          placeholder="Enter field of specialization"
        />
      </div>

      <div className="form-group">
        <label className="form-label">Other Specialization</label>
        <input
          {...register("other_specialization")}
          type="text"
          className="form-input"
          placeholder="Enter other specialization"
        />
      </div>

      <button type="submit" disabled={isLoading} className="btn btn-primary">
        {isLoading ? "Saving..." : "Save & Continue"}
      </button>
    </form>
  );
}
