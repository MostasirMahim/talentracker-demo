"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import axiosInstance from "@/lib/axiosIntance";
import { toast } from "react-toastify";
import { useRegUserStore } from "@/stores/register_store";
import { useRouter } from "next/navigation";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});

const EmailForm = () => {
  const setEmail   = useRegUserStore((state) => state.setEmail);
  
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const router = useRouter();

  const onSubmit = async (data) => {
    console.log("data", data);
    try {
      setLoading(true);
      setEmail(data.email); 

      const response = await axiosInstance.post("/api/authorization/v1/onboarding/employee/", data);

      if (response.status === 201) {
        toast.success("OTP sent successfully!");
        router.push("/dashboard/registration/otp/");
        reset(); // form reset
      } else {
        toast.error("Something went wrong!");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 w-full max-w-md mx-auto p-6 bg-white shadow rounded"
      >
        <div className="">
          <label className="block mb-1  text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            {...register("email")}
            className={`w-full px-3  py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="example@mail.com"
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition disabled:opacity-60"
        >
          {loading ? "Sending OTP..." : "Send OTP"}
        </button>
      </form>
    </div>
  );
};

export default EmailForm;
