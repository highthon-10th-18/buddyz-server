import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsUUID } from 'class-validator';

export class AlarmDto {
  @IsUUID()
  @ApiProperty({ description: '알람 UUID' })
  uuid: string;

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
  @ApiProperty({ description: '알람 반복 요일' })
  repeatDays: Array<number>;
}
