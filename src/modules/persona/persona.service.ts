import { Injectable } from '@nestjs/common';
import { PersonaRepository } from './repository/persona.repository';

@Injectable()
export class PersonaService {
  constructor(private readonly personaRepository: PersonaRepository) {
  }
  async getPersonaList() {
    const personas = await this.personaRepository.findMany();

    return personas.map(p => ({
      uuid:        p.uuid,
      name:        p.name,
      description: p.description,
      createdAt:   p.createdAt,
    }));
  }
  async getPersonaDetail(uuid: string) {
    return this.personaRepository.findPersonaByUUID(uuid);
  }
}
