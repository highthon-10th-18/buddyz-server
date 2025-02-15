import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsNumber,
  IsObject,
  IsUUID,
} from 'class-validator';
import { PersonaOverviewDto } from '@/modules/persona/dto/persona.dto';

export class AlarmDto {
  @IsUUID()
  @ApiProperty({
    description: '알람 UUID', example: '00000000-0000-0000-0000-000000000000',
  })
  uuid: string;

  @IsNumber()
  @ApiProperty({ description: '알람 ID (숫자)' })
  id: number;

  @IsBoolean()
  @ApiProperty({ description: '알람 활성화 여부' })
  isActivated: boolean;

  @IsNumber()
  @ApiProperty({ description: '알람 시간 - 시' })
  hour: number;

  @IsNumber()
  @ApiProperty({ description: '알람 시간 - 분' })
  minute: number;

  @IsNumber({}, { each: true })
  @Type(() => Number)
  @ApiProperty({
    description: '알람 반복 요일', type: [Number],
  })
  repeatDays: Array<number>;

  @IsObject()
  @Type(() => PersonaOverviewDto)
  @ApiProperty({ description: '페르소나' })
  persona: PersonaOverviewDto;
}
