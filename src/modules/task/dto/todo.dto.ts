import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString, IsUUID } from 'class-validator';

export class TodoDto {
  @IsUUID()
  @ApiProperty({
    description: '할 일 UUID', example: '00000000-0000-0000-0000-000000000000',
  })
  uuid: string;

  @IsString()
  @ApiProperty({ description: '할 일 이름' })
  name: string;

  @IsString()
  @ApiProperty({
    description: '할 일 날짜',
    nullable:    true,
    example:     '2025년 1월 1일',
  })
  targetDate: string;

  @IsBoolean()
  @ApiProperty({ description: '할 일 완료 여부' })
  isDone: boolean;
}
