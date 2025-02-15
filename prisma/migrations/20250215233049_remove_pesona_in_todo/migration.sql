/*
  Warnings:

  - You are about to drop the column `personaUUID` on the `Todo` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Todo" DROP CONSTRAINT "Todo_personaUUID_fkey";

-- DropIndex
DROP INDEX "Todo_personaUUID_name_key";

-- AlterTable
ALTER TABLE "Todo" DROP COLUMN "personaUUID";
