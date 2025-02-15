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
}
