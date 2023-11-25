import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { RedisModule } from '@webeleon/nestjs-redis';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { UserEntity } from '../users/entities/user.entity';
import { AuthService } from './auth.service';
import { BearerStrategy } from './bearer.strategy';
import { AuthController } from './auth.controller';
import { CustomConfigService } from '../../config/config.service';
import { ConfigService } from '@nestjs/config';
import { AutoSalonEntity } from '../autosalon/entities/autosalon.entity';
import { VerificationModule } from '../verification/verification.module';
import { VerificationService } from '../verification/verification.service';
import { UserModule } from '../users/users.module';
import { AutosalonModule } from '../autosalon/autosalon.module';

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
    UserModule,
    AutosalonModule,
    VerificationModule,
  ],
  controllers: [AuthController],
  providers: [
    CustomConfigService,
    ConfigService,
    AuthService,
    BearerStrategy,
    VerificationService,
  ],
  exports: [PassportModule, AuthService],
})
export class AuthModule {}
