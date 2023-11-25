import { PickType } from '@nestjs/swagger';
import { PublicationBaseDto } from '../publication.base.dto';

export class PublicationResponseDto extends PickType(PublicationBaseDto, []) {
  views: number;
  publication: PublicationBaseDto;
}
