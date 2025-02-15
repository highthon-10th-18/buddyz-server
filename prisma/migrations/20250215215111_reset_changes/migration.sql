/*
  Warnings:

  - You are about to drop the column `threadId` on the `Chat` table. All the data in the column will be lost.
  - You are about to drop the column `messageId` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `assistantId` on the `Persona` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Chat_threadId_key";

-- DropIndex
DROP INDEX "Persona_assistantId_key";

-- AlterTable
ALTER TABLE "Chat" DROP COLUMN "threadId";

-- AlterTable
ALTER TABLE "Message" DROP COLUMN "messageId";

-- AlterTable
ALTER TABLE "Persona" DROP COLUMN "assistantId";
