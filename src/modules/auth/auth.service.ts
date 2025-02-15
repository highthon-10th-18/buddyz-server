import { HttpException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { UserService } from '../user/user.service';
import { JwtPayloadDto } from './dto/jwt-payload.dto';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { AuthRepository } from './repository/auth.repository';

@Injectable()
export class AuthService {
  constructor(private readonly authRepository: AuthRepository,
    private readonly userService: UserService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService) {
  }
  async validateToken(token: string) {
    try {
      return this.jwtService.verify(token);
    } catch {
      throw new HttpException('토큰이 유효하지 않습니다.', 401);
    }
  }
  async login(payload: LoginDto) {
    const targetUser = await this.userService.findUserByEmail(payload.email, true);
    const isPasswordMatch = await compare(payload.password, targetUser.password);

    if (!isPasswordMatch) {
      throw new HttpException('비밀번호가 일치하지 않습니다.', 401);
    }

    const jwtPayload = new JwtPayloadDto;

    jwtPayload.uuid = targetUser.uuid;

    jwtPayload.email = targetUser.email;

    jwtPayload.name = targetUser.name;

    const accessToken = this.jwtService.sign({ ...jwtPayload });

    const refreshToken = this.jwtService.sign({ ...jwtPayload }, {
      secret:    this.configService.get<string>('JWT_REFRESH_SECRET') || '',
      expiresIn: '7d',
    });

    return {
      accessToken, refreshToken,
    };
  }
  async refresh(refreshToken: string) {
    const decoded = this.jwtService.verify(refreshToken, { secret: this.configService.get<string>('JWT_REFRESH_SECRET') || '' });
    const targetUser = await this.userService.findUserByEmail(decoded.email);
    const jwtPayload = new JwtPayloadDto;

    jwtPayload.uuid = targetUser.uuid;

    jwtPayload.email = targetUser.email;

    jwtPayload.name = targetUser.name;

    const accessToken = this.jwtService.sign({ ...jwtPayload });

    const newRefreshToken = this.jwtService.sign({ ...jwtPayload }, {
      secret:    this.configService.get<string>('JWT_REFRESH_SECRET') || '',
      expiresIn: '7d',
    });

    return {
      accessToken, refreshToken: newRefreshToken,
    };
  }
  async register(payload: RegisterDto) {
    return this.authRepository.register(payload);
  }
}
