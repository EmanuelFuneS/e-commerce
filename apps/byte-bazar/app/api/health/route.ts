import { prisma } from "@workspace/database";
import { NextResponse } from "next/server";

export const GET = async function health() {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return NextResponse.json({ available: true });
  } catch (error) {
    return NextResponse.json({
      available: false,
      message: (error as Error).message,
    });
  }
};
