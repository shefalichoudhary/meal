/*
  Warnings:

  - You are about to drop the column `name` on the `Ingredient` table. All the data in the column will be lost.
  - Added the required column `veggieName` to the `Ingredient` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Ingredient" DROP COLUMN "name",
ADD COLUMN     "veggieName" TEXT NOT NULL;
