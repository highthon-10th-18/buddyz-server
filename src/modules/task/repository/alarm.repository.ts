import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/common/modules/prisma/prisma.service';
import { CreateAlarmDto } from '../dto/create-alarm.dto';
import { UpdateAlarmDto } from '../dto/update-alarm.dto';

@Injectable()
export class AlarmRepository {
  constructor(private readonly prisma: PrismaService) {
  }
  async findOne(userUUID: string, alarmUUID: string) {
    const alarm = await this.prisma.alarm.findFirst({ where: {
      uuid: alarmUUID, userUUID,
    } });

    if (!alarm) return null;

    return {
      ...alarm, repeatDays: sortDaysStartingFromMonday(alarm.repeatDays),
    };
  }
  async findAll(userUUID: string) {
    const alarms = await this.prisma.alarm.findMany({ where: { userUUID } });

    return alarms.map(alarm => ({
      ...alarm, repeatDays: sortDaysStartingFromMonday(alarm.repeatDays),
    }));
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
  async updateAlarm(alarmUUID: string, payload: UpdateAlarmDto) {
    return this.prisma.alarm.update({
      where: { uuid: alarmUUID },
      data:  {
        hour:        payload.hour,
        minute:      payload.minute,
        repeatDays:  { set: payload.repeatDays },
        isActivated: payload.isActivated,
        persona:     { connect: { uuid: payload.personaUUID } },
      },
    });
  }
  async deleteAlarm(alarmUUID: string) {
    return this.prisma.alarm.delete({ where: { uuid: alarmUUID } });
  }
}

function sortDaysStartingFromMonday(days: Array<number>) {
  return days
    .sort((a, b) => {
      if (a === 0) return 1;

      if (b === 0) return -1;

      return a - b;
    });
}
