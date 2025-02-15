import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/auth/guard/jwt-auth.guard';
import { AuthorizedRequest } from '@/types/response';
import { AlarmDto } from '../dto/alarm.dto';
import { CreateAlarmDto } from '../dto/create-alarm.dto';
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
  @Post()
  @ApiOperation({ summary: '알람 생성' })
  @ApiResponse({
    status: HttpStatus.CREATED, type: AlarmDto,
  })
  async createAlarm(@Req() req: AuthorizedRequest, @Body() payload: CreateAlarmDto) {
    return this.alarmService.createAlarm(req.user.uuid, payload);
  }
  @Put(':alarmUUID')
  @ApiOperation({ summary: '알람 수정' })
  @ApiResponse({
    status: HttpStatus.OK, type: AlarmDto,
  })
  async updateAlarm(@Req() req: AuthorizedRequest, @Body() payload: CreateAlarmDto, @Param('alarmUUID') alarmUUID: string) {
    return this.alarmService.updateAlarm(req.user.uuid, alarmUUID, payload);
  }
  @Delete(':alarmUUID')
  @ApiOperation({ summary: '알람 삭제' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  async deleteAlarm(@Req() req: AuthorizedRequest, @Param('alarmUUID') alarmUUID: string) {
    return this.alarmService.deleteAlarm(req.user.uuid, alarmUUID);
  }
}
