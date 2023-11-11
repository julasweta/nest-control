import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { PublicationEntity } from './entities/publication.entity';

@Injectable()
export class PublicationRepository extends Repository<PublicationEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(PublicationEntity, dataSource.manager);
  }
}
