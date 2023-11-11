import { PickType } from '@nestjs/swagger';
import { PublicationBaseDto } from './publication.base.dto';

export class CreatePublicationDto extends PickType(PublicationBaseDto, [
  'description',
  'images',
  'price',
  'title',
  'brand',
  'model',
  'brandOther',
  'modelOther',
  'currency',
]) {}
