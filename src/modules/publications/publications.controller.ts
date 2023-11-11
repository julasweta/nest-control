import { Controller, Post, Body, Param } from '@nestjs/common';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PublicationService } from './publications.service';

@ApiTags('Publications')
@Controller('publications')
export class PublicationsController {
  constructor(private readonly publicationsService: PublicationService) {}

  @ApiOperation({ summary: 'Create Publication' })
  @Post(':id')
  createPublication(
    @Body() body: CreatePublicationDto,
    @Param('id') id: string,
  ) {
    return this.publicationsService.createPublication(body, id);
  }
}
