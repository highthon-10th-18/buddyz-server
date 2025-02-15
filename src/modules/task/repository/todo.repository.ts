import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/common/modules/prisma/prisma.service';
import { CreateTodoDto } from '../dto/create-todo.dto';
import { UpdateTodoDto } from '../dto/update-todo.dto';

@Injectable()
export class TodoRepository {
  constructor(private readonly prisma: PrismaService) {
  }
  async findOne(userUUID: string, todoUUID: string) {
    return this.prisma.todo.findFirst({ where: {
      uuid: todoUUID, userUUID,
    } });
  }
  async findAll(userUUID: string) {
    return this.prisma.todo.findMany({ where: { userUUID } });
  }
  async createTodo(userUUID: string, payload: CreateTodoDto) {
    return this.prisma.todo.create({ data: {
      name:       payload.name,
      targetDate: payload.targetDate,
      persona:    { connect: { uuid: payload.personaUUID } },
      user:       { connect: { uuid: userUUID } },
    } });
  }
  async updateTodo(todoUUID: string, payload: UpdateTodoDto) {
    return this.prisma.todo.update({
      where: { uuid: todoUUID },
      data:  {
        name:       payload.name,
        targetDate: payload.targetDate,
        isDone:     payload.isDone,
        persona:    { connect: { uuid: payload.personaUUID } },
      },
    });
  }
  async deleteTodo(todoUUID: string) {
    return this.prisma.todo.delete({ where: { uuid: todoUUID } });
  }
}
