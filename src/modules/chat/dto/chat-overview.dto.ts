import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';

export class ChatOverviewDto {
  @IsUUID()
  @ApiProperty({
    description: '채팅방 UUID', example: '00000000-0000-0000-0000-000000000000',
  })
  uuid: string;

  @IsString()
  @ApiProperty({ description: '채팅중인 페르소나 이름' })
  personaName: string;

  @IsString()
  @ApiProperty({ description: '마지막 메시지 내용' })
  lastMessage: string;

  @IsString()
  @ApiProperty({ description: '페르소나 사진' })
  profileImage: string;
}
