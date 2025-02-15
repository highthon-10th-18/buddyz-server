import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class CreateChatDto {
  @IsUUID()
  @ApiProperty({ description: '채팅할 페르소나 UUID' })
  targetPersonaUUID: string;
}
