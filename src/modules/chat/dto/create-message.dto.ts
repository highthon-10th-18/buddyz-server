import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateMessageDto {
  @IsString()
  @ApiProperty({ description: '매세지 내용' })
  content: string;
}
