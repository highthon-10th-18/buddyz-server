import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/auth/guard/jwt-auth.guard';
import { AuthorizedRequest } from '@/types/response';
import { CreateMessageDto } from '../dto/create-message.dto';
import { MessageDto } from '../dto/message.dto';
import { ChatService } from '../service/chat.service';
import { MessageService } from '../service/message.service';

@ApiTags('Chat - Message')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('chats/:chatUUID/messages')
export class MessageController {
  constructor(private readonly messageService: MessageService, private readonly chatService: ChatService) {
  }
  @Get()
  @ApiOperation({ summary: '채팅 메시지 조회' })
  @ApiResponse({
    status: HttpStatus.OK, type: [MessageDto],
  })
  async getMessages(@Req() req: AuthorizedRequest, @Param('chatUUID') chatUUID: string) {
    return this.messageService.getMessages(req.user.uuid, chatUUID);
  }
  @Post()
  @ApiOperation({ summary: '채팅 메시지 생성' })
  @ApiResponse({
    status: HttpStatus.OK, type: MessageDto,
  })
  async createMessage(@Req() req: AuthorizedRequest,
    @Body() body: CreateMessageDto,
    @Param('chatUUID') chatUUID: string) {
    const persona = await this.chatService.getPersonaInChat(chatUUID);
    const newMessage = await  this.messageService.createMessage(chatUUID, req.user.uuid, body.content);
    const personaReply = await this.messageService.processMessage(persona.uuid, newMessage.uuid);

    return personaReply;
  }
}
