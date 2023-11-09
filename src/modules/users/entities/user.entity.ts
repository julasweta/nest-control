export class User {}
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CreatedUpdatedModel } from '../../../common/entities/create-update.model';
import { UserRole } from '../../../common/enum/role.enum';
import { AccountType } from '../../../common/enum/accountType.enum';
import { PublicationEntity } from '../../publications/entities/publication.entity';
import { AutoSalonEntity } from '../../autosalon/entities/autosalon.entity';

@Entity('users')
// users назва бази
export class UserEntity extends CreatedUpdatedModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  userName: string;

  @Column({ type: 'text' })
  login: string;

  @Column({ type: 'text' })
  password: string;

  @Column({ type: 'text', nullable: false, unique: true })
  email: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.Buyer })
  role: UserRole;

  @Column({ type: 'enum', enum: AccountType, default: AccountType.Basic })
  accountType: AccountType;

  @Column({ type: 'text', nullable: true })
  phone: string;

  @OneToMany(() => PublicationEntity, (publication) => publication.user)
  publications: PublicationEntity[];

  @OneToOne(() => AutoSalonEntity)
  @JoinColumn()
  autosalon: AutoSalonEntity;
}
