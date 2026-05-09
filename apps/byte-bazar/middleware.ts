import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const protectedRoutes = ["/orders", "checkout" /* , "/settings" */];

const authRoutes = ["/login", "/register"];

export const middleware = (request: NextRequest) => {
  const res = NextResponse.next();
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

  if (
    request.nextUrl.pathname === "/api-service/login" &&
    request.method === "POST"
  ) {
    const token = res.headers.get("X-Auth-Token");
    const userId = res.headers.get("X-Auth-UserId");
    const roles = res.headers.get("X-Auth-Roles");
    if (token && userId && roles) {
      res.cookies.set("token", token, {
        httpOnly: true,
        sameSite: "lax",
        maxAge: 3600000,
        path: "/",
      });

      res.cookies.set("userId", userId, {
        httpOnly: true,
        sameSite: "lax",
        maxAge: 3600000,
        path: "/",
      });

      res.cookies.set("roles", roles, {
        httpOnly: true,
        sameSite: "lax",
        maxAge: 3600000,
        path: "/",
      });
    }
  }

  return res;
};

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
