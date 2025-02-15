import { Module } from '@nestjs/common';
import { PrismaModule } from '@/common/modules/prisma/prisma.module';
import { AlarmRepository } from './repository/alarm.repository';
import { TodoRepository } from './repository/todo.repository';
import { AlarmService } from './service/alarm.service';
import { TodoService } from './service/todo.service';

@Module({
  imports:   [PrismaModule],
  providers: [
    AlarmRepository,
    AlarmService,
    TodoRepository,
    TodoService,
  ],
  exports: [AlarmService, TodoService],
})
export class TaskModule {
}
