import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/common/modules/prisma/prisma.service';
import { StorageService } from '@/common/modules/storage/storage.service';
import { CreatePersonaDto } from '../dto/create-persona.dto';

@Injectable()
export class PersonaRepository {
  constructor(private readonly prisma: PrismaService, private readonly storageService: StorageService) {
  }
  async findMany() {
    return this.prisma.persona.findMany({ orderBy: { createdAt: 'desc' } });
  }
  async findPersonaByUUID(uuid: string) {
    return this.prisma.persona.findUnique({ where: { uuid } });
  }
  async createPersona(creatorUUID: string, payload: CreatePersonaDto) {
    const profileImage = await this.storageService.uploadFile(payload.profileImage);

    return this.prisma.persona.create({ data: {
      name:            payload.name,
      description:     payload.description,
      characteristics: payload.characteristics,
      profileImage,
      creator:         { connect: { uuid: creatorUUID } },
    } });
  }
}
