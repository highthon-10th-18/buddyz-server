import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsUUID } from 'class-validator';

export class JwtPayloadDto {
  @IsUUID()
  @ApiProperty({ description: '사용자 UUID' })
  uuid: string;

  @IsEmail()
  @ApiProperty({ description: '이메일' })
  email: string;

  @IsString()
  @ApiProperty({ description: '이름' })
  name: string;
}
