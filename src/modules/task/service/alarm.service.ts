import { Injectable } from '@nestjs/common';
import { CreateAlarmDto } from '../dto/create-alarm.dto';
import { AlarmRepository } from '../repository/alarm.repository';

@Injectable()
export class AlarmService {
  constructor(private readonly alarmRepository: AlarmRepository) {
  }
  async createAlarm(payload: CreateAlarmDto) {
    return this.alarmRepository.createAlarm(payload);
  }
}
