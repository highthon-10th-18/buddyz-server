import {
  Controller,
  Get,
  HttpStatus,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/auth/guard/jwt-auth.guard';
import { AuthorizedRequest } from '@/types/response';
import { AlarmDto } from '../dto/alarm.dto';
import { AlarmService } from '../service/alarm.service';

@Controller('alarms')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class AlarmController {
  constructor(private readonly alarmService: AlarmService) {
  }
  @Get()
  @ApiOperation({ summary: '알람 조회' })
  @ApiResponse({
    status: HttpStatus.OK, type: [AlarmDto],
  })
  async getAlarmList(@Req() req: AuthorizedRequest) {
    return this.alarmService.getAlarmList(req.user.uuid);
  }
}
