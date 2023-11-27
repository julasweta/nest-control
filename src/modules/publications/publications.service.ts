import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { PublicationRepository } from './publications.repository';
import { ImageRepository } from '../image/image.repository';
import { EFileTypes, S3Service } from '../s3service/s3service.service';
import { S3Client } from '@aws-sdk/client-s3';
import { CustomConfigService } from '../../config/config.service';
import { ImageService } from '../image/image.service';
import { PublicationListQuerytDto } from './dto/request/publication-list-params.dto';
import { UpdatePublicationDto } from './dto/request/udate.request.dto';
import { PublicationStatus } from '../../common/enum/statusPublication.enum';
import { UserRepository } from '../users/user.repository';
import { PublicationResponseDto } from './dto/response/publication.response.dto';
import { PublicationEntity } from './entities/publication.entity';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Filter = require('bad-words');

@Injectable()
export class PublicationService {
  private readonly s3Client = new S3Client({
    region: this.customConfig.aws_region,
  });
  constructor(
    private readonly publicationRepository: PublicationRepository,
    private readonly imageRepository: ImageRepository,
    private readonly userRepository: UserRepository,
    private readonly s3RService: S3Service,
    private readonly imageservice: ImageService,
    private readonly customConfig: CustomConfigService,
  ) {}

  public async createPublication(body: CreatePublicationDto, id: string) {
    const user = await this.userRepository.findOneBy({ id: id });

    if (!user) {
      throw new HttpException('User Not Found', HttpStatus.BAD_REQUEST);
    }
    let checkStatus: PublicationStatus;
    const filter = new Filter();
    if (filter.isProfane(body.description) || filter.isProfane(body.title)) {
      checkStatus = PublicationStatus.Inactive;
    } else {
      checkStatus = PublicationStatus.Active;
    }

    const createdPublication = this.publicationRepository.create({
      ...body,
      user,
      status: checkStatus,
      images: body.images
        ? body.images.map((img) => this.imageRepository.create(img))
        : [],
    });

    return await this.publicationRepository.save(createdPublication);
  }

  public async addImage(
    id: string,
    file: { originalname: string; buffer: Buffer; mimetype: string },
  ): Promise<PublicationEntity> {
    const publication = await this.publicationRepository.findOne({
      where: { id: id },
      relations: {
        user: true,
      },
    });

    const imagePath = await this.s3RService.uploadFile(
      file,
      EFileTypes.Publications,
      publication.id,
    );
    console.log(imagePath);
    // Створіємо публікацію та призначаємо їй шлях до зображення
    const createdPublication = this.publicationRepository.create({
      ...publication,
      images: [await this.imageservice.createImage(imagePath, publication)],
    });
    console.log(createdPublication);
    return await this.publicationRepository.save(createdPublication);
  }

  public async getdAllBasic() {
    return await this.publicationRepository.find();
  }

  public async getdAll(query: PublicationListQuerytDto) {
    return await this.publicationRepository.getAll(query);
  }

  async getPublicationById(id: string): Promise<PublicationResponseDto> {
    const publication = await this.publicationRepository.findOne({
      where: { id: id },
      relations: {
        user: true,
      },
    });
    if (!publication) {
      throw new HttpException('User Not Found', HttpStatus.BAD_REQUEST);
    }

    const countViews = publication.views;

    const today = new Date();
    publication.views.push(today);

    const addVisitPublication =
      await this.publicationRepository.save(publication);

    const res = {
      viewsCount: countViews.length,
      publication: addVisitPublication,
    };
    return res;
  }

  public async updatePublication(
    id: string,
    body: UpdatePublicationDto,
  ): Promise<PublicationEntity> {
    const publication = await this.publicationRepository.findOne({
      where: { id: id },
    });

    if (publication) {
      // Оновлення полів об'єкта publication значеннями з body
      this.publicationRepository.merge(publication, body);

      const updatedPublication =
        await this.publicationRepository.save(publication);
      return updatedPublication;
    } else {
      throw new HttpException('Publication Not Found', HttpStatus.BAD_REQUEST);
      return null;
    }
  }
}
