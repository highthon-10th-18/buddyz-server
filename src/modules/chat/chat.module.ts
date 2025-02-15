import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaModule } from '@/common/modules/prisma/prisma.module';
import { AuthModule } from '../auth/auth.module';
import { PersonaModule } from '../persona/persona.module';
import { TaskModule } from '../task/task.module';
import { UserModule } from '../user/user.module';
import { ChatController } from './controller/chat.controller';
import { MessageController } from './controller/message.controller';
import { ChatRepository } from './repository/chat.repository';
import { MessageRepository } from './repository/message.repository';
import { ChatService } from './service/chat.service';
import { MessageService } from './service/message.service';

@Module({
  imports: [
    PrismaModule,
    TaskModule,
    AuthModule,
    UserModule,
    PersonaModule,
  ],
  controllers: [ChatController, MessageController],
  providers:   [
    ConfigService,
    ChatService,
    ChatRepository,
    MessageService,
    MessageRepository,
  ],
})
export class ChatModule {
}
