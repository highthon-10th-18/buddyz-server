import { Module } from '@nestjs/common';
import { PrismaModule } from '@/common/modules/prisma/prisma.module';
import { AuthModule } from '../auth/auth.module';
import { TaskModule } from '../task/task.module';
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
  ],
  controllers: [ChatController, MessageController],
  providers:   [
    ChatService,
    ChatRepository,
    MessageService,
    MessageRepository,
  ],
})
export class ChatModule {
}
