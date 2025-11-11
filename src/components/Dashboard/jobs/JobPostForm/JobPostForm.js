"use client";

import { useForm, Controller } from "react-hook-form";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

import "react-quill/dist/quill.snow.css";
import axiosInstance from "@/lib/axiosIntance";
import { toast } from "react-toastify";
import { useJob } from "@/stores/job_dependencies_update_store";
import { useRouter, useSearchParams } from "next/navigation";

// Dynamically import React Quill (prevents SSR issues)
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export default function JobPostForm({ jobTypes, jobCategories, jobLocations }) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const [editorValue, setEditorValue] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const job_id = searchParams.get("job_id");
  const getJob = useJob((state) => state.getJob);
  const clearJob = useJob((state) => state.clearJob);

  useEffect(() => {
    if (job_id) {
      const job = getJob();
      setEditorValue(job.body);
      reset({
        body: job.body,
        title: job.title,
        short_description: job.short_description,
        salary: job.salary,
        deadline: job.deadline,
        job_type: job.job_type.id,
        job_category: job.job_category.id,
        job_location: job.job_location.id,
      });
    } else {
      reset();
    }

    return () => {
      reset();
    };
  }, [job_id, getJob, reset]);

  const onSubmit = async (data) => {
    const payload = {
      ...data,
      body: editorValue,
      salary: data.salary,
      job_type: parseInt(data.job_type),
      job_category: parseInt(data.job_category),
      job_location: parseInt(data.job_location),
    };

    try {
      if (job_id) {
        const response = await axiosInstance.patch(
          `/api/jobs/v1/jobs/${job_id}/`,
          payload
        );
        if (response.status == 200) {
          toast.success("Job updated successfully");
          reset();
          clearJob();
          setEditorValue("");
          router.push("/dashboard/jobs/");
          router.refresh();
          return;
        }
      } else {
        const res = await axiosInstance.post("/api/jobs/v1/jobs/", payload);
        if (res.status === 201) {
          toast.success("Job posted successfully!");
          reset();
          setEditorValue("");
        }
      }
    } catch (error) {
      console.error(error);
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
    <div className="max-w-3xl mx-auto bg-white border border-gray-200 shadow-sm rounded-2xl p-8 mt-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Publish New Job
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Title */}
        <div>
          <label className="block font-medium mb-2 text-gray-700">
            Job Title
          </label>
          <input
            type="text"
            placeholder="Enter job title"
            {...register("title", { required: "Job title is required" })}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
              errors.title ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>
        <div>
          <label className="block font-medium mb-2 text-gray-700">
            Job short description
          </label>
          <input
            type="text"
            placeholder="Enter job short description"
            {...register("short_description")}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
              errors.short_description ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.short_description && (
            <p className="text-red-500 text-sm mt-1">
              {errors.short_description.message}
            </p>
          )}
        </div>

        {/* Rich Text Editor */}
        <div>
          <label className="block font-medium mb-2 text-gray-700">
            Job Description
          </label>
          <Controller
            name="body"
            control={control}
            rules={{ required: "Job description is required" }}
            render={({ field }) => (
              <ReactQuill
                theme="snow"
                value={field.value || ""}
                onChange={(val) => {
                  field.onChange(val);
                  setEditorValue(val);
                }}
                className="bg-white rounded-lg"
              />
            )}
          />
          {!editorValue && (
            <p className="text-red-500 text-sm mt-1">{errors.body?.message}</p>
          )}
        </div>

        {/* Salary */}
        <div>
          <label className="block font-medium mb-2 text-gray-700">
            Salary (in thousands)
          </label>
          <input
            type="text"
            placeholder="Enter salary Or negotiable"
            {...register("salary", { required: "Salary is required" })}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
              errors.salary ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.salary && (
            <p className="text-red-500 text-sm mt-1">{errors.salary.message}</p>
          )}
        </div>

        {/* Deadline */}
        <div>
          <label className="block font-medium mb-2 text-gray-700">
            Application Deadline
          </label>
          <input
            type="date"
            {...register("deadline", { required: "Deadline is required" })}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
              errors.deadline ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.deadline && (
            <p className="text-red-500 text-sm mt-1">
              {errors.deadline.message}
            </p>
          )}
        </div>

        {/* Job Type */}
        <div>
          <label className="block font-medium mb-2 text-gray-700">
            Job Type
          </label>
          <select
            {...register("job_type", { required: "Job type is required" })}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
              errors.job_type ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">Select Job Type</option>
            {jobTypes?.data.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
          </select>
          {errors.job_type && (
            <p className="text-red-500 text-sm mt-1">
              {errors.job_type.message}
            </p>
          )}
        </div>

        {/* Job Category */}
        <div>
          <label className="block font-medium mb-2 text-gray-700">
            Job Category
          </label>
          <select
            {...register("job_category", {
              required: "Job category is required",
            })}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
              errors.job_category ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">Select Category</option>
            {jobCategories?.data.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
          {errors.job_category && (
            <p className="text-red-500 text-sm mt-1">
              {errors.job_category.message}
            </p>
          )}
        </div>

        {/* Job Location */}
        <div>
          <label className="block font-medium mb-2 text-gray-700">
            Job Location
          </label>
          <select
            {...register("job_location", {
              required: "Job location is required",
            })}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
              errors.job_location ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">Select Location</option>
            {jobLocations?.data.map((loc) => (
              <option key={loc.id} value={loc.id}>
                {loc.city}, {loc.country}
              </option>
            ))}
          </select>
          {errors.job_location && (
            <p className="text-red-500 text-sm mt-1">
              {errors.job_location.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-all disabled:opacity-60"
          >
            {isSubmitting ? "Publishing..." : "Publish Job"}
          </button>
        </div>
      </form>
    </div>
  );
}
