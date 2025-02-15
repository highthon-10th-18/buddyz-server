import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/common/modules/prisma/prisma.service';
import { CreateAlarmDto } from '../dto/create-alarm.dto';

@Injectable()
export class AlarmRepository {
  constructor(private readonly prisma: PrismaService) {
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
}
