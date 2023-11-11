import { Injectable } from '@nestjs/common';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { PublicationRepository } from './publications.repository';
import { UserRepository } from '../users/user.repository';
import { ImageRepository } from '../image/image.repository';

@Injectable()
export class PublicationService {
  constructor(
    private readonly publicationRepository: PublicationRepository,
    private readonly userRepository: UserRepository,
    private readonly imageRepository: ImageRepository,
  ) {}

  public async createPublication(body: CreatePublicationDto, id: string) {
    console.log(id);
    const user = await this.userRepository.findOneBy({ id: id });

    // Збереження публікації
    const createdPublication = this.publicationRepository.create({
      ...body,
      user,
      images: body.images.map((img) => this.imageRepository.create(img)),
    });

    // Збереження публікації після додавання зображень
    return await this.publicationRepository.save(createdPublication);
  }
}
