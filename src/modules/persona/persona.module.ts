import { Module } from '@nestjs/common';
import { PrismaModule } from '@/common/modules/prisma/prisma.module';
import { StorageModule } from '@/common/modules/storage/storage.module';
import { PersonaController } from './persona.controller';
import { PersonaService } from './persona.service';
import { PersonaRepository } from './repository/persona.repository';

@Module({
  imports:     [PrismaModule, StorageModule],
  controllers: [PersonaController],
  providers:   [PersonaService, PersonaRepository],
})
export class PersonaModule {
}
