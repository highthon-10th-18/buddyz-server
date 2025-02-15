import { HttpException, Injectable } from '@nestjs/common';
import { CreateTodoDto } from '../dto/create-todo.dto';
import { UpdateTodoDto } from '../dto/update-todo.dto';
import { TodoRepository } from '../repository/todo.repository';

@Injectable()
export class TodoService {
  constructor(private readonly todoRepository: TodoRepository) {
  }
  async getTodoList(userUUID: string) {
    return this.todoRepository.findAll(userUUID);
  }
  async createTodo(userUUID: string, payload: CreateTodoDto) {
    return this.todoRepository.createTodo(userUUID, payload);
  }
  async updateTodo(userUUID: string, TodoUUID: string, payload: UpdateTodoDto) {
    const targetTodo = await this.todoRepository.findOne(userUUID, TodoUUID);

    if (!targetTodo) {
      throw new HttpException('알람이 존재하지 않습니다.', 404);
    }

    return this.todoRepository.updateTodo(TodoUUID, payload);
  }
  async deleteTodo(userUUID: string, TodoUUID: string) {
    const targetTodo = await this.todoRepository.findOne(userUUID, TodoUUID);

    if (!targetTodo) {
      throw new HttpException('알람이 존재하지 않습니다.', 404);
    }

    return this.todoRepository.deleteTodo(TodoUUID);
  }
}
