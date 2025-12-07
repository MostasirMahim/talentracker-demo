"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { Trash2, Plus } from "lucide-react";
import "../style.css";
import { useState } from "react";
import {
  delete_trainer_portfolio,
  set_trainer_portfolio,
} from "@/actions/trainer";
import { toast } from "react-toastify";

export default function PortfolioForm({ initialData }) {
  const [isLoading, setIsLoading] = useState(false);
  const normalizedInitial =
    initialData && Array.isArray(initialData) && initialData.length > 0
      ? initialData.map((p) => ({
          serverId: p.id ?? null,
          title: p.title ?? "",
          url: p.url ?? "",
        }))
      : [
          {
            serverId: null,
            title: "",
            url: "",
          },
        ];

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      portfolios: normalizedInitial,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "portfolios",
  });

  const handleFormSubmit = async (data) => {
    setIsLoading(true);
    try {
      const operations = data.portfolios.map((p) => {
        const payload = { title: p.title, url: p.url };

        if (p.serverId) {
          return set_trainer_portfolio(payload, { id: p.serverId });
        }
        return set_trainer_portfolio(payload, null);
      });

      const results = await Promise.all(operations);
      const allSuccess = results.every((r) => r.success);

      if (allSuccess) {
        toast.success("Portfolio updated successfully");
      } else {
        const err = results.find((r) => !r.success);
        toast.error(err?.message || "An error occurred");
        console.error(err);
        console.log(results);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (index, serverId) => {
    if (fields.length === 1) {
      toast.error("Please add at least one portfolio.");
      return;
    }
    if (serverId) {
      setIsLoading(true);
      try {
        const result = await delete_trainer_portfolio(serverId);
        if (result?.success) {
          toast.success(result.message);
          remove(index);
        } else {
          toast.error(result.message);
          console.error("Delete failed", result);
        }
      } finally {
        setIsLoading(false);
      }
    } else {
      remove(index);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="profile-form">
      {fields.map((field, index) => (
        <div key={field.id} className="employment-form-group">
          <div className="employment-form-header">
            <h3 className="employment-form-title">Portfolio {index + 1}</h3>
            <button
              type="button"
              onClick={() => handleDelete(index, field.serverId)}
              className="btn btn-icon btn-danger"
              title="Remove portfolio"
            >
              <Trash2 className="icon-md" />
            </button>
          </div>

          <div className="form-group">
            <label className="form-label">Title *</label>
            <input
              {...register(`portfolios.${index}.title`, {
                required: "Title is required",
              })}
              type="text"
              className="form-input"
              placeholder="Enter portfolio title"
            />
            {errors.portfolios?.[index]?.title && (
              <span className="form-error">
                {errors.portfolios[index]?.title?.message}
              </span>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">URL *</label>
            <input
              {...register(`portfolios.${index}.url`, {
                required: "URL is required",
                pattern: {
                  value: /^https?:\/\/.+/,
                  message: "Please enter a valid URL",
                },
              })}
              type="url"
              className="form-input"
              placeholder="https://example.com"
            />
            {errors.portfolios?.[index]?.url && (
              <span className="form-error">
                {errors.portfolios[index]?.url?.message}
              </span>
            )}
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={() =>
          append({
            serverId: null,
            title: "",
            url: "",
          })
        }
        className="btn btn-secondary gap-2"
      >
        <Plus className="icon-md" />
        Add Portfolio
      </button>

      <button type="submit" disabled={isLoading} className="btn btn-primary">
        {isLoading ? "Saving..." : "Save & Continue"}
      </button>
    </form>
  );
}
