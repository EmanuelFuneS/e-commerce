import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return NextResponse.json({ available: true });
  } catch (error) {
    return NextResponse.json({ available: false });
  }
}
