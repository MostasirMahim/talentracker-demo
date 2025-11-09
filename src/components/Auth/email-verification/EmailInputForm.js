"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { emailVerify_Send_OTP } from "@/actions/auth";
import { useRouter } from "next/router";


export default function EmailInputForm() {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit } = useForm();
  async function onSubmit(values) {
    setLoading(true);
    try {
    const formData = {
      email: values.email,
    }
    const res = await emailVerify_Send_OTP(formData);
    if (res?.error) {
      Object.entries(res?.data?.errors).forEach(([field, messages]) => {
        messages.forEach((msg) => toast.error(msg));
      });
      console.log(res);
    } else {
      toast.success("Send OTP successful");
    }

    } catch (err) {
      toast.error( err.message || "Send OTP failed");
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

      <button type="submit" className="btn btn-primary w-100" disabled={loading}>
        {loading ? "Sending OTP..." : "Send OTP"}
      </button>
    </form>
  );
}
