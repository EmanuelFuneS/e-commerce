import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const protectedRoutes = ["/orders", "checkout", "/settings"];

const authRoutes = ["/login", "/register"];

export const middleware = (request: NextRequest) => {
  const token = request.cookies.get("token");
  const { pathname } = request.nextUrl;

  if (protectedRoutes.some((route) => pathname.startsWith(route)) && !token) {
    const url = new URL("auth/login", request.url);
    url.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(url);
  }

  if (authRoutes.some((route) => pathname.startsWith(route)) && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
};

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
