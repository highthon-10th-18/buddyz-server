import { MessageContentType } from '@prisma/client';
import { PersonaDto } from '@/modules/persona/dto/persona.dto';
import { AlarmDto } from '@/modules/task/dto/alarm.dto';
import { TodoDto } from '@/modules/task/dto/todo.dto';
import { UserDto } from '@/modules/user/dto/user.dto';

export class MessageDto {
  type:    MessageContentType;
  sender:  UserDto | PersonaDto;
  content: string | AlarmDto | TodoDto;
}
