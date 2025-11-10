"use client";

import axiosInstance from "@/lib/axiosIntance";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function JobTypeForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    setError,
  } = useForm();

  const onSubmit = async (data) => {
    console.log("Submitted Data:", data);
    try {
      const response = await axiosInstance.post(
        "/api/jobs/v1/job_types/",
        data
      );
      if (response.status == 201) {
        toast.success("Job type created successfully");
        reset();
      }
    } catch (error) {
      console.log(error);
      // Backend returns structured validation errors
      if (error.response?.data?.errors) {
        const backendErrors = error.response?.data?.errors;

        // Dynamically set errors for each invalid field
        Object.keys(backendErrors).forEach((field) => {
          setError(field, {
            type: "server",
            message: backendErrors[field][0],
          });
          // Optional toast for each field
          toast.error(`${field}: ${backendErrors[field][0]}`);
        });
      } else {
        // Fallback if no detailed error
        toast.error(
          error.response?.data?.message ||
            "Something went wrong. Please try again."
        );
      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow-md rounded-xl p-6 border border-gray-200">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
        Set Job type
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Input Field */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Type name
          </label>
          <input
            type="text"
            id="name"
            placeholder="Enter job type name (e.g., on-site,remote)"
            className={`w-full px-4 py-2 rounded-lg border text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.name ? "border-red-500" : "border-gray-300"
            }`}
            {...register("name", {
              required: "Site name is required",
              minLength: {
                value: 2,
                message: "Must be at least 2 characters",
              },
            })}
          />
          {errors.name && (
            <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white font-medium py-2.5 rounded-lg hover:bg-blue-700 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
