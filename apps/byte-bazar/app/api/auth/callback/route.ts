import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const byteBazarUrl = process.env.BYTE_BAZAR_URL;

export async function POST(req: Request) {
  const { token } = await req.json();

  (await cookies()).set("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: 60 * 1,
    domain: `${byteBazarUrl}`,
  });

  return NextResponse.json({ ok: true });
}
