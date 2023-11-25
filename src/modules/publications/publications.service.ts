import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { PublicationRepository } from './publications.repository';
import { UserRepository } from '../users/user.repository';
import { ImageRepository } from '../image/image.repository';
import { EFileTypes, S3Service } from '../s3service/s3service.service';
import { S3Client } from '@aws-sdk/client-s3';
import { CustomConfigService } from '../../config/config.service';
import { ImageService } from '../image/image.service';
import { PublicationListQuerytDto } from './dto/request/publication-list-params.dto';
import { UpdatePublicationDto } from './dto/request/udate.request.dto';
import { PublicationStatus } from '../../common/enum/statusPublication.enum';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Filter = require('bad-words');

@Injectable()
export class PublicationService {
  private readonly s3Client = new S3Client({
    region: this.customConfig.aws_region,
  });
  constructor(
    private readonly publicationRepository: PublicationRepository,
    private readonly userRepository: UserRepository,
    private readonly imageRepository: ImageRepository,
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
  ): Promise<any> {
    const publication = await this.publicationRepository.findOne({
      where: { id: id },
      relations: {
        user: true,
      },
    });
    // Завантажуємо файл на AWS S3 та отримуємо шлях до нього
    const imagePath = await this.s3RService.uploadFile(
      file,
      EFileTypes.Publications,
      publication.id,
    );
    // Створіємо публікацію та призначаємо їй шлях до зображення
    const createdPublication = this.publicationRepository.create({
      ...publication,
      images: [await this.imageservice.createImage(imagePath, publication)],
    });
    return await this.publicationRepository.save(createdPublication);
  }

  public async getdAllBasic() {
    return await this.publicationRepository.find();
  }

  public async getdAll(query: PublicationListQuerytDto) {
    return await this.publicationRepository.getAll(query);
  }

  async getPublicationById(id: string): Promise<any> {
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
      views: countViews.length,
      publication: addVisitPublication,
    };

    return res;
  }

  public async updatePublication(
    id: string,
    body: UpdatePublicationDto,
  ): Promise<any> {
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
      // Обробка випадку, коли публікацію не знайдено за вказаним id
      console.log('Publication not found');
      return null;
    }
  }
}
