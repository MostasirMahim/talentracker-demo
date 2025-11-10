"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { forgetId_emailVerify_Verify_OTP } from "@/actions/auth";
import { useRouter } from "next/navigation";
import { useForgetPasswordStore } from "@/stores/forget_password_store";

export default function ForgetOtp() {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit } = useForm();
  const router = useRouter();
 const { nextStep, setToken, email, reset } = useForgetPasswordStore();
  if (!email) {
    toast.error("Email not found");
    reset();
  }
  async function onSubmit(values) {
    setLoading(true);
    try {
      const formData = {
        email,
        otp: values.otp,
      };
      const res = await forgetId_emailVerify_Verify_OTP(formData);

      if (res?.error) {
        console.log(res);
        if (res?.data?.errors) {
          Object.entries(res.data.errors).forEach(([field, messages]) => {
            messages.forEach((msg) => toast.error(msg));
          });
        } else if (res?.message) {
          toast.error(res.message);
        }
        reset();
      } else {
        const token = res?.token;
        if(!token) {
          toast.error("Verification failed");
          console.log(res);
          return;
        }
        setToken(token);
        toast.success("Verification successful");
        nextStep();
      }
    } catch (err) {
      console.log(err);
      toast.error(err.message || "Verification failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder={email}
          disabled
        />
      </div>
      <div className="form-group mb-3">
        <input
          type="number"
          className="form-control"
          placeholder="Enter OTP"
          {...register("otp", { required: true })}
        />
      </div>

      <button
        type="submit"
        className="btn btn-primary w-100"
        disabled={loading}
      >
        {loading ? "Verifying..." : "Verify OTP"}
      </button>
    </form>
  );
}
