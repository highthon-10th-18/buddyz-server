import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsUUID } from 'class-validator';

export class JwtPayloadDto {
  @IsUUID()
  @ApiProperty({
    description: '사용자 UUID', example: '00000000-0000-0000-0000-000000000000',
  })
  uuid: string;

  @IsEmail()
  @ApiProperty({
    description: '이메일', example: '00000000-0000-0000-0000-000000000000',
  })
  email: string;

  @IsString()
  @ApiProperty({
    description: '이름', example: '00000000-0000-0000-0000-000000000000',
  })
  name: string;
}
