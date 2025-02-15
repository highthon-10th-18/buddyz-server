import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/common/modules/prisma/prisma.service';
import { CreateAlarmDto } from '../dto/create-alarm.dto';

@Injectable()
export class AlarmRepository {
  constructor(private readonly prisma: PrismaService) {
  }
  async findOne(userUUID: string, alarmUUID: string) {
    return this.prisma.alarm.findFirst({ where: {
      uuid: alarmUUID, userUUID,
    } });
  }
  async findAll(userUUID: string) {
    return this.prisma.alarm.findMany({ where: { userUUID } });
  }
  async createAlarm(userUUID: string, payload: CreateAlarmDto) {
    return this.prisma.alarm.create({ data: {
      hour:       payload.hour,
      minute:     payload.minute,
      repeatDays: { set: payload.repeatDays },
      persona:    { connect: { uuid: payload.personaUUID } },
      user:       { connect: { uuid: userUUID } },
    } });
  }
  async updateAlarm(alarmUUID: string, payload: CreateAlarmDto) {
    return this.prisma.alarm.update({
      where: { uuid: alarmUUID },
      data:  {
        hour:       payload.hour,
        minute:     payload.minute,
        repeatDays: { set: payload.repeatDays },
        persona:    { connect: { uuid: payload.personaUUID } },
      },
    });
  }
  async deleteAlarm(alarmUUID: string) {
    return this.prisma.alarm.delete({ where: { uuid: alarmUUID } });
  }
}
