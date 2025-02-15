import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/modules/prisma/prisma.service';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {
  }
  async findUserByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }
}
