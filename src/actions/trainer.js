"use server";

import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;
export async function get_trainer_profile_data() {
  const accessToken = cookies().get("access_token")?.value;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/training_solutions/v1/trainer/`,
      {
        credentials: "include",
        headers: { Cookie: `access_token=${accessToken}` },
        next: { tags: ["trainer-profile"] },
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

export async function set_trainer_profile(profileData, initialData) {
  const cookieStore =  cookies()
  const accessToken = cookieStore.get("access_token")?.value

  try {
    const isUpdate = initialData?.id && !profileData.news
    const method = isUpdate ? "PATCH" : "POST"
    const url = isUpdate
      ? `${BASE_URL}/api/training_solutions/v1/trainer/`
      : `${BASE_URL}/api/training_solutions/v1/trainer/`

    const res = await fetch(url, {
      method,
      credentials: "include",
      headers: {
        Cookie: `access_token=${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(profileData),
    })

    const response = await res.json()
    if ((response.code === 200 || response.code === 201) && response.status === "success") {
      revalidateTag("trainer-profile")
      return {
        success: true,
        message: isUpdate ? "Trainer profile updated successfully" : "Trainer profile created successfully",
        data: response.data,
      }
    } else {
      return {
        success: false,
        message: response.message || "Failed to save trainer profile",
        data: response.data,
      }
    }
  } catch (err) {
    return {
      success: false,
      message: err?.message || "Network error",
      data: err?.data,
    }
  }
}

export async function set_trainer_portfolio(portfolioData, initialData) {
  const cookieStore = cookies()
  const accessToken = cookieStore.get("access_token")?.value

  try {
    const isUpdate = initialData?.id
    const method = isUpdate ? "PUT" : "POST"
    console.log(method);
    const url = isUpdate
      ? `${BASE_URL}/api/training_solutions/v1/trainer/portfolios/${initialData.id}/`
      : `${BASE_URL}/api/training_solutions/v1/trainer/portfolios/`

    const res = await fetch(url, {
      method,
      credentials: "include",
      headers: {
        Cookie: `access_token=${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(portfolioData),
    })

    const response = await res.json()
    if ((response.code === 200 || response.code === 201) && response.status === "success") {
      revalidateTag("trainer-profile")
      return {
        success: true,
        message: isUpdate ? "Portfolio updated successfully" : "Portfolio created successfully",
        data: response.data,
      }
    } else {
      return {
        success: false,
        message: response.message || "Failed to save portfolio",
        data: response.data,
      }
    }
  } catch (err) {
    return {
      success: false,
      message: err?.message || "Network error",
      data: err?.data,
    }
  }
}

export async function delete_trainer_portfolio(portfolioId) {
  const cookieStore = cookies()
  const accessToken = cookieStore.get("access_token")?.value

  try {
    const res = await fetch(`${BASE_URL}/api/training_solutions/v1/trainer/portfolios/${portfolioId}/`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        Cookie: `access_token=${accessToken}`,
        "Content-Type": "application/json",
      },
    })

    const response = await res.json()

    if ((response.code === 200 || response.code === 204) && response.status === "success") {
      revalidateTag("trainer-profile")
      return {
        success: true,
        message: "Portfolio deleted successfully",
        data: response.data,
      }
    } else {
      return {
        success: false,
        message: response.message || "Failed to delete portfolio",
        data: response.data,
      }
    }
  } catch (err) {
    return {
      success: false,
      message: err?.message || "Network error",
      data: err?.data,
    }
  }
}
