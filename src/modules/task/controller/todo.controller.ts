import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/auth/guard/jwt-auth.guard';
import { AuthorizedRequest } from '@/types/response';
import { CreateTodoDto } from '../dto/create-todo.dto';
import { TodoDto } from '../dto/todo.dto';
import { UpdateTodoDto } from '../dto/update-todo.dto';
import { TodoService } from '../service/todo.service';

@Controller('todos')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class TodoController {
  constructor(private readonly todoService: TodoService) {
  }
  @Get()
  @ApiOperation({ summary: '할 일 조회' })
  @ApiResponse({
    status: HttpStatus.OK, type: [TodoDto],
  })
  async getTodoList(@Req() req: AuthorizedRequest) {
    return this.todoService.getTodoList(req.user.uuid);
  }
  @Post()
  @ApiOperation({ summary: '할 일 생성' })
  @ApiResponse({
    status: HttpStatus.CREATED, type: TodoDto,
  })
  async createTodo(@Req() req: AuthorizedRequest, @Body() payload: CreateTodoDto) {
    return this.todoService.createTodo(req.user.uuid, payload);
  }
  @Put(':TodoUUID')
  @ApiOperation({ summary: '할 일 수정' })
  @ApiResponse({
    status: HttpStatus.OK, type: TodoDto,
  })
  async updateTodo(@Req() req: AuthorizedRequest, @Body() payload: UpdateTodoDto, @Param('TodoUUID') TodoUUID: string) {
    return this.todoService.updateTodo(req.user.uuid, TodoUUID, payload);
  }
  @Delete(':TodoUUID')
  @ApiOperation({ summary: '할 일 삭제' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  async deleteTodo(@Req() req: AuthorizedRequest, @Param('TodoUUID') TodoUUID: string) {
    return this.todoService.deleteTodo(req.user.uuid, TodoUUID);
  }
}
