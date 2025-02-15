import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsNumber,
  IsString,
  IsUUID,
} from 'class-validator';

export class MessageDto {
  @IsString()
  @ApiProperty({ description: '메시지 내용' })
  content: string;

  @IsUUID()
  @ApiProperty({
    description: '메시지 UUID', example: '00000000-0000-0000-0000-000000000000',
  })
  uuid: string;

  @IsDateString()
  @ApiProperty({ description: '메시지 생성일' })
  createdAt: Date;

  @IsDateString()
  @ApiProperty({ description: '메시지 수정일' })
  updatedAt: Date;

  @IsNumber()
  @ApiProperty({ description: '메시지 생성 순서' })
  id: number;

  @IsUUID()
  @ApiProperty({
    description: '채팅방 UUID', example: '00000000-0000-0000-0000-000000000000',
  })
  chatUUID: string;

  @IsUUID()
  @ApiProperty({
    description: '전송한 페르소나 UUID', example: '00000000-0000-0000-0000-000000000000',
  })
  personaUUID: string | null;

  @IsUUID()
  @ApiProperty({
    description: '전송한 사용자 UUID', example: '00000000-0000-0000-0000-000000000000',
  })
  userUUID: string | null;
}
