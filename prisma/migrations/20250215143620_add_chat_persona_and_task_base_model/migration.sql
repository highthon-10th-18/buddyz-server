/*
  Warnings:

  - You are about to drop the `Character` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "MessageContentType" AS ENUM ('TEXT', 'ALARM', 'TASK');

-- DropForeignKey
ALTER TABLE "Character" DROP CONSTRAINT "Character_userUUID_fkey";

-- DropTable
DROP TABLE "Character";

-- CreateTable
CREATE TABLE "Chat" (
    "uuid" TEXT NOT NULL,
    "targetPersonaUUID" TEXT NOT NULL,
    "userUUID" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Chat_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Message" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "chatUUID" TEXT NOT NULL,
    "userUUID" TEXT,
    "personaUUID" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MessageContent" (
    "messageUUID" TEXT NOT NULL,
    "type" "MessageContentType" NOT NULL,
    "content" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MessageContent_pkey" PRIMARY KEY ("messageUUID")
);

-- CreateTable
CREATE TABLE "Persona" (
    "uuid" TEXT NOT NULL,
    "creatorUUID" TEXT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "characteristics" TEXT NOT NULL,
    "profileImage" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Persona_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Task" (
    "uuid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("uuid")
);

-- CreateIndex
CREATE UNIQUE INDEX "Message_uuid_key" ON "Message"("uuid");

-- AddForeignKey
ALTER TABLE "Chat" ADD CONSTRAINT "Chat_targetPersonaUUID_fkey" FOREIGN KEY ("targetPersonaUUID") REFERENCES "Persona"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chat" ADD CONSTRAINT "Chat_userUUID_fkey" FOREIGN KEY ("userUUID") REFERENCES "User"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_chatUUID_fkey" FOREIGN KEY ("chatUUID") REFERENCES "Chat"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_userUUID_fkey" FOREIGN KEY ("userUUID") REFERENCES "User"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_personaUUID_fkey" FOREIGN KEY ("personaUUID") REFERENCES "Persona"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MessageContent" ADD CONSTRAINT "MessageContent_messageUUID_fkey" FOREIGN KEY ("messageUUID") REFERENCES "Message"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Persona" ADD CONSTRAINT "Persona_creatorUUID_fkey" FOREIGN KEY ("creatorUUID") REFERENCES "User"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;
