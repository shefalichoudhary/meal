/*
  Warnings:

  - You are about to drop the column `veggie` on the `Ingredient` table. All the data in the column will be lost.
  - Added the required column `veggieId` to the `Ingredient` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Ingredient" DROP COLUMN "veggie",
ADD COLUMN     "veggieId" INTEGER NOT NULL;
