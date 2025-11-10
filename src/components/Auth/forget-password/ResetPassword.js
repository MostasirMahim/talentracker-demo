"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { forgetId_Reset } from "@/actions/auth";
import { useRouter } from "next/navigation";
import { useForgetPasswordStore } from "@/stores/forget_password_store";

export default function ResetPassword() {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit } = useForm();
  const router = useRouter();
 const { email, reset, token, userType } = useForgetPasswordStore();
  if(!email) {
    toast.error("Email not found");
    reset()
  } else if(!token) {
    toast.error("Token not found");
    reset()
  }
  async function onSubmit(values) {
    setLoading(true);
    try {
    const formData = {
      email,
      password: values.password,
      token
    }
     const res = await forgetId_Reset(formData);

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
        toast.success("Reset successful");
        router.push(`/auth/${userType}/login`);
        reset();
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
