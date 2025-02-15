import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreatePersonaDto } from './dto/create-persona.dto';
import { PersonaDto } from './dto/persona.dto';
import { PersonaService } from './persona.service';

@ApiTags('Persona')
@Controller('personas')
export class PersonaController {
  constructor(private readonly personaService: PersonaService) {
  }
  @Get()
  @ApiOperation({ summary: '페르소나 목록 조회' })
  @ApiResponse({
    status: HttpStatus.OK, type: [PersonaDto],
  })
  async getPersonaList() {
    return this.personaService.getPersonaList();
  }
  @Get(':uuid')
  @ApiOperation({ summary: '페르소나 상세 조회' })
  @ApiResponse({
    status: HttpStatus.OK, type: PersonaDto,
  })
  async getPersonaDetail(@Param('uuid') uuid: string) {
    return this.personaService.getPersonaDetail(uuid);
  }
  @Post()
  @ApiOperation({ summary: '페르소나 생성' })
  @ApiResponse({
    status: HttpStatus.CREATED, type: PersonaDto,
  })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('profileImage'))
  async createPersona(@UploadedFile() file: Express.Multer.File,
    @Body() body: CreatePersonaDto) {
    console.log(file, body);

    return 'success';
  }
}
