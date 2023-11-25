import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';
import { trimLowercaseWithoutSpaces } from '../../../../common/dto/trim-transformer';

export class UpdateUserRequestDto {
  @Transform(trimLowercaseWithoutSpaces)
  @IsString()
  @IsOptional()
  userName?: string;

  @Transform(trimLowercaseWithoutSpaces)
  @IsString()
  @IsOptional()
  login?: string;

  @Transform(trimLowercaseWithoutSpaces)
  @IsString()
  @IsOptional()
  password?: string;

  @Transform(trimLowercaseWithoutSpaces)
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  @IsOptional()
  email?: string;

  @IsNotEmpty()
  @IsString()
  @IsPhoneNumber(null)
  @IsOptional()
  phone?: string;
}
