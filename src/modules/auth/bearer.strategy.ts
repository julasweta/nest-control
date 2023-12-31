import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRedisClient, RedisClient } from '@webeleon/nestjs-redis';
import { Strategy } from 'passport-http-bearer';

import { UserEntity } from '../users/entities/user.entity';
import { AuthService } from './auth.service';
import { DecodeTokenDto } from './dto/decode-token.dto';

@Injectable()
export class BearerStrategy extends PassportStrategy(Strategy, 'bearer') {
  constructor(
    private readonly jwtService: JwtService,
    private readonly authService: AuthService,
    @InjectRedisClient() readonly redisClient: RedisClient,
  ) {
    super({});
  }

  async validate(token: string): Promise<UserEntity> {
    let user = null;
    if (!(await this.redisClient.exists(token))) {
      throw new UnauthorizedException('bearer error');
    }

    await this.jwtService.verifyAsync(token);
    const decodeToken = this.jwtService.decode(token) as DecodeTokenDto;
    user = await this.authService.validateUser(decodeToken);
    return user;
  }
}
