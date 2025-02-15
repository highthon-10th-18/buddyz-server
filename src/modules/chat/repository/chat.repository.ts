import { Injectable } from '@nestjs/common';
import { MessageContentType } from '@prisma/client';
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
          include: { content: true },
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
        uuid:        c.uuid,
        personaName: c.targetPersona.name,
        lastMessage: c.messages[0].content?.type === MessageContentType.TEXT
          ? JSON.parse(c.messages[0].content.content?.toString() || '{"text":""}').text
          : '미리보기 불가',
        profileImage: c.targetPersona.profileImage,
      };
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
