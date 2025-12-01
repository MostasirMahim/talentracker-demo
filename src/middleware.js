import { protected_routes } from "@/lib/protected_routes";
import { NextResponse } from "next/server";

const permissionCache = new Map();
const CACHE_TTL = 60 * 1000;

function cleanupExpiredCache() {
  const now = Date.now();
  const entries = Array.from(permissionCache.entries());

  for (const [key, value] of entries) {
    if (now - value.timestamp > CACHE_TTL) {
      permissionCache.delete(key);
    }
  }
}

if (typeof setInterval !== "undefined") {
  setInterval(cleanupExpiredCache, 5 * 60 * 1000);
}
export async function middleware(req) {
  const url = req.nextUrl.clone();
  const pathname = req.nextUrl.pathname;
  const token = req.cookies.get("access_token")?.value;

  if (!token) {
    url.pathname = "/auth/admin/login";
    return NextResponse.redirect(url);
  }

  let user_permissions = [];
  const cacheKey = `user_${token}`;

  console.log("Middleware Running");

  const cachedData = permissionCache.get(cacheKey);
  const now = Date.now();
  const oneMinute = 60 * 1000;

  if (cachedData && now - cachedData.timestamp < oneMinute) {
    user_permissions = cachedData.permissions;
  } else {
    try {
      const baseURL =
        process.env.NEXT_PUBLIC_BACKEND_API_URL || "http://localhost:8000";
      const apiRes = await fetch(`${baseURL}/api/authorization/v1/me/`, {
        headers: {
          cookie: `access_token=${token};`,
        },
        cache: "no-store",
        credentials: "include",
      });

      const json = await apiRes.json();
      if (json.code !== 200) {
        url.pathname = "/auth/admin/login";
        return NextResponse.redirect(url);
      }

      const data = json.data;
      user_permissions = data.permissions.map((p) => p);

      permissionCache.set(cacheKey, {
        permissions: user_permissions,
        timestamp: now,
      });
    } catch (err) {
      console.log(err);
      url.pathname = "/auth/admin/login";
      return NextResponse.redirect(url);
    }
  }

  const parts = pathname.split("/");
  const section = parts[2];

  const matchedRoute = protected_routes.find((route) => route.path === section);
  
  if (
    matchedRoute?.permission_name &&
    !user_permissions.includes(matchedRoute.permission_name)
  ) {
    url.pathname = "/unauthorized";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
