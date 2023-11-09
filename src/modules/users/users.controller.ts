import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserRequestDto } from './dto/request/create-user-request.dto';
import { UpdateUserRequestDto } from './dto/request/update-user-request.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserResponseMapper } from './user.response.mapper';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Create new user' })
  @Post()
  async createUser(@Body() body: CreateUserRequestDto): Promise<any> {
    const user = await this.usersService.createUser(body);
    return UserResponseMapper.toCreatesRes(user);
  }

  @ApiOperation({ summary: 'Get user byId' })
  @Get('user/:id')
  async getUserById(@Param('id') id: string) {
    const user = await this.usersService.getUserById(id);
    return UserResponseMapper.toGetUserIdRes(user);
  }

  @ApiOperation({ summary: 'Update user' })
  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() body: UpdateUserRequestDto,
  ): Promise<string> {
    const result = await this.usersService.updateUser(id, body);
    return result;
  }

  @ApiOperation({ summary: 'Delete user' })
  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<any> {
    return await this.usersService.deleteUser(id);
  }
}
