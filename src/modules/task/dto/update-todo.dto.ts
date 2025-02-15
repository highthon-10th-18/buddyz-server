import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';
import { CreateTodoDto } from './create-todo.dto';

export class UpdateTodoDto extends CreateTodoDto {
  @IsBoolean()
  @ApiProperty({ description: '할 일 완료 여부' })
  isDone: boolean;
}
