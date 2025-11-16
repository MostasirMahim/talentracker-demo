"use client";

import React from "react";
import axiosInstance from "@/lib/axiosIntance";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";


export default function EditContactForm({ id, is_active, status }) {
  if (!id || is_active === undefined || !status) {
    return (
      <div className="text-red-600 font-semibold mt-10 text-center">
        Required data missing! Cannot load edit form.
      </div>
    );
  }

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      is_active: is_active ? "true" : "false",
      status: status,
    },
  });
  const router = useRouter();


  const onSubmit = async (data) => {
    try {
      const transformedData = {
        is_active: data.is_active === "true",
        status: data.status,
      };

      const authToken = document.cookie
        .split("; ")
        .find((row) => row.startsWith("access_token="))
        ?.split("=")[1];

      if (!authToken) {
        toast.error("Access Token Missing!");
        return;
      }

      const response = await axiosInstance.patch(
        `/api/contacts/v1/contacts/${id}/`,
        transformedData,
        {
          headers: {
            Cookie: `access_token=${authToken}`,
          },
        }
      );

      toast.success("Contact updated successfully!");
      router.push("/dashboard/contacts/");
      router.refresh();
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
    <div className="flex justify-center mt-20"> {/* Center + Down from top */}
      <div className="bg-white p-5 rounded-xl shadow-md border border-gray-200 w-full max-w-lg">
        
        <h2 className="text-xl font-semibold mb-4 text-center">Edit Contact</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

          {/* is_active */}
          <div>
            <label className="block text-gray-600 mb-1">Is Active</label>
            <select
              {...register("is_active", { required: true })}
              className="w-full border rounded p-2"
            >
              <option value="true">True</option>
              <option value="false">False</option>
            </select>
            {errors.is_active && (
              <p className="text-red-500 text-sm">This field is required</p>
            )}
          </div>

          {/* status */}
          <div>
            <label className="block text-gray-600 mb-1">Status</label>
            <select
              {...register("status", { required: true })}
              className="w-full border rounded p-2"
            >
              <option value="contacted">Contacted</option>
              <option value="rejected">Rejected</option>
              <option value="pending">Pending</option>
            </select>
            {errors.status && (
              <p className="text-red-500 text-sm">This field is required</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 cursor-pointer px-4 rounded-lg hover:bg-blue-700 w-full transition"
          >
            Update Contact
          </button>
        </form>

      </div>
    </div>
  );
}
