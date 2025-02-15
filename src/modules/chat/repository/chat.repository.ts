import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/common/modules/prisma/prisma.service';

@Injectable()
export class ChatRepository {
  constructor(private readonly prisma: PrismaService) {
  }
  async getChatList(userUUID: string) {
    return this.prisma.chat.findMany({
      where: { userUUID }, orderBy: { updatedAt: 'desc' },
    });
  }
  async getChat(userUUID: string, personaUUID: string) {
    return this.prisma.chat.findFirst({ where: {
      userUUID, targetPersonaUUID: personaUUID,
    } });
  }
  async createChat(userUUID: string, personaUUID: string) {
    return this.prisma.chat.create({ data: {
      user:          { connect: { uuid: userUUID } },
      targetPersona: { connect: { uuid: personaUUID } },
    } });
  }
}
