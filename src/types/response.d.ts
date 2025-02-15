import { Request } from '@nestjs/common';
import { JwtPayloadDto } from '@/modules/auth/dto/jwt-payload.dto';

export type AuthorizedRequest = Request & {
  user: JwtPayloadDto;
};
