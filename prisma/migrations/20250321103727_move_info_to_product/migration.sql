/*
  Warnings:

  - You are about to drop the column `productItemId` on the `ProductInfo` table. All the data in the column will be lost.
  - Added the required column `productId` to the `ProductInfo` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ProductInfo" DROP CONSTRAINT "ProductInfo_productItemId_fkey";

-- AlterTable
ALTER TABLE "ProductInfo" DROP COLUMN "productItemId",
ADD COLUMN     "productId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "ProductInfo" ADD CONSTRAINT "ProductInfo_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
