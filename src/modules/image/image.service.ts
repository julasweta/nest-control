import { Injectable } from '@nestjs/common';
import { ImageEntity } from './entities/image.entity';
import { ImageRepository } from './image.repository';
import { PublicationEntity } from '../publications/entities/publication.entity';

@Injectable()
export class ImageService {
  constructor(private readonly imageRepository: ImageRepository) {}

  public async createImage(
    url: string,
    publication: PublicationEntity,
  ): Promise<ImageEntity> {
    const newImage = this.imageRepository.create({
      url: url,
      publication: publication,
    });
    this.imageRepository.save(newImage);
    return newImage;
  }
}
