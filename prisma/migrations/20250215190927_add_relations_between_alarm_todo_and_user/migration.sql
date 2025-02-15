/*
  Warnings:

  - Added the required column `userUUID` to the `Alarm` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userUUID` to the `Todo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Alarm" ADD COLUMN     "userUUID" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Todo" ADD COLUMN     "userUUID" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Alarm" ADD CONSTRAINT "Alarm_userUUID_fkey" FOREIGN KEY ("userUUID") REFERENCES "User"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Todo" ADD CONSTRAINT "Todo_userUUID_fkey" FOREIGN KEY ("userUUID") REFERENCES "User"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
