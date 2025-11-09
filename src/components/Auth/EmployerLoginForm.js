"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { employerLogin } from "@/actions/auth";
import Link from "next/link";

export default function EmployerLoginForm() {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit } = useForm();

  async function onSubmit(values) {
    setLoading(true);
    try {
      const formData = {
        email: values.email,
        password: values.password,
      };
      const res = await employerLogin(formData);
      if (res?.error) {
        Object.entries(res?.data?.errors).forEach(([field, messages]) => {
          messages.forEach((msg) => toast.error(msg));
        });
        console.log(res);
      } else {
        toast.success("Login successful");
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
          placeholder="Username or email"
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

      <div className="row align-items-center ">
        <div className="col-lg-6 col-md-6 col-sm-6 ">
          <div className="form-check">
            <input className="form-check-input" type="checkbox" id="remember" />
            <label className="form-check-label" htmlFor="remember">
              Remember me
            </label>
          </div>
        </div>

        <div className="col-lg-6 col-md-6 col-sm-6 lost-your-password-wrap text-end">
          <a href="#" className="lost-your-password">
            Lost your password?
          </a>
        </div>
      </div>

      <button
        type="submit"
        className="btn btn-primary w-100"
        disabled={loading}
      >
        {loading ? "Logging in..." : "Log In As Employer"}
      </button>

      <span className="dont-account">
        Don&apos;t have an account?{" "}
        <Link href="/auth/employer/register">Sign Up Now!</Link>
      </span>
    </form>
  );
}
