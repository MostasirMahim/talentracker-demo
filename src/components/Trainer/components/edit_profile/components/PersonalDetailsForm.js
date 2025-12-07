"use client"

import { set_trainer_profile } from "@/actions/trainer"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"

export default function TrainerDetailsForm({ initialData }) {
  const [isLoading, setIsLoading] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: initialData || {},
  })

  const onSubmit = async (data) => {
    setIsLoading(true)
    try {
      const result = await set_trainer_profile(data, initialData ? { id: initialData.id } : null)
      if (result.success) {
        toast.success(result.message)
      } else {
        console.log(result)
        toast.error(result.message)
      }
    } catch (error) {
      toast.error("An error occurred while saving")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="profile-form">
      <div className="form-group">
        <label className="form-label">Full Name *</label>
        <input
          {...register("full_name", { required: "Full name is required" })}
          type="text"
          className="form-input"
          placeholder="Enter your full name"
        />
        {errors.full_name && <span className="form-error">{errors.full_name.message}</span>}
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
        <label className="form-label">LinkedIn Profile</label>
        <input
          {...register("linked_profile")}
          type="url"
          className="form-input"
          placeholder="https://linkedin.com/in/yourprofile"
        />
      </div>

      <button type="submit" disabled={isLoading} className="btn btn-primary">
        {isLoading ? "Saving..." : "Save & Continue"}
      </button>
    </form>
  )
}
