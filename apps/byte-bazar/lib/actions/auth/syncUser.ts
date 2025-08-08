"use server";

import prisma from "../../prisma";

export async function syncUser(email: string, sub: string) {
  //extend user with roles and permissions
  try {
    if (!email && !sub) {
      return { success: false, message: "No Authenticated User" };
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return { success: true, message: "User Found" };
    }

    const user = await prisma.user.create({
      data: {
        email,
        auth0_id: sub,
        lastLogin: new Date(),
      },
    });

    return { success: true, message: "User Synchronized" };
  } catch (error) {
    console.error("Error in the synchronization", error);
    return { success: false, message: "Failed To Sync User" };
  }
}
