"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import axiosInstance from "@/lib/axiosIntance";
import { toast } from "react-toastify";
import { Eye, EyeOff, UserCog, PartyPopper, UserPlus } from "lucide-react";
import { useRegUserStore } from "@/stores/register_store";

//  Validation Schema
const validationSchema = Yup.object().shape({
  first_name: Yup.string().optional(),
  last_name: Yup.string().optional(),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters with contains 1 uppercase, 1 lowercase, and 1 number")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/\d/, "Password must contain at least one number")
    .required("Password is required"),
});

export default function OnboardingStep3() {
  const { email, isOtpPass } = useRegUserStore();
  const router = useRouter();

  const [isSuccess, setIsSuccess] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (!isOtpPass) router.replace("/dashboard/registration/otp");
  }, [isOtpPass]);

  //  React Hook Form setup
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: { first_name: "", last_name: "", email: email || "", password: "" },
  });

  //  Submit handler
  const onSubmit = async (data) => {
    try {
      const res = await axiosInstance.post(
        "/api/authorization/v1/onboarding/employee/register/",
        data
      );
      if (res.data?.status === "success") {
        toast.success(res.data.message || "Registration successful!");
        reset();
        setIsSuccess(true);
        setRegisteredEmail(res.data.email || data.email);
      }
    } catch (error) {
      console.error(error);
      const { message, errors } = error?.response?.data || {};
      if (errors) {
        Object.entries(errors).forEach(([key, val]) =>
          toast.error(`${key}: ${Array.isArray(val) ? val[0] : val}`)
        );
      } else {
        toast.error(message || "Something went wrong");
      }
    }
  };

  const handleBack = () => {
    reset();
    router.push("/dashboard/registration/otp");
  };

  //  Success Message View
  if (isSuccess) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="w-full max-w-sm bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-24 h-24 flex items-center justify-center rounded-full bg-green-100 border-2 border-green-300">
              <PartyPopper className="w-12 h-12 text-green-600" />
            </div>
          </div>
          <h1 className="text-2xl font-bold mb-2">Employee Registered!</h1>
          <p className="text-gray-700 text-sm mb-6">
            Employee with email <span className="text-green-600">{registeredEmail}</span> added successfully.
          </p>
          <button
            onClick={() => router.push("/dashboard/registration/email")}
            className="w-full py-2 bg-blue-600 text-white rounded-md flex justify-center items-center gap-2 hover:bg-blue-700 transition"
          >
            <UserPlus className="w-4 h-4" /> Add More
          </button>
        </div>
      </div>
    );
  }

  // Registration Form View
  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="w-full max-w-xl bg-white rounded-lg shadow-lg p-8">
        <div className="flex flex-col items-center space-y-3 mb-6">
          <div className="w-24 h-24 flex items-center justify-center rounded-full bg-blue-100 border-2 border-blue-300">
            <UserCog className="w-12 h-12 text-blue-600" />
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-bold">Employee Details</h1>
            <p className="text-sm px-3 py-1 mt-2 inline-block border border-blue-300 rounded-md bg-blue-50 text-blue-600">
              {email}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="w-full">
              <label className="block text-sm font-medium mb-1">First Name</label>
              <input
                type="text"
                {...register("first_name")}
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-blue-500"
                placeholder="First Name"
              />
            </div>
            <div className="w-full">
              <label className="block text-sm font-medium mb-1">Last Name</label>
              <input
                type="text"
                {...register("last_name")}
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-blue-500"
                placeholder="Last Name"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              {...register("email")}
              className={`w-full border rounded-md p-2 ${
                errors.email ? "border-red-500" : "border-gray-300"
              } focus:outline-blue-500`}
              placeholder="Enter email"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                {...register("password")}
                className={`w-full border rounded-md p-2 pr-10 ${
                  errors.password ? "border-red-500" : "border-gray-300"
                } focus:outline-blue-500`}
                placeholder="Enter password"
              />
              <button
                type="button"
                className="absolute right-2 top-2 text-gray-500"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
            )}
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleBack}
              className="w-full py-2 border border-gray-400 rounded-md hover:bg-gray-100"
            >
              Back
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              {isSubmitting ? "Registering..." : "Register"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
