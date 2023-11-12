import { Module } from '@nestjs/common';
import { CustomConfigModule } from '../../config/config.module';
import { S3Service } from './s3service.service';

@Module({
  imports: [CustomConfigModule],
  providers: [S3Service],
  exports: [S3Service],
})
export class S3Module {}
