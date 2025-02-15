/*
  Warnings:

  - You are about to drop the column `remindAt` on the `Todo` table. All the data in the column will be lost.
  - Added the required column `targetDate` to the `Todo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Alarm" ADD COLUMN     "repeatDays" INTEGER[];

-- AlterTable
ALTER TABLE "Todo" DROP COLUMN "remindAt",
ADD COLUMN     "targetDate" TIMESTAMP(3) NOT NULL;
