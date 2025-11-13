"use server";

import { cookies } from "next/headers";
import axiosInstance from "@/lib/axiosIntance";
import { revalidateTag } from "next/cache";

export async function adminLogin(formData) {
  const { email, password } = formData;

  try {
    const res = await axiosInstance.post(`/api/authentication/v1/login/`, {
      email,
      password,
    });

    const data = res.data;

    if (data.code === 200 && data.status === "success") {
      cookies().set({ name: "access_token", value: data.access_token });
      cookies().set({ name: "user_type", value: data.user_type });
      return data;
    } else {
      return { error: true, message: data.message || "Login failed", data };
    }
  } catch (err) {
    return {
      error: true,
      message: err?.response?.data?.message || err?.message || "Network Error",
      data: err?.response?.data || null,
    };
  }
}

export async function candidateLogin(formData) {
  const { email, password } = formData;

  try {
    const res = await axiosInstance.post(`/api/authentication/v1/login/`, {
      email,
      password,
    });

    const data = res.data;

    if (data.code === 200 && data.status === "success") {
      cookies().set({ name: "access_token", value: data.access_token });
      cookies().set({ name: "user_type", value: data.user_type });
      revalidateTag("get-me");
      return data;
    } else {
      return { error: true, message: data.message || "Login failed", data };
    }
  } catch (err) {
    return {
      error: true,
      message: err?.response?.data?.message || err?.message || "Network Error",
      data: err?.response?.data || null,
    };
  }
}
export async function candidateLogOut() {
  try {
    const res = await axiosInstance.delete(`/api/authentication/v1/logout/`);
    const data = res.data;

    if (data.code === 200 && data.status === "success") {
      const cookieStore = cookies();
      cookieStore.delete("access_token");
      cookieStore.delete("user_type");
      revalidateTag("get-me");
      return data;
    } else {
      return { error: true, message: data.message || "Log Out failed", data };
    }
  } catch (err) {
    return {
      error: true,
      message: err?.response?.data?.message || err?.message || "Network Error",
      data: err?.response?.data || null,
    };
  }
}

export async function trainerLogin(formData) {
  const { email, password } = formData;

  try {
    const res = await axiosInstance.post(`/api/authentication/v1/login/`, {
      email,
      password,
    });

    const data = res.data;

    if (data.code === 200 && data.status === "success") {
      cookies().set({ name: "access_token", value: data.access_token });
      cookies().set({ name: "user_type", value: data.user_type });
      return data;
    } else {
      return { error: true, message: data.message || "Login failed", data };
    }
  } catch (err) {
    return {
      error: true,
      message: err?.response?.data?.message || err?.message || "Network Error",
      data: err?.response?.data || null,
    };
  }
}

export async function candidateRegister(formData) {
  const { email, password, first_name, last_name, remember_me } = formData;

  try {
    const res = await axiosInstance.post(
      `/api/authentication/v1/register/candidate/`,
      { email, password, first_name, last_name, remember_me }
    );

    const data = res.data;

    if (data.code === 201 && data.status === "success") {
      return data;
    } else {
      return {
        error: true,
        message: data.message || "Registration failed",
        data,
      };
    }
  } catch (err) {
    return {
      error: true,
      message: err?.response?.data?.message || err?.message || "Network Error",
      data: err?.response?.data || null,
    };
  }
}

export async function trainerRegister(formData) {
  const { email, password, first_name, last_name, remember_me } = formData;

  try {
    const res = await axiosInstance.post(
      `/api/authentication/v1/register/trainer/`,
      { email, password, first_name, last_name, remember_me }
    );

    const data = res.data;
    if (data.code === 201 && data.status === "success") {
      return data;
    } else {
      return {
        error: true,
        message: data.message || "Registration failed",
        data,
      };
    }
  } catch (err) {
    return {
      error: true,
      message: err?.response?.data?.message || err?.message || "Network Error",
      data: err?.response?.data || null,
    };
  }
}

export async function emailVerify_Send_OTP(formData) {
  const { email } = formData;

  try {
    const res = await axiosInstance.post(
      `/api/authentication/v1/register/email/`,
      { email }
    );

    const data = res.data;
    if (data.code === 201 && data.status === "success") {
      return data;
    } else {
      return {
        error: true,
        message: data.message || "Verification failed",
        data,
      };
    }
  } catch (err) {
    return {
      error: true,
      message: err?.response?.data?.message || err?.message || "Network Error",
      data: err?.response?.data || null,
    };
  }
}

export async function emailVerify_Verify_OTP(formData) {
  const { email, otp } = formData;

  try {
    const res = await axiosInstance.post(
      `/api/authentication/v1/register/email/verify/`,
      { email, otp }
    );

    const data = res.data;

    if (data.code === 200 && data.status === "success") {
      return data;
    } else {
      return {
        error: true,
        message: data.message || "Verification failed",
        data,
      };
    }
  } catch (err) {
    return {
      error: true,
      message: err?.response?.data?.message || err?.message || "Network Error",
      data: err?.response?.data || null,
    };
  }
}

export async function forgetId_emailVerify_Send_OTP(formData) {
  const { email } = formData;

  try {
    const res = await axiosInstance.post(
      `/api/authentication/v1/forget_password/`,
      { email }
    );

    const data = res.data;

    if (data.code === 200 && data.status === "success") {
      return data;
    } else {
      return {
        error: true,
        message: data.message || "Verification failed",
        data,
      };
    }
  } catch (err) {
    return {
      error: true,
      message: err?.response?.data?.message || err?.message || "Network Error",
      data: err?.response?.data || null,
    };
  }
}

export async function forgetId_emailVerify_Verify_OTP(formData) {
  const { email, otp } = formData;

  try {
    const res = await axiosInstance.post(`/api/authentication/v1/verify_otp/`, {
      email,
      otp,
    });

    const data = res.data;

    if (data.code === 200 && data.status === "success") {
      return data;
    } else {
      return {
        error: true,
        message: data.message || "Verification failed",
        data,
      };
    }
  } catch (err) {
    return {
      error: true,
      message: err?.response?.data?.message || err?.message || "Network Error",
      data: err?.response?.data || null,
    };
  }
}

export async function forgetId_Reset(formData) {
  const { email, password, token } = formData;

  try {
    const res = await axiosInstance.post(
      `/api/authentication/v1/reset_password/`,
      { email, password, token }
    );

    const data = res.data;

    if (data.code === 200 && data.status === "success") {
      return data;
    } else {
      return {
        error: true,
        message: data.message || "Verification failed",
        data,
      };
    }
  } catch (err) {
    return {
      error: true,
      message: err?.response?.data?.message || err?.message || "Network Error",
      data: err?.response?.data || null,
    };
  }
}

export async function get_me() {
  const accessToken = cookies().get("access_token")?.value;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/authorization/v1/me/`,
      {
        credentials: "include",
        headers: { Cookie: `access_token=${accessToken}` },
        next: { tags: ["get-me"] },
      }
    );
    const response = await res.json();
    if (response.code === 200 && response.status === "success") {
      return {
        error: false,
        data: response.data,
      };
    } else {
      return {
        error: true,
        message: data.message || "Verification failed",
        data: response.data,
      };
    }
  } catch (err) {
    return {
      error: true,
      message: err?.response?.data?.message || err?.message || "Network Error",
      data: err?.response?.data || null,
    };
  }
}
