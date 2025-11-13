"use client";

import React, { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import axiosInstance from "@/lib/axiosIntance";
import { useRegUserStore } from "@/stores/register_store";
import { MailCheck } from "lucide-react";

const validationSchema = Yup.object().shape({
  otp: Yup.string()
    .matches(/^\d{4}$/, "OTP must be 4 digits")
    .required("OTP is required"),
});

export default function OnboardingStep2() {
  const { email, setOtpPass } = useRegUserStore();
  const router = useRouter();
  const [otp, setOtp] = useState(Array(4).fill(""));
  const inputRefs = useRef([]);
  const { setError } = useForm();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: { otp: "" },
  });

  useEffect(() => {
    if (!email) {
      router.replace("/dashboard/registration/email");
    }
  }, [email, router]);

  const onSubmit = async (data) => {
    const otpValue = data.otp.replace(/\D/g, "");
    if (otpValue.length !== 4) {
      toast.error("Please enter a valid 4-digit OTP.");
      return;
    }

    try {
      const response = await axiosInstance.post(
        "/api/authorization/v1/onboarding/employee/verify/",
        { email, otp: parseInt(otpValue, 10) }
      );

      if (response.data?.status === "success") {
        setOtpPass(true);
        toast.success(response.data.message || "OTP verified successfully.");
        router.push("/dashboard/registration/add");
      } else {
        toast.error(response.data.message || "OTP verification failed.");
      }
    } 
    catch (error) {
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

  const handleOtpChange = (e, index) => {
    const { value } = e.target;
    if (/^\d*$/.test(value) && value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      setValue("otp", newOtp.join(""));

      if (value && index < 3) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleBack = () => {
    setOtp(Array(4).fill(""));
    router.push("/dashboard/registration/email");
  };

  return (
    <div className="flex items-center justify-center sm:px-6 lg:px-8 min-h-screen">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md text-center">
        <div className="flex flex-col items-center space-y-4 mb-6">
          <div className="flex items-center justify-center w-24 h-24 rounded-full bg-blue-100 border-2 border-blue-300">
            <MailCheck className="w-12 h-12 text-blue-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-800">
            Enter the OTP sent to
          </h2>
          <p className="text-sm px-2 py-1 text-blue-600 font-medium border rounded bg-blue-50 border-blue-200">
            {email}
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex justify-center gap-2">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                ref={(el) => (inputRefs.current[index] = el)}
                className={`w-12 h-12 text-center text-xl font-bold border rounded-md focus:ring-2 focus:ring-blue-400 ${
                  errors.otp ? "border-red-500" : "border-gray-300"
                }`}
              />
            ))}
          </div>
          {errors.otp && (
            <p className="text-red-500 text-xs mt-2">{errors.otp.message}</p>
          )}

          {/* <p className="text-sm text-gray-500">
            Didn't get the code?{" "}
            <button
              type="button"
              className="text-blue-600 hover:underline"
              onClick={() => toast.info("Resend OTP functionality")}
              disabled
            >
              Resend
            </button>
          </p> */}

          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleBack}
              className="w-full py-2 px-4 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Back
            </button>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
