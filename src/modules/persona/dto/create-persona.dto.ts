import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreatePersonaDto {
  @IsString()
  @ApiProperty({ description: '페르소나 이름' })
  name: string;

  @IsString()
  @ApiProperty({ description: '페르소나 설명' })
  description: string;

  /**
   * 페르소나 특징
   *
   * @example '페르소나 특징'
   */
  @IsString()
  characteristics: string;

  @ApiProperty({
    type:        'string',
    format:      'binary',
    description: '페르소나 이미지',
  })
  profileImage: File;
}
