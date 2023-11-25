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
import { IsOptional } from 'class-validator';
import { trimLowercaseWithoutSpaces } from '../../../common/dto/trim-transformer';

export class UserBaseDto {
  @IsOptional()
  id: string;

  @Transform(trimLowercaseWithoutSpaces)
  @IsString()
  userName: string;

  @Transform(trimLowercaseWithoutSpaces)
  @IsString()
  login: string;

  @Transform(trimLowercaseWithoutSpaces)
  @IsString()
  password: string;

  @Transform(trimLowercaseWithoutSpaces)
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
