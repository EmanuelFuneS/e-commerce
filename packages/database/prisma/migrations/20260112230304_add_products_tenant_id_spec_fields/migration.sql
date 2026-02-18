-- AlterTable
ALTER TABLE "products" ADD COLUMN     "spec" JSONB,
ADD COLUMN     "tenant_id" TEXT NOT NULL DEFAULT 'BYTE_BAZAR';
