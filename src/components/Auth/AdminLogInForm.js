"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { adminLogin } from "@/actions/auth";
import { useRouter } from "next/navigation";
import { useLayoutTransitionStore } from "@/stores/layout_transition_store";

export default function AdminLogInForm() {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit } = useForm();
  const router = useRouter();
  const {setLayoutTransitionOn} = useLayoutTransitionStore();

  async function onSubmit(values) {
    setLoading(true);
    try {
      const formData = {
        email: values.email,
        password: values.password,
      };
      const res = await adminLogin(formData);
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
        toast.success("Login successful");
        if(res?.user_type === "admin") {
          setLayoutTransitionOn(true);
          router.push("/dashboard");
          router.refresh();
        } else {
          router.push("/");
          toast.error(res?.data?.user_type + " login not allowed");
        }
      }
    } catch (err) {
      toast.error(err.message || "Login failed");
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
          placeholder="Email Address"
          {...register("email", { required: true })}
        />
      </div>

      <div className="form-group mb-3">
        <input
          type="password"
          className="form-control"
          placeholder="Password"
          {...register("password", { required: true })}
        />
      </div>

      <button
        type="submit"
        className="btn btn-primary w-100"
        disabled={loading}
      >
        {loading ? "Logging in..." : "Log In as Admin"}
      </button>
    </form>
  );
}
