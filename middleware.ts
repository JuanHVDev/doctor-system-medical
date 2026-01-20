import { auth } from "@/lib/auth";
import { type NextRequest, NextResponse } from "next/server";

export default async function middleware(request: NextRequest)
{
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  const { pathname } = request.nextUrl;

  // 1. If the user is NOT authenticated
  if (!session)
  {
    // Prevent access to protected routes
    if (pathname.startsWith("/doctor") || pathname.startsWith("/paciente"))
    {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    // Allow access to login/register/public pages
    return NextResponse.next();
  }

  // 2. If the user IS authenticated
  const role = session.user.role;

  // Prevent authenticated users from accessing auth pages
  if (pathname.startsWith("/login") || pathname.startsWith("/register"))
  {
    if (role === "DOCTOR")
    {
      return NextResponse.redirect(new URL("/doctor", request.url));
    }
    if (role === "PATIENT" || role === "PACIENTE")
    {
      return NextResponse.redirect(new URL("/paciente", request.url));
    }
    return NextResponse.redirect(new URL("/", request.url));
  }

  // 3. Role-based access control
  if (pathname.startsWith("/doctor") && role !== "DOCTOR")
  {
    // If a patient tries to access /doctor, redirect to their home
    return NextResponse.redirect(new URL("/paciente", request.url));
  }

  if (pathname.startsWith("/paciente") && (role !== "PATIENT" && role !== "PACIENTE"))
  {
    // If a doctor tries to access /paciente, redirect to their home
    return NextResponse.redirect(new URL("/doctor", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/doctor/:path*",
    "/paciente/:path*",
    "/login",
    "/register",
  ],
};
