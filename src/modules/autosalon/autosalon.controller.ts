import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AutosalonService } from './autosalon.service';
import { UpdateUserSalonDto } from './dto/update-autosalon.dto';
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

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.autosalonService.findOne(+id);
  }

  @Patch(':id')
  updateUserSalon(
    @Param('id') id: string,
    @Body() updateAutosalonDto: UpdateUserSalonDto,
  ) {
    return this.autosalonService.update(+id, updateAutosalonDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.autosalonService.remove(+id);
  }
}
