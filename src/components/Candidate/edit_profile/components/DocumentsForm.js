"use client";

import { uploadDocument } from "@/actions/candidate";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function DocumentsForm({ initialData, setSubmitStatus }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: initialData || {},
  });
  const [isLoading, setIsLoading] = useState(false);
  const isNew = initialData?.id === null || initialData?.id === undefined;
  const onSubmit = async (data) => {
    setIsLoading(true);
    if (
      !data.resume ||
      data.resume == initialData.resume ||
      !data.linked_in_url
    ) {
      toast.error("Please upload your resume and LinkedIn URL.");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("linked_in_url", data.linked_in_url || "");

      if (data.resume && data.resume[0]) {
        formData.append("resume", data.resume[0]);
      }
      const result = await uploadDocument(formData, isNew);
      if (result.success) {
        toast.success(result.message);
        setSubmitStatus({ type: "success", message: "Saved successfully." });
      } else {
        toast.error(result.message);
        setSubmitStatus({ type: "error", message: result.message });
        console.log(result.data);
      }
    } catch (err) {
      toast.error(err.message);
      setSubmitStatus({ type: "error", message: err.message });
    } finally {
      setIsLoading(false);
    }
  };

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
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <label className="form-label">
            Resume <span className="text-danger">*</span>
          </label>
          <small style={{ color: "#0e4c89" }}>
            {initialData?.resume?.split("/").pop()}
          </small>
        </div>
        <input
          {...register("resume", {
            required: "Resume is required",
          })}
          type="file"
          className="form-input"
          accept=".pdf,.doc,.docx"
        />
        <div>
          <small className="form-hint">Accepted formats: PDF, DOC, DOCX</small>
        </div>
        {errors.resume && (
          <span className="form-error">{errors.resume?.message}</span>
        )}
      </div>

      <button type="submit" disabled={isLoading} className="btn btn-primary">
        {isLoading ? "Saving..." : "Save & Continue"}
      </button>
    </form>
  );
}
