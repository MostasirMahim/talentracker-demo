"use client";

import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { candidateRegister } from "@/actions/auth";
import { useRegistrationStore } from "@/stores/regestration_steps_store";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
function CandidateRegisterForm() {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit } = useForm();
  const { email, reset } = useRegistrationStore();
    const [showPassword, setShowPassword] = useState(false);
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
      const res = await candidateRegister(formData);

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
        router.push("/auth/candidate/login?email=" + email);
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
      <button type="submit">
        {loading ? "Loading..." : "Register As Candidate"}
      </button>
    </form>
  );
}

export default CandidateRegisterForm;
