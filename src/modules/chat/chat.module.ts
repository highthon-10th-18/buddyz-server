import { Module } from '@nestjs/common';
import { TaskModule } from '../task/task.module';
import { ChatController } from './controller/chat.controller';
import { MessageController } from './controller/message.controller';

@Module({
  imports: [TaskModule], controllers: [ChatController, MessageController],
})
export class ChatModule {
}
