"use client"

import { useForm } from "react-hook-form"

export default function CompensationForm({ initialData, onSubmit, isLoading }) {
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
        <label className="form-label">Current Salary</label>
        <input
          {...register("current_salary")}
          type="number"
          className="form-input"
          placeholder="Enter current salary"
        />
      </div>

      <div className="form-group">
        <label className="form-label">Expected Salary</label>
        <input
          {...register("expected_salary")}
          type="number"
          className="form-input"
          placeholder="Enter expected salary"
        />
      </div>

      <div className="form-group">
        <label className="form-label">Currency</label>
        <select {...register("currency")} className="form-input">
          <option value="">Select currency</option>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="GBP">GBP</option>
          <option value="BDT">BDT</option>
          <option value="INR">INR</option>
        </select>
      </div>

      <div className="form-group">
        <label className="form-label">Notice Period</label>
        <input {...register("notice_period")} type="text" className="form-input" placeholder="e.g., 30 days, 2 weeks" />
      </div>

      <button type="submit" disabled={isLoading} className="btn btn-primary">
        {isLoading ? "Saving..." : "Save & Continue"}
      </button>
    </form>
  )
}
