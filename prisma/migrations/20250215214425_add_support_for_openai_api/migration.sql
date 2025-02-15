/*
  Warnings:

  - A unique constraint covering the columns `[threadId]` on the table `Chat` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[assistantId]` on the table `Persona` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `threadId` to the `Chat` table without a default value. This is not possible if the table is not empty.
  - Added the required column `messageId` to the `Message` table without a default value. This is not possible if the table is not empty.
  - Added the required column `assistantId` to the `Persona` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Chat" ADD COLUMN     "threadId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Message" ADD COLUMN     "messageId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Persona" ADD COLUMN     "assistantId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Chat_threadId_key" ON "Chat"("threadId");

-- CreateIndex
CREATE UNIQUE INDEX "Persona_assistantId_key" ON "Persona"("assistantId");
