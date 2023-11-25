import { CustomConfigModule } from '../../config/config.module';
import { CustomConfigService } from '../../config/config.service';
import { Module } from '@nestjs/common';
import { RedisModule } from '@webeleon/nestjs-redis';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserRepository } from './user.repository';
import { VerificationModule } from '../verification/verification.module';
import { AutosalonModule } from '../autosalon/autosalon.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'bearer',
      property: 'user',
    }),
    CustomConfigModule,
    VerificationModule,
    AutosalonModule,
    RedisModule.forFeature(),
  ],
  controllers: [UsersController],
  providers: [UsersService, UserRepository, CustomConfigService],
  exports: [UsersService, UserRepository, CustomConfigService],
})
export class UserModule {}
