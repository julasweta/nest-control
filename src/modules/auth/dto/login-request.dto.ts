import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { trimLowercaseWithoutSpaces } from '../../../common/dto/trim-transformer';

export class LoginRequestDto {
  @Transform(trimLowercaseWithoutSpaces)
  @IsString()
  password: string;

  @Transform(trimLowercaseWithoutSpaces)
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsOptional()
  salon?: boolean;
}
