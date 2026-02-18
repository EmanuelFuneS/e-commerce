"use server";
import { safeDbOperation } from "@workspace/database";
import { BrandSchema } from "../../lib/schemas/brand/brand.schema";
import { BrandService } from "../services/brand.service";

const brandService = () => new BrandService();

export const getBrands = async () => {
  return safeDbOperation(async () => {
    const service = brandService();
    return await service.getBrands();
  }, []);
};

export const getBrandById = async (id: string) => {
  const service = brandService();
  return await service.getBrandById(id);
};

export const createBrand = async (data: BrandSchema) => {
  const service = brandService();
  return await service.createBrand(data);
};

export const updateBrand = async (data: BrandSchema) => {
  const service = brandService();
  return await service.updateBrand(data);
};
