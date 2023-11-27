import {
  Controller,
  Post,
  Body,
  Param,
  UseGuards,
  Get,
  UseInterceptors,
  UploadedFile,
  Query,
  Put,
  ParseUUIDPipe,
  HttpStatus,
} from '@nestjs/common';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PublicationService } from './publications.service';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { PublicationListQuerytDto } from './dto/request/publication-list-params.dto';
import { BasicPremiumGuard } from '../../common/guards/basic.premium.guard';
import { UpdatePublicationDto } from './dto/request/udate.request.dto';
import { PublicationResponseDto } from './dto/response/publication.response.dto';
import { PublicationEntity } from './entities/publication.entity';

@ApiTags('Publications')
@Controller('publications')
export class PublicationsController {
  constructor(private readonly publicationsService: PublicationService) {}

  @ApiOperation({ summary: 'Add Image to Publication' })
  @UseGuards(AuthGuard('bearer'))
  @Post('file/:id')
  @UseInterceptors(FileInterceptor('file'))
  async upload(@UploadedFile() file, @Param('id') id: string) {
    await this.publicationsService.addImage(id, file);
  }

  @ApiOperation({ summary: 'Create Publication' })
  @UseGuards(AuthGuard('bearer'))
  @Post('create/:id')
  async createPublication(
    @Body() body: CreatePublicationDto,
    @Param(
      'id',
      new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: string,
  ) {
    return this.publicationsService.createPublication(body, id);
  }

  @ApiOperation({
    summary: 'Get all Publicantions. search with Date, order and total',
    description: 'only with auth as Premium',
  })
  @UseGuards(AuthGuard('bearer'), BasicPremiumGuard)
  @Get()
  async getdAll(
    @Query() query: PublicationListQuerytDto,
  ): Promise<Partial<PublicationResponseDto>> {
    const result = await this.publicationsService.getdAll(query);
    return result;
  }

  @ApiOperation({
    summary: 'Get all Publicantions ',
    description: 'for Basic Account',
  })
  @Get('all')
  @UseGuards(AuthGuard('bearer'))
  async getdAllBasic(): Promise<Partial<PublicationResponseDto>> {
    const result = await this.publicationsService.getdAllBasic();
    return result;
  }

  @ApiOperation({
    summary: 'Get Publication by Id',
    description: 'Resolve: views -загальна кількість переглядів оголошення',
  })
  @UseGuards(AuthGuard('bearer'))
  @Get('publication/:id')
  async getUserById(@Param('id') id: string): Promise<PublicationResponseDto> {
    const result = await this.publicationsService.getPublicationById(id);
    return result;
  }

  @ApiOperation({ summary: 'Update publication' })
  @Put('update/:id')
  async updateUser(
    @Param('id') id: string,
    @Body() body: UpdatePublicationDto,
  ): Promise<PublicationEntity> {
    const result = await this.publicationsService.updatePublication(id, body);
    return result;
  }
}
