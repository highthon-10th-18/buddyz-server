import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthorizedRequest } from '@/types/response';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { CreatePersonaDto } from './dto/create-persona.dto';
import { PersonaDto, PersonaOverviewDto } from './dto/persona.dto';
import { PersonaService } from './persona.service';

@ApiTags('Persona')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('personas')
export class PersonaController {
  constructor(private readonly personaService: PersonaService) {
  }
  @Get()
  @ApiOperation({ summary: '페르소나 목록 조회' })
  @ApiResponse({
    status: HttpStatus.OK, type: [PersonaOverviewDto],
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
  @UseInterceptors(FileInterceptor('profileImage', { fileFilter: (req, file, callback) => {
    if (!file.mimetype.match(/^image\/(jpeg|png|webp)$/)) {
      return callback(new HttpException('JPEG, PNG 그리고 WEBP만 업로드할 수 있습니다.', HttpStatus.BAD_REQUEST), false);
    }

    callback(null, true);
  } }))
  async createPersona(@Req() req: AuthorizedRequest,
    @UploadedFile() file: Express.Multer.File,
    @Body() body: CreatePersonaDto) {
    const payload = {
      ...body, profileImage: file,
    };

    return this.personaService.createPersona(req.user.uuid, payload);
  }
}
