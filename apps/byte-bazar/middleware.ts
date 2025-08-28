import type { NextRequest } from "next/server";
import { auth0 } from "./lib/auth0";

const protectedRoutes = ["/dashboard"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (isProtectedRoute) {
    return await auth0.middleware(request);
  }

  return;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
    "/dashboard/:path*",
  ],
};
