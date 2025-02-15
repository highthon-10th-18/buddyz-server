import {
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/auth/guard/jwt-auth.guard';
import { AuthorizedRequest } from '@/types/response';
import { ChatService } from '../service/chat.service';

@ApiTags('Chat')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('chats')
export class ChatController {
  constructor(private readonly chatService: ChatService) {
  }
  @Get()
  async getChatList(@Req() req: AuthorizedRequest) {
    return this.chatService.getChatList(req.user.uuid);
  }
  @Post()
  async createChat(@Req() req: AuthorizedRequest) {
  }
}
