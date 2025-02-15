import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from 'src/common/modules/prisma/prisma.module';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthRepository } from './repository/auth.repository';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
  imports: [
    PrismaModule,
    JwtModule.register({
      secret:      process.env.JWT_SECRET,
      signOptions: { expiresIn: '2h' },
      global:      true,
    }),
    UserModule,
  ],
  controllers: [AuthController],
  providers:   [
    AuthRepository,
    AuthService,
    JwtStrategy,
    ConfigService,
  ],
  exports: [AuthService],
})
export class AuthModule {
}
