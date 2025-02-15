import { Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';
import { PrismaService } from 'src/common/modules/prisma/prisma.service';
import { RegisterDto } from '../dto/register.dto';

@Injectable()
export class AuthRepository {
  constructor(private readonly prisma: PrismaService) {
  }
  async register(payload: RegisterDto) {
    return this.prisma.user.create({ data: {
      email:    payload.email,
      password: await hash(payload.password, 10),
      name:     payload.name,
    } });
  }
}
