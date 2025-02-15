import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDateString,
  IsObject,
  IsString,
  IsUUID,
} from 'class-validator';
import { PersonaOverviewDto } from '@/modules/persona/dto/persona.dto';

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

  @IsObject()
  @Type(() => PersonaOverviewDto)
  @ApiProperty({ description: '페르소나' })
  persona: PersonaOverviewDto;
}
