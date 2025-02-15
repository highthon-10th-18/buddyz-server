import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class CreateChatDto {
  @IsUUID()
  @ApiProperty({
    description: '채팅할 페르소나 UUID', example: '00000000-0000-0000-0000-000000000000',
  })
  targetPersonaUUID: string;
}
