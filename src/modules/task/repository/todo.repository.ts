import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/common/modules/prisma/prisma.service';
import { CreateTodoDto } from '../dto/create-todo.dto';

@Injectable()
export class TodoRepository {
  constructor(private readonly prisma: PrismaService) {
  }
  async findAll() {
    return this.prisma.alarm.findMany();
  }
  async createTodo(payload: CreateTodoDto) {
    return this.prisma.todo.create({ data: {
      name:       payload.name,
      targetDate: payload.targetDate,
      persona:    { connect: { uuid: payload.personaUUID } },
    } });
  }
}
