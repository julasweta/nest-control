import { Module } from '@nestjs/common';
import { PublicationService } from './publications.service';
import { PublicationsController } from './publications.controller';
import { ImageModule } from '../image/image.module';
import { UserModule } from '../users/users.module';
import { UserRepository } from '../users/user.repository';
import { ImageRepository } from '../image/image.repository';
import { ImageService } from '../image/image.service';
import { PublicationRepository } from './publications.repository';

@Module({
  imports: [ImageModule, UserModule],
  controllers: [PublicationsController],
  providers: [
    PublicationService,
    UserRepository,
    ImageService,
    ImageRepository,
    PublicationRepository,
  ],
  exports: [PublicationRepository],
})
export class PublicationsModule {}
