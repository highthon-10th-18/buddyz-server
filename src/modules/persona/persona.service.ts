import { HttpException, Injectable } from '@nestjs/common';
import { CreatePersonaDto } from './dto/create-persona.dto';
import { PersonaRepository } from './repository/persona.repository';

@Injectable()
export class PersonaService {
  constructor(private readonly personaRepository: PersonaRepository) {
  }
  async getPersonaList() {
    const personas = await this.personaRepository.findMany();

    return personas.map(p => ({
      uuid:         p.uuid,
      name:         p.name,
      profileImage: p.profileImage,
      description:  p.description,
      createdAt:    p.createdAt,
    }));
  }
  async getPersonaDetail(uuid: string) {
    const persona = await this.personaRepository.findPersonaByUUID(uuid);

    if (!persona) {
      throw new HttpException('페르소나를 찾을 수 없습니다.', 404);
    }

    return persona;
  }
  async createPersona(creatorUUID: string, payload: CreatePersonaDto) {
    return this.personaRepository.createPersona(creatorUUID, payload);
  }
}
