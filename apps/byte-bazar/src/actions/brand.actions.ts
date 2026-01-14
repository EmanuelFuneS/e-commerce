"use server";
import { safeDbOperation } from "@workspace/database";
import { BrandService } from "../services/brand.service";

const brandService = () => new BrandService();

export const getBrands = async () => {
  return safeDbOperation(async () => {
    const service = brandService();
    return await service.getBrands();
  }, []);
};
