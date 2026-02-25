/*
  Warnings:

  - You are about to drop the `Account` table. If the table is not empty, all the data it contains will be lost.
  - Changed the type of `description` on the `Product` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_userId_fkey";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "description",
ADD COLUMN     "description" JSONB NOT NULL,
ALTER COLUMN "isDeleted" SET DEFAULT false;

-- DropTable
DROP TABLE "Account";
