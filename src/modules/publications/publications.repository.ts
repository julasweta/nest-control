import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { PublicationEntity } from './entities/publication.entity';
import {
  PublicationOrderFieldEnum,
  PublicationListQuerytDto,
} from './dto/request/publication-list-params.dto';
import { startOfDay, endOfDay } from 'date-fns';

export interface IList<T> {
  entities: T[];
  total: number;
}

@Injectable()
export class PublicationRepository extends Repository<PublicationEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(PublicationEntity, dataSource.manager);
  }

  public async getAll(
    query: PublicationListQuerytDto,
  ): Promise<IList<PublicationEntity>> {
    const queryBuilder = this.createQueryBuilder('publications');

    if (query.orderBy) {
      switch (query.orderBy) {
        case PublicationOrderFieldEnum.createdAt:
          queryBuilder.orderBy('publications.createdAt', query.order);
          break;
        case PublicationOrderFieldEnum.price:
          queryBuilder.orderBy('publications.price', query.order);
          break;
        case PublicationOrderFieldEnum.views:
          queryBuilder.orderBy('publications.views', query.order);
          break;
      }
    }

    // ...
    if (query.date) {
      const d = new Date(query.date);
      const startOfDayDate = startOfDay(d);
      const endOfDayDate = endOfDay(d);

      // Пошук за датою
      queryBuilder.andWhere(
        `(SELECT COUNT(*) FROM UNNEST(publications.views) view WHERE view::date BETWEEN :startOfDayDate AND :endOfDayDate) > 0`,
        { startOfDayDate, endOfDayDate },
      );
    }

    //

    if (query.startDate && query.endDate) {
      const start = new Date(query.startDate);
      const end = new Date(query.endDate);

      // Пошук за датами
      queryBuilder.andWhere(
        `(SELECT COUNT(*) FROM UNNEST(publications.views) view WHERE view::date BETWEEN :start AND :end) > 0`,
        { start, end },
      );
    }

    //

    if (query.search) {
      queryBuilder.andWhere('LOWER(publications.title) LIKE :search', {
        search: `%${query.search}%`,
      });
    }

    queryBuilder.limit(query.limit);
    queryBuilder.offset(query.offset);

    const [entities, total] = await queryBuilder.getManyAndCount();
    return { entities, total };
  }
}
