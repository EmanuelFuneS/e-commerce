import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json(
    { message: "Session closed" },
    { status: 200 },
  );

  response.cookies.delete("token");
  response.cookies.delete("userId");
  response.cookies.delete("roles");

  return response;
}
