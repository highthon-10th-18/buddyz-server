import { Injectable } from '@nestjs/common';
import { TodoRepository } from '../repository/todo.repository';

@Injectable()
export class TodoService {
  constructor(private readonly todoRepository: TodoRepository) {
  }

  /*
   * async createTodo(payload: CreateTodoDto) {
   *   return this.todoRepository.createTodo(payload);
   * }
   */
}
