import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
} from 'class-validator';
import { UserRole } from '../../../common/enum/role.enum';
import { AccountType } from '../../../common/enum/accountType.enum';
import { AutoSalonEntity } from '../../autosalon/entities/autosalon.entity';
import { ApiProperty } from '@nestjs/swagger';

export class UserBaseDto {
  id: string;

  @Transform(({ value }) => value.trim().toLowerCase().replace(/\s/g, ''))
  @IsString()
  userName: string;

  @Transform(({ value }) => value.trim().toLowerCase().replace(/\s/g, ''))
  @IsString()
  login: string;

  @Transform(({ value }) => value.trim().toLowerCase().replace(/\s/g, ''))
  @IsString()
  password: string;

  @Transform(({ value }) => value.trim().toLowerCase().replace(/\s/g, ''))
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  readonly email?: string;

  createdAt: Date;

  @ApiProperty({
    enum: UserRole,
    enumName: 'UserRole',
    description: 'User role',
    default: UserRole.Buyer,
  })
  @IsEnum(UserRole, {
    message: 'Invalid role. Choose either "Buyer" or "Seller".',
  })
  @IsNotEmpty({ message: 'Role is required.' })
  role: Partial<UserRole>;

  @IsEnum(AccountType, {
    message: 'InvalidAccountType. Choose either "Basic" or "Premium".',
  })
  accountType: AccountType;

  @IsNotEmpty()
  @IsString()
  @IsPhoneNumber(null)
  phone: string;

  autosalon: AutoSalonEntity = null;
}
