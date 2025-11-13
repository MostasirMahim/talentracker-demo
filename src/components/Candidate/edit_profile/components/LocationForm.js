"use client"

import { useForm } from "react-hook-form"



export default function LocationsForm({ initialData, onSubmit, isLoading }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: initialData || {},
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="profile-form">
      <div className="form-group">
        <label className="form-label">Current Job Location *</label>
        <input
          {...register("current_job_location", {
            required: "Location is required",
          })}
          type="text"
          className="form-input"
          placeholder="Enter current job location"
        />
        {errors.current_job_location && <span className="form-error">{errors.current_job_location.message}</span>}
      </div>

      <button type="submit" disabled={isLoading} className="btn btn-primary">
        {isLoading ? "Saving..." : "Save & Continue"}
      </button>
    </form>
  )
}
