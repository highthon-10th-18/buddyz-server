import { Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Chat')
@Controller('chats')
export class ChatController {
  constructor() {
  }
  @Get()
  async getChatList() {
  }
  @Post()
  async createChat() {
  }
}
