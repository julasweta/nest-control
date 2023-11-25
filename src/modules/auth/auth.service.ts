import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  UnauthorizedException,
  forwardRef,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectRedisClient, RedisClient } from '@webeleon/nestjs-redis';
import { Repository } from 'typeorm';

import { UserEntity } from '../users/entities/user.entity';
import { UsersService } from './../users/users.service';
import { LoginRequestDto } from './dto/login-request.dto';
import { AutoSalonEntity } from '../autosalon/entities/autosalon.entity';
import { AutosalonService } from '../autosalon/autosalon.service';
import { TokenPayload } from '../../common/interfaces/token.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    public readonly userRepository: Repository<UserEntity>,
    @InjectRepository(AutoSalonEntity)
    public readonly autoSalonRepository: Repository<AutoSalonEntity>,
    private readonly jwtService: JwtService,
    @InjectRedisClient() private redisClient: RedisClient,
    @Inject(forwardRef(() => UsersService))
    public readonly usersService: UsersService,
    @Inject(forwardRef(() => AutosalonService))
    public readonly autosalonService: AutosalonService,
  ) {}

  async login(data: LoginRequestDto) {
    let findData: UserEntity | AutoSalonEntity;
    if (!data.salon) {
      findData = await this.validateUser(data);
      if (!findData) {
        throw new HttpException(
          'Email or password is not correct',
          HttpStatus.UNAUTHORIZED,
        );
      }
    } else {
      findData = await this.validateAutoSalon(data);
      if (!findData) {
        throw new HttpException(
          'Email or password is not correct',
          HttpStatus.UNAUTHORIZED,
        );
      }
    }

    const accessToken = await this.createToken({
      id: findData.id,
      type: 'access',
    });

    const refreshToken = await this.createToken({
      id: findData.id,
      type: 'refresh',
    });

    await this.redisClient.setEx(accessToken, 10000, accessToken);
    await this.redisClient.setEx(refreshToken, 50000, refreshToken);
    return { accessToken, refreshToken };
  }

  async refreshTokens(
    refreshToken: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    // Перевірка валідності refresh токену та отримання користувача, якщо все в порядку
    const user = await this.verifyRefreshToken(refreshToken);

    // Якщо валідно, генеруємо новий access токен
    const newAccessToken = await this.createToken({
      id: user.id,
      type: 'access',
    });

    await this.redisClient.setEx(newAccessToken, 10000, newAccessToken);
    // Повертаємо новий access та оригінальний refresh токен
    return { accessToken: newAccessToken, refreshToken };
  }

  private async verifyRefreshToken(refreshToken: string): Promise<UserEntity> {
    try {
      // Використовуйте бібліотеку jwt для перевірки валідності та розкодування токену
      const decodedToken = this.jwtService.verify(refreshToken);
      // За допомогою дешифратора отримайте інформацію про користувача
      const user = await this.usersService.getUserById(decodedToken.id);

      return user;
    } catch (error) {
      // Обробляємо' помилки, наприклад, якщо токен не є валідним або прострочений
      throw new HttpException(
        'Invalid or expired refresh token',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  async validateUser(data: LoginRequestDto): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: {
        email: data.email,
      },
    });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }

  async validateAutoSalon(data: LoginRequestDto): Promise<AutoSalonEntity> {
    const user = await this.autoSalonRepository.findOne({
      where: {
        email: data.email,
      },
    });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }

  async createToken(payload: TokenPayload): Promise<string> {
    const token = this.jwtService.sign(payload);

    return token;
  }

  async decodeToken(token: string): Promise<any> {
    try {
      return this.jwtService.decode(token);
    } catch (err) {
      throw new BadRequestException(' error decoder ');
    }
  }
}
