"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { trainerRegister } from "@/actions/auth";
import { useRegistrationStore } from "@/stores/regestration_steps_store";

function TrainerRegisterForm() {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit } = useForm();
  const { email, reset, setStep } = useRegistrationStore();
  const router = useRouter();
  if (!email) {
    toast.error("Email not found");
    setStep(1);
  }

  async function onSubmit(values) {
    setLoading(true);
    try {
      const formData = {
        email: email,
        password: values.password,
        first_name: values.first_name,
        last_name: values.last_name,
      };
      const res = await trainerRegister(formData);

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
        toast.success("Registration successful");
        router.push("/auth/trainer/login?email=" + email);
        reset();
      }
    } catch (err) {
      console.log(err);
      toast.error("Registration failed");
    } finally {
      setLoading(false);
    }
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
        <input
          type="text"
          className="form-control"
          placeholder="Full Name"
          {...register("first_name", { required: true })}
        />
      </div>
      <div className="form-group">
        <input
          type="text"
          className="form-control"
          placeholder="Last Name"
          {...register("last_name", { required: true })}
        />
      </div>

      <div className="form-group">
        <input
          type="email"
          className="form-control"
          placeholder={email}
          disabled
        />
      </div>

      <div className="form-group">
        <input
          type="password"
          className="form-control"
          placeholder="Password"
          {...register("password", { required: true })}
        />
      </div>

      <button type="submit">
        {loading ? "Loading..." : "Register As Trainer"}
      </button>

      <span className="dont-account">
        Already have an account?{" "}
        <Link href="/auth/trainer/login">Log In Now!</Link>
      </span>
    </form>
  );
}

export default TrainerRegisterForm;
