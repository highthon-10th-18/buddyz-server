import { Module } from '@nestjs/common';
import { AuthModule } from 'src/modules/auth/auth.module';
import { UserModule } from 'src/modules/user/user.module';
import { PersonaModule } from '@/modules/persona/persona.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    PersonaModule,
  ],
  controllers: [],
  providers:   [],
})
export class AppModule {
}
