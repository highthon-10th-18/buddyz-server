import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthorizedRequest } from '@/types/response';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RefreshDto } from './dto/refresh.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtAuthGuard } from './guard/jwt-auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }
  @Get('me')
  @ApiOperation({ summary: '내 정보 조회' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async me(@Request() req: AuthorizedRequest) {
    return req.user;
  }
  @Post('login')
  @ApiOperation({ summary: '로그인' })
  async login(@Body() body: LoginDto) {
    return this.authService.login(body);
  }
  @Post('refresh')
  @ApiOperation({ summary: '토큰 갱신' })
  async refresh(@Body() body: RefreshDto) {
    return this.authService.refresh(body.refreshToken);
  }
  @Post('register')
  @ApiOperation({ summary: '회원가입' })
  async register(@Body() body: RegisterDto) {
    return this.authService.register(body);
  }
}
