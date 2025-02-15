import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/common/modules/prisma/prisma.module';
import { UserRepository } from './repository/user.repository';
import { UserService } from './user.service';

@Module({
  imports:   [PrismaModule],
  providers: [UserService, UserRepository],
  exports:   [UserService, UserRepository],
})
export class UserModule {
}
