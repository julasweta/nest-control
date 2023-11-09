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

  @IsEnum(UserRole, {
    message: 'Invalid role. Choose either "Buyer" or "Seller".',
  })
  role: UserRole;

  @IsEnum(AccountType, {
    message: 'InvalidAccountType. Choose either "Basic" or "Premium".',
  })
  accountType: AccountType;

  @IsNotEmpty()
  @IsString()
  @IsPhoneNumber(null)
  phone: string;

  autosalon: number = null;
}
