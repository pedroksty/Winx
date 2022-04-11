/*
  Warnings:

  - A unique constraint covering the columns `[authUserId]` on the table `Customer` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Customer" ADD COLUMN     "authUserId" TEXT;

-- AlterTable
ALTER TABLE "Purchase" ALTER COLUMN "status" SET DEFAULT E'APPROVED';

-- CreateIndex
CREATE UNIQUE INDEX "Customer_authUserId_key" ON "Customer"("authUserId");
