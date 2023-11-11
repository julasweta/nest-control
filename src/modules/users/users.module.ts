import { CustomConfigModule } from '../../config/config.module';
import { CustomConfigService } from '../../config/config.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedisModule } from '@webeleon/nestjs-redis'; // Додайте імпорт

import { UserEntity } from './entities/user.entity';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserRepository } from './user.repository';
import { AuthModule } from '../auth/auth.module';
import { AutoSalonRepository } from '../autosalon/autosalon.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    AuthModule,
    CustomConfigModule,
    RedisModule.forRoot({
      url: 'redis://localhost:6379',
    }),
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    UserRepository,
    CustomConfigService,
    AutoSalonRepository,
  ],
  exports: [UsersService, CustomConfigService],
})
export class UserModule {}
