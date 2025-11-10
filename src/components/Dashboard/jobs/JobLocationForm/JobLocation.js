"use client";

import axiosInstance from "@/lib/axiosIntance";
import { useJobLocation } from "@/stores/job_dependencies_update_store";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function JobLocationForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    setError,
  } = useForm({
    defaultValues: {
      city: "",
      country: "",
    },
  });
  const router = useRouter();
  const searchParams = useSearchParams();
  const locationId = searchParams.get("location_id");

  const getLocation = useJobLocation((state) => state.getLocation);
  const clearLocation = useJobLocation((state) => state.clearLocation);

  useEffect(() => {
    if (locationId) {
      const location = getLocation();
      const city = location.city;
      const country = location.country;
      console.log(city, country);
      reset({
        city: city,
        country: country,
      });
    } else {
      reset({
        city: "",
        country: "",
      });
    }

    return () => {
      reset();
    };
  }, [locationId, clearLocation, getLocation, reset]);

  const onSubmit = async (data) => {
    try {
      if (locationId) {
        const response = await axiosInstance.put(
          `/api/jobs/v1/job_locations/${locationId}/`,
          data
        );
        if (response.status == 200) {
          toast.success("Job location updated successfully");
          reset();
        }
        clearLocation();
        router.push("/dashboard/jobs/job_locations/view/");
        router.refresh();
        return;
      } else {
        const response = await axiosInstance.post(
          "/api/jobs/v1/job_locations/",
          data
        );
        if (response.status == 201) {
          toast.success("Job location created successfully");
          reset();
        }
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
        Set Job location
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Input Field */}
        <div>
          <label
            htmlFor="city"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            City name
          </label>
          <input
            type="text"
            id="city"
            placeholder="Enter city name (e.g., Dhaka)"
            className={`w-full px-4 py-2 rounded-lg border text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.city ? "border-red-500" : "border-gray-300"
            }`}
            {...register("city", {
              required: "city name is required",
              minLength: {
                value: 2,
                message: "Must be at least 2 characters",
              },
            })}
          />
          {errors.city && (
            <p className="text-sm text-red-500 mt-1">{errors.city.message}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="country"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            country name
          </label>
          <input
            type="text"
            id="country"
            placeholder="Enter country name (e.g., Bangladesh)"
            className={`w-full px-4 py-2 rounded-lg border text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.country ? "border-red-500" : "border-gray-300"
            }`}
            {...register("country", {
              required: "country name is required",
              minLength: {
                value: 2,
                message: "Must be at least 2 characters",
              },
            })}
          />
          {errors.country && (
            <p className="text-sm text-red-500 mt-1">
              {errors.country.message}
            </p>
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
