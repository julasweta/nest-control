import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserRepository extends Repository<UserEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(UserEntity, dataSource.manager);
  }

  /*
  За допомогою цього об'єкта queryBuilder будуємо різні SQL-запити, такі як SELECT, INSERT, UPDATE або DELETE, для взаємодії з даними користувачів в базі даних.
  order - сортуємо за даними по замовчуванню, вказаними в enum
  orderBy - сортуємо за данними, які сами вибираємо і прописуємо  в enum
  */
  public async getAllUsers(query: any): Promise<any> {
    const queryBuilder = this.createQueryBuilder('user');
    switch (query.orderBy) {
      case 'createdAt':
        queryBuilder.orderBy('user.createdAt', query.order);
        break;
      case 'age':
        queryBuilder.orderBy('user.age', query.order);
        break;
    }

    if (query.search) {
      queryBuilder.andWhere('LOWER(user.userName) LIKE :search', {
        search: `%${query.search}%`,
      });
    }

    queryBuilder.limit(query.limit);
    queryBuilder.offset(query.offset);

    const [entities, total] = await queryBuilder.getManyAndCount();
    return { entities, total };
  }
}
