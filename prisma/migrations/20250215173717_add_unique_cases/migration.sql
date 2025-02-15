/*
  Warnings:

  - A unique constraint covering the columns `[hour,minute]` on the table `Alarm` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[personaUUID,name]` on the table `Todo` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `personaUUID` to the `Alarm` table without a default value. This is not possible if the table is not empty.
  - Added the required column `personaUUID` to the `Todo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Alarm" ADD COLUMN     "isActivated" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "personaUUID" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Todo" ADD COLUMN     "isDone" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "personaUUID" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Alarm_hour_minute_key" ON "Alarm"("hour", "minute");

-- CreateIndex
CREATE UNIQUE INDEX "Todo_personaUUID_name_key" ON "Todo"("personaUUID", "name");

-- AddForeignKey
ALTER TABLE "Alarm" ADD CONSTRAINT "Alarm_personaUUID_fkey" FOREIGN KEY ("personaUUID") REFERENCES "Persona"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Todo" ADD CONSTRAINT "Todo_personaUUID_fkey" FOREIGN KEY ("personaUUID") REFERENCES "Persona"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
