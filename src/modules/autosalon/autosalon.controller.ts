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
import { CreateUserSalonRequestDto } from './dto/request/create-user-salon-request.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('AutoSalon')
@Controller('autosalon')
export class AutosalonController {
  constructor(private readonly autosalonService: AutosalonService) {}

  @Post()
  createUserSalon(@Body() createAutosalonDto: CreateUserSalonRequestDto) {
    return this.autosalonService.createUserSalon(createAutosalonDto);
  }

  @Get()
  findAll() {
    return this.autosalonService.findAll();
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
