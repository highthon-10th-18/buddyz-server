import { Controller, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@/modules/auth/guard/jwt-auth.guard';
import { AlarmService } from '../service/alarm.service';

@Controller('alarm')
@UseGuards(JwtAuthGuard)
export class AlarmController {
  constructor(private readonly alarmService: AlarmService) {
  }
}
