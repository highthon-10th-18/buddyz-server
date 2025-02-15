import { Module } from '@nestjs/common';
import { AuthModule } from 'src/modules/auth/auth.module';
import { UserModule } from 'src/modules/user/user.module';
import { ChatModule } from '@/modules/chat/chat.module';
import { PersonaModule } from '@/modules/persona/persona.module';
import { TaskModule } from '@/modules/task/task.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    PersonaModule,
    ChatModule,
    TaskModule,
  ],
  controllers: [],
  providers:   [],
})
export class AppModule {
}
