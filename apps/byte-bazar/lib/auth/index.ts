import { cookies } from "next/headers";

export async function isLogged(): Promise<boolean> {
  const cookiesStore = await cookies();
  console.log(cookiesStore);
  const isLogged = !!cookiesStore.get("token")?.value;
  return isLogged;
}
