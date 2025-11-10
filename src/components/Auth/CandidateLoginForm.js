"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { candidateLogin } from "@/actions/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForgetPasswordStore } from "@/stores/forget_password_store";

export default function CandidateLoginForm({ email: propEmail }) {
  const [loading, setLoading] = useState(false);
  const { setUserType } = useForgetPasswordStore();
  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: { email: propEmail || "" },
  });
  const email = watch("email");
  const router = useRouter();
  async function onSubmit(values) {
    setLoading(true);
    try {
      const formData = {
        email: values.email,
        password: values.password,
      };
      const res = await candidateLogin(formData);
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
        router.push("/");
      }
    } catch (err) {
      toast.error("Login failed");
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
          value={email}
          onChange={(e) => setValue("email", e.target.value)}
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
          <a
            href="/auth/forget-password"
            onClick={(e) => {
              e.preventDefault();
              setUserType("candidate");
              router.push("/auth/forget-password");
            }}
            className="lost-your-password"
          >
            Lost your password?
          </a>
        </div>
      </div>

      <button
        type="submit"
        className="btn btn-primary w-100"
        disabled={loading}
      >
        {loading ? "Logging in..." : "Log In As Candidate"}
      </button>

      <span className="dont-account">
        Don&apos;t have an account?{" "}
        <Link href="/auth/candidate/register">Register Now!</Link>
      </span>
    </form>
  );
}
