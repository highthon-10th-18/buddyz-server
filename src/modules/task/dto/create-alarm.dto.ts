import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty({ description: '알람 반복 요일' })
  repeatDays: Array<number>;
}
