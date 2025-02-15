import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/common/modules/prisma/prisma.service';

@Injectable()
export class PersonaRepository {
  constructor(private readonly prisma: PrismaService) {
  }
  async findMany() {
    return this.prisma.persona.findMany({ orderBy: { createdAt: 'desc' } });
  }
  async findPersonaByUUID(uuid: string) {
    return this.prisma.persona.findUnique({ where: { uuid } });
  }
}
