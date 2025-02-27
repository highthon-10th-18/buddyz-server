import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/modules/prisma/prisma.service';
import { UserRepository } from './repository/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService, private readonly userRepository: UserRepository) {
  }
  async findUserByEmail(email: string, includePassword = false) {
    const result = await this.userRepository.findUserByEmail(email, includePassword);

    if (!result) {
      throw new HttpException('해당 이메일로 가입된 사용자가 없습니다.', 404);
    }

    return result;
  }
  async findUserByUUID(uuid: string) {
    return this.userRepository.findUserByUUID(uuid);
  }
}
