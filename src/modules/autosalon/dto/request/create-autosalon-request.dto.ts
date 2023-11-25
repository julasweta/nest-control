import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';
import { trimLowercaseWithoutSpaces } from '../../../../common/dto/trim-transformer';

export class CreateAutoSalonRequestDto {
  @Transform(trimLowercaseWithoutSpaces)
  @IsString()
  nameSalon: string;

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

  @IsNotEmpty()
  @IsString()
  @IsPhoneNumber(null)
  phone: string;
}
