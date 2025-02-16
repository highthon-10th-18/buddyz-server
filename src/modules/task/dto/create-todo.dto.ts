import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsOptional, IsString } from 'class-validator';

export class CreateTodoDto {
  @IsString()
  @ApiProperty({ description: '할 일 이름' })
  name: string;

  @IsDateString()
  @IsOptional()
  @ApiProperty({
    description: '할 일 날짜', nullable: true,
  })
  targetDate?: string | null;
}
