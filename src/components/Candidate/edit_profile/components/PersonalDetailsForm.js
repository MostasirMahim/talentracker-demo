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
        <label className="form-label">
          Full Name <span className="text-danger">*</span>
        </label>
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
        <label className="form-label">
          Primary Phone Number <span className="text-danger">*</span>
        </label>
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
        <label className="form-label">
          Gender <span className="text-danger">*</span>
        </label>
        <select
          {...register(`gender`, {
            required: "Gender is required",
          })}
          className="form-input"
        >
          <option value="">Select Gender</option>
          <option value="N/A">Prefer not to say</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="custom">Custom</option>
        </select>
        {errors.gender && (
          <span className="form-error">{errors.gender.message}</span>
        )}
      </div>

      <div className="form-group">
        <label className="form-label">Present Address</label>
        <input
          {...register("present_address")}
          type="text"
          className="form-input"
          placeholder="Enter present address"
        />
      </div>

      <div className="form-group">
        <label className="form-label">Permanent Address</label>
        <input
          {...register("permanent_address")}
          type="text"
          className="form-input"
          placeholder="Enter permanent address"
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
        <label className="form-label">
          Career Start Date <span className="text-danger">*</span>
        </label>
        <input
          {...register("career_start_date", {
            required: "Career start date is required",
          })}
          type="date"
          className="form-input"
        />
        {errors.career_start_date && (
          <span className="form-error">{errors.career_start_date.message}</span>
        )}
      </div>

      <div className="form-group">
        <label className="form-label">
          Field of Specialization <span className="text-danger">*</span>
        </label>
        <input
          {...register("field_of_specialization", {
            required: "Field of specialization is required",
          })}
          type="text"
          className="form-input"
          placeholder="Enter field of specialization"
        />
        {errors.field_of_specialization && (
          <span className="form-error">
            {errors.field_of_specialization.message}
          </span>
        )}
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
