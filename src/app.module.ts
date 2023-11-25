import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as path from 'path';

import { CustomConfigModule } from './config/config.module';
import { CustomConfigService } from './config/config.service';
import { UserModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { AutosalonModule } from './modules/autosalon/autosalon.module';
import { ImageModule } from './modules/image/image.module';
import { PublicationsModule } from './modules/publications/publications.module';
import { S3Module } from './modules/s3service/s3service.module';
import { VerificationModule } from './modules/verification/verification.module';
import { SearchModule } from './modules/search/search.module';

@Module({
  imports: [
    CustomConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [CustomConfigModule],
      useFactory: (customConfigService: CustomConfigService) => ({
        type: 'postgres',
        host: customConfigService.db_host,
        port: customConfigService.db_port,
        username: customConfigService.db_username,
        password: customConfigService.db_password,
        database: customConfigService.db_database,
        synchronize: true,
        migrationsRun: false,
        entities: [
          path.join(__dirname, '**', 'entities', '**', '*.entity{.ts,.js}'),
        ],
      }),
      inject: [CustomConfigService],
    }),
    UserModule,
    AutosalonModule,
    AuthModule,
    ImageModule,
    PublicationsModule,
    S3Module,
    VerificationModule,
    SearchModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
