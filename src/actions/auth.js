"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import axiosInstance from "@/lib/axiosIntance";

export async function adminLogin(formData) {
  const { email, password } = formData;

  const res = await axiosInstance.post(`/api/authentication/v1/login/`, {
    email,
    password,
  });

  const data = res.data;

  if (data.code === 200 && data.status === "success") {
    cookies().set({ name: "access_token", value: data.access_token });
    cookies().set({ name: "user_type", value: data.user_type });

    if (data.user_type === "") redirect("/dashboard");
    else redirect("/");
  } else {
    return { error: true, message: data.message || "Login failed", data };
  }
}

export async function userLogin(formData) {
  const { email, password } = formData;

  const res = await axiosInstance.post(`/api/authentication/v1/login/`, {
    email,
    password,
  });

  const data = res.data;

  if (data.code === 200 && data.status === "success") {
    cookies().set({ name: "access_token", value: data.access_token });
    cookies().set({ name: "user_type", value: data.user_type });
    redirect("/");
  } else {
    return { error: true, message: data.message || "Login failed", data };
  }
}

export async function employerLogin(formData) {
  const { email, password } = formData;

  const res = await axiosInstance.post(`/api/authentication/v1/login/`, {
    email,
    password,
  });

  const data = res.data;

  if (data.code === 200 && data.status === "success") {
    cookies().set({ name: "access_token", value: data.access_token });
    cookies().set({ name: "user_type", value: data.user_type });
    redirect("/");
  } else {
    return { error: true, message: data.message || "Login failed", data };
  }
}

export async function userRegister(formData) {
  const { email, password, first_name, last_name, remember_me } = formData;

  const res = await axiosInstance.post(
    `/api/authentication/v1/register/candidate/`,
    { email, password, first_name, last_name, remember_me }
  );

  const data = res.data;

  if (data.code === 201 && data.status === "success") {
    redirect("/auth/user/login");
  } else {
    return {
      error: true,
      message: data.message || "Registration failed",
      data,
    };
  }
}

export async function employerRegister(formData) {
  const { email, password, first_name, last_name, remember_me } = formData;

  const res = await axiosInstance.post(
    `/api/authentication/v1/register/trainer/`,
    { email, password, first_name, last_name, remember_me }
  );

  const data = res.data;

  if (data.code === 201 && data.status === "success") {
    redirect("/auth/user/login");
  } else {
    return {
      error: true,
      message: data.message || "Registration failed",
      data,
    };
  }
}

export async function emailVerify_Send_OTP(formData) {
  const { email } = formData;

  const res = await axiosInstance.post(
    `/api/authentication/v1/register/email/`,
    { email }
  );

  const data = res.data;

  if (data.code === 201 && data.status === "success") {
    redirect(`/auth/email-verification?email=${email}`);
  } else {
    return {
      error: true,
      message: data.message || "Verification failed",
      data,
    };
  }
}

export async function emailVerify_Verify_OTP(formData) {
  const { email, otp } = formData;

  const res = await axiosInstance.post(
    `/api/authentication/v1/register/email/verify/`,
    { email, otp }
  );

  const data = res.data;

  if (data.code === 200 && data.status === "success") {
    redirect(`/auth/email-verification?success=true`);
  } else {
    return {
      error: true,
      message: data.message || "Verification failed",
      data,
    };
  }
}

export async function forgetId_emailVerify_Send_OTP(formData) {
  const { email } = formData;

  const res = await axiosInstance.post(
    `/api/authentication/v1/forget_password/`,
    { email }
  );

  const data = res.data;

  if (data.code === 200 && data.status === "success") {
    redirect(`/auth/forget-password?email=${email}&step=1`);
  } else {
    return {
      error: true,
      message: data.message || "Verification failed",
      data,
    };
  }
}

export async function forgetId_emailVerify_Verify_OTP(formData) {
  const { email, otp } = formData;

  const res = await axiosInstance.post(`/api/authentication/v1/verify_otp/`, {
    email,
    otp,
  });

  const data = res.data;

  if (data.code === 200 && data.status === "success") {
    cookies().set({ name: "token", value: data.token });
    redirect(`/auth/forget-password?email=${email}&step=2`);
  } else {
    return {
      error: true,
      message: data.message || "Verification failed",
      data,
    };
  }
}

export async function forgetId_Reset(formData) {
  const { email, password } = formData;
  const token = cookies().get("token")?.value;

  const res = await axiosInstance.post(
    `/api/authentication/v1/reset_password/`,
    { email, password, token }
  );

  const data = res.data;

  if (data.code === 200 && data.status === "success") {
    cookies().set({ name: "token", value: "", maxAge: 0 });
    redirect(`/auth/forget-password?success=true`);
  } else {
    return {
      error: true,
      message: data.message || "Verification failed",
      data,
    };
  }
}
