import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsUUID } from 'class-validator';

export class CreateAlarmDto {
  @IsUUID()
  @ApiProperty({ description: '생성할 페르소나 UUID' })
  personaUUID: string;

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
}
