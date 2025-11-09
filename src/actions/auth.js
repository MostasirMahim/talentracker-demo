"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function adminLogin(formData) {
  const { email, password } = formData;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/authentication/v1/login/`,
    {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
      credentials: "include",
    }
  );

  const data = await res.json();

  if (data.code === 200 && data.status === "success") {
    cookies().set({
      name: "access_token",
      value: data.access_token,
    });
    cookies().set({
      name: "user_type",
      value: data.user_type,
    });

    if (data.user_type === "") redirect("/dashboard");
    else redirect("/");
  } else {
    return {
      error: true,
      message: data.message || "Login failed",
      data,
    };
  }
}
export async function userLogin(formData) {
  const { email, password } = formData;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/authentication/v1/login/`,
    {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
      credentials: "include",
    }
  );

  const data = await res.json();

  if (data.code === 200 && data.status === "success") {
    cookies().set({
      name: "access_token",
      value: data.access_token,
    });
    cookies().set({
      name: "user_type",
      value: data.user_type,
    });

    redirect("/");
  } else {
    return {
      error: true,
      message: data.message || "Login failed",
      data,
    };
  }
}

export async function employerLogin(formData) {
  const { email, password } = formData;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/authentication/v1/login/`,
    {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
      credentials: "include",
    }
  );

  const data = await res.json();

  if (data.code === 200 && data.status === "success") {
    cookies().set({
      name: "access_token",
      value: data.access_token,
    });
    cookies().set({
      name: "user_type",
      value: data.user_type,
    });

    redirect("/");
  } else {
    return {
      error: true,
      message: data.message || "Login failed",
      data,
    };
  }
}

export async function userRegister(formData) {
  const { email, password, first_name, last_name, remember_me } = formData;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/authentication/v1/register/candidate/`,
    {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
        first_name,
        last_name,
        remember_me,
      }),
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    }
  );

  const data = await res.json();
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

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/authentication/v1/register/trainer/`,
    {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
        first_name,
        last_name,
        remember_me,
      }),
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    }
  );

  const data = await res.json();
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

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/authentication/v1/register/email/`,
    {
      method: "POST",
      body: JSON.stringify({ email }),
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    }
  );

  const data = await res.json();
  if (data.code === 201 && data.status === "success") {
    redirect("/auth/email-verification?email=" + email);
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

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/authentication/v1/register/email/verify/`,
    {
      method: "POST",
      body: JSON.stringify({ email, otp }),
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    }
  );

  const data = await res.json();
  if (data.code === 200 && data.status === "success") {
    redirect("/auth/email-verification?success=true");
  } else {
    return {
      error: true,
      message: data.message || "Verification failed",
      data,
    };
  }
}
