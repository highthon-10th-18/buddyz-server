import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/auth/guard/jwt-auth.guard';
import { TodoDto } from '../dto/todo.dto';
import { AlarmService } from '../service/alarm.service';

@Controller('alarm')
@UseGuards(JwtAuthGuard)
export class AlarmController {
  constructor(private readonly alarmService: AlarmService) {
  }
  @Get()
  @ApiResponse({ type: TodoDto })
  async getAlarm() {
    return '';
  }
}
