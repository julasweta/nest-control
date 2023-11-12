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
} from '@nestjs/common';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PublicationService } from './publications.service';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { PublicationListQuerytDto } from './dto/request/publication-list-params.dto';
import { BasicPremiumGuard } from '../../common/guards/basic.premium.guard';

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
    @Param('id') id: string,
  ) {
    return this.publicationsService.createPublication(body, id);
  }

  @ApiOperation({
    summary: 'Get all Publicantions. search with Date, order and total',
    description: 'only with auth as Premium',
  })
  @UseGuards(AuthGuard('bearer'), BasicPremiumGuard)
  @Get()
  async getdAll(@Query() query: PublicationListQuerytDto): Promise<any> {
    const result = await this.publicationsService.getdAll(query);
    return result;
  }

  @ApiOperation({
    summary: 'Get all Publicantions ',
    description: 'for Basic Account',
  })
  @Get('all')
  async getdAllBasic(): Promise<any> {
    const result = await this.publicationsService.getdAllBasic();
    return result;
  }

  @ApiOperation({
    summary: 'Get Publication by Id',
    description: 'Resolve: views -загальна кількість переглядів оголошення',
  })
  @UseGuards(AuthGuard('bearer'))
  @Get('publication/:id')
  async getUserById(@Param('id') id: string): Promise<any> {
    const result = await this.publicationsService.getPublicationById(id);
    return result;
  }
}
