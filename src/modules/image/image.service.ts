import { Injectable } from '@nestjs/common';
import { ImageEntity } from './entities/image.entity';
import { ImageRepository } from './image.repository';

@Injectable()
export class ImageService {
  constructor(private readonly imageRepository: ImageRepository) {}

  public async createImage(
    url: string,
    publication: any,
  ): Promise<ImageEntity> {
    const newImage = this.imageRepository.create({
      url: url,
      publication: publication,
    });
    return newImage;
  }
}
