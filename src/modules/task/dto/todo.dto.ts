import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDateString,
  IsString,
  IsUUID,
} from 'class-validator';

export class TodoDto {
  @IsUUID()
  @ApiProperty({
    description: '할 일 UUID', example: '00000000-0000-0000-0000-000000000000',
  })
  uuid: string;

  @IsString()
  @ApiProperty({ description: '할 일 이름' })
  name: string;

  @IsDateString()
  @ApiProperty({ description: '할 일 날짜' })
  targetDate: string;

  @IsBoolean()
  @ApiProperty({ description: '할 일 완료 여부' })
  isDone: boolean;
}
