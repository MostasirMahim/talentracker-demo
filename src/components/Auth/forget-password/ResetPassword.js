"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { forgetId_Reset } from "@/actions/auth";
import { useRouter } from "next/navigation";

export default function ResetPassword({ email }) {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit } = useForm();
  const router = useRouter();

  if(!email) {
    toast.error("Email not found");
    router.push("/auth/forget-password");
  }
  async function onSubmit(values) {
    setLoading(true);
    try {
    const formData = {
      email,
      password: values.password,
    }
     const res = await forgetId_Reset(formData);

      if (res?.error) {
        Object.entries(res?.data?.errors).forEach(([field, messages]) => {
          messages.forEach((msg) => toast.error(msg));
        });
        console.log(res);
      } else {
        toast.success("Verification successful");
      }

    } catch (err) {
      console.log(err);
      toast.error("Verification failed");
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
          type="password"
          className="form-control"
          placeholder="Enter New Password"
          {...register("password", { required: true })}
        />
      </div>

      <button type="submit" className="btn btn-primary w-100" disabled={loading}>
        {loading ? "Resetting..." : "Reset Password"}
      </button>
    </form>
  );
}
