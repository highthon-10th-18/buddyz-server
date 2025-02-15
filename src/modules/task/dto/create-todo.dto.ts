import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsString } from 'class-validator';

export class CreateTodoDto {
  @IsString()
  @ApiProperty({ description: '할 일 이름' })
  name: string;

  @IsDateString()
  @ApiProperty({ description: '할 일 날짜' })
  targetDate: string;
}
