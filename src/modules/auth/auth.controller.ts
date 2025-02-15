import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthorizedRequest } from '@/types/response';
import { UserDto } from '../user/dto/user.dto';
import { AuthService } from './auth.service';
import { JwtPayloadDto } from './dto/jwt-payload.dto';
import { JwtResponseDto } from './dto/jwt-response.dto';
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
  @ApiResponse({
    status: HttpStatus.OK, type: JwtPayloadDto,
  })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async me(@Request() req: AuthorizedRequest) {
    return req.user;
  }
  @Post('login')
  @ApiOperation({ summary: '로그인' })
  @ApiResponse({
    status: HttpStatus.CREATED, type: JwtResponseDto,
  })
  async login(@Body() body: LoginDto) {
    return this.authService.login(body);
  }
  @Post('refresh')
  @ApiOperation({ summary: '토큰 갱신' })
  @ApiResponse({
    status: HttpStatus.CREATED, type: JwtResponseDto,
  })
  async refresh(@Body() body: RefreshDto) {
    return this.authService.refresh(body.refreshToken);
  }
  @Post('register')
  @ApiOperation({ summary: '회원가입' })
  @ApiResponse({
    status: HttpStatus.CREATED, type: UserDto,
  })
  async register(@Body() body: RegisterDto) {
    return this.authService.register(body);
  }
}
