import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomConfigModule } from '../../config/config.module';
import { RedisModule } from '@webeleon/nestjs-redis';
import { AutoSalonEntity } from './entities/autosalon.entity';

import { AutosalonController } from './autosalon.controller';
import { AutosalonService } from './autosalon.service';
import { AutoSalonRepository } from './autosalon.repository';
import { CustomConfigService } from '../../config/config.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([AutoSalonEntity]),
    CustomConfigModule,
    RedisModule.forRoot({
      url: 'redis://localhost:6379',
    }),
  ],
  controllers: [AutosalonController],
  providers: [AutosalonService, AutoSalonRepository, CustomConfigService],
  exports: [AutosalonService, AutoSalonRepository, CustomConfigService],
})
export class AutosalonModule {}
