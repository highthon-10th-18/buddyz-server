import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/auth/guard/jwt-auth.guard';
import { AuthorizedRequest } from '@/types/response';
import { CreateChatDto } from '../dto/create-chat.dto';
import { ChatService } from '../service/chat.service';

@ApiTags('Chat')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('chats')
export class ChatController {
  constructor(private readonly chatService: ChatService) {
  }
  @Get()
  @ApiOperation({ summary: '채팅 목록 조회' })
  async getChatList(@Req() req: AuthorizedRequest) {
    return this.chatService.getChatList(req.user.uuid);
  }
  @Post()
  @ApiOperation({ summary: '채팅 시작' })
  async createChat(@Req() req: AuthorizedRequest, @Body() body: CreateChatDto) {
    return this.chatService.startChat(req.user.uuid, body.targetPersonaUUID);
  }
}
