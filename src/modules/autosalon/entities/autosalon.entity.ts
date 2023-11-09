import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CreatedUpdatedModel } from '../../../common/entities/create-update.model';
import { UserEntity } from '../../users/entities/user.entity';

@Entity('users')
// users назва бази
export class AutoSalonEntity extends CreatedUpdatedModel {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ type: 'text' })
  nameSalon: string;

  @Column({ type: 'text' })
  login: string;

  @Column({ type: 'text' })
  password: string;

  @OneToMany(() => UserEntity, (user) => user.autosalon)
  users: UserEntity[];
}
