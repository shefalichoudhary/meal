/*
  Warnings:

  - You are about to drop the column `cookingTime` on the `Recipe` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Recipe" DROP COLUMN "cookingTime",
ADD COLUMN     "published" BOOLEAN NOT NULL DEFAULT true;
