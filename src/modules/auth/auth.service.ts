import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectRedisClient, RedisClient } from '@webeleon/nestjs-redis';
import { Repository } from 'typeorm';

import { UserEntity } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    public readonly userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
    @InjectRedisClient() private redisClient: RedisClient,
  ) {}

  async validateUser(data: any): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: {
        id: data.id,
      },
    });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }

  async createToken(id: any): Promise<string> {
    return this.jwtService.sign(id);
  }

  async decodeToken(token: string): Promise<any> {
    try {
      return this.jwtService.decode(token);
    } catch (err) {
      throw new BadRequestException(' error decoder ');
    }
  }
}
