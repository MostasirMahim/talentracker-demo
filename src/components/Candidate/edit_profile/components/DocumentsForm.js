"use client"

import { useForm } from "react-hook-form"

export default function DocumentsForm({ initialData, onSubmit, isLoading }) {
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
        <label className="form-label">LinkedIn URL</label>
        <input
          {...register("linked_in_url")}
          type="url"
          className="form-input"
          placeholder="https://linkedin.com/in/yourprofile"
        />
      </div>

      <div className="form-group">
        <label className="form-label">Resume</label>
        <input {...register("resume")} type="file" className="form-input" accept=".pdf,.doc,.docx" />
        <small className="form-hint">Accepted formats: PDF, DOC, DOCX</small>
      </div>

      <button type="submit" disabled={isLoading} className="btn btn-primary">
        {isLoading ? "Saving..." : "Save & Continue"}
      </button>
    </form>
  )
}
