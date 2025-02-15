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
}
