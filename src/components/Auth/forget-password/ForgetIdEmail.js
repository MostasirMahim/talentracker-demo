"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { forgetId_emailVerify_Send_OTP } from "@/actions/auth";
import { useForgetPasswordStore } from "@/stores/forget_password_store";

export default function ForgetIdEmail() {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit } = useForm();
  const { step, nextStep, setEmail } = useForgetPasswordStore();
  async function onSubmit(values) {
    setLoading(true);
    try {
      const formData = {
        email: values.email,
      };
      const res = await forgetId_emailVerify_Send_OTP(formData);
      if (res?.error) {
        console.log(res);
        if (res?.data?.errors) {
          Object.entries(res.data.errors).forEach(([field, messages]) => {
            messages.forEach((msg) => toast.error(msg));
          });
        } else if (res?.message) {
          toast.error(res.message);
        }
      } else {
        setEmail(values.email);
        toast.success("Send OTP successful");
        nextStep();
      }
    } catch (err) {
      toast.error(err.message || "Send OTP failed");
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
          placeholder="Enter your email address"
          {...register("email", { required: true })}
        />
      </div>

      <button
        type="submit"
        className="btn btn-primary w-100"
        disabled={loading}
      >
        {loading ? "Sending OTP..." : "Send OTP"}
      </button>
    </form>
  );
}
