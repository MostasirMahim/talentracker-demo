'use server';

import { cookies } from 'next/headers';

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;

export async function get_role(roleId) {
  const accessToken = cookies().get('access_token')?.value;

  try {
    const res = await fetch(
      `${BASE_URL}/api/authorization/v1/role_permissions/${roleId}/`,
      {
        method: 'GET',
        credentials: 'include',
        headers: {
          Cookie: `access_token=${accessToken}`,
        },
        next: { tags: [`role-${roleId}`] },
      }
    );

    const response = await res.json();

    if (response.code === 200 && response.status === 'success') {
      return {
        error: false,
        data: response.data,
      };
    } else {
      return {
        error: true,
        message: response.message || 'Failed to fetch role',
        data: response.data,
      };
    }
  } catch (err) {
    return {
      error: true,
      message: err?.message || 'Network error',
      data: null,
    };
  }
}

export async function get_role_list() {
  const accessToken = cookies().get('access_token')?.value;

  try {
    const res = await fetch(
      `${BASE_URL}/api/authorization/v1/role_permissions/data/`,
      {
        method: 'GET',
        credentials: 'include',
        headers: {
          Cookie: `access_token=${accessToken}`,
        },
        next: { tags: ['role-list'] },
      }
    );

    const response = await res.json();

    if (response.code === 200 && response.status === 'success') {
      return {
        error: false,
        data: response.data,
      };
    } else {
      return {
        error: true,
        message: response.message || 'Failed to fetch roles',
        data: response.data,
      };
    }
  } catch (err) {
    return {
      error: true,
      message: err?.message || 'Network error',
      data: null,
    };
  }
}

export async function get_all_users() {
  const accessToken = cookies().get('access_token')?.value;

  try {
    const res = await fetch(
      `${BASE_URL}/api/authorization/v1/view_all_users/`,
      {
        method: 'GET',
        credentials: 'include',
        headers: {
          Cookie: `access_token=${accessToken}`,
        },
        next: { tags: ['all-users'] },
      }
    );

    const response = await res.json();

    if (response.code === 200 && response.status === 'success') {
      return {
        error: false,
        data: response.data,
      };
    } else {
      return {
        error: true,
        message: response.message || 'Failed to fetch users',
        data: response.data,
      };
    }
  } catch (err) {
    return {
      error: true,
      message: err?.message || 'Network error',
      data: null,
    };
  }
}

export async function get_permissions() {
  const accessToken = cookies().get('access_token')?.value;

  try {
    const res = await fetch(
      `${BASE_URL}/api/authorization/v1/permissions/`,
      {
        method: 'GET',
        credentials: 'include',
        headers: {
          Cookie: `access_token=${accessToken}`,
        },
        next: { tags: ['all-permissions'] },
      }
    );

    const response = await res.json();

    if (response.code === 200 && response.status === 'success') {
      return {
        error: false,
        data: response.data,
      };
    } else {
      return {
        error: true,
        message: response.message || 'Failed to fetch permissions',
        data: response.data,
      };
    }
  } catch (err) {
    return {
      error: true,
      message: err?.message || 'Network error',
      data: null,
    };
  }
}
