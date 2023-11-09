import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CreatedUpdatedModel } from '../../../common/entities/create-update.model';
import { PublicationEntity } from '../../publications/entities/publication.entity';

@Entity()
export class ImageEntity extends CreatedUpdatedModel {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ type: 'text' })
  url: string;

  @ManyToOne(() => PublicationEntity, (publication) => publication.images)
  publication: PublicationEntity;
}
