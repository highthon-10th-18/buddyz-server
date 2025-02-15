import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/common/modules/prisma/prisma.service';

@Injectable()
export class MessageRepository {
  constructor(private readonly prisma: PrismaService) {
  }
  async getMessages(chatUUID: string) {
    return this.prisma.message.findMany({
      where: { chatUUID }, orderBy: { createdAt: 'asc' },
    });
  }
  async getMessageDetail(messageUUID: string) {
    return this.prisma.message.findUnique({
      where:   { uuid: messageUUID },
      include: {
        user: true, persona: true,
      },
    });
  }
  async createMessageAsPersona(chatUUID: string, senderUUID: string, message: string) {
    return this.prisma.message.create({ data: {
      chat:    { connect: { uuid: chatUUID } },
      persona: { connect: { uuid: senderUUID } },
      content: message,
    } });
  }
  async createMessageAsUser(chatUUID: string, senderUUID: string, message: string) {
    return this.prisma.message.create({ data: {
      chat:    { connect: { uuid: chatUUID } },
      user:    { connect: { uuid: senderUUID } },
      content: message,
    } });
  }
}
