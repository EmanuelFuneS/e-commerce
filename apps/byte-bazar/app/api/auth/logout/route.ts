import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  (await cookies()).delete("token");
  (await cookies()).delete("userId");
  (await cookies()).delete("roles");

  return NextResponse.json({ message: "Session closed" }, { status: 200 });
}
