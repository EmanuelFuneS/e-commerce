import { cookies } from "next/headers";

export async function isLogged(): Promise<boolean> {
  const cookiesStore = await cookies();
  const isLogged = !!cookiesStore.get("token")?.value;
  return isLogged;
}

export async function getUserId(): Promise<string> {
  const cookiesStore = await cookies();
  const userId = cookiesStore.get("userId")?.value || "";
  return userId;
}

export async function getUserRoles(): Promise<String[]> {
  const cookiesStore = await cookies();
  const roles = cookiesStore.get("roles")?.value || "";
  return roles.split(",").map((role) => role.trim());
}
