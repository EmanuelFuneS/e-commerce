"use server";
import { revalidatePath } from "next/cache";

export async function createOrders() {}

export async function getOrders() {}

export async function getOrderById() {}

export async function getOrderPreview() {}

export async function updateOrder() {}

export async function deleteOrder() {}

export async function revalidateOrderPath() {
  revalidatePath("/orders");
}
