/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `Alarm` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Alarm" ADD COLUMN     "id" SERIAL NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Alarm_id_key" ON "Alarm"("id");
