import { Module } from '@nestjs/common';
import { ChatController } from './controller/chat.controller';
import { MessageController } from './controller/message.controller';

@Module({ controllers: [ChatController, MessageController] })
export class ChatModule {
}
