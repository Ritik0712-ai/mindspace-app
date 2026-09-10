import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    // Check if user is authenticated
    const token = req.nextauth.token;
    const isAuthPage = req.nextUrl.pathname.startsWith("/login") || 
                       req.nextUrl.pathname.startsWith("/signup");
    
    // If user is on auth page but already logged in, redirect to dashboard
    if (isAuthPage && token) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
    
    return NextResponse.next();
  },
  {
    pages: {
      // Without this, an unauthenticated request to a protected route gets
      // bounced to NextAuth's built-in /api/auth/signin page instead of our
      // real /login page — which then tries to redirect again and can get
      // stuck. Telling withAuth about our custom page fixes that in one hop.
      signIn: "/login",
    },
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

// Specify which routes require authentication
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/journal/:path*",
    "/circles/:path*",
    "/chat/:path*",
    "/resources/:path*",
    "/habits/:path*",
    "/settings/:path*",
  ],
};
