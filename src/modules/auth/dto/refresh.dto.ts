import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class RefreshDto {
  @IsString()
  @ApiProperty({ description: '리프레시 토큰' })
  refreshToken: string;
}
