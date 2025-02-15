import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/common/modules/prisma/prisma.service';

@Injectable()
export class ChatRepository {
  constructor(private readonly prisma: PrismaService) {
  }
  async getChatList(userUUID: string) {
    const chats = await this.prisma.chat.findMany({
      where:   { userUUID },
      orderBy: { updatedAt: 'desc' },
      include: {
        targetPersona: true,
        messages:      {
          orderBy: { createdAt: 'desc' },
          take:    1,
        },
      },
    });

    return chats.map(c => {
      if (c.messages.length === 0) {
        return {
          uuid:         c.uuid,
          personaName:  c.targetPersona.name,
          lastMessage:  '메시지 없음',
          profileImage: c.targetPersona.profileImage,
        };
      }

      return {
        uuid:         c.uuid,
        personaName:  c.targetPersona.name,
        lastMessage:  c.messages[0].content,
        profileImage: c.targetPersona.profileImage,
      };
    });
  }
  async getChat(userUUID: string, personaUUID: string) {
    return this.prisma.chat.findFirst({ where: {
      userUUID, targetPersonaUUID: personaUUID,
    } });
  }
  async getChatDetail(chatUUID: string) {
    return this.prisma.chat.findUnique({
      where:   { uuid: chatUUID },
      include: {
        user: true, targetPersona: true,
      },
    });
  }
  async createChat(userUUID: string, personaUUID: string) {
    return this.prisma.chat.create({ data: {
      user:          { connect: { uuid: userUUID } },
      targetPersona: { connect: { uuid: personaUUID } },
    } });
  }
}
