import { MessageContentType } from '@prisma/client';
import { PersonaDto } from '@/modules/persona/dto/persona.dto';
import { UserDto } from '@/modules/user/dto/user.dto';

export class MessageDto {
  type:   MessageContentType;
  sender: UserDto | PersonaDto;
}
