import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRedisClient, RedisClient } from '@webeleon/nestjs-redis';

import { UserEntity } from '../users/entities/user.entity';
import { LoginRequestDto } from './dto/login-request.dto';
import { AutoSalonEntity } from '../autosalon/entities/autosalon.entity';
import { TokenPayload } from '../../common/interfaces/token.interface';
import { VerificationService } from '../verification/verification.service';
import { AutoSalonRepository } from '../autosalon/autosalon.repository';
import { UserRepository } from '../users/user.repository';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
    private readonly verificationService: VerificationService,
    private autoSalonRepository: AutoSalonRepository,
    private userRepository: UserRepository,
    @InjectRedisClient() private redisClient: RedisClient,
  ) {}

  async login(data: LoginRequestDto) {
    let findData: UserEntity | AutoSalonEntity;
    if (!data.salon) {
      findData = await this.userRepository.findOne({
        where: {
          email: data.email,
        },
      });
      if (!findData) {
        throw new HttpException(
          'Email or password is not correct',
          HttpStatus.UNAUTHORIZED,
        );
      }
    } else {
      findData = await this.autoSalonRepository.findOne({
        where: {
          email: data.email,
        },
      });
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

  async createToken(payload: TokenPayload): Promise<string> {
    const token = this.jwtService.sign(payload);

    return token;
  }

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

  public async verifyRefreshToken(refreshToken: string): Promise<UserEntity> {
    try {
      // Використовуйте бібліотеку jwt для перевірки валідності та розкодування токену
      const decodedToken = this.jwtService.verify(refreshToken);
      // За допомогою дешифратора отримайте інформацію про користувача
      const user = await this.userService.getUserById(decodedToken.id);

      return user;
    } catch (error) {
      // Обробляємо' помилки, наприклад, якщо токен не є валідним або прострочений
      throw new HttpException(
        'Invalid or expired refresh token',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
