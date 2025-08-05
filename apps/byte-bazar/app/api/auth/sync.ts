import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

export default async function handle(req: NextRequest) {
  if (req.method !== "POST") {
    return NextResponse.json(
      { message: "Method not allowed" },
      { status: 405 }
    );
  }

  const authHeader = req.headers.get("authorization");
  if (!authHeader || authHeader !== `Bearer ${process.env.AUTH_SYNC_SECRET}`) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { email, name, sub } = await req.json();

    const user = await prisma.user.create({
      data: {
        email,
        name,
        auth0_id: sub,
        isActive: true,
        lastLogin: new Date(),
        roleId: "USER",
      },
    });

    console.log("User created: ", user);

    return NextResponse.json(
      {
        message: "User synced successfully",
        data: user,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error Syncing user:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
