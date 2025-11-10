"use client";
import { userRegister } from "@/actions/auth";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

function CandidateRegisterForm() {
     const [loading, setLoading] = useState(false);
      const { register, handleSubmit } = useForm();
    
      async function onSubmit(values) {
        setLoading(true);
        try {
        const formData = {
          email: values.email,
          password: values.password,
          first_name: values.first_name,
          last_name: values.last_name
        }
        const res = await userRegister(formData);
        
        if (res?.error) {
          Object.entries(res?.data?.errors).forEach(([field, messages]) => {
            messages.forEach((msg) => toast.error(msg));
          });
          console.log(res);
        } else {
          toast.success("Registration successful");
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
        <input type="text" className="form-control" placeholder="Full Name" 
        {...register("first_name", { required: true })}/>
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
          placeholder="Email Address"
           {...register("email", { required: true })}
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

      <button type="submit">{loading ? "Loading..." : "Sign Up As Candidate"}</button>

      <span className="dont-account">
        Already have an account?{" "}
        <Link href="/auth/candidate/login">Log In Now!</Link>
      </span>
    </form>
  );
}

export default CandidateRegisterForm;
