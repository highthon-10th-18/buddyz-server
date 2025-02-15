import { Module } from '@nestjs/common';
import { PrismaModule } from '@/common/modules/prisma/prisma.module';
import { AlarmController } from './controller/alarm.controller';
import { TodoController } from './controller/todo.controller';
import { AlarmRepository } from './repository/alarm.repository';
import { TodoRepository } from './repository/todo.repository';
import { AlarmService } from './service/alarm.service';
import { TodoService } from './service/todo.service';

@Module({
  imports:     [PrismaModule],
  controllers: [AlarmController, TodoController],
  providers:   [
    AlarmRepository,
    AlarmService,
    TodoRepository,
    TodoService,
  ],
  exports: [AlarmService, TodoService],
})
export class TaskModule {
}
