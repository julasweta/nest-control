import { Entity, Column, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '../../users/entities/user.entity';
import { CreatedUpdatedModel } from '../../../common/entities/create-update.model';

@Entity('autosalon')
export class AutoSalonEntity extends CreatedUpdatedModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  nameSalon: string;

  @Column({ type: 'text' })
  login: string;

  @Column({ type: 'text' })
  password: string;

  @Column({ type: 'text', nullable: false, unique: true })
  email: string;

  @Column({ type: 'text', nullable: true })
  phone: string;

  @OneToMany(() => UserEntity, (user) => user.autosalon)
  user: UserEntity[];
}
