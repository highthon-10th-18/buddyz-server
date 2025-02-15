import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsString, IsUUID } from 'class-validator';

export class CreateTodoDto {
  @IsUUID()
  @ApiProperty({ description: '생성할 페르소나 UUID' })
  personaUUID: string;

  @IsString()
  @ApiProperty({ description: '할 일 이름' })
  name: string;

  @IsDateString()
  @ApiProperty({ description: '할 일 날짜' })
  targetDate: string;
}
