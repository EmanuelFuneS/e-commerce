-- AlterTable
ALTER TABLE "brands" ADD COLUMN     "tenant_id" TEXT NOT NULL DEFAULT 'BYTE_BAZAR';

-- AlterTable
ALTER TABLE "categories" ADD COLUMN     "tenant_id" TEXT NOT NULL DEFAULT 'BYTE_BAZAR';

-- AlterTable
ALTER TABLE "coupons" ADD COLUMN     "tenant_id" TEXT NOT NULL DEFAULT 'BYTE_BAZAR';

-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "tenant_id" TEXT NOT NULL DEFAULT 'BYTE_BAZAR';

-- AlterTable
ALTER TABLE "refresh_tokens" ADD COLUMN     "tenant_id" TEXT NOT NULL DEFAULT 'BYTE_BAZAR';

-- AlterTable
ALTER TABLE "stock_movements" ADD COLUMN     "tenant_id" TEXT NOT NULL DEFAULT 'BYTE_BAZAR';

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "tenant_id" TEXT NOT NULL DEFAULT 'BYTE_BAZAR';
