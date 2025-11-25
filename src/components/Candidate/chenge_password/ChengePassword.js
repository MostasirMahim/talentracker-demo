"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { resetPassword } from "@/actions/auth";
import { Eye, EyeOff } from "lucide-react";

export default function ChengePassword() {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  async function onSubmit(values) {
    setLoading(true);
    try {
      const formData = {
        current_password: values.current_password,
        new_password: values.new_password,
        confirm_password: values.confirm_password,
      };

      const res = await resetPassword(formData);

      if (res?.error) {
        if (res?.data?.errors) {
          Object.entries(res.data.errors).forEach(([field, messages]) => {
            messages.forEach((msg) => toast.error(msg));
          });
        } else if (res?.message) {
          toast.error(res.message);
        }
      } else {
        toast.success("Reset successful");
        reset();
      }
    } catch (err) {
      toast.error("Verification failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group mb-3 position-relative">
        <input
          type={showCurrent ? "text" : "password"}
          className="form-control"
          placeholder="Enter Current Password"
          {...register("current_password", { required: true })}
        />
        <span
          className="position-absolute end-0 top-50 translate-middle-y me-3"
          onClick={() => setShowCurrent(!showCurrent)}
          style={{ cursor: "pointer" }}
        >
          {showCurrent ? <EyeOff size={18} /> : <Eye size={18} />}
        </span>
      </div>
      <div className="form-group mb-3 position-relative">
        <input
          type={showNew ? "text" : "password"}
          className="form-control"
          placeholder="Enter New Password"
          {...register("new_password", { required: true })}
        />
        <span
          className="position-absolute end-0 top-50 translate-middle-y me-3"
          onClick={() => setShowNew(!showNew)}
          style={{ cursor: "pointer" }}
        >
          {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
        </span>
      </div>
      <div className="form-group mb-3 position-relative">
        <input
          type={showConfirm ? "text" : "password"}
          className="form-control"
          placeholder="Enter Confirm Password"
          {...register("confirm_password", { required: true })}
        />
        <span
          className="position-absolute end-0 top-50 translate-middle-y me-3"
          onClick={() => setShowConfirm(!showConfirm)}
          style={{ cursor: "pointer" }}
        >
          {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
        </span>
      </div>

      <button type="submit" className="btn btn-primary w-100" disabled={loading}>
        {loading ? "Resetting..." : "Reset Password"}
      </button>
    </form>
  );
}
