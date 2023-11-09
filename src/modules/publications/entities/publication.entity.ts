import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CreatedUpdatedModel } from '../../../common/entities/create-update.model';
import { UserEntity } from '../../users/entities/user.entity';
import { ImageEntity } from '../../image/entities/image.entity';

@Entity()
export class PublicationEntity extends CreatedUpdatedModel {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ type: 'text' })
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'int' })
  price: number;

  @ManyToOne(() => UserEntity, (user) => user.publications, {
    nullable: true,
  })
  user: UserEntity;

  @OneToMany(() => ImageEntity, (image) => image.publication)
  images: ImageEntity[];

  @Column({ type: 'jsonb', array: false, default: [] })
  views: number[];
}
