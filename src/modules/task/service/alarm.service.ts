import { HttpException, Injectable } from '@nestjs/common';
import { CreateAlarmDto } from '../dto/create-alarm.dto';
import { AlarmRepository } from '../repository/alarm.repository';

@Injectable()
export class AlarmService {
  constructor(private readonly alarmRepository: AlarmRepository) {
  }
  async getAlarmList(userUUID: string) {
    return this.alarmRepository.findAll(userUUID);
  }
  async createAlarm(userUUID: string, payload: CreateAlarmDto) {
    return this.alarmRepository.createAlarm(userUUID, payload);
  }
  async updateAlarm(userUUID: string, alarmUUID: string, payload: CreateAlarmDto) {
    const targetAlarm = await this.alarmRepository.findOne(userUUID, alarmUUID);

    if (!targetAlarm) {
      throw new HttpException('알람이 존재하지 않습니다.', 404);
    }

    return this.alarmRepository.updateAlarm(alarmUUID, payload);
  }
  async deleteAlarm(userUUID: string, alarmUUID: string) {
    const targetAlarm = await this.alarmRepository.findOne(userUUID, alarmUUID);

    if (!targetAlarm) {
      throw new HttpException('알람이 존재하지 않습니다.', 404);
    }

    return this.alarmRepository.deleteAlarm(alarmUUID);
  }
}
