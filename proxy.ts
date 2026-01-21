import { NextResponse, type NextRequest } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export default async function middleware(request: NextRequest)
{
  const sessionCookie = getSessionCookie(request);

  const { pathname } = request.nextUrl;

  // Define protected routes
  const isProtectedRoute = pathname.startsWith("/doctor") || pathname.startsWith("/paciente") || pathname === "/dashboard";
  const isAuthRoute = pathname.startsWith("/login") || pathname.startsWith("/register");

  if (!sessionCookie && isProtectedRoute)
  {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (sessionCookie)
  {
    // We need to fetch the full session to check the role for more granular protection
    // Better-auth recommends using the API for this in middleware if needed, 
    // or just checking the presence of the cookie for basic protection.
    // For role-based redirection, we might need a call to the session API.

    try
    {
      const response = await fetch(`${request.nextUrl.origin}/api/auth/get-session`, {
        headers: {
          cookie: request.headers.get("cookie") || "",
        },
      });

      const session = await response.json();

      if (!session || !session.user)
      {
        if (isProtectedRoute)
        {
          return NextResponse.redirect(new URL("/login", request.url));
        }
        return NextResponse.next();
      }

      const role = session.user.role;

      // Redirect from auth routes to respective dashboards
      if (isAuthRoute)
      {
        if (role === "DOCTOR")
        {
          return NextResponse.redirect(new URL("/doctor", request.url));
        } else
        {
          return NextResponse.redirect(new URL("/paciente", request.url));
        }
      }

      // Generic dashboard redirection
      if (pathname === "/dashboard")
      {
        if (role === "DOCTOR")
        {
          return NextResponse.redirect(new URL("/doctor", request.url));
        } else
        {
          return NextResponse.redirect(new URL("/paciente", request.url));
        }
      }

      // Role scoping
      if (pathname.startsWith("/doctor") && role !== "DOCTOR")
      {
        return NextResponse.redirect(new URL("/paciente", request.url));
      }

      if (pathname.startsWith("/paciente") && role !== "PATIENT" && role !== "PACIENTE")
      {
        return NextResponse.redirect(new URL("/doctor", request.url));
      }

    } catch (error)
    {
      console.error("Middleware session check failed:", error);
      // Fallback: if sesssion check fails and it's a protected route, redirect to login
      if (isProtectedRoute)
      {
        return NextResponse.redirect(new URL("/login", request.url));
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/doctor/:path*",
    "/paciente/:path*",
    "/dashboard",
    "/login",
    "/register",
  ],
};
