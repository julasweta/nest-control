import { Module } from '@nestjs/common';
import { PublicationService } from './publications.service';
import { PublicationsController } from './publications.controller';
import { ImageModule } from '../image/image.module';
import { ImageRepository } from '../image/image.repository';
import { ImageService } from '../image/image.service';
import { PublicationRepository } from './publications.repository';
import { S3Service } from '../s3service/s3service.service';
import { VerificationService } from '../verification/verification.service';
import { VerificationModule } from '../verification/verification.module';
import { UserModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'bearer',
      property: 'user',
    }),
    JwtModule.registerAsync({
      useFactory: async () => ({
        secret: 'secret',
        signOptions: {
          expiresIn: '24h',
        },
      }),
    }),
    ImageModule,
    VerificationModule,
    UserModule,
  ],
  controllers: [PublicationsController],
  providers: [
    PublicationService,
    ImageService,
    ImageRepository,
    PublicationRepository,
    S3Service,
    VerificationService,
  ],
  exports: [PublicationRepository],
})
export class PublicationsModule {}
