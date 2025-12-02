"use client";
import axiosInstance from "@/lib/axiosIntance";
import React, { useState, useEffect, useCallback } from "react";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";

// --- CUSTOM THEME COLORS ---
// We use Tailwind's arbitrary value syntax (e.g., bg-[#1489bc]) to apply
// your custom CSS variables directly.
const PRIMARY_COLOR = "#1489bc"; // --mainColor
const DARK_PRIMARY_COLOR = "#0e4c89"; // --mainColor2
const TEXT_COLOR = "#262E2E"; // --blackColor
const OPTIONAL_TEXT_COLOR = "#666666"; // --optionalColor

// A helper component for displaying validation errors
const ErrorMessage = ({ message }) => (
  <p className="text-red-500 text-sm mt-1">{message}</p>
);

// The main form component
const ExpertProfileForm = ({
  initialData = null,
  baseUrl = "http://localhost:3000",
}) => {
  const isUpdateMode = !!initialData;
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // 1. Initialize useForm hook
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
    setError,
  } = useForm({
    // Set default values for update mode
    defaultValues: isUpdateMode ? initialData : {},
  });

  // Reset form data if initialData changes (useful for dynamic updates)
  useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  // 2. Form Submission Handler
  const onSubmit = useCallback(
    async (data) => {
      setLoading(true);
      setSuccessMessage("");
      setErrorMessage("");

      // --- CRITICAL STEP: Construct FormData for File Upload ---
      const formData = new FormData();

      Object.keys(data).forEach((key) => {
        // Skip the profile_picture field if we are updating and no new file was selected
        if (
          isUpdateMode &&
          key === "profile_picture" &&
          (!data[key] || data[key].length === 0)
        ) {
          return;
        }

        // Handle the FileList for profile_picture
        if (key === "profile_picture" && data[key] && data[key].length > 0) {
          formData.append(key, data[key][0]); // Append the file object
        } else if (data[key] !== null && data[key] !== undefined) {
          // Append all other fields
          formData.append(key, data[key]);
        }
      });

      // Determine the API endpoint and method
      const url = `/api/expert_trainer_profiles/v1/expert_trainer_profiles/${
        isUpdateMode ? initialData.id : ""
      }`;
      const method = isUpdateMode ? "PATCH" : "POST";

      try {
        const response = await axiosInstance.post(url, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (response.status == 201) {
          toast.success("Profile setup successfully");
          reset();
        }
      } catch (error) {
        console.log(error);
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
      } finally {
        setLoading(false);
      }
    },
    [isUpdateMode, initialData, reset]
  );

  // --- Reusable Input Component for Styling ---
  const Field = ({ label, name, children, required = false }) => (
    <div className="flex flex-col">
      <label
        htmlFor={name}
        className={`text-sm font-medium mb-1`}
        style={{ color: TEXT_COLOR }}
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
      {errors[name] && <ErrorMessage message={errors[name].message} />}
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-white shadow-xl rounded-xl">
      <h1
        className="text-3xl font-bold mb-6 text-center"
        style={{ color: PRIMARY_COLOR }}
      >
        {isUpdateMode ? "Update Expert Profile" : "Create New Expert Profile"}
      </h1>

      {(successMessage || errorMessage) && (
        <div
          className={`p-3 mb-4 rounded-lg text-white font-semibold ${
            successMessage ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {successMessage || errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* --- GRID LAYOUT FOR CORE FIELDS (2 columns on medium screens and up) --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <Field label="Name" name="name" required>
            <input
              type="text"
              id="name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1489bc] focus:border-[#1489bc] transition duration-200"
              placeholder="Enter full name"
              {...register("name", { required: "Name is required" })}
            />
          </Field>

          {/* Expertise (Title/Short Description) */}
          <Field
            label="Expertise / Professional Title"
            name="expertise"
            required
          >
            <input
              type="text"
              id="expertise"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1489bc] focus:border-[#1489bc] transition duration-200"
              placeholder="e.g., Senior Data Scientist, Agile Coach"
              {...register("expertise", { required: "Expertise is required" })}
            />
          </Field>

          {/* Profile Picture (File Input) - Using Controller for clean integration */}
          <Controller
            name="profile_picture"
            control={control}
            rules={{
              required: isUpdateMode
                ? false
                : "Profile picture is required for creation",
            }}
            render={({ field: { onChange, onBlur, name, ref } }) => (
              <Field
                label="Profile Picture (PNG, JPG)"
                name={name}
                required={!isUpdateMode}
              >
                <input
                  type="file"
                  accept="image/png, image/jpeg"
                  id={name}
                  name={name}
                  onBlur={onBlur}
                  onChange={(e) => onChange(e.target.files)}
                  ref={ref}
                  className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#1489bc]/10 file:text-[#0e4c89] hover:file:bg-[#1489bc]/20"
                />
                {isUpdateMode && (
                  <p
                    className="text-xs mt-1"
                    style={{ color: OPTIONAL_TEXT_COLOR }}
                  >
                    Leave blank to keep current picture.
                  </p>
                )}
              </Field>
            )}
          />

          {/* Specializations (Comma-separated or multi-select representation) */}
          <Field
            label="Specializations (e.g., AI, FinTech, NLP)"
            name="specializations"
          >
            <input
              type="text"
              id="specializations"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1489bc] focus:border-[#1489bc] transition duration-200"
              placeholder="Enter comma-separated list of specialties"
              {...register("specializations")}
            />
          </Field>
        </div>

        {/* --- FULL WIDTH FIELDS (Textarea and Links) --- */}

        {/* Biography (Textarea) */}
        <Field label="Biography" name="biography" required>
          <textarea
            id="biography"
            rows="5"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1489bc] focus:border-[#1489bc] transition duration-200 resize-y"
            placeholder="A detailed summary of their professional background and philosophy."
            {...register("biography", { required: "Biography is required" })}
          />
        </Field>

        {/* Certifications (Long Text) */}
        <Field
          label="Certifications (List all relevant credentials)"
          name="certifications"
        >
          <input
            type="text"
            id="certifications"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1489bc] focus:border-[#1489bc] transition duration-200"
            placeholder="e.g., PMP, CFA Level III, AWS Certified Solutions Architect"
            {...register("certifications")}
          />
        </Field>

        {/* --- URL LINKS (2 columns on medium screens and up) --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* LinkedIn Profile */}
          <Field label="LinkedIn Profile URL" name="linkedin_profile">
            <input
              type="url"
              id="linkedin_profile"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1489bc] focus:border-[#1489bc] transition duration-200"
              placeholder="https://linkedin.com/in/username"
              {...register("linkedin_profile", {
                pattern: {
                  value:
                    /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
                  message: "Must be a valid URL format",
                },
              })}
            />
          </Field>

          {/* Portfolio Link */}
          <Field label="Portfolio Link" name="portfolio_link">
            <input
              type="url"
              id="portfolio_link"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1489bc] focus:border-[#1489bc] transition duration-200"
              placeholder="https://myportfolio.com"
              {...register("portfolio_link", {
                pattern: {
                  value:
                    /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
                  message: "Must be a valid URL format",
                },
              })}
            />
          </Field>
        </div>

        {/* --- SUBMIT BUTTON --- */}
        <div className="pt-4 flex justify-center">
          <button
            type="submit"
            disabled={loading}
            className={`
              w-full md:w-auto px-12 py-3 rounded-full font-bold text-lg text-white shadow-lg transition duration-300 transform
              ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : `bg-[${PRIMARY_COLOR}] hover:bg-[${DARK_PRIMARY_COLOR}] hover:scale-[1.02] active:scale-[0.98]`
              }
            `}
            style={{ backgroundColor: loading ? "#9ca3af" : PRIMARY_COLOR }}
          >
            {loading
              ? "Processing..."
              : isUpdateMode
              ? "Save Changes"
              : "Create Profile"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ExpertProfileForm;
