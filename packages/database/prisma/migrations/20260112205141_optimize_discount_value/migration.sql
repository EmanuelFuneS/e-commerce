/*
  Warnings:

  - You are about to alter the column `discount_value` on the `discounts` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `Decimal(5,2)`.

*/
-- AlterTable
ALTER TABLE "discounts" ALTER COLUMN "discount_value" SET DATA TYPE DECIMAL(5,2);
