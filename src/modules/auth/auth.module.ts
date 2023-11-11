import { forwardRef, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { RedisModule } from '@webeleon/nestjs-redis';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { UserEntity } from '../users/entities/user.entity';
import { AuthService } from './auth.service';
import { BearerStrategy } from './bearer.strategy';
import { AuthController } from './auth.controller';
import { UsersService } from '../users/users.service';
import { CustomConfigService } from '../../config/config.service';
import { UserRepository } from '../users/user.repository';
import { UserModule } from '../users/users.module';
import { ConfigService } from '@nestjs/config';
import { AutoSalonEntity } from '../autosalon/entities/autosalon.entity';
import { AutosalonModule } from '../autosalon/autosalon.module'; // Import AutosalonModule with forwardRef
import { AutoSalonRepository } from '../autosalon/autosalon.repository';
import { AutosalonService } from '../autosalon/autosalon.service';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'bearer',
      property: 'user',
    }),
    RedisModule.forRoot({
      url: 'redis://localhost:6379',
    }),
    TypeOrmModule.forFeature([UserEntity, AutoSalonEntity]),
    JwtModule.registerAsync({
      useFactory: async () => ({
        secret: 'secret',
        signOptions: {
          expiresIn: '24h',
        },
      }),
    }),
    forwardRef(() => UserModule),
    forwardRef(() => AutosalonModule),
  ],
  controllers: [AuthController],
  providers: [
    CustomConfigService,
    ConfigService,
    AuthService,
    BearerStrategy,
    UsersService,
    UserRepository,
    AutoSalonRepository,
    AutosalonService,
  ],
  exports: [PassportModule, AuthService, UsersService, AutosalonService],
})
export class AuthModule {}
