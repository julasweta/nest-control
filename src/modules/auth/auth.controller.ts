import { Body, Controller, Headers } from '@nestjs/common';
import { Post } from '@nestjs/common';

import { AuthService } from './auth.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginRequestDto } from './dto/login-request.dto';
import { extractTokenFromHeader } from '../../common/utils/token-utils';

@ApiTags('Users')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Login' })
  @Post('login')
  async login(@Body() body: LoginRequestDto): Promise<any> {
    return await this.authService.login(body);
  }

  @Post('/refresh')
  async refreshTokens(
    @Headers('authorization') refreshToken: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const token = extractTokenFromHeader(refreshToken);
    const tokens = await this.authService.refreshTokens(token);
    return tokens;
  }
}
