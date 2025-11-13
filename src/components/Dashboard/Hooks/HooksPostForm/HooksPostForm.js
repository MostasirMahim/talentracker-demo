"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import axiosInstance from "@/lib/axiosIntance";
import { useHook } from "@/stores/hooks_dependencied_update_store";

export default function HooksPostForm() {
  const router = useRouter();
  const getHook = useHook((state) => state.getHook);
  const clearHook = useHook((state) => state.clearHook);

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      id: null,
      scanned_resume: 0,
      access_to_profile: 0,
      trained_employee: 0,
      mnc_and_local_clients: 0,
      out_source_employee: 0,
    },
  });

  // STEP 1: Populate from Zustand store (if exists)
  useEffect(() => {
    const storeData = getHook();

    if (storeData && Object.keys(storeData).length > 0) {
      reset({
        id: storeData.id || null,
        scanned_resume: storeData.scanned_resume || 0,
        access_to_profile: storeData.access_to_profile || 0,
        trained_employee: storeData.trained_employee || 0,
        mnc_and_local_clients: storeData.mnc_and_local_clients || 0,
        out_source_employee: storeData.out_source_employee || 0,
      });
    }
  }, [getHook, reset]);

  // STEP 2: Load fresh data from API
  useEffect(() => {
    const loadHooksData = async () => {
      setIsLoading(true);
      try {
        const response = await axiosInstance.get("/api/hooks/v1/hooks/");
        const hooksData = response.data.data;
        console.log("Fetched hooks data:", hooksData);

        // include id in form data
        reset({
          id: hooksData.id || null,
          scanned_resume: hooksData.scanned_resume || 0,
          access_to_profile: hooksData.access_to_profile || 0,
          trained_employee: hooksData.trained_employee || 0,
          mnc_and_local_clients: hooksData.mnc_and_local_clients || 0,
          out_source_employee: hooksData.out_source_employee || 0,
        });
      } catch (error) {
        console.error("Failed to load hooks data:", error);
        toast.error("Failed to load hooks data");
      } finally {
        setIsLoading(false);
      }
    };

    loadHooksData();
    return () => clearHook();
  }, [reset, clearHook]);

  // STEP 3: Submit updated data
  const onSubmit = async (data) => {
    console.log("Form data submitted:", data);

    try {
      const response = await axiosInstance.patch("/api/hooks/v1/hooks/", data);

      if (response.status === 200) {
        toast.success("Statistics updated successfully!");
        clearHook();
        router.push("/dashboard/hooks/");
      }
    } catch (error) {
      console.error("Update error:", error);
      const errorMessage =
        error.response?.data?.message || "Failed to update statistics";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <div className="bg-white rounded-xl shadow p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Edit Statistics Hooks</h2>
          {isLoading && (
            <span className="text-sm text-blue-600 animate-pulse">
              Loading latest data...
            </span>
          )}
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Hidden ID field */}
          <input type="hidden" {...register("id")} />

          {/* Scanned Resume */}
          <div>
            <label className="font-semibold text-gray-700 block mb-2">
              Scanned Resume
            </label>
            <input
              type="number"
              {...register("scanned_resume", {
                required: "This field is required",
                valueAsNumber: true,
              })}
              className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter number"
            />
            {errors.scanned_resume && (
              <p className="text-red-500 text-sm mt-1">
                {errors.scanned_resume.message}
              </p>
            )}
          </div>

          {/* Access to Profile */}
          <div>
            <label className="font-semibold text-gray-700 block mb-2">
              Access to Profile
            </label>
            <input
              type="number"
              {...register("access_to_profile", {
                required: "This field is required",
                valueAsNumber: true,
              })}
              className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter number"
            />
            {errors.access_to_profile && (
              <p className="text-red-500 text-sm mt-1">
                {errors.access_to_profile.message}
              </p>
            )}
          </div>

          {/* Trained Employee */}
          <div>
            <label className="font-semibold text-gray-700 block mb-2">
              Trained Employee
            </label>
            <input
              type="number"
              {...register("trained_employee", {
                required: "This field is required",
                valueAsNumber: true,
              })}
              className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter number"
            />
            {errors.trained_employee && (
              <p className="text-red-500 text-sm mt-1">
                {errors.trained_employee.message}
              </p>
            )}
          </div>

          {/* MNC and Local Clients */}
          <div>
            <label className="font-semibold text-gray-700 block mb-2">
              MNC and Local Clients
            </label>
            <input
              type="number"
              {...register("mnc_and_local_clients", {
                required: "This field is required",
                valueAsNumber: true,
              })}
              className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter number"
            />
            {errors.mnc_and_local_clients && (
              <p className="text-red-500 text-sm mt-1">
                {errors.mnc_and_local_clients.message}
              </p>
            )}
          </div>

          {/* Out Source Employee */}
          <div>
            <label className="font-semibold text-gray-700 block mb-2">
              Out Source Employee
            </label>
            <input
              type="number"
              {...register("out_source_employee", {
                required: "This field is required",
                valueAsNumber: true,
              })}
              className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter number"
            />
            {errors.out_source_employee && (
              <p className="text-red-500 text-sm mt-1">
                {errors.out_source_employee.message}
              </p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <button
              type="button"
              className="border border-gray-300 px-6 py-2 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
              onClick={() => {
                clearHook();
                router.push("/dashboard/hooks/");
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? "Updating..." : "Update Statistics"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
