import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDateString,
  IsOptional,
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
  @IsOptional()
  @ApiProperty({
    description: '할 일 날짜',
    nullable:    true,
    example:     '2021-01-01T00:00:00.000Z',
  })
  targetDate: string | null;

  @IsBoolean()
  @ApiProperty({ description: '할 일 완료 여부' })
  isDone: boolean;
}
