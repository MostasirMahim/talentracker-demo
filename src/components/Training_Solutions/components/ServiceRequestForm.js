"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import "./service_req.css";
import { toast } from "react-toastify";
import { create_service_request } from "@/actions/training_solutions";

const serviceRequestSchema = z.object({
  full_name: z.string().min(2, "Name must be at least 2 characters").max(100),
  designation: z.string().min(2, "Designation is required").max(100),
  company_name: z.string().min(2, "Company name is required").max(100),
  email: z.string().email("Please enter a valid email address"),
  cell_number: z
    .string()
    .min(7, "Phone number must be at least 7 characters")
    .max(20),
  additional_information: z
    .string()
    .min(10, "Please provide more details (at least 10 characters)")
    .max(1000),
  category_id: z.string().min(1, "Please select a category"),
});

export function ServiceRequestForm({ categories: CATEGORIES }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(serviceRequestSchema),
    defaultValues: {
      category_id: "",
    },
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    const formData = {
      ...data,
      category_id: Number.parseInt(data.category_id, 10),
    };
    try {
      const res = await create_service_request(formData);
      if (!res?.success) {
        console.log(res);
        if (res?.data?.errors) {
          Object.entries(res.data.errors).forEach(([field, messages]) => {
            messages.forEach((msg) => toast.error(msg));
          });
        } else if (res?.message) {
          toast.error(res.message);
        }
      } else {
        setSubmitSuccess(true);
        toast.success("Service request submitted successfully");
      }
    } catch (err) {
      console.log(err);
      toast.error("Service request submission failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="sr-container">
      <div className="sr-header">
        <div className="sr-badge">
          <span>SERVICE REQUEST</span>
        </div>
        <h1 className="sr-title">Tell Us How We Can Help</h1>
        <p className="sr-subtitle">
          Fill out the form below and our team will get back to you within 24
          hours
        </p>
      </div>

      <div className={`sr-success ${submitSuccess ? "show" : ""}`}>
        <p>
          ✓ Your request has been submitted successfully! We ll be in touch
          soon.
        </p>
      </div>

      <div className="sr-form-card">
        <form onSubmit={handleSubmit(onSubmit)} className="sr-form">
          <div className="sr-form-row">
            <div className="sr-form-group">
              <label className="sr-label">
                Full Name <span className="sr-required">*</span>
              </label>
              <input
                {...register("full_name")}
                type="text"
                placeholder="John Doe"
                className="sr-input"
              />
              {errors.full_name && (
                <p className="sr-error">{errors.full_name.message}</p>
              )}
            </div>

            <div className="sr-form-group">
              <label className="sr-label">
                Designation <span className="sr-required">*</span>
              </label>
              <input
                {...register("designation")}
                type="text"
                placeholder="e.g., Manager, Director"
                className="sr-input"
              />
              {errors.designation && (
                <p className="sr-error">{errors.designation.message}</p>
              )}
            </div>
          </div>
          <div className="sr-form-row">
            <div className="sr-form-group">
              <label className="sr-label">
                Company Name <span className="sr-required">*</span>
              </label>
              <input
                {...register("company_name")}
                type="text"
                placeholder="Your Company"
                className="sr-input"
              />
              {errors.company_name && (
                <p className="sr-error">{errors.company_name.message}</p>
              )}
            </div>

            <div className="sr-form-group">
              <label className="sr-label">
                Email Address <span className="sr-required">*</span>
              </label>
              <input
                {...register("email")}
                type="email"
                placeholder="john@example.com"
                className="sr-input"
              />
              {errors.email && (
                <p className="sr-error">{errors.email.message}</p>
              )}
            </div>
          </div>
          <div className="sr-form-row">
            <div className="sr-form-group">
              <label className="sr-label">
                Phone Number <span className="sr-required">*</span>
              </label>
              <input
                {...register("cell_number")}
                type="text"
                placeholder="+1 (555) 123-4567"
                className="sr-input"
              />
              {errors.cell_number && (
                <p className="sr-error">{errors.cell_number.message}</p>
              )}
            </div>

            <div className="sr-form-group">
              <label className="sr-label">
                Service Category <span className="sr-required">*</span>
              </label>
              <select {...register("category_id")} className="sr-select">
                <option value="">Select a category</option>
                {CATEGORIES?.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              {errors.category_id && (
                <p className="sr-error">{errors.category_id.message}</p>
              )}
            </div>
          </div>
          <div className="sr-form-group">
            <label className="sr-label">
              Additional Information <span className="sr-required">*</span>
            </label>
            <textarea
              {...register("additional_information")}
              placeholder="Please describe your service request in detail..."
              className="sr-textarea"
            />
            {errors.additional_information && (
              <p className="sr-error">
                {errors.additional_information.message}
              </p>
            )}
          </div>
          <div>
            <button type="submit" disabled={isSubmitting} className="sr-button">
              {isSubmitting ? (
                <>
                  <span className="sr-button-spinner"></span>
                  Submitting...
                </>
              ) : (
                "Submit Request"
              )}
            </button>
          </div>

          <p className="sr-form-footer">
            All fields are required. We ll respond to your request within 24
            hours.
          </p>
        </form>
      </div>
    </div>
  );
}
