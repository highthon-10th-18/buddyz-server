import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Chat - Message')
@Controller('chats/:chatId/messages')
export class MessageController {
  constructor() {
  }
  @Get()
  async getMessages() {
  }
}
