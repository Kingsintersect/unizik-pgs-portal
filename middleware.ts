import { NextRequest, NextResponse } from "next/server";
import { decrypt, getSession } from "@/lib/session";
import { cookies } from "next/headers";
import { Roles } from "./app/(dashboard)/dashboard/admin/users/users.types";
import { LoginSession, SessionData } from "./types/auth";
import { loginSessionKey } from "./lib/definitions";

// 1. Specify protected and public routes
const publicRoutes = ["/auth/signin", "/auth/signup"];
const protectedRoutes = "/dashboard";
const studentRoutePrefix = "/dashboard/student";
const adminRoutePrefix = "/dashboard/admin";

export default async function middleware(req: NextRequest) {
  // 2. Check if the current route is protected or public
  const path = req.nextUrl.pathname;
  const isPublicRoute = publicRoutes.includes(path);
  const isProtectedRoute = path.startsWith(protectedRoutes);
  const isStudentRoute = path.startsWith(studentRoutePrefix);
  const isAdminRoute = path.startsWith(adminRoutePrefix);

  const loginSession = (await getSession(loginSessionKey)) as SessionData;

  // 5. Redirect to /login if the user is not authenticated
  if (isProtectedRoute && !loginSession?.id) {
    return NextResponse.redirect(new URL("/auth/signin", req.nextUrl));
  }

  // 6. Redirect to /dashboard if the user is authenticated
  if (
    isPublicRoute &&
    loginSession?.id &&
    !req.nextUrl.pathname.startsWith("/dashboard")
  ) {
    const userRole =
      typeof loginSession.role === "string"
        ? loginSession.role.toLowerCase()
        : "";
    return NextResponse.redirect(
      new URL(`/dashboard/${userRole}`, req.nextUrl)
    );
  }

  // // 7. check for sudent
  if (
    isAdminRoute &&
    loginSession?.id &&
    loginSession?.role === Roles.STUDENT
  ) {
    return NextResponse.redirect(new URL("/dashboard/student", req.nextUrl));
  }
  // // 8. check for admin
  if (
    isStudentRoute &&
    loginSession?.id &&
    loginSession?.role === Roles.ADMIN
  ) {
    return NextResponse.redirect(new URL("/dashboard/admin", req.nextUrl));
  }

  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|images/.*|.*\\.png$|.*\\.jpg$|.*\\.jpeg$|.*\\.gif$).*)",
  ],
};
