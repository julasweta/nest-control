import { Controller, Post, Body } from '@nestjs/common';
import { AutosalonService } from './autosalon.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateAutoSalonRequestDto } from './dto/request/create-autosalon-request.dto';

@ApiTags('AutoSalon')
@Controller('autosalon')
export class AutosalonController {
  constructor(private readonly autosalonService: AutosalonService) {}

  @ApiOperation({ summary: 'Create new autosalon' })
  @Post()
  async createSalon(@Body() body: CreateAutoSalonRequestDto) {
    const salon = await this.autosalonService.createSalon(body);
    return salon;
  }
}
