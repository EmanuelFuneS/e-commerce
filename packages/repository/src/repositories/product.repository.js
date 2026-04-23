"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRepository = void 0;
const database_1 = require("@workspace/database");
const productWithRelations = database_1.Prisma.validator()({
    include: {
        category: true,
        brand: true,
        discounts: {
            where: { isActive: true },
        },
    },
});
class ProductRepository {
    includeParams = {
        category: true,
        brand: true,
        discounts: {
            where: { isActive: true },
            take: 1,
        },
    };
    tenantID = process.env.TENANT_ID;
    serializeData(obj) {
        return JSON.parse(JSON.stringify(obj, (key, value) => {
            if (value?.constructor?.name === "Decimal") {
                return value.toString();
            }
            if (value instanceof Date) {
                return value.toISOString();
            }
            if (typeof value === "bigint") {
                return value.toString();
            }
            return value;
        }));
    }
    async findMany(where, pagination, orderBy) {
        const products = await database_1.prisma.product.findMany({
            where: {
                ...where,
                tenantID: this.tenantID,
            },
            orderBy: {
                ...orderBy,
            },
            include: this.includeParams,
            ...pagination,
        });
        return products && this.serializeData(products);
    }
    async findById(id) {
        const product = await database_1.prisma.product.findUnique({
            where: {
                ...id,
                tenantID: this.tenantID,
            },
            include: this.includeParams,
        });
        return product && this.serializeData(product);
    }
    async create(data, adminId) {
        if (!adminId) {
            throw new Error("Unauthorized User");
        }
        const newProduct = await database_1.prisma.product.create({
            data: {
                ...data,
                price: new database_1.Prisma.Decimal(data.price),
                tenantID: this.tenantID,
            },
        });
        if (!newProduct) {
            throw new Error("Product not created");
        }
        const stockMovement = await database_1.prisma.stockMovement.create({
            data: {
                productId: newProduct.id,
                type: database_1.StockMovementType.IN,
                quantity: data.stock,
                reason: "Initial stock",
                reference: "PO-2024-001",
                userId: adminId,
                tenantID: this.tenantID,
            },
        });
        if (!stockMovement) {
            this.delete({ id: newProduct.id });
            throw new Error("Stock movement not created, product creation rolled back");
        }
        return newProduct;
    }
    async update(id, data, adminId) {
        if (!adminId) {
            throw new Error("Unauthorized User");
        }
        await database_1.prisma.product.update({
            where: { ...id, tenantID: this.tenantID },
            data: {
                ...data,
                price: new database_1.Prisma.Decimal(data.price),
            },
        });
        return true;
    }
    async delete(id, adminId) {
        if (!adminId) {
            throw new Error("Unauthorized User");
        }
        return await database_1.prisma.product.delete({
            where: { ...id, tenantID: this.tenantID },
        });
    }
    async findStockMovements(adminId) {
        if (!adminId) {
            throw new Error("Unauthorized User");
        }
        return await database_1.prisma.stockMovement.findMany({
            where: { tenantID: this.tenantID },
            include: {
                product: true,
            },
        });
    }
    async incrementViews(id) {
        return await database_1.prisma.product.update({
            where: { id, tenantID: this.tenantID },
            data: {
                views: {
                    increment: 1,
                },
            },
        });
    }
    async incrementStock(id, quantity, adminId) {
        if (!adminId) {
            throw new Error("Unauthorized User");
        }
        await database_1.prisma.stockMovement.create({
            data: {
                productId: id,
                typeMovement: database_1.StockMovementType.ADJUST,
                quantity: quantity,
                reason: "Re stock",
                reference: "PO-2024-001",
                tenantID: this.tenantID,
                userId: adminId,
            },
        });
        return await database_1.prisma.product.update({
            where: {
                id,
                tenantID: this.tenantID,
            },
            data: {
                stock: {
                    increment: quantity,
                },
            },
        });
    }
    async applyDiscount(productId, type, reason, startDate, endDate, adminId) {
        if (!adminId) {
            throw new Error("Unauthorized User");
        }
        return await database_1.prisma.discount.create({
            data: {
                productId,
                discountType: database_1.DiscountType[type],
                discountValue: 10,
                startDate: startDate,
                endDate: endDate,
                isActive: true,
                reason: reason,
            },
        });
    }
    async disableDiscount(id, adminId) {
        if (!adminId) {
            throw new Error("Unauthorized User");
        }
        return await database_1.prisma.discount.update({
            where: {
                id,
            },
            data: {
                isActive: false,
            },
        });
    }
}
exports.ProductRepository = ProductRepository;
