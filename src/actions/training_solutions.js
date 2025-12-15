"use server";

import { cookies } from "next/headers";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;
export async function get_training_service_categories() {
  try {
    const res = await fetch(
      `${BASE_URL}/api/training_solutions/v1/training_categories/`,
      {
        cache: "no-store",
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
export async function get_learning_segments() {
  try {
    const res = await fetch(
      `${BASE_URL}/api/learning_segments/v1/learning_segments/`
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
export async function get_trainers() {
  try {
    const res = await fetch(
      `${BASE_URL}/api/expert_trainer_profiles/v1/expert_trainer_profiles/`
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

export async function get_catalogs(currentPage) {
  try {
    const res = await fetch(
      `${BASE_URL}/api/training_solutions/v1/training_catalog/?page_size=18&page=${currentPage}`
    );
    const response = await res.json();
    if (response.code === 200 && response.status === "success") {
      return {
        error: false,
        data: response.data,
        pagination: response.pagination,
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

export async function get_trainer_profile(id) {
  try {
    const res = await fetch(
      `${BASE_URL}/api/expert_trainer_profiles/v1/expert_trainer_profiles/${id}/`
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

export async function get_course_details(id) {
  try {
    const res = await fetch(
      `${BASE_URL}/api/learning_segments/v1/learning_segments/${id}/`
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

export async function create_service_request(data) {
  try {
    const res = await fetch(
      `${BASE_URL}/api/training_solutions/v1/training_service_requests/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    const response = await res.json();

    if (
      (response.code === 200 || response.code === 201) &&
      response.status === "success"
    ) {
      return {
        success: true,
        message: "Service requested successfully",
        data: response.data,
      };
    } else {
      return {
        success: false,
        message: response.message || "Failed to create category",
        data: response.data,
      };
    }
  } catch (err) {
    return {
      success: false,
      message: err?.message || "Network error",
      data: err?.data,
    };
  }
}
