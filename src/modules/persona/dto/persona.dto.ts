import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class PersonaDto {
  @IsUUID()
  @ApiProperty({
    description: '페르소나 UUID', example: '00000000-0000-0000-0000-000000000000',
  })
  uuid: string;

  @IsUUID()
  @IsOptional()
  @ApiProperty({
    description: '생성자 UUID',
    nullable:    true,
    example:     '00000000-0000-0000-0000-000000000000',
  })
  creatorUUID: string | null;

  @IsString()
  @ApiProperty({ description: '이름' })
  name: string;

  @IsString()
  @ApiProperty({ description: '설명' })
  description: string;

  @IsString()
  @ApiProperty({ description: '특징' })
  characteristics: string;

  @IsString()
  @ApiProperty({ description: '프로필 이미지 URL' })
  profileImage: string;

  @IsDateString()
  @ApiProperty({ description: '생성일' })
  createdAt: string;

  @IsDateString()
  @ApiProperty({ description: '마지막 수정일' })
  updatedAt: string;
}

export class PersonaOverviewDto {
  @IsUUID()
  @ApiProperty({
    description: '페르소나 UUID', example: '00000000-0000-0000-0000-000000000000',
  })
  uuid: string;

  @IsString()
  @ApiProperty({ description: '이름' })
  name: string;

  @IsString()
  @ApiProperty({ description: '설명' })
  description: string;

  @IsString()
  @ApiProperty({ description: '프로필 이미지 URL' })
  profileImage: string;

  @IsDateString()
  @ApiProperty({ description: '생성일' })
  createdAt: string;
}
