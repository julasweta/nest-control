import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Headers,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserRequestDto } from './dto/request/create-user-request.dto';
import { UpdateUserRequestDto } from './dto/request/update-user-request.dto';
import { UserResponseMapper } from './user.response.mapper';
import { CreateUserSalonRequestDto } from './dto/request/create-user-salon-request.dto';
import { BasicPremiumGuard } from '../../common/guards/basic.premium.guard';
import { RoleDecorator } from '../../common/decorators/role.decorator';
import { AuthGuard } from '@nestjs/passport';
import { UserRole } from '../../common/enum/role.enum';
import { RoleGuard } from '../../common/guards/role.guard';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { LogoutGuard } from '../../common/guards/logout.guard';
import { CheckAutoSalonGuard } from '../../common/guards/check.autosalon.guard';

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

  @UseGuards(CheckAutoSalonGuard)
  @ApiOperation({ summary: 'Create a salon employee' })
  @Post('createusersalon')
  async createUserSalon(
    @Body() body: CreateUserSalonRequestDto,
    @Headers('authorization') refreshToken: string,
  ): Promise<any> {
    const token = this.extractTokenFromHeader(refreshToken);
    const user = await this.usersService.createUserSalon(body, token);
    return user;
  }

  /*BasicPremiumGuard */
  @UseGuards(BasicPremiumGuard)
  @ApiOperation({ summary: 'Get user byId' })
  @Get('user/:id')
  async getUserById(@Param('id') id: string) {
    const user = await this.usersService.getUserById(id);
    if (!user.autosalon) {
      //return UserResponseMapper.toGetUserIdRes(user);
      return user;
    } else {
      // return UserResponseMapper.toGetUserSalonIdRes(user);
      return user;
    }
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

  @ApiOperation({
    summary: 'Update Account Type - Basic - Premium',
    description: 'only for Administrator',
  })
  @RoleDecorator(UserRole.Administrator)
  @UseGuards(AuthGuard('bearer'), RoleGuard)
  @Put('type/:id')
  async updateAccountType(
    @Param('id') id: string,
    @Body() body: UpdateUserRequestDto,
  ): Promise<string> {
    const result = await this.usersService.updateAccountType(id, body);
    return result;
  }

  private extractTokenFromHeader(request: string): string | undefined {
    const [type, token] = request.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  @ApiOperation({ summary: 'Logout' })
  @UseGuards(AuthGuard(), LogoutGuard)
  @Post('logout')
  async logout(): Promise<any> {
    return 'Exit from account';
  }

  @ApiOperation({ summary: 'Delete user' })
  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<any> {
    return await this.usersService.deleteUser(id);
  }
}
