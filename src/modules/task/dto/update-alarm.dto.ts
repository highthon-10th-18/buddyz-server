import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';
import { CreateAlarmDto } from './create-alarm.dto';

export class UpdateAlarmDto extends CreateAlarmDto {
  @IsBoolean()
  @ApiProperty({ description: '알람 활성화 여부' })
  isActivated: boolean;
}
