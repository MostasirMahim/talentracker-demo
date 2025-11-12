"use client";
import React, { useState } from "react";

import { Download, Edit } from "lucide-react";
import axiosInstance from "@/lib/axiosIntance";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";

const STATUS_CHOICES = [
  { value: "pending", label: "Pending" },
  { value: "accepted", label: "Accepted" },
  { value: "rejected", label: "Rejected" },
  { value: "reached", label: "Reached" },
];

export default function CandidateProfileForApplication({
  candidateData,
  job_application_id,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: { status: "" },
  });

  const [showUpdateStatusForm, setShowUpdateStatusForm] = useState(false);

  const onSubmit = async (data) => {
    try {
      const req_data = {
        job_application: job_application_id,
        status: data.status,
      };
      console.log(req_data);
      const response = await axiosInstance.patch(
        "/api/jobs/v1/job_applications/",
        req_data
      );
      if (response.status === 200) {
        toast.success("Status updated successfully!");
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to update status");
    }
  };

  if (!candidateData?.data) return <p>No candidate data found.</p>;

  const {
    candidate,
    employment,
    compensation,
    document: documents,
    location,
  } = candidateData.data;

  const handleDownloadResume = async () => {
    try {
      const response = await axiosInstance.get(
        `/api/candidates/v1/candidates/download_resume/${candidate.id}/`,
        {
          responseType: "blob",
        }
      );
      if (response.status === 200) {
        // Extract filename if provided by the backend
        const contentDisposition = response.headers["content-disposition"];

        let fileName = "resume.pdf";
        if (contentDisposition) {
          const fileNameMatch =
            contentDisposition.match(/filename="?([^"]+)"?/);
          if (fileNameMatch && fileNameMatch[1]) {
            fileName = fileNameMatch[1];
          }
        }

        // Create a blob URL and trigger the download
        const blob = new Blob([response.data]);
        const url = window.URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();

        // Cleanup
        a.remove();
        window.URL.revokeObjectURL(url);

        toast.success("Resume downloaded successfully");
      }
    } catch (error) {
      // If the request itself failed (network/server)
      console.log(error);
      if (error?.response && error?.response?.data instanceof Blob) {
        try {
          // Try to parse blob to JSON
          const text = await error.response.data.text();
          const json = JSON.parse(text);

          if (json.errors) {
            Object.keys(json.errors).forEach((field) => {
              toast.error(`${field}: ${json.errors[field][0]}`);
            });
          } else {
            toast.error(json.message || "Error while downloading file.");
          }
        } catch {
          toast.error("Unexpected error while parsing server response.");
        }
      } else {
        toast.error(
          error.response?.data?.message || "Network error. Please try again."
        );
      }
    }
  };

  const handleUpdateStatus = () => {
    setShowUpdateStatusForm((state) => !state);
  };

  return (
    <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-6 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center border-b pb-4">
        <h2 className="text-2xl font-bold text-gray-800">
          Candidate Profile: {candidate.full_name}
        </h2>
        <span className="text-sm text-gray-500">
          ID: {candidate.id} | Last Updated:{" "}
          {new Date(candidate.updated_at).toLocaleDateString()}
        </span>
      </div>

      {/* Basic Info */}
      <section>
        <h3 className="text-lg font-semibold text-gray-700 mb-3">
          Personal Information
        </h3>
        <div className="grid grid-cols-2 gap-4 text-gray-700">
          <p>
            <strong>Email:</strong> {candidate.email}
          </p>
          <p>
            <strong>Primary Phone:</strong> {candidate.primary_phone_number}
          </p>
          <p>
            <strong>Secondary Phone:</strong>{" "}
            {candidate.secondary_phone_number || "N/A"}
          </p>
          <p>
            <strong>National ID:</strong> {candidate.national_id || "N/A"}
          </p>
          <p>
            <strong>Career Start Date:</strong> {candidate.career_start_date}
          </p>
          <p>
            <strong>Field of Specialization:</strong>{" "}
            {candidate.field_of_specialization}
          </p>
          <p>
            <strong>Other Specialization:</strong>{" "}
            {candidate.other_specialization || "N/A"}
          </p>
        </div>
        <div className="mt-3">
          <strong>Skills:</strong>{" "}
          <span className="flex flex-wrap gap-2 mt-1">
            {candidate.skills.map((skill) => (
              <span
                key={skill.id}
                className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
              >
                {skill.name}
              </span>
            ))}
          </span>
        </div>
      </section>

      {/* Employment History */}
      <section>
        <h3 className="text-lg font-semibold text-gray-700 mb-3">
          Employment History
        </h3>
        <div className="space-y-4">
          {employment.map((job) => (
            <div
              key={job.id}
              className="border rounded-lg p-4 bg-gray-50 flex justify-between"
            >
              <div>
                <p className="font-semibold text-gray-800">
                  {job.designation} @ {job.company_name}
                </p>
                <p className="text-sm text-gray-600">
                  {job.joining_date} →{" "}
                  {job.is_current ? "Present" : job.end_date}
                </p>
                <p className="text-sm text-gray-600">
                  Type: {job.employment_type}
                </p>
              </div>
              {job.is_current && (
                <span className="text-green-600 font-medium text-sm self-start">
                  Current
                </span>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Compensation */}
      <section>
        <h3 className="text-lg font-semibold text-gray-700 mb-3">
          Compensation
        </h3>
        {compensation.length > 0 && (
          <div className="border rounded-lg p-4 bg-gray-50">
            <p>
              <strong>Current Salary:</strong> {compensation[0].current_salary}{" "}
              {compensation[0].currency}
            </p>
            <p>
              <strong>Expected Salary:</strong>{" "}
              {compensation[0].expected_salary}
            </p>
            <p>
              <strong>Notice Period:</strong> {compensation[0].notice_period}
            </p>
          </div>
        )}
      </section>

      {/* Location */}
      <section>
        <h3 className="text-lg font-semibold text-gray-700 mb-3">Location</h3>
        {location.length > 0 && (
          <div className="border rounded-lg p-4 bg-gray-50">
            <p>
              <strong>Current Job Location:</strong>{" "}
              {location[0].current_job_location}
            </p>
          </div>
        )}
      </section>

      {/* Document */}
      <section>
        <h3 className="text-lg font-semibold text-gray-700 mb-3">Documents</h3>
        {documents.length > 0 && (
          <div className="border rounded-lg p-4 bg-gray-50 space-y-2">
            <p>
              <strong>LinkedIn:</strong>{" "}
              <a
                href={documents[0].linked_in_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                {documents[0].linked_in_url}
              </a>
            </p>
            <p>
              <strong>Resume:</strong>{" "}
              <span className="text-gray-600">
                {documents[0].resume.split("/").pop()}
              </span>
            </p>
          </div>
        )}
      </section>

      {/* Action Buttons */}
      <div className="flex justify-end gap-4 pt-4 border-t">
        <button
          onClick={() => handleDownloadResume()}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          <Download size={18} /> Download Resume
        </button>
        <button
          onClick={() => handleUpdateStatus()}
          className="flex items-center gap-2 bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition"
        >
          {showUpdateStatusForm ? (
            <>Cancel</>
          ) : (
            <>
              <Edit size={18} /> Update Status
            </>
          )}
        </button>
      </div>

      {showUpdateStatusForm && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md space-y-4"
        >
          <h2 className="text-xl font-semibold text-gray-800">
            Update Job Status
          </h2>

          <div>
            <label
              htmlFor="status"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Status
            </label>
            <select
              id="status"
              {...register("status", { required: "Please select a status" })}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.status ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Select status</option>
              {STATUS_CHOICES.map((choice) => (
                <option key={choice.value} value={choice.value}>
                  {choice.label}
                </option>
              ))}
            </select>
            {errors.status && (
              <p className="text-sm text-red-500 mt-1">
                {errors.status.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Updating..." : "Update Status"}
          </button>
        </form>
      )}
    </div>
  );
}
