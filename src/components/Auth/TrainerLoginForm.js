"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { trainerLogin } from "@/actions/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForgetPasswordStore } from "@/stores/forget_password_store";
import { Eye, EyeOff } from "lucide-react";

export default function TrainerLoginForm({ email: propEmail }) {
  const [loading, setLoading] = useState(false);
  const { setUserType } = useForgetPasswordStore();
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: { email: propEmail || "", remember_me: false, },
  });
  const email = watch("email");
  const router = useRouter();

  async function onSubmit(values) {
    setLoading(true);
    try {
      const formData = {
        email: values.email,
        password: values.password,
        remember_me: !!values.remember_me,
      };
      const res = await trainerLogin(formData);
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
        router.push("/trainer/profile");
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
          value={email}
          onChange={(e) => setValue("email", e.target.value)}
        />
      </div>

      <div className="form-group mb-3 position-relative">
        <input
          type={showPassword ? "text" : "password"}
          className="form-control"
          placeholder="Password"
          {...register("password", { required: true })}
        />
        <span
          className="position-absolute end-0 top-50 translate-middle-y me-3"
          onClick={() => setShowPassword(!showPassword)}
          style={{ cursor: "pointer" }}
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </span>
      </div>

      <div className="auth-row">
        <div className="remember">
          <div className="form-check">
            <input className="form-check-input" type="checkbox" id="remember" {...register("remember_me")} />
            <label className="form-check-label" htmlFor="remember">
              Remember me
            </label>
          </div>
        </div>

        <div className="lost-wrap">
          <a
            href="/auth/forget-password"
            onClick={(e) => {
              e.preventDefault();
              setUserType("trainer");
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
        {loading ? "Logging in..." : "Log In As Trainer"}
      </button>

      <span className="dont-account">
        Don&apos;t have an account?{" "}
        <Link href="/auth/trainer/register">Register Now!</Link>
      </span>
    </form>
  );
}
