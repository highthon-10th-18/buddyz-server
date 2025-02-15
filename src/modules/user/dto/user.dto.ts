import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEmail, IsString } from 'class-validator';

export class UserDto {
  @IsString()
  @ApiProperty({ description: '이름' })
  name: string;

  @IsEmail()
  @ApiProperty({ description: '이메일' })
  email: string;

  @IsDateString()
  @ApiProperty({ description: '계정 생성일' })
  createdAt: string;

  @IsDateString()
  @ApiProperty({ description: '마지막 계정 수정일' })
  updatedAt: string;
}
