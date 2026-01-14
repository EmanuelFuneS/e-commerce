"use server";
import { safeDbOperation } from "@workspace/database";
import { CategoryService } from "../services/category.service";

const categoryService = () => new CategoryService();

export async function getCategories() {
  return safeDbOperation(async () => {
    const service = categoryService();
    return await service.getCategories();
  }, []);
}
