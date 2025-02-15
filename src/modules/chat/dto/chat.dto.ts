import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsUUID } from 'class-validator';

export class ChatDto {
  @IsUUID()
  @ApiProperty({
    description: '채팅방 UUID', example: '00000000-0000-0000-0000-000000000000',
  })
  uuid: string;

  @IsUUID()
  @ApiProperty({
    description: '채팅중인 페르소나 UUID', example: '00000000-0000-0000-0000-000000000000',
  })
  targetPersonaUUID: string;

  @IsUUID()
  @ApiProperty({
    description: '사용자 UUID', example: '00000000-0000-0000-0000-000000000000',
  })
  userUUID: string;

  @IsDateString()
  @ApiProperty({ description: '채팅 시작 시간' })
  createdAt: string;

  @IsDateString()
  @ApiProperty({ description: '채팅 업데이트 시간' })
  updatedAt: string;
}
