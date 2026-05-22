"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productsSchema = void 0;
const zod_1 = require("zod");
exports.productsSchema = zod_1.z.object({
    id: zod_1.z.string().optional(),
    name: zod_1.z.string().min(1, { message: "Product name is required" }),
    description: zod_1.z.string().min(1, { message: "Description is required" }),
    price: zod_1.z.coerce.string().min(1, { message: "Price is required" }),
    categoryId: zod_1.z.string().min(1, { message: "Category is required" }),
    brandId: zod_1.z.string().min(1, { message: "Brand is required" }),
    stock: zod_1.z.number().int().nonnegative({
        message: "Stock must be a non-negative integer",
    }),
    images: zod_1.z
        .array(zod_1.z.string().url({ message: "Image URL must be valid" }))
        .default([]),
    isActive: zod_1.z.boolean().default(true),
    sku: zod_1.z.string().min(1, { message: "SKU is required" }),
    tags: zod_1.z
        .array(zod_1.z.string().min(1, { message: "Tag cannot be empty" }))
        .default([]),
    slug: zod_1.z.string(),
    views: zod_1.z.number().default(0),
});
